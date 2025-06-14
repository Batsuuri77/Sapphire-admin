import z from "zod";

export const subCategorySchema = z
  .object({
    subcategoryname: z
      .string()
      .min(1, { message: "Subcategory name is required" }),
    subcategoryslug: z
      .string()
      .min(1, { message: "Subcategory slug is required" })
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message:
          "Slug must be lowercase and can only contain letters, numbers, and hyphens",
      }),
    categoryid: z.string().min(1, { message: "Category ID is required" }),
    subcategorydescription: z
      .string()
      .min(1, { message: "Subcategory description is required" }),
    subcategoryimage: z.string().url("Must be valid URL").optional(),
  })
  .strict();
