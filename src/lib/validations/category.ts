import z from "zod";

export const categoryShcema = z
  .object({
    id: z.string().min(1, { message: "Category ID is required" }),
    name: z.string().min(1, { message: "Category name is required" }),
    description: z
      .string()
      .min(1, { message: "Category description is required" }),
    parent: z.boolean().optional(),
    subCategory: z.string().min(1, { message: "Subcategory is required" }),
    image: z.string().url("Must be valid URL").optional(),
    icon: z.string().optional(),
    isActive: z.boolean().optional(),
  })
  .strict();
