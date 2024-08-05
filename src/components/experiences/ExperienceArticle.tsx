import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import OrbitingCircles from "@/components/magicui/orbiting-circles";
import Image from 'next/image';

export interface ExperienceArticleProps {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
}

export default function ExperienceArticle({title, company, startDate, endDate, description}: ExperienceArticleProps) {
    return (
        <Card className={"h-full grid gap-x-6"} style={{gridTemplateColumns: "1fr 2fr"}}>
            <div className={"relative flex h-full w-full flex-col items-center justify-center overflow-hidden"}>
                <OrbitingCircles
                    className="size-[30px] border-none bg-transparent"
                    duration={20}
                    delay={20}
                    radius={60}
                >
                    <Image
                        src={"/images/symfony.svg"}
                        height={30}
                        width={30}
                        alt={"Symfony logo"}
                    />
                </OrbitingCircles>
                <OrbitingCircles
                    className="size-[30px] border-none bg-transparent"
                    duration={20}
                    delay={10}
                    radius={60}
                >
                    <Image
                        src={"/images/react.svg"}
                        height={30}
                        width={30}
                        alt={"React logo"}
                    />
                </OrbitingCircles>
                <OrbitingCircles
                    className="size-[30px] border-none bg-transparent"
                    duration={20}
                    delay={20}
                    radius={120}
                    reverse
                >
                    <Image
                        src={"/images/twig.svg"}
                        height={30}
                        width={30}
                        alt={"Symfony logo"}
                    />
                </OrbitingCircles>
                <OrbitingCircles
                    className="size-[30px] border-none bg-transparent"
                    duration={20}
                    delay={10}
                    radius={120}
                    reverse
                >
                    <Image
                        src={"/images/php.svg"}
                        height={30}
                        width={30}
                        alt={"React logo"}
                    />
                </OrbitingCircles>
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
