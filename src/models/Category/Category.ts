import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    parent: { type: Boolean, default: false },
    subCategory: { type: String, required: true },
    image: { type: String, required: false },
    icon: { type: String, required: false },
    isActive: { type: Boolean, default: true },
  },

  { timestamps: true }
);

export default mongoose.models.CategorySchema ||
  mongoose.model("Category", CategorySchema, "Categorys");
export type Category = mongoose.InferSchemaType<typeof CategorySchema>;
export type CategoryDocument = mongoose.Document<Category>;
export type CategoryModel = mongoose.Model<CategoryDocument> & {
  findById: (id: string) => Promise<CategoryDocument | null>;
  findName: (name: string) => Promise<CategoryDocument | null>;
  findByParent: (parent: string) => Promise<CategoryDocument | null>;
  findBySubCategory: (subCategory: string) => Promise<CategoryDocument | null>;
  findByIsActive: (isActive: string) => Promise<CategoryDocument | null>;
};
