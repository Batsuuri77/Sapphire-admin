import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    images: { type: [String], required: false },
    parentCategory: { type: String, required: true },
    subCategory: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    city: { type: String, required: true },
    district: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    basePrice: { type: Number, required: true },

    options: {
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
