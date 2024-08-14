import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import OrbitingCircles from "@/components/magicui/orbiting-circles";
import Image from 'next/image';

export interface ExperienceArticleProps {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
    innerCirclesImgPaths?: string[];
    outerCirclesImgPaths?: string[];
}

export default function ExperienceArticle({title, company, startDate, endDate, description, innerCirclesImgPaths, outerCirclesImgPaths}: ExperienceArticleProps) {
    return (
        <Card className={"h-full grid gap-x-6"} style={{gridTemplateColumns: "1fr 2fr"}}>
            <div className={"relative flex h-full w-full flex-col items-center justify-center overflow-hidden"}>
                {innerCirclesImgPaths?.map((path, index) => (
                    <OrbitingCircles
                        key={index}
                        className="size-[30px] border-none bg-transparent"
                        duration={20}
                        delay={10*index}
                        radius={60}
                    >
                        <Image
                            src={path}
                            height={30}
                            width={30}
                            alt={"Logo"}
                        />
                    </OrbitingCircles>
                ))}
                {outerCirclesImgPaths?.map((path, index) => (
                    <OrbitingCircles
                        key={index}
                        className="size-[30px] border-none bg-transparent"
                        duration={20}
                        delay={10*index}
                        radius={120}
                        reverse
                    >
                        <Image
                            src={path}
                            height={30}
                            width={30}
                            alt={"Logo"}
                        />
                    </OrbitingCircles>
                ))}
            </div>
            <div>
                <CardHeader>
                    <CardTitle>
                        {title} at <span className={"text-green-500"}>{company}</span>
                    </CardTitle>
                    <CardDescription>{startDate} - {endDate}</CardDescription>
                </CardHeader>
                <CardContent className={"flex"}>
                    <p>
                        {description}
                    </p>
                </CardContent>
            </div>
        </Card>
    )
}
