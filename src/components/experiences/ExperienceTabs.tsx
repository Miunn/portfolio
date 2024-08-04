"use client"

import {useEffect, useState} from "react";
import {Progress} from "@/components/ui/progress";
import ExperienceArticle from "@/components/experiences/ExperienceArticle";

export default function ExperienceTabs() {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [progresses, setProgresses] = useState<number[]>([0, 0, 0]);

    const experiencesArticles = [
        {
            title: "Fixed term contract",
            company: "Elico - Regis Martelet",
            startDate: "September 2023",
            endDate: "Janvier 2024",
            description: "Front-end and back-end rebuild of an existing inventory management web application."
        },
        {
            title: "Internship",
            company: "Elico - Regis Martelet",
            startDate: "September 2023",
            endDate: "Janvier 2024",
            description: "Development of CRM web application from scratch to meet company needs."
        },
        {
            title: "Internship",
            company: "Pandrol - BLONDEL Group",
            startDate: "July",
            endDate: "August 2021",
            description: "Development of a native Android application."
        }
    ];

    const updateProgress = () => {
        setProgresses(progresses.map((value: number, index: number): number => {
            if (index === selectedIndex) {
                return value + 1;
            }
            return value;
        }));

        /*setProgresses((prev: number[]) => {

            return prev.map((value: number, index: number): number => {
                if (index === selectedIndex) {
                    return value + 1;
                }
                return value;
            });
        });*/
    }

    const nextStep = () => {
        setSelectedIndex((selectedIndex + 1) % experiencesArticles.length);
        // Set selected progress to 0
        setProgresses([0, 0, 0])
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
        <div>
            <ExperienceArticle {...experiencesArticles[selectedIndex]} />
            <div className={"flex gap-3 justify-center"}>
                {progresses.map((progress: number, index: number) => (
                    (selectedIndex === index)
                        ? <Progress
                            key={index}
                            className={"duration-300 w-32 h-2"}
                            value={progress}
                        />
                        : <Progress
                            key={index}
                            className={"duration-300 w-2 h-2"}
                            value={100}
                        />
                ))}
            </div>
        </div>
    )
}
