import { getResources } from "@/actions/resources";
import CreateResourceDialog from "@/components/resources/CreateResourceDialog";
import ResourcesExpandableLayout, { ResourceCardType } from "@/components/ResourcesExpandableLayout";
import GridPattern from "@/components/ui/grid-pattern";
import NumberTicker from "@/components/ui/number-ticker";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Rémi Caulier - Resources',
}

export default async function Resources() {

    const resources = await getResources();

    return (
        <div className="relative w-full max-w-6xl mx-auto overflow-x-hidden mb-52">
            <div className="mt-52 mb-32 flex justify-between items-start">
                <div>
                    <h1 className="tracking-wide text-2xl"><NumberTicker value={resources.length} /> Resource{resources.length == 1 ? "" : "s"}</h1>
                    <p>Latest news about cybersecurity</p>
                </div>
                <CreateResourceDialog />
            </div>
            <GridPattern
                className={cn(
                    "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
                    "inset-x-[30%] inset-y-[-30%] skew-y-12",
                )}
            />

            <ResourcesExpandableLayout resources={resources as unknown as ResourceCardType[]} />
        </div>
    )
}