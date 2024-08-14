"use client";

import {useEffect, useMemo, useState} from "react";
import {useTheme} from "next-themes";
import {Cloud, fetchSimpleIcons, ICloud, renderSimpleIcon, SimpleIcon,} from "react-icon-cloud";

export const cloudProps: Omit<ICloud, "children"> = {
    containerProps: {
        style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            paddingTop: 40,
        },
    },
    options: {
        reverse: true,
        depth: 1,
        wheelZoom: false,
        imageScale: 2,
        activeCursor: "default",
        tooltip: "native",
        initial: [0.1, -0.1],
        clickToFront: 500,
        tooltipDelay: 0,
        outlineColour: "#0000",
        maxSpeed: 0.03,
        minSpeed: 0.02,
        dragControl: false,
    },
};

export type Icon = {
    name: string;
    icon: string;
    width: number;
    height: number;
};

export const renderCustomIcon = (icon: SimpleIcon, theme: string) => {
    const bgHex = theme === "light" ? "#f3f2ef" : "#080510";
    const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff";
    const minContrastRatio = theme === "dark" ? 2 : 1.2;

    return renderSimpleIcon({
        icon,
        bgHex,
        fallbackHex,
        minContrastRatio,
        size: 42,
        aProps: {
            href: undefined,
            target: undefined,
            rel: undefined,
            onClick: (e: any) => e.preventDefault(),
        },
    });
};

const addHash = (color: string) => color[0] === '#' ? color : `#${color}`

const s = () =>
    Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)

export const guid = () => `${s()}${s()}-${s()}-${s()}-${s()}-${s()}${s()}${s()}`

export const renderCustomImage = (icon: Icon, isPng: boolean, theme: string) => {
    const imgSrc = icon.icon;

    const a = {
        key: guid(),
        title: "icon.name",
        style: {cursor: 'pointer'},
    }

    const i = {
        height: icon.height,
        width: icon.width,
        alt: icon.name,
        src: imgSrc,
    }

    return (
        <a {...a}>
            <img {...i} />
        </a>
    )
}

export type DynamicCloudProps = {
    iconSlugs?: string[];
    icons: Icon[];
};

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>;

export default function IconCloud({iconSlugs, icons}: DynamicCloudProps) {
    const [data, setData] = useState<IconData | null>(null);
    const {theme} = useTheme();

    useEffect(() => {
        fetchSimpleIcons({slugs: iconSlugs ?? []}).then(setData);
    }, [iconSlugs]);

    const renderedIcons = useMemo(() => {
        if (!data) return null;

        return Object.values(data.simpleIcons).map((icon) =>
            renderCustomIcon(icon, theme || "dark"),
        );
    }, [data, theme]);

    const renderedImgs = useMemo(() => {
        if (!icons) return null;

        return icons.map((icon) => {
            return renderCustomImage(icon, true, theme || "light");
        });
    }, [theme, icons]);

    return (
        // @ts-ignore
        <Cloud {...cloudProps}>
            {renderedIcons}
            {renderedImgs}
        </Cloud>
    );
}
