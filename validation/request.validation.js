import { z } from "zod";

export const signUpPostValidationBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(3),
});


export const loginPostValidationBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});