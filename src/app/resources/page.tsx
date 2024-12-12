import ExpandableCardDemo from "@/components/ResourcesExpandableLayout";
import ResourceCard from "@/components/resources/ResourceCard";
import GridPattern from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Rémi Caulier - Resources',
}

export default function Resources() {
    return (
        <div className="relative w-full max-w-6xl mx-auto overflow-x-hidden">
            <div className="my-52">
                <h1 className="tracking-wide text-2xl">Resources</h1>
                <p>Latest news about cybersecurity</p>
            </div>
            <GridPattern
                className={cn(
                    "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
                    "inset-x-[30%] inset-y-[-30%] skew-y-12",
                )}
            />

            <div className="mb-11">
                <ExpandableCardDemo />
            </div>
        </div>
    )
}