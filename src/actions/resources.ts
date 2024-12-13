"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createResource(title: string, description: string, text: string, url: string, tags: string[]) {

    const resource = await prisma.resource.create({
        data: {
            title: title,
            description: description,
            text: text,
            url: url,
            tags: {
                create: tags.map((tag) => (
                    { name: tag }
                ))
            }
        }
    });

    console.log(resource);

    revalidatePath("/resources");
}