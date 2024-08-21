import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import AvatarCircles from "@/components/magicui/avatar-circles";

export default function ExperienceGrid() {
    return (
        <div className={"grid grid-cols-1 lg:grid-cols-2 gap-10"}>
            <Card className={"flex flex-col"}>
                <CardHeader>
                    <CardTitle>
                        Fixed term contract at <span className={"text-green-500"}>Elico - Regis Martelet</span>
                    </CardTitle>
                    <CardDescription>July - August 2024</CardDescription>
                </CardHeader>
                <CardContent className={"flex-grow flex"}>
                    <p>
                        Front-end and back-end rebuild of an existing inventory management web application.
                    </p>
                </CardContent>
                <CardFooter>
                    <AvatarCircles avatarUrls={["images/php.svg", "/images/symfony-light.png", "/images/twig.svg", "/images/react.svg"]} />
                </CardFooter>
            </Card>
            <Card className={"flex flex-col"}>
                <CardHeader>
                    <CardTitle>
                        Internship at <span className={"text-green-500"}>Elico - Regis Martelet</span>
                    </CardTitle>
                    <CardDescription>September 2023 - January 2024</CardDescription>
                </CardHeader>
                <CardContent className={"flex-grow flex"}>
                    <p>
                        Development of CRM web application from scratch to meet company needs.
                    </p>
                </CardContent>
                <CardFooter>
                    <AvatarCircles avatarUrls={["images/php.svg", "/images/symfony-light.png", "/images/twig.svg"]} />
                </CardFooter>
            </Card>
            <Card className={"flex flex-col"}>
                <CardHeader>
                    <CardTitle>
                        Internship at <span className={"text-green-500"}>Pandrol - BLONDEL Group</span>
                    </CardTitle>
                    <CardDescription>July - August 2021</CardDescription>
                </CardHeader>
                <CardContent className={"flex-grow flex"}>
                    <p>
                        Development of a native Android application involving Bluetooth communications with sensors to accurately measure rail alignment during automated process.<br/>
                        The project was carried out for the R&D department.
                    </p>
                </CardContent>
                <CardFooter>
                    <AvatarCircles avatarUrls={["images/android-studio.svg", "/images/java.svg"]} />
                </CardFooter>
            </Card>
        </div>
    )
}
