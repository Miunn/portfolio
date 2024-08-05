import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

export interface ExperienceArticleProps {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
}

export default function ExperienceArticle({title, company, startDate, endDate, description}: ExperienceArticleProps) {
    return (
        <Card className={"h-full flex gap-6"}>
            <div className={"p-6 pr-0 self-center"}>
                Side
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
