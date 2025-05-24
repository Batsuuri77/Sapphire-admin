import { z } from "zod";

export const adminSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  userName: z.string().min(1, { message: "User name is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  mobileNumber: z.string().optional(),
  role: z.enum(["super_admin", "merchant_admin"], { message: "Invalid role" }),
  company: z.string().optional(),
  merchants: z.array(z.string()).optional(),
  profileImage: z.array(z.string()).optional(),
  zipCode: z.string().min(1, { message: "Zip code is required" }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
