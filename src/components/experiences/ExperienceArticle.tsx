import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

export interface ExperienceArticleProps {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
}

export default function ExperienceArticle({ title, company, startDate, endDate, description }: ExperienceArticleProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {title} at <span className={"text-green-500"}>{company}</span>
                </CardTitle>
                <CardDescription>{startDate} - {endDate}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>
                    {description}
                </p>
            </CardContent>
        </Card>
    )
}
