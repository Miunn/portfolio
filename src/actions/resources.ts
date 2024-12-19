"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { isAuthenticated } from "./auth";

export async function createResource(title: string, description: string, text: string, url: string, tags: { value: string, label: string }[]) {

    if (!(await isAuthenticated())) {
        return { status: "Unauthorized", message: "You must be logged in to create a new resource" }
    }

    const resource = await prisma.resource.create({
        data: {
            title: title,
            text: text,
            url: url,
            tags: {
                create: tags
            }
        }
    });

    revalidatePath("/resources");

    return { status: "ok" };
}

export async function deleteResource(id: number) {
    
    if (!(await isAuthenticated())) {
        return { status: "Unauthorized", message: "You must be logged in to create a new resource" }
    }

    await prisma.resource.delete({
        where: {
            id: id
        }
    });

    revalidatePath("/resources");

    return { status: "ok" }
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
                    label: true
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