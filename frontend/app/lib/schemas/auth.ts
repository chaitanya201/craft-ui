import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Invalid Email",
      required_error: "Email is required",
      message: "Email is required",
    })
    .email("Email is required"),
  password: z
    .string({
      invalid_type_error: "Invalid Password",
      required_error: "Password is required",
      message: "Password is required",
    })
    .min(4, "Password should be at least 6 chars long"),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Name needs at least 3 letters")
    .max(50, "Name can not exceed 50 letters"),
  email: z
    .string({
      invalid_type_error: "Invalid Email",
      required_error: "Email is required",
      message: "Email is required",
    })
    .email("Email is required"),
  password: z
    .string({
      invalid_type_error: "Invalid Password",
      required_error: "Password is required",
      message: "Password is required",
    })
    .min(6, "Password should be at least 6 chars long"),
});
