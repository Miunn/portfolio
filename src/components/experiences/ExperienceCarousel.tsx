"use client"

import {Fragment, useEffect, useState} from "react";
import {Progress} from "@/components/ui/progress";
import ExperienceArticle, {ExperienceArticleProps} from "@/components/experiences/ExperienceArticle";

export default function ExperienceCarousel() {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [progresses, setProgresses] = useState<number[]>([0, 0, 0]);

    const experiencesArticles: ExperienceArticleProps[] = [
        {
            title: "Fixed term contract",
            company: "Elico - Regis Martelet",
            startDate: "September 2023",
            endDate: "January 2024",
            description: "Front-end and back-end rebuild of an existing inventory management web application.",
            innerCirclesImgPaths: ["/images/symfony.svg", "/images/react.svg"],
            outerCirclesImgPaths: ["/images/php.svg", "/images/twig.svg"],
        },
        {
            title: "Internship",
            company: "Elico - Regis Martelet",
            startDate: "September 2023",
            endDate: "January 2024",
            description: "Development of CRM web application from scratch to meet company needs.",
            innerCirclesImgPaths: ["/images/symfony.svg", "/images/php.svg"],
            outerCirclesImgPaths: ["/images/twig.svg"],
        },
        {
            title: "Internship",
            company: "Pandrol - BLONDEL Group",
            startDate: "July",
            endDate: "August 2021",
            description: "Development of a native Android application.",
            innerCirclesImgPaths: ["/images/android-studio.svg", "/images/java.svg"],
        }
    ];

    const updateProgress = () => {
        setProgresses(progresses.map((value: number, index: number): number => {
            if (index === selectedIndex) {
                return value + 1;
            }
            return value;
        }));
    }

    const nextStep = () => {
        setSelectedIndex((prev) => {
            setProgresses(progresses.map((value: number, index: number): number => {
                if (index === (prev + 1) % experiencesArticles.length) {
                    return 0;
                }
                return value;
            }));

            return (prev + 1) % experiencesArticles.length;
        });
    }

    useEffect(() => {
        const interval = setInterval(updateProgress, 40);

        if (progresses[selectedIndex] > 100) {
            clearInterval(interval);
            nextStep();
        }

        return () => {
            clearInterval(interval);
        }
    }, [progresses]);

    return (
        <div className={"h-full w-full"}>
            <ExperienceArticle {...experiencesArticles[selectedIndex]} />
            <div className={"mt-5 flex gap-3 justify-center"}>
                {progresses.map((progress: number, index: number) => (
                    <Fragment key={index}>
                        {(selectedIndex === index)
                            ? <Progress
                                className={"duration-300 w-32 h-2"}
                                value={progress}
                            />
                            : <Progress
                                className={"duration-300 w-2 h-2 cursor-pointer"}
                                value={progress}
                                onClick={() => setSelectedIndex((prev) => {
                                    setProgresses(progresses.map((value: number, progressIndex: number): number => {
                                        if (progressIndex === prev) {
                                            return 100;
                                        }

                                        if (progressIndex === index) {
                                            return 0;
                                        }


                                        return value;
                                    }));

                                    return index;
                                })}
                            />
                        }
                    </Fragment>
                ))}
            </div>
        </div>
    )
}
