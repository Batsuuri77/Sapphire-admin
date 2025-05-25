import { z } from "zod";

export const adminSchema = z.object({
  profilePic: z.array(z.string()).optional(),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  userName: z.string().min(1, { message: "User name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  mobileNumber: z.string().optional(),
  fullAddress: z.string().min(1, { message: "Full address is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  state: z.string().min(1, { message: "State is required" }),
  city: z.string().min(1, { message: "City is required" }),
  strAddress: z.string().min(1, { message: "Street address is required" }),
  zipCode: z.string().min(1, { message: "Zip code is required" }),
  role: z.enum(["super_admin", "admin"], { message: "Invalid role" }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const adminSignupSchema = z
  .object({
    email: z.string().email({ message: "Invalid email" }),
    userName: z.string().min(1, { message: "Username is required" }),
    password: z.string().min(8, { message: "Minimum 8 characters" }),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
