import { z } from "zod"

export const CREATE_RESOURCE_FORM_SCHEMA = z.object({
    title: z.string().min(2).max(100),
    description: z.string().min(2).max(100),
    text: z.string().min(2),
    url: z.string().min(2).max(100),
    tags: z.string().min(2).max(100).array().optional()
})
