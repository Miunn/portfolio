import ProjectCard from "@/components/projects/ProjectCard";
import {Fragment} from "react";

export default function ProjectsGrid() {
    return (
        <div className={"w-full space-y-10"}>
            {projects.map((project, index) => (
                <Fragment key={project.title}>
                    <ProjectCard title={project.title} description={project.description} icon={project.icon} period={project.period}/>
                </Fragment>
            ))}
            {/*<div className={"relative min-h-96"}>
                <Card className={"absolute top-0 left-0 z-10 w-2/3"}>
                    <CardHeader>
                        <CardTitle>HebergOS</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                            Web hosting platform to automatically create clusterized servers in a
                            few clicks.
                        </p>
                    </CardContent>
                </Card>
                <div className={"absolute bottom-0 right-0"}>
                    <div className={"relative border rounded-2xl w-fit"}>
                        <Image className={"border rounded-2xl"} src={"/images/hebergos-cover.png"}
                               alt={"HebergOS cover"}
                               width={600}
                               height={400}/>
                        <BorderBeam size={250} duration={12} delay={9} borderWidth={3}/>
                    </div>
                </div>
            </div>
            <div className={"relative min-h-96"}>
                <Card className={"absolute top-0 right-0 z-10 w-2/3"}>
                    <CardHeader>
                        <CardTitle>Ensembll</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                            A car parks management web application. For users to book their parking places and
                            administrators to manage car parks, bookings, users and stats.
                        </p>
                    </CardContent>
                </Card>
                <div className={"absolute bottom-0 left-0"}>
                    <div className={"relative border rounded-2xl w-fit"}>
                        <Image className={"border rounded-2xl"} src={"/images/ensembll-cover.png"}
                               alt={"Ensembll cover"}
                               width={600}
                               height={400}/>
                        <BorderBeam size={250} duration={12} delay={9} borderWidth={3}/>
                    </div>
                </div>
            </div>
            <div className={"relative min-h-96"}>
                <Card className={"absolute top-0 left-0 z-10 w-2/3"}>
                    <CardHeader>
                        <CardTitle>Mastermind</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                            An android mastermind game implementation. Works both in single and multiplayer based on
                            Bluetooth.
                        </p>
                    </CardContent>
                </Card>
                <div className={"absolute bottom-0 right-0"}>
                    <div className={"relative border rounded-2xl w-fit"}>
                        <Image className={"border rounded-2xl"} src={"/images/mastermind-cover.png"}
                               alt={"Mastermind cover"}
                               width={600}
                               height={400}/>
                        <BorderBeam size={250} duration={12} delay={9} borderWidth={3}/>
                    </div>
                </div>
            </div>*/}
        </div>
    )
}

const projects = [
    {
        title: "./insash",
        description: "Co-founder of the INSA Hauts-de-France computer science association. " +
            "The association's goal is to offer somewhere to talk, work and share about IT. " +
            "Together, we built several projects and particapated in different events.",
        icon: "/images/insash.png",
        period: "September 2022 - Present"
    },
    {
        title: "Cross-INSA CTF",
        description: "Participation in the Capture The Flag contest, a cyber-security competition between INSA schools. " +
            "The goal is to solve challenges in different categories such as cryptography, web, reverse engineering, forensic and realistic. " +
            "First 2 teams of each school are qualified for the final.<br/>" +
            "Our team placed 3rd in qualifications and 6th in finals. ",
        icon: "/images/cyber_insa.png",
        period: "February 2024"
    },
    {
        title: "Cod'INSA",
        description: "Cod'INSA is an algorithmic contest between INSA schools. " +
            "The goal during qualifications is to individually solve several algorithmic problems in a limited time and the top 5 qualifies for the final. " +
            "During the final, in group of 5, the goal is to build a bot within 20 hours on a game specially designed for the final. Each bot of each school fights against each other to determine the winner. <br/>" +
            "3 times finalist.",
        icon: "/images/codinsa.png",
        period: "April 2021, April 2022 and April 2023"
    },
    {
        title: "HebergOS",
        description: "Co-Developped with a friend, HebergOS is a software that enables automatic deployment of clustered projects using Docker and Symfony. " +
            "Through the web interface, users can create, manage and deploy their projects in a few clicks. " +
            "They have access to a dashboard to monitor their projects and resources. A terminal is also available to interact with the docker instance.",
        icon: "/images/hebergos.png",
        period: "Built from December 2023 to January 2024"
    },
    {
        title: "Ensembll",
        description: "A car parks management web application. For users to book their parking places and administrators to manage car parks, bookings, users and stats.",
        icon: "/images/ensembll-cover.png",
        period: "Built from November 2022 to August 2023"
    }
]
