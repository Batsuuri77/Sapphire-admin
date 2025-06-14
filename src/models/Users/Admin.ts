import mongoose from "mongoose";

export interface AdminRole {
  enum: "super_admin" | "admin";
  default: "admin";
}

const AdminSchema = new mongoose.Schema(
  {
    profilePic: {
      type: [String],
      error: "Profile picture is optional but should be an array of strings.",
    },
    adminId: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String, unique: true, error: "Username must be unique." },
    email: {
      type: String,
      unique: true,
      required: true,
      error: "Email is required.",
    },
    password: { type: String, required: true, error: "Password is required." },
    phoneNumber: { type: String },
    mobileNumber: { type: String },
    fullAddress: { type: String },
    country: { type: String },
    state: { type: String },
    city: { type: String },
    strAddress: { type: String },
    zipCode: { type: String },
    role: {
      type: String,
      enum: ["super_admin", "admin"],
      default: "admin",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Admin ||
  mongoose.model("Admin", AdminSchema, "admins");
export type Admin = mongoose.InferSchemaType<typeof AdminSchema>;
export type AdminDocument = mongoose.Document<Admin>;
export type AdminModel = mongoose.Model<AdminDocument> & {
  findById: (id: string) => Promise<AdminDocument | null>;
  findByEmail: (email: string) => Promise<AdminDocument | null>;
  findByUserName: (userName: string) => Promise<AdminDocument | null>;
  findByPhoneNumber: (phoneNumber: string) => Promise<AdminDocument | null>;
};
