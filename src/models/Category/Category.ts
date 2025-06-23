import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    editingId: { type: String, required: false, default: "" },
    categoryName: { type: String, required: true },
    categorySlug: { type: String, required: true, unique: true },
    categoryImage: { type: String, required: false, default: "" },
    categoryDescription: { type: String, required: true },
  },
  { timestamps: true }
);

const Category =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);
export default Category;
export type Category = mongoose.InferSchemaType<typeof CategorySchema>;
export type CategoryWithId = Category & { _id: string };
export type CategoryDocument = mongoose.Document<Category>;
export type CategoryModel = mongoose.Model<CategoryDocument> & {
  findByCategoryName: (
    categoryName: string
  ) => Promise<CategoryDocument | null>;
  findByCategorySlug: (
    categorySlug: string
  ) => Promise<CategoryDocument | null>;
};
