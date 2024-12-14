"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createResource(title: string, description: string, text: string, url: string, tags: { name: string }[]) {

    const resource = await prisma.resource.create({
        data: {
            title: title,
            description: description,
            text: text,
            url: url,
            tags: {
                create: tags
            }
        }
    });

    console.log(resource);

    revalidatePath("/resources");

    return { status: "ok" };
}

export async function getResources() {

    const resources = await prisma.resource.findMany({
        orderBy: [
            {
                createdAt: "desc"
            }
        ],
        take: 20,
        include: {
            tags: {
                select: {
                    name: true
                }
            }
        }
    });

    return resources;
}

export async function getTags() {

    const tags = await prisma.tag.findMany();

    return tags;
}