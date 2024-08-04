export interface ExperienceArticleProps {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
}

export default function ExperienceArticle({ title, company, startDate, endDate, description }: ExperienceArticleProps) {
    return (
        <div>
            <h4 className={"font-mono mb-1 text-xl"}>{title} at <span className={"text-green-400"}>{company}</span></h4>
            <h5 className={"mb-3"}>{startDate} - {endDate}</h5>
            <p>{description}</p>
        </div>
    )
}
