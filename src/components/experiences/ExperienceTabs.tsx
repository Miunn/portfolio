"use client"

import {useEffect, useRef, useState} from "react";
import {Progress} from "@/components/ui/progress";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

export default function ExperienceTabs() {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);
    const requestId = useRef(0);

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
        setProgress((prev) => {
            if ((prev + 1) > 100) {
                console.log("Next step");
                nextStep();
            }
            return (prev + .1);
        });
    }

    const nextStep = () => {
        console.log("Next step from", selectedIndex, "to", (selectedIndex + 1) % experiencesArticles.length);
        setSelectedIndex((selectedIndex + 1) % experiencesArticles.length);
        // Set selected progress to 0
        setProgress(0);
    }

    useEffect(() => {
        const interval = setInterval(updateProgress, 20);

        if (progress > 100) {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        }
    }, [progress]);

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>
                        {experiencesArticles[selectedIndex].title} at <span className={"text-green-500"}>{experiencesArticles[selectedIndex].company}</span>
                    </CardTitle>
                    <CardDescription>{experiencesArticles[selectedIndex].startDate} - {experiencesArticles[selectedIndex].endDate}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>
                        {experiencesArticles[selectedIndex].description}
                    </p>
                </CardContent>
            </Card>
            <Progress value={progress} />
        </div>
    )
}
