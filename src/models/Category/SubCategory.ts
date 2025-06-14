import mongoose, { Types } from "mongoose";

const SubCategorySchema = new mongoose.Schema(
  {
    subCategoryid: { type: String, required: true, unique: true },
    subCategoryname: { type: String, required: true },
    subCategoryslug: { type: String, required: true, unique: true },
    subCategoryimage: { type: String, required: false },
    subCategorydescription: { type: String, required: true },
    categoryId: {
      type: Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.SubCategorySchema ||
  mongoose.model("SubCategory", SubCategorySchema, "SubCategorys");
export type SubCategory = mongoose.InferSchemaType<typeof SubCategorySchema>;
export type SubCategoryDocument = mongoose.Document<SubCategory>;
export type CategoryModel = mongoose.Model<SubCategoryDocument> & {
  findBySubCategoryId: (
    subCategoryid: string
  ) => Promise<SubCategoryDocument | null>;
  findBySubCategoryName: (
    subCategoryname: string
  ) => Promise<SubCategoryDocument | null>;
  findBySubCategorySlug: (
    subCategoryslug: string
  ) => Promise<SubCategoryDocument | null>;
};
