import { z } from "zod"

export const CREATE_RESOURCE_FORM_SCHEMA = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters long"
    }).max(100, {
        message: "Title must be at most 100 characters long"
    }),
    description: z.string().min(2, {
        message: "Description must be at least 2 characters long"
    }).max(100, {
        message: "Description must be at most 100 characters long"
    }),
    text: z.string().min(2, {
        message: "Content must be at least 2 characters long"
    }),
    url: z.string().min(2, {
        message: "Url must be at least 2 characters long"
    }).max(100, {
        message: "Url must be at most 100 characters long"
    }),
    tags: z.string().min(2, {
        message: "Tag must be at least 2 characters long"
    }).max(100, {
        message: "Tag must be at most 100 characters long"
    }).array().optional()
})
