"use client";
import React, { ReactNode, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
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
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { deleteResource } from "@/actions/resources";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

export type ResourceCardType = {
    id: string;
    title: string;
    text: string;
    content: () => ReactNode;
    url: string;
    tags?: ResourceCardTag[];
    createdAt: Date;
}

export type ResourceCardTag = {
    value: string,
    label: string
}

export default function ResourcesExpandableLayout({ resources, tags }: { resources: ResourceCardType[], tags?: ResourceCardTag[] }) {
    const searchPlaceholders = [
        "CVE-20240781",
        "Microsoft",
        "Linux"
    ]

    const [searchInput, setSearchInput] = useState<string>("");
    const [searchFilters, setSearchFilters] = useState<ResourceCardTag[]>([]);
    const [dateRangeFilter, setDateRangeFilter] = useState<DateRange | undefined>(undefined);
    const [displayedResources, setDisplayedResources] = useState<ResourceCardType[]>(resources);

    const [active, setActive] = useState<(ResourceCardType) | boolean | null>(null);
    const ref = useRef<HTMLDivElement>(null);
    const id = useId();

    function handleSearchChange(value: string) {
        setSearchInput(value);
        setDisplayedResources(resources.filter((r) => r.title.toLowerCase().includes(value.toLowerCase())))
    }

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setActive(false);
            }
        }

        if (active && typeof active === "object") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [active]);

    useOutsideClick(ref, () => setActive(null));

    function cuid() {
        throw new Error("Function not implemented.");
    }

    return (
        <>
            <div className="mb-20 mx-auto max-w-2xl space-y-4">
                <PlaceholdersAndVanishInput
                    placeholders={searchPlaceholders}
                    onChange={(changeEvent) => handleSearchChange(changeEvent.currentTarget.value)}
                    onSubmit={() => { }}
                />
                <div className="flex gap-2">
                    <FilterResources
                        filters={tags ? tags : []}
                        selectedFilters={searchFilters}
                        onSelectedFiltersChange={(value) => {
                            if (searchFilters.includes(value)) {
                                setSearchFilters(searchFilters.filter((filter) => filter !== value))
                            } else {
                                setSearchFilters([...searchFilters, value])
                            }
                        }}
                        emptyLabel={"No tags"}
                    />
                    <RangeDatePicker
                        date={dateRangeFilter}
                        onDateChange={setDateRangeFilter}
                    />
                    <Button variant={"ghost"} className="px-2" onClick={() => {
                        setSearchFilters([]);
                        setDateRangeFilter(undefined);
                    }}><X className="mr-px" /> Reset</Button>
                </div>
            </div>

            <div className="w-full grid sm:grid-cols-4 grid-cols-3">
                {displayedResources.length > 0
                    ? displayedResources.map((card, index) => (
                        <Dialog key={index}>
                            <DialogTrigger className="bg-inherit z-10">
                                <div className="p-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer">
                                    <Card className="bg-background w-full h-80 flex flex-col text-start">
                                        <CardHeader>
                                            <CardTitle className="truncate">{card.title}</CardTitle>
                                            <CardDescription>{card.createdAt.toDateString()}</CardDescription>
                                        </CardHeader>

                                        <CardContent className="flex-1 pb-4">
                                            <div className="line-clamp-[7]" dangerouslySetInnerHTML={{ __html: card.text }} />
                                        </CardContent>

                                        {card.tags && card.tags!.length > 0 ? <CardFooter className="flex gap-2">
                                            {card.tags?.slice(0, 2).map((tag, index) => (
                                                <Badge key={`${tag.value}-${index}`} className="truncate">{tag.label}</Badge>
                                            ))}
                                            {(card.tags?.length ?? 0) - 2 > 0
                                                ? <TooltipProvider>
                                                    <Tooltip>
                                                        <TooltipTrigger asChild>
                                                            <Badge>+ {card.tags!.length - 2}</Badge>
                                                        </TooltipTrigger>
                                                        <TooltipContent>
                                                            <p>{card.tags!.slice(2).map((tag) => tag.label).join(', ')}</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                                : null
                                            }
                                        </CardFooter> : null}
                                    </Card>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="max-w-6xl">
                                <DialogHeader>
                                    <DialogTitle>{card.title}</DialogTitle>
                                    <DialogDescription>{card.createdAt.toDateString()}</DialogDescription>
                                </DialogHeader>
                                {card.tags && card.tags.length > 0
                                    ? <div className="flex gap-3">
                                        {card.tags?.map((tag, index) => (
                                            <Badge key={`${tag.value}-${index}`} className="w-fit">{tag.label}</Badge>
                                        ))} </div>
                                    : null}
                                <ScrollArea className="h-[600px] w-full pr-3">
                                    <div className="relative text-xs md:text-sm lg:text-base md:h-fit flex flex-col items-start gap-4 overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]" dangerouslySetInnerHTML={{ __html: card.text }} />
                                </ScrollArea>
                                <DialogFooter className="flex justify-end gap-4">
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button className="rounded-3xl" type={"button"} variant={"destructive"}>Delete</Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent ref={ref} className="z-[100]">
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This will delete the resource permanently, this action cannot but undone.
                                                </AlertDialogDescription>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => deleteResource(card.id)}>Delete</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogHeader>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                    <Link href={card.url} target="_blank" onClick={() => { }}>
                                        <Button className="rounded-3xl" type={"button"}>See more</Button>
                                    </Link>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                    ))
                    : <p>No resources yet</p>
                }
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