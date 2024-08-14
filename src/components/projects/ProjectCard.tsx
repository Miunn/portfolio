import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";

export interface ProjectProps {
    title: string;
    description: string;
    icon: string;
    period: string;
}

export default function ProjectCard({title, description, icon, period}: ProjectProps) {
    return (
        <Card>
            <CardHeader className={"flex flex-row gap-6 items-start"}>
                <Image src={icon} alt={title} width={75} height={75}
                       className={"inline-block top-0 object-contain"}/>
                <div className={"flex flex-col space-y-1.5"}>
                    <CardTitle>
                        {title}
                    </CardTitle>
                    <CardDescription>{period}</CardDescription>
                </div>
            </CardHeader>
            <CardContent className={"flex"}>
                <p dangerouslySetInnerHTML={{__html: description}} />
            </CardContent>
        </Card>
    );
}
