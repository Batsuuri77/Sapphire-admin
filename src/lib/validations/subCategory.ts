import z from "zod";

export const subCategorySchema = z
  .object({
    _id: z.string().optional(),
    editingId: z.string().optional(),
    subCategoryName: z
      .string()
      .min(1, { message: "Subcategory name is required" }),
    subCategorySlug: z
      .string()
      .min(1, { message: "Subcategory slug is required" })
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message:
          "Slug must be lowercase and can only contain letters, numbers, and hyphens",
      }),
    categoryId: z.string().min(1, { message: "Category ID is required" }),
    subCategoryDescription: z
      .string()
      .min(1, { message: "Subcategory description is required" }),
    subCategoryImage: z.string().optional(),
  })
  .strict();
