import { z } from "zod";

export const todoValidationBodySchema = z.object({
    title : z.string().trim().min(1, "Title is required"),
    description : z.string().nullable().optional(),
    completed : z.boolean().default(false),
})