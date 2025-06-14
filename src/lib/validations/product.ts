import { z } from "zod";

export const productSchema = z.object({
  productid: z.string().min(1, "ID is required"),
  productimages: z
    .array(z.string().url("Must be a valid image URL"))
    .optional(),

  productname: z.string().min(1, "Product name is required"),
  productslug: z
    .string()
    .min(1, { message: "Product slug is required" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message:
        "Slug must be lowercase and can only contain letters, numbers, and hyphens",
    }),
  productdescription: z.string().min(1, "Description is required"),

  productstock: z.number().min(0, "Stock cannot be negative"),

  productcity: z.string().min(1, "City is required"),
  productdistrict: z.string().min(1, "District is required"),
  productlatitude: z.string().min(1, "Latitude is required"),
  productlongitude: z.string().min(1, "Longitude is required"),
  productbasePrice: z.number().min(0, "Base price must be >= 0"),

  productoptions: z.object({
    sizes: z
      .array(
        z.object({
          name: z.string().min(1),
          additionalPrice: z.number().optional(),
        })
      )
      .optional(),

    materials: z
      .array(
        z.object({
          name: z.string().min(1),
          additionalPrice: z.number().optional(),
        })
      )
      .optional(),

    frameOptions: z
      .array(
        z.object({
          name: z.string().min(1),
          additionalPrice: z.number().optional(),
        })
      )
      .optional(),
  }),

  ratings: z.number().min(0).max(5).optional(),

  reviews: z
    .array(
      z.object({
        userId: z.string(),
        rating: z.number().min(1).max(5),
        comment: z.string().optional(),
        createdAt: z.date().optional(),
      })
    )
    .optional(),

  categoryid: z.string().min(1, "Category ID is required"),
  subcategoryid: z.string().min(1, "Subcategory ID is required"),

  isActive: z.boolean().optional(),
  isSale: z.boolean().optional(),
  salePrice: z.number().optional(),
  discount: z.number().min(0).max(100).optional(),
});
