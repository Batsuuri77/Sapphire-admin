import z from "zod";

export const categorySchema = z
  .object({
    categoryname: z.string().min(1, { message: "Category name is required" }),
    categoryslug: z
      .string()
      .min(1, { message: "Category slug is required" })
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message:
          "Slug must be lowercase and can only contain letters, numbers, and hyphens",
      }),
    categorydescription: z
      .string()
      .min(1, { message: "Category description is required" }),
    categoryimage: z.string().url("Must be valid URL").optional(),
  })
  .strict();
