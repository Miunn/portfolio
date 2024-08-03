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
            <h4>{title} at <span>{company}</span></h4>
            <h5>{startDate} - {endDate}</h5>
            <p>{description}</p>
        </div>
    )
}
