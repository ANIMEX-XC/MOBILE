import { z } from "zod";

export const loginSchema = z.object({
  userName: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be less than 50 characters"),
  userPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be less than 50 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  userName: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be less than 50 characters"),
  userContact: z
    .string()
    .min(10, "Contact number must be at least 10 characters")
    .max(15, "Contact number must be less than 15 characters"),
  userPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be less than 50 characters"),
  userRole: z.string(),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
