import Image from "next/image";
import {CardDescription, CardTitle} from "@/components/ui/card";

export default function EducationTracing() {
    return (
        <div className={"relative mx-auto h-full"}>
            <div className="absolute top-0 bottom-0">
                <svg viewBox="0 0 20 564" width="20" className="block h-full" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M 1 1 V 563" fill="none" stroke="url(#gradient)" strokeWidth="1.25"></path>
                    <defs>
                        <linearGradient id="gradient" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2="564">
                            <stop stopColor="#18CCFC" stop-opacity="0"></stop>
                            <stop stopColor="#18CCFC"></stop>
                            <stop offset="0.325" stopColor="#6344F5"></stop>
                            <stop offset="1" stopColor="#AE48FF" stop-opacity="1"></stop>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
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
        </div>
    )
}
