import mongoose, { Types } from "mongoose";

const SubCategorySchema = new mongoose.Schema(
  {
    editingId: { type: String, required: false },
    subCategoryName: { type: String, required: true },
    subCategorySlug: { type: String, required: true, unique: true },
    subCategoryImage: { type: String, required: false },
    subCategoryDescription: { type: String, required: true },
    categoryId: {
      type: Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

const SubCategory =
  mongoose.models.SubCategory ||
  mongoose.model("SubCategory", SubCategorySchema);

export default SubCategory;
export type SubCategory = mongoose.InferSchemaType<typeof SubCategorySchema>;
export type SubCategoryWithId = SubCategory & {
  _id: string;
  categoryId: {
    _id: string;
    categoryName: string;
  };
};
export type SubCategoryDocument = mongoose.Document<SubCategory>;
export type SubCategoryModel = mongoose.Model<SubCategoryDocument> & {
  findBySubCategoryName: (
    subCategoryname: string
  ) => Promise<SubCategoryDocument | null>;
  findBySubCategorySlug: (
    subCategoryslug: string
  ) => Promise<SubCategoryDocument | null>;
};
