import z from "zod";

export const addComponentSchema = z.object({
  name: z
    .string()
    .min(4, "Name must be at least 4 chars")
    .max(100, "Name can not be greater than 100 chars"),
  description: z
    .string()
    .min(4, "Description must be at least 4 chars")
    .max(500, "Description can not be greater than 500 chars"),
  code: z
    .string()
    .min(1, "Code is required")
    .max(1000, "Code can not be greater than 1000 chars"),
  formattedCode: z
    .string()
    .min(4, "formatted code is required")
    .max(1300, "Formatted code can not be greater than 1300 chars"),
});
