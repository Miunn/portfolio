"use client"

import { useState } from "react";
import ExpandableCardDemo from "../ResourcesExpandableLayout";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";
import CreateResourceDialog from "./CreateResourceDialog";

export default function SearchResourcesLayout() {
    
    const searchPlaceholders = [
        "CVE-20240781",
        "Microsoft",
        "Linux"
    ]

    const [searchInput, setSearchInput] = useState<string>("");

    return (
        <>
        <div className="mb-20">
            <PlaceholdersAndVanishInput
                placeholders={searchPlaceholders}
                onChange={(changeEvent) => setSearchInput(changeEvent.currentTarget.value)}
                onSubmit={() => { }}
            />
            </div>

            <div className="mb-11">
                <ExpandableCardDemo />
            </div>
        </>
    )
}