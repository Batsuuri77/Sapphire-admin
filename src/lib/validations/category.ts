import z from "zod";

export const categorySchema = z
  .object({
    categoryName: z.string().min(1, { message: "Category name is required" }),
    categorySlug: z
      .string()
      .min(1, { message: "Category slug is required" })
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message:
          "Slug must be lowercase and can only contain letters, numbers, and hyphens",
      }),
    categoryDescription: z
      .string()
      .min(1, { message: "Category description is required" }),
    categoryImage: z.string().optional(),
  })
  .strict();
