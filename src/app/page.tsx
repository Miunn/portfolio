import Particles from "@/components/magicui/particles";
import ExperienceGrid from "@/components/experiences/ExperienceGrid";
import ProjectsGrid from "@/components/projects/ProjectsGrid";
import EducationTracing from "@/components/education/EducationTracing";
import SkillsList from "@/skills/SkillsList";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Rémi Caulier',
}

export default function Home() {
    return (
        <>
            <Particles
                className="absolute inset-0"
                quantity={500}
                ease={80}
                color={"#ffffff"}
                refresh
            />
            <main className="max-w-6xl relative w-full overflow-hidden flex min-h-screen flex-col items-center mx-auto px-10">
                <section className={"relative w-full max-w-6xl flex min-h-screen flex-col justify-center"}>
                    <h1 className={"tracking-wide text-2xl"}>Hi, I'm Rémi.</h1>
                    <p>
                        I'm a fifth year cyber-security student from France.<br />
                        I'm pursuing an engineering degree at INSA Hauts-de-France.<br />
                        Passionate about IT and cyber-security, I like to test and harden the security of information
                        systems.
                    </p>
                </section>

                <div className="relative w-full">
                    <Particles
                        className="absolute inset-0 h-full"
                        quantity={150}
                        ease={80}
                        color={"#ffffff"}
                        refresh
                    />
                    <section className={"max-w-6xl mx-auto mb-16"}>
                        <h1 className={"tracking-wide text-2xl mb-8"}>Experiences</h1>

                        <ExperienceGrid />
                    </section>
                </div>
                <section className={"w-full max-w-6xl mb-16"}>
                    <h1 className={"tracking-wide text-2xl mb-8"}>Achievements and leisure activities</h1>

                    <ProjectsGrid />
                </section>
                <section className={"w-full max-w-6xl mb-16"}>
                    <h1 className={"tracking-wide text-2xl mb-8"}>Education</h1>

                    <EducationTracing />
                </section>
                <section className={"w-full max-w-6xl mb-16"}>
                    <h1 className={"tracking-wide text-2xl mb-8"}>Skills</h1>

                    <SkillsList />
                </section>
            </main>
        </>
    );
}
