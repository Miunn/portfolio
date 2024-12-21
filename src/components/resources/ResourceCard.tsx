import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export interface ResourceCardProps {
    title: string;
    description: string;
    text: string;
    url: string;
    tags?: string[];
}

export default function ResourceCard({ title, description, text, url, tags }: ResourceCardProps) {
    return (
        <Card className="bg-background w-72 h-80 flex flex-col z-10">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <p>
                    {text}
                </p>
            </CardContent>
            <CardFooter>
                <p className="space-x-2">
                    {tags?.map((tag, index) => (
                        <span key={index} className="px-2 py-px bg-sky-600 text-foreground rounded-2xl">{tag}</span>
                    ))}
                </p>
            </CardFooter>
        </Card>
    )
}