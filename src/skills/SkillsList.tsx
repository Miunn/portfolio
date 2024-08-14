import IconCloud, {Icon} from "@/components/magicui/icon-cloud";

export default function SkillsList() {
    return (
        <div className={"flex gap-16 flex-col items-center md:flex-row"}>
            <div
                className={"flex h-full w-full max-w-[24rem] items-center justify-center overflow-hidden bg-background"}>
                <IconCloud icons={skills}/>
            </div>

            <ul className="flex-grow grid grid-cols-2 gap-10 md:grid-cols-2 sm:grid-cols-3">
                <li>
                    <h2 className="text-xl">Coding</h2>
                    <ul className={"lg:grid lg:grid-cols-2"}>
                        <li>
                            <h3>C</h3>
                        </li>
                        <li>
                            <h3>C++</h3>
                        </li>
                        <li>
                            <h3>Go</h3>
                        </li>
                        <li>
                            <h3>Java</h3>
                        </li>
                        <li>
                            <h3>PHP</h3>
                        </li>
                        <li>
                            <h3>Python</h3>
                        </li>
                        <li>
                            <h3>Typescript</h3>
                        </li>
                    </ul>
                </li>
                <li>
                    <h2 className="text-xl">Cyber-security</h2>
                    <ul className={"lg:grid lg:grid-cols-2"}>
                        <li>
                            <h3>Burp Suite</h3>
                        </li>
                        <li>
                            <h3>Kali Linux</h3>
                        </li>
                        <li>
                            <h3>Metasploit</h3>
                        </li>
                        <li>
                            <h3>Nmap</h3>
                        </li>
                        <li>
                            <h3>SQLmap</h3>
                        </li>
                        <li>
                            <h3>Volatility</h3>
                        </li>
                        <li>
                            <h3>Wireshark</h3>
                        </li>
                    </ul>
                </li>
                <li>
                    <h2 className={"text-xl"}>Databases</h2>
                    <ul className={"lg:grid lg:grid-cols-2"}>
                        <li>
                            <h3>DynamoDB</h3>
                        </li>
                        <li>
                            <h3>MongoDB</h3>
                        </li>
                        <li>
                            <h3>MySQL</h3>
                        </li>
                    </ul>
                </li>
                <li>
                    <h2 className="text-xl">Desktop</h2>
                    <ul>
                        <li>
                            <h3>Microsoft 365</h3>
                        </li>
                        <li>
                            <h3>Typst</h3>
                        </li>
                    </ul>
                </li>
                <li>
                    <h2 className="text-xl">Languages</h2>
                    <ul>
                        <li>
                            <h3>French</h3>
                        </li>
                        <li>
                            <h3>English</h3>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

const skills: Icon[] = [
    {
        name: "Android studio",
        icon: "/images/android-studio.svg",
        width: 42,
        height: 42,
    },
    {
        name: "Burp Suite",
        icon: "/images/burp.svg",
        width: 42,
        height: 42,
    },
    {
        name: "C",
        icon: "/images/c-original.svg",
        width: 40,
        height: 42,
    },
    {
        name: "C++",
        icon: "/images/c-plusplus.svg",
        width: 38,
        height: 42,
    },
    {
        name: "DynamoDB",
        icon: "/images/dynamodb.png",
        width: 42,
        height: 42,
    },
    {
        name: "Flutter",
        icon: "/images/flutter.svg",
        width: 35,
        height: 42,
    },
    {
        name: "Git",
        icon: "/images/git.svg",
        width: 42,
        height: 42,
    },
    {
        name: "Github",
        icon: "/images/github.svg",
        width: 42,
        height: 42,
    },
    {
        name: "Go",
        icon: "/images/go-logo-white.svg",
        width: 72,
        height: 36,
    },
    {
        name: "Java",
        icon: "/images/java.svg",
        width: 42,
        height: 42,
    },
    {
        name: "Kali Linux",
        icon: "/images/kali-dragon-icon.svg",
        width: 42,
        height: 42,
    },
    {
        name: "Metasploit",
        icon: "/images/metasploit.png",
        width: 42,
        height: 42,
    },
    {
        name: "Microsoft 365",
        icon: "/images/microsoft-365.svg",
        width: 42,
        height: 42
    },
    {
        name: "MongoDB",
        icon: "/images/mongodb.png",
        width: 42,
        height: 42,
    },
    {
        name: "MySQL",
        icon: "/images/mysql.svg",
        width: 42,
        height: 42,
    },
    {
        name: "Nmap",
        icon: "/images/nmap.svg",
        width: 42,
        height: 38,
    },
    {
        name: "PHP",
        icon: "/images/php.svg",
        width: 42,
        height: 42,
    },
    {
        name: "Python",
        icon: "/images/python.svg",
        width: 42,
        height: 42,
    },
    {
        name: "React",
        icon: "/images/react.svg",
        width: 42,
        height: 42,
    },
    {
        name: "SQLmap",
        icon: "/images/sqlmap.png",
        width: 88,
        height: 42,
    },
    {
        name: "Symfony",
        icon: "/images/symfony.png",
        width: 38,
        height: 42,
    },
    {
        name: "Twig",
        icon: "/images/twig.svg",
        width: 42,
        height: 42,
    },
    {
        name: "Typescript",
        icon: "/images/typescript.svg",
        width: 42,
        height: 42,
    },
    {
        name: "Typst",
        icon: "/images/typst.png",
        width: 42,
        height: 42,
    },
    {
        name: "Volatility",
        icon: "/images/volatility.png",
        width: 42,
        height: 42,
    },
    {
        name: "Windows",
        icon: "/images/windows.svg",
        width: 42,
        height: 42,
    },
    {
        name: "Wireshark",
        icon: "/images/wireshark.svg",
        width: 42,
        height: 42,
    },
]
