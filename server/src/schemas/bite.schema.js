import { z } from "zod";

export const createBiteSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  language: z.string({ required_error: "Programming language is required" }),
  code: z.string({ required_error: "Cannot leave empty code snippet" }),
  description: z.string().optional(),
  isPublic: z.boolean().optional(),
});
