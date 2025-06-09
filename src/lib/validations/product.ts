import { z } from "zod";

export const productSchema = z.object({
  id: z.string().min(1, "ID is required"),
  images: z.array(z.string().url("Must be a valid image URL")).optional(),

  parentCategory: z.string().min(1, "Parent category is required"),
  subCategory: z.string().min(1, "Sub category is required"),
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),

  stock: z.number().min(0, "Stock cannot be negative"),

  city: z.string().min(1, "City is required"),
  district: z.string().min(1, "District is required"),
  latitude: z.string().min(1, "Latitude is required"),
  longitude: z.string().min(1, "Longitude is required"),
  basePrice: z.number().min(0, "Base price must be >= 0"),

  options: z.object({
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

  isActive: z.boolean().optional(),
  isSale: z.boolean().optional(),
  salePrice: z.number().optional(),
  discount: z.number().min(0).max(100).optional(),
});
