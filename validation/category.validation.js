import { z } from 'zod'

export const categoryValidationBodySchema = z.object({
    name : z.string().trim().min(1, "Title is required"),
})