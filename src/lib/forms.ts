import { z } from "zod"

export const LOGIN_FORM_SCHEMA = z.object({
    email: z.string({
        message: "Email is required"
    }).min(1, {
        message: "Login is required"
    }).email({
        message: "Email format is invalid"
    }),
    password: z.string({
        message: "Password is required"
    }).min(1, {
        message: "Password is required"
    })
})

export const CREATE_RESOURCE_FORM_SCHEMA = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters long"
    }).max(100, {
        message: "Title must be at most 100 characters long"
    }),
    description: z.string().max(255, {
        message: "Description must be at most 255 characters long"
    }),
    text: z.string().min(2, {
        message: "Content must be at least 2 characters long"
    }),
    url: z.string().max(250, {
        message: "Url must be at most 250 characters long"
    }),
    tags: z.string().min(2, {
        message: "Tag must be at least 2 characters long"
    }).max(100, {
        message: "Tag must be at most 100 characters long"
    }).array().optional()
})
