import mongoose, { Types } from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, unique: true },
    productImages: { type: [String], required: false },
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    productStock: { type: Number, required: true },
    productCity: { type: String, required: true },
    productDistrict: { type: String, required: true },
    productBasePrice: { type: Number, required: true },

    productOptions: {
      sizes: [
        {
          name: { type: String, required: true },
          additionalPrice: { type: Number, required: false },
        },
      ],
      materials: [
        {
          name: { type: String, required: true },
          additionalPrice: { type: Number, required: false },
        },
      ],
      frameOptions: [
        {
          name: { type: String, required: true },
          additionalPrice: { type: Number, required: false },
        },
      ],
    },

    ratings: { type: Number, default: 0 },

    reviews: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating: { type: Number },
        comment: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    categoryId: {
      type: Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategoryId: {
      type: Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },

    isActive: { type: Boolean, default: true },
    isSale: { type: Boolean, default: false },
    salePrice: { type: Number },
    discount: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.models.ProductSchema ||
  mongoose.model("Product", ProductSchema, "products");
export type Product = mongoose.InferSchemaType<typeof ProductSchema>;
export type ProductDocument = mongoose.Document<Product>;
export type ProductModel = mongoose.Model<ProductDocument> & {
  findById: (id: string) => Promise<ProductDocument | null>;
  findName: (name: string) => Promise<ProductDocument | null>;
  findByParentCategory: (
    parentCategory: string
  ) => Promise<ProductDocument | null>;
  findBySubCategory: (subCategory: string) => Promise<ProductDocument | null>;
  findByPrice: (price: string) => Promise<ProductDocument | null>;
  findByIsActive: (isActive: string) => Promise<ProductDocument | null>;
  findBySale: (isSale: string) => Promise<ProductDocument | null>;
  findByDiscount: (discount: string) => Promise<ProductDocument | null>;
  findByRatings: (ratings: string) => Promise<ProductDocument | null>;
  findByCity: (city: string) => Promise<ProductDocument | null>;
  findByDistrict: (district: string) => Promise<ProductDocument | null>;
  findBySize: (size: string) => Promise<ProductDocument | null>;
  findByMaterial: (material: string) => Promise<ProductDocument | null>;
  findByFrameOption: (frameOption: string) => Promise<ProductDocument | null>;
};
