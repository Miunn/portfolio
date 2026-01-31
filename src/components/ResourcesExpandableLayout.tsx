"use client";
import React, { ReactNode, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tooltip } from "./ui/tooltip";
import { TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import Link from "next/link";
import FilterResources from "./resources/FilterResources";
import { RangeDatePicker } from "./RangeDatePicker";
import { DateRange } from "react-day-picker";
import { X } from "lucide-react";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import {
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "./ui/alert-dialog";
import { deleteResource } from "@/actions/resources";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { Resource } from "@prisma/client";
import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { cn } from "@/lib/utils";

export type ResourceCardType = {
	id: string;
	title: string;
	text: string;
	description: string;
	content: () => ReactNode;
	url?: string;
	tags?: ResourceCardTag[];
	createdAt: Date;
};

export type ResourceCardTag = {
	value: string;
	label: string;
};

export default function ResourcesExpandableLayout({
	resources,
	tags,
	isAuth,
}: {
	resources: (Resource & { tags: { value: string; label: string }[] })[];
	tags?: ResourceCardTag[];
	isAuth: boolean;
}) {
	const searchPlaceholders = ["CVE-20240781", "Microsoft", "Linux"];

	const [searchInput, setSearchInput] = useState<string>("");
	const [searchFilters, setSearchFilters] = useState<ResourceCardTag[]>([]);
	const [dateRangeFilter, setDateRangeFilter] = useState<
		DateRange | undefined
	>(undefined);
	const [displayedResources, setDisplayedResources] =
		useState<(Resource & { tags: { value: string; label: string }[] })[]>(
			resources,
		);

	const ref = useRef<HTMLDivElement>(null);

	function tagMatchingSearch(tags: ResourceCardTag[], search: string) {
		const lowerSearch = search.toLowerCase();
		for (const tag of tags) {
			if (
				tag.value.toLowerCase().includes(lowerSearch) ||
				tag.label.toLowerCase().includes(lowerSearch)
			) {
				return true;
			}
		}
		return false;
	}

	function getMatchingResource(
		searchValue: string,
		dateRange: DateRange | undefined,
	): (Resource & { tags: { value: string; label: string }[] })[] {
		const searchTokens = searchValue.split(" ");

		let output = resources;

		for (const token of searchTokens) {
			output = output.filter((r) => {
				if (
					dateRange === undefined ||
					(dateRange.from === undefined && dateRange.to === undefined)
				) {
					return (
						r.title.toLowerCase().includes(token.toLowerCase()) ||
						tagMatchingSearch(r.tags ? r.tags : [], token)
					);
				}

				if (
					dateRange.from !== undefined &&
					dateRange.to === undefined
				) {
					return (
						r.createdAt > dateRange.from &&
						(r.title.toLowerCase().includes(token.toLowerCase()) ||
							tagMatchingSearch(r.tags ? r.tags : [], token))
					);
				}

				if (
					dateRange.from === undefined &&
					dateRange.to !== undefined
				) {
					return (
						r.createdAt < dateRange.to &&
						(r.title.toLowerCase().includes(token.toLowerCase()) ||
							tagMatchingSearch(r.tags ? r.tags : [], token))
					);
				}

				return (
					r.createdAt > dateRange.from! &&
					r.createdAt < dateRange.to! &&
					(r.title.toLowerCase().includes(token.toLowerCase()) ||
						tagMatchingSearch(r.tags ? r.tags : [], token))
				);
			});
		}

		return output;
	}

	function handleSearchChange(value: string) {
		setSearchInput(value);
		setDisplayedResources(getMatchingResource(value, dateRangeFilter));
	}

	function handleDateChange(date: DateRange | undefined) {
		setDateRangeFilter(date);
		setDisplayedResources(getMatchingResource(searchInput, date));
	}

	return (
		<>
			<div className="mb-10 sm:mb-20 sm:mx-auto w-full px-6 sm:px-0 md:max-w-2xl sm:max-w-xl space-y-4">
				<PlaceholdersAndVanishInput
					placeholders={searchPlaceholders}
					onChange={(changeEvent) =>
						handleSearchChange(changeEvent.currentTarget.value)
					}
					onSubmit={() => {}}
				/>
				<div className="flex flex-col sm:flex-row gap-2">
					<FilterResources
						triggerClassName="w-full sm:w-auto"
						filters={tags ? tags : []}
						selectedFilters={searchFilters}
						onSelectedFiltersChange={(value) => {
							if (searchFilters.includes(value)) {
								setSearchFilters(
									searchFilters.filter(
										(filter) => filter !== value,
									),
								);
							} else {
								setSearchFilters([...searchFilters, value]);
							}
						}}
						emptyLabel={"No tags"}
					/>
					<RangeDatePicker
						triggerClassName={"w-full sm:w-auto"}
						date={dateRangeFilter}
						onDateChange={handleDateChange}
					/>
					<Button
						variant={"ghost"}
						className="px-2 w-fit"
						onClick={() => {
							setSearchFilters([]);
							setDateRangeFilter(undefined);
						}}
					>
						<X className="mr-px" /> Reset
					</Button>
				</div>
			</div>

			<div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
				{displayedResources.length > 0 ? (
					displayedResources.map((card, index) => (
						<Dialog key={index}>
							<DialogTrigger className="bg-inherit z-10">
								<div className="p-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer">
									<Card className="bg-background w-full h-80 flex flex-col text-start">
										<CardHeader>
											<CardTitle className="truncate">
												{card.title}
											</CardTitle>
											<CardDescription>
												{card.createdAt.toDateString()}
											</CardDescription>
										</CardHeader>

										<CardContent className="flex-1 pb-4">
											{card.description.length > 0 ? (
												<p className="line-clamp-[7]">
													<Markdown
														remarkPlugins={[
															remarkMath,
														]}
														rehypePlugins={[
															rehypeKatex as any,
														]}
													>
														{card.description}
													</Markdown>
												</p>
											) : (
												<p className="italic">
													No description
												</p>
											)}
										</CardContent>

										{card.tags && card.tags!.length > 0 ? (
											<CardFooter className="flex gap-2">
												{card.tags
													?.slice(0, 2)
													.map((tag, index) => (
														<Badge
															key={`${tag.value}-${index}`}
															className="truncate"
														>
															{tag.label}
														</Badge>
													))}
												{(card.tags?.length ?? 0) - 2 >
												0 ? (
													<TooltipProvider>
														<Tooltip>
															<TooltipTrigger>
																<Badge>
																	+{" "}
																	{card.tags!
																		.length -
																		2}
																</Badge>
															</TooltipTrigger>
															<TooltipContent>
																<p>
																	{card
																		.tags!.slice(
																			2,
																		)
																		.map(
																			(
																				tag,
																			) =>
																				tag.label,
																		)
																		.join(
																			", ",
																		)}
																</p>
															</TooltipContent>
														</Tooltip>
													</TooltipProvider>
												) : null}
											</CardFooter>
										) : null}
									</Card>
								</div>
							</DialogTrigger>
							<DialogContent className="max-w-6xl">
								<DialogHeader>
									<DialogTitle>{card.title}</DialogTitle>
									<DialogDescription>
										{card.createdAt.toDateString()}
									</DialogDescription>
								</DialogHeader>
								{card.tags && card.tags.length > 0 ? (
									<div className="flex gap-3 flex-wrap">
										{card.tags?.map((tag, index) => (
											<Badge
												key={`${tag.value}-${index}`}
												className="w-fit"
											>
												{tag.label}
											</Badge>
										))}{" "}
									</div>
								) : null}
								<ScrollArea className="h-[600px] w-full pr-3">
									<p
										className={cn(
											"relative text-xs md:text-sm lg:text-base md:h-fit flex flex-col items-start gap-4 overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]",
											"prose-code:rounded-md prose-code:border prose-code:border-white",
										)}
									>
										<Markdown
											remarkPlugins={[remarkMath]}
											rehypePlugins={[
												rehypeKatex as any,
												rehypeHighlight as any,
											]}
										>
											{card.text}
										</Markdown>
									</p>
								</ScrollArea>
								<DialogFooter className="flex justify-end gap-4">
									{card.url ? (
										<Link
											href={card.url}
											target="_blank"
											onClick={() => {}}
										>
											<Button
												className="rounded-3xl w-full"
												type={"button"}
											>
												See more
											</Button>
										</Link>
									) : null}
									{isAuth ? (
										<AlertDialog>
											<AlertDialogTrigger asChild>
												<Button
													className="rounded-3xl"
													type={"button"}
													variant={"destructive"}
												>
													Delete
												</Button>
											</AlertDialogTrigger>
											<AlertDialogContent
												ref={ref}
												className="z-[100]"
											>
												<AlertDialogHeader>
													<AlertDialogTitle>
														Are you sure
													</AlertDialogTitle>
													<AlertDialogDescription>
														This will delete the
														resource permanently,
														this action cannot but
														undone.
													</AlertDialogDescription>
													<AlertDialogFooter>
														<AlertDialogCancel>
															Cancel
														</AlertDialogCancel>
														<AlertDialogAction
															onClick={() =>
																deleteResource(
																	card.id,
																)
															}
															className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
														>
															Delete
														</AlertDialogAction>
													</AlertDialogFooter>
												</AlertDialogHeader>
											</AlertDialogContent>
										</AlertDialog>
									) : null}
								</DialogFooter>
							</DialogContent>
						</Dialog>
					))
				) : (
					<p>No resources yet</p>
				)}
			</div>
		</>
	);
}

export const CloseIcon = () => {
	return (
		<motion.svg
			initial={{
				opacity: 0,
			}}
			animate={{
				opacity: 1,
			}}
			exit={{
				opacity: 0,
				transition: {
					duration: 0.05,
				},
			}}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="h-4 w-4 text-black"
		>
			<path stroke="none" d="M0 0h24v24H0z" fill="none" />
			<path d="M18 6l-12 12" />
			<path d="M6 6l12 12" />
		</motion.svg>
	);
};
