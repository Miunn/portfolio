"use client"

import {useState} from "react";
import SplashScreen from "@/components/SplashScreen";
import ExperienceCarousel from "@/components/experiences/ExperienceCarousel";

export default function Home() {
    const [loading, setLoading] = useState<boolean>(true);

    return (
        <main className="flex min-h-screen flex-col px-24">
            <section className={"flex min-h-screen flex-col justify-center"}>
                <h1 className={"tracking-wide text-2xl"}>Hi, I'm Remi.</h1>
                <p>
                    I'm a fifth year cyber-security student from France.<br/>
                    I'm pursuing an engineering degree at INSA Hauts-de-France.<br/>
                    Passionate about IT and cyber-security, I like to test and harden the security of information
                    systems.
                </p>
            </section>
            <section className={"flex min-h-screen flex-col justify-center"}>
                <h1 className={"tracking-wide text-2xl"}>Experiences</h1>

                <div className={"max-w-4xl h-96"}>
                    <ExperienceCarousel />
                </div>
            </section>
        </main>
    );
}
