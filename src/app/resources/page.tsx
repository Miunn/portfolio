import { isAuthenticated } from "@/actions/auth";
import { getResources, getTags } from "@/actions/resources";
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
    const tags = (await getTags()).map((tag) => ({ value: tag.value!, label: tag.label! }));
    const isAuth = await isAuthenticated();

    return (
        <>
            <GridPattern
                className={cn(
                    "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
                    "inset-x-[20%] inset-y-[-15%] skew-y-12",
                )}
            />
            <div className="relative w-full max-w-6xl mx-auto overflow-hidden mb-52">
                <div className="mt-52 mb-32 flex justify-between items-start">
                    <div>
                        <h1 className="tracking-wide text-2xl">
                            {resources.length > 0 ? <NumberTicker value={resources.length} /> : 0} Resource{resources.length == 1 ? "" : "s"}
                        </h1>
                        <p>Latest news about cybersecurity</p>
                    </div>
                    {isAuth
                        ? <CreateResourceDialog tags={tags} />
                        : null
                    }
                </div>

                <ResourcesExpandableLayout resources={resources as unknown as ResourceCardType[]} tags={tags} />
            </div>
        </>
    )
}