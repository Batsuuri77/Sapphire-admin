import mongoose from "mongoose";

export interface AdminRole {
  enum: "super_admin" | "merchant_admin";
  default: "merchant_admin";
}

const AdminSchema = new mongoose.Schema(
  {
    profileImage: { type: [String] },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, unique: true },
    userName: { type: String, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    mobileNumber: { type: String },
    role: {
      type: String,
      enum: ["super_admin", "merchant_admin"],
      default: "merchant_admin",
    },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    merchants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Merchant" }],
  },
  { timestamps: true }
);

export default mongoose.models.Admin || mongoose.model("Adming", AdminSchema);
export type Admin = mongoose.InferSchemaType<typeof AdminSchema>;
export type AdminDocument = mongoose.Document<Admin>;
export type AdminModel = mongoose.Model<AdminDocument> & {
  findById: (id: string) => Promise<AdminDocument | null>;
  findByEmail: (email: string) => Promise<AdminDocument | null>;
  findByUserName: (userName: string) => Promise<AdminDocument | null>;
  findByPhoneNumber: (phoneNumber: string) => Promise<AdminDocument | null>;
};
