"use client";
import React, { ReactNode, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export type ResourceCardType = {
    title: string;
    description: string;
    text: string;
    content: () => ReactNode;
    url: string;
    tags?: { name: string }[];
}

export default function ResourcesExpandableLayout({ resources }: { resources: ResourceCardType[] }) {
    const searchPlaceholders = [
        "CVE-20240781",
        "Microsoft",
        "Linux"
    ]

    const [searchInput, setSearchInput] = useState<string>("");
    const [displayedResources, setDisplayedResources] = useState<ResourceCardType[]>(resources);

    const [active, setActive] = useState<(ResourceCardType) | boolean | null>(
        null
    );
    const ref = useRef<HTMLDivElement>(null);
    const id = useId();

    function handleSearchChange(value: string) {
        setSearchInput(value);
        setDisplayedResources(resources.filter((r) => r.title.includes(value)))
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

    return (
        <>
            <div className="mb-20">
                <PlaceholdersAndVanishInput
                    placeholders={searchPlaceholders}
                    onChange={(changeEvent) => handleSearchChange(changeEvent.currentTarget.value)}
                    onSubmit={() => { }}
                />
            </div>

            <div>
                <AnimatePresence>
                    {active && typeof active === "object" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/20 h-full w-full z-10"
                        />
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {active && typeof active === "object" ? (
                        <div className="fixed inset-0  grid place-items-center z-[100]">
                            <motion.button
                                key={`button-${active.title}-${id}`}
                                layout
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
                                className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                                onClick={() => setActive(null)}
                            >
                                <CloseIcon />
                            </motion.button>
                            <motion.div
                                layoutId={`card-${active.title}-${id}`}
                                ref={ref}
                                className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-xl overflow-hidden"
                            >
                                <Card>
                                    <CardHeader>
                                        <motion.div layoutId={`title-${active.title}-${id}`}>
                                            <CardTitle>{active.title}</CardTitle>
                                        </motion.div>
                                        <motion.div layoutId={`description-${active.description}-${id}`}>
                                            <CardDescription>{active.description}</CardDescription>
                                        </motion.div>
                                    </CardHeader>

                                    <CardContent>
                                        <motion.div layoutId={`tags-${active.title}-${active.description}-${id}`} className="mb-6 flex flex-wrap gap-2">
                                            {active.tags?.map((tag) => (
                                                <Badge key={tag.name}>{tag.name}</Badge>
                                            ))}
                                        </motion.div>
                                        <motion.p layoutId={`text-${active.text}-${id}`}>
                                            {active.text}
                                        </motion.p>
                                        <ScrollArea className="h-72 w-full">
                                            <div className="pt-4 relative">
                                                <motion.div
                                                    layout
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                                                >
                                                    {typeof active.content === "function"
                                                        ? active.content()
                                                        : active.content}
                                                </motion.div>
                                            </div>
                                        </ScrollArea>
                                    </CardContent>
                                    <CardFooter className="flex justify-end">
                                        <motion.div layoutId={`button-${active.title}-${id}`}>
                                            <Button className="rounded-3xl" type={"button"}>See more</Button>
                                        </motion.div>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        </div>
                    ) : null}
                </AnimatePresence>
                <div className="max-w-6xl w-full grid grid-cols-4">
                    {displayedResources.length > 0
                        ? displayedResources.map((card, index) => (
                            <motion.div
                                layoutId={`card-${card.title}-${id}`}
                                key={`card-${card.title}-${id}`}
                                onClick={() => setActive(card)}
                                className="bg-background w-72 h-80 flex flex-col z-10 p-2 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer"
                            >
                                <Card className="bg-background w-full h-80 flex flex-col">
                                    <CardHeader>
                                        <motion.div layoutId={`title-${card.title}-${id}`}>
                                            <CardTitle>{card.title}</CardTitle>
                                        </motion.div>
                                        <motion.div layoutId={`description-${card.description}-${id}`}>
                                            <CardDescription>{card.description}</CardDescription>
                                        </motion.div>
                                    </CardHeader>

                                    <CardContent className="flex-1">
                                        <motion.p layoutId={`text-${card.text}-${id}`}>
                                            {card.text}
                                        </motion.p>
                                    </CardContent>

                                    <CardFooter className="flex justify-between">
                                        <motion.div layoutId={`tags-${card.title}-${card.description}-${id}`} className="flex flex-wrap gap-2">
                                            {card.tags?.map((tag) => (
                                                <Badge key={tag.name}>{tag.name}</Badge>
                                            ))}
                                        </motion.div>
                                        <motion.div layoutId={`button-${card.title}-${id}`}>
                                            <Button className="rounded-3xl" type={"button"}>See more</Button>
                                        </motion.div>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))
                        : <p>No resources yet</p>
                    }
                </div>
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

const cards = [
    {
        title: "Test title",
        description: "Test description",
        text: "Test text",
        url: "https://ui.aceternity.com/templates",
        content: () => {
            return (
                <p>
                    Lana Del Rey, an iconic American singer-songwriter, is celebrated for
                    her melancholic and cinematic music style. Born Elizabeth Woolridge
                    Grant in New York City, she has captivated audiences worldwide with
                    her haunting voice and introspective lyrics. <br /> <br /> Her songs
                    often explore themes of tragic romance, glamour, and melancholia,
                    drawing inspiration from both contemporary and vintage pop culture.
                    With a career that has seen numerous critically acclaimed albums, Lana
                    Del Rey has established herself as a unique and influential figure in
                    the music industry, earning a dedicated fan base and numerous
                    accolades.
                </p>
            );
        },
    },
    {
        title: "Test title 2",
        description: "Test description 2",
        text: "Test text 2",
        url: "https://ui.aceternity.com/templates",
        content: () => {
            return (
                <p>
                    Lana Del Rey, an iconic American singer-songwriter, is celebrated for
                    her melancholic and cinematic music style. Born Elizabeth Woolridge
                    Grant in New York City, she has captivated audiences worldwide with
                    her haunting voice and introspective lyrics. <br /> <br /> Her songs
                    often explore themes of tragic romance, glamour, and melancholia,
                    drawing inspiration from both contemporary and vintage pop culture.
                    With a career that has seen numerous critically acclaimed albums, Lana
                    Del Rey has established herself as a unique and influential figure in
                    the music industry, earning a dedicated fan base and numerous
                    accolades.
                </p>
            );
        },
    },
    {
        title: "Test title 3",
        description: "Test description 3",
        text: "Test text 3",
        url: "https://ui.aceternity.com/templates",
        content: () => {
            return (
                <p>
                    Lana Del Rey, an iconic American singer-songwriter, is celebrated for
                    her melancholic and cinematic music style. Born Elizabeth Woolridge
                    Grant in New York City, she has captivated audiences worldwide with
                    her haunting voice and introspective lyrics. <br /> <br /> Her songs
                    often explore themes of tragic romance, glamour, and melancholia,
                    drawing inspiration from both contemporary and vintage pop culture.
                    With a career that has seen numerous critically acclaimed albums, Lana
                    Del Rey has established herself as a unique and influential figure in
                    the music industry, earning a dedicated fan base and numerous
                    accolades.
                </p>
            );
        },
    },
    {
        title: "Test title 4",
        description: "Test description 4",
        text: "Test text 4",
        url: "https://ui.aceternity.com/templates",
        content: () => {
            return (
                <p>
                    Lana Del Rey, an iconic American singer-songwriter, is celebrated for
                    her melancholic and cinematic music style. Born Elizabeth Woolridge
                    Grant in New York City, she has captivated audiences worldwide with
                    her haunting voice and introspective lyrics. <br /> <br /> Her songs
                    often explore themes of tragic romance, glamour, and melancholia,
                    drawing inspiration from both contemporary and vintage pop culture.
                    With a career that has seen numerous critically acclaimed albums, Lana
                    Del Rey has established herself as a unique and influential figure in
                    the music industry, earning a dedicated fan base and numerous
                    accolades.
                </p>
            );
        },
    },
    {
        title: "Test title 5",
        description: "Test description 5",
        text: "Test text 5",
        url: "https://ui.aceternity.com/templates",
        content: () => {
            return (
                <p>
                    Lana Del Rey, an iconic American singer-songwriter, is celebrated for
                    her melancholic and cinematic music style. Born Elizabeth Woolridge
                    Grant in New York City, she has captivated audiences worldwide with
                    her haunting voice and introspective lyrics. <br /> <br /> Her songs
                    often explore themes of tragic romance, glamour, and melancholia,
                    drawing inspiration from both contemporary and vintage pop culture.
                    With a career that has seen numerous critically acclaimed albums, Lana
                    Del Rey has established herself as a unique and influential figure in
                    the music industry, earning a dedicated fan base and numerous
                    accolades.
                </p>
            );
        },
    },
    {
        title: "Test title 6",
        description: "Test description 6",
        text: "Test text 6",
        url: "https://ui.aceternity.com/templates",
        content: () => {
            return (
                <p>
                    Lana Del Rey, an iconic American singer-songwriter, is celebrated for
                    her melancholic and cinematic music style. Born Elizabeth Woolridge
                    Grant in New York City, she has captivated audiences worldwide with
                    her haunting voice and introspective lyrics. <br /> <br /> Her songs
                    often explore themes of tragic romance, glamour, and melancholia,
                    drawing inspiration from both contemporary and vintage pop culture.
                    With a career that has seen numerous critically acclaimed albums, Lana
                    Del Rey has established herself as a unique and influential figure in
                    the music industry, earning a dedicated fan base and numerous
                    accolades.
                </p>
            );
        },
    },
    {
        title: "Test title 7",
        description: "Test description 7",
        text: "Test text 7",
        url: "https://ui.aceternity.com/templates",
        content: () => {
            return (
                <p>
                    Lana Del Rey, an iconic American singer-songwriter, is celebrated for
                    her melancholic and cinematic music style. Born Elizabeth Woolridge
                    Grant in New York City, she has captivated audiences worldwide with
                    her haunting voice and introspective lyrics. <br /> <br /> Her songs
                    often explore themes of tragic romance, glamour, and melancholia,
                    drawing inspiration from both contemporary and vintage pop culture.
                    With a career that has seen numerous critically acclaimed albums, Lana
                    Del Rey has established herself as a unique and influential figure in
                    the music industry, earning a dedicated fan base and numerous
                    accolades.
                </p>
            );
        },
    },
    {
        title: "Test title 8",
        description: "Test description 8",
        text: "Test text 8",
        url: "https://ui.aceternity.com/templates",
        content: () => {
            return (
                <p>
                    Lana Del Rey, an iconic American singer-songwriter, is celebrated for
                    her melancholic and cinematic music style. Born Elizabeth Woolridge
                    Grant in New York City, she has captivated audiences worldwide with
                    her haunting voice and introspective lyrics. <br /> <br /> Her songs
                    often explore themes of tragic romance, glamour, and melancholia,
                    drawing inspiration from both contemporary and vintage pop culture.
                    With a career that has seen numerous critically acclaimed albums, Lana
                    Del Rey has established herself as a unique and influential figure in
                    the music industry, earning a dedicated fan base and numerous
                    accolades.
                </p>
            );
        },
    },
    {
        title: "Test title 9 ",
        description: "Test description 9",
        text: "Test text 9",
        url: "https://ui.aceternity.com/templates",
        content: () => {
            return (
                <p>
                    Lana Del Rey, an iconic American singer-songwriter, is celebrated for
                    her melancholic and cinematic music style. Born Elizabeth Woolridge
                    Grant in New York City, she has captivated audiences worldwide with
                    her haunting voice and introspective lyrics. <br /> <br /> Her songs
                    often explore themes of tragic romance, glamour, and melancholia,
                    drawing inspiration from both contemporary and vintage pop culture.
                    With a career that has seen numerous critically acclaimed albums, Lana
                    Del Rey has established herself as a unique and influential figure in
                    the music industry, earning a dedicated fan base and numerous
                    accolades.
                </p>
            );
        },
    },
];
