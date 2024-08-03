"use client"

import {useState} from "react";
import SplashScreen from "@/components/SplashScreen";

export default function Home() {
    const [loading, setLoading] = useState<boolean>(true);

    return (
        <main className="flex min-h-screen flex-col p-24">
            <section>
                <h1 className={"tracking-wide text-2xl"}>Hi, I'm Remi.</h1>
                <p>
                    I'm a fifth year cyber-security student from France.<br/>
                    I'm pursuing an engineering degree at INSA Hauts-de-France.<br/>
                    Passionate about IT and cyber-security, I like to test and harden the security of information
                    systems.
                </p>
            </section>
            <section>
                <h1 className={"tracking-wide text-2xl"}>Experiences</h1>
            </section>
        </main>
    );
}
