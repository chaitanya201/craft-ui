import z from "zod";

export const registerSchema = z.object({
  name: z
    .string({
      invalid_type_error: "Name should be string",
      required_error: "Name is required",
    })
    .min(3, "Name should be at least 3 chars long")
    .max(128, "Name should have maximum 128 chars"),
  email: z
    .string({
      invalid_type_error: "Email should be string",
      required_error: "Email is required",
    })
    .email("Invalid Email"),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be string",
    })
    .regex(/^\d{4,}$/, "Invalid password"),
});

export const loginSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Email should be string",
      required_error: "Email is required",
    })
    .email("Invalid Email"),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be string",
    })
    .regex(/^\d{4,}$/, "Invalid password"),
});
