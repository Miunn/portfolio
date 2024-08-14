import {TracingBeam} from "@/components/ui/tracing-beam";
import {TracingBeamFull} from "@/components/ui/tracing-beam-full";
import Image from "next/image";
import {CardDescription, CardTitle} from "@/components/ui/card";

export default function EducationTracing() {
    return (
        <TracingBeamFull className={"relative mx-auto antialiased"}>
            <div className={"space-y-20 ml-6 md:ml-16"}>
                <div className={"flex gap-6 mb-10"}>
                    <Image src={"/images/insa.png"} alt={"INSA Hauts-de-France"} width={100} height={100}
                           className={"object-contain"}/>
                    <div className={"flex flex-col"}>
                        <CardTitle className={"text-lg"}>Master of Engineering - INSA<sup>*</sup> Hauts de
                            France</CardTitle>
                        <CardDescription>September 2022 - Now</CardDescription>
                        <p>Computer Science & Cybersecurity specialized course</p>
                    </div>
                </div>
                <div className={"flex gap-6 mb-10"}>
                    <Image src={"/images/insa.png"} alt={"INSA Hauts-de-France"} width={100} height={100}
                           className={"object-contain"}/>
                    <div className={"flex flex-col"}>
                        <CardTitle className={"text-lg"}>Intensive courses - INSA<sup>*</sup> Hauts de
                            France</CardTitle>
                        <CardDescription>September 2020 - July 2022</CardDescription>
                        <p>Two years of intensive courses in Physics and Mathematics</p>
                    </div>
                </div>
                <div className={"flex gap-6 mb-10"}>
                    <Image src={"/images/watteau.png"} alt={"Watteau secondary school"} width={100} height={100}
                           className={"object-contain"}/>
                    <div className={"flex flex-col"}>
                        <CardTitle className={"text-lg"}>Antoine Watteau high school</CardTitle>
                        <CardDescription>September 2017 - July 2020</CardDescription>
                        <p>A-Level, High school diploma with high distinctions specialized in Mathematics</p>
                    </div>
                </div>

                <p>* National institute of applied sciences</p>
            </div>
        </TracingBeamFull>
    )
}
