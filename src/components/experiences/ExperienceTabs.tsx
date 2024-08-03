"use client"

import {useState} from "react";
import ExperienceArticle from "@/components/experiences/ExperienceArticle";

export default function ExperienceTabs() {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const experiences = [
        <ExperienceArticle
            title={"Internship"}
            company={"Elico - Regis Martelet"}
            startDate={"September 2023"}
            endDate={"Janvier 2024"}
            description={"Development of CRM web application from scratch to meet company needs."}
        />,
        <ExperienceArticle
            title={"Internship"}
            company={"Pandrol - BLONDEL Group"}
            startDate={"July"}
            endDate={"August 2021"}
            description={"Development of a native Android application."}
        />
    ]

    return (
        <div>
            <ul>
                <li onClick={() => setSelectedIndex(0)}>Elico</li>
                <li onClick={() => setSelectedIndex(1)}>Pandrol</li>
                <li onClick={() => setSelectedIndex(2)}>Blondel</li>
            </ul>
            {experiences[selectedIndex]}
        </div>
    )
}
