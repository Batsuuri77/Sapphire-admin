import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true },
    categorySlug: { type: String, required: true, unique: true },
    categoryImage: { type: String, required: false, default: "" },
    categoryDescription: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.CategorySchema ||
  mongoose.model("Category", CategorySchema, "Categories");
export type Category = mongoose.InferSchemaType<typeof CategorySchema>;
export type CategoryDocument = mongoose.Document<Category>;
export type CategoryModel = mongoose.Model<CategoryDocument> & {
  findByCategoryName: (
    categoryName: string
  ) => Promise<CategoryDocument | null>;
  findByCategorySlug: (
    categorySlug: string
  ) => Promise<CategoryDocument | null>;
};
