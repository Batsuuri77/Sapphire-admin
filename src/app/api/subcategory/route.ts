import { connectToDatabase } from "@/lib/db";
import { subCategorySchema } from "@/lib/validations/subCategory";
import SubCategory from "@/models/Category/SubCategory";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const validatedData = subCategorySchema.safeParse(body);
    if (!validatedData.success) {
      console.error(
        "Zod category validation error:",
        validatedData.error.flatten()
      );

      return NextResponse.json(
        { success: false, error: validatedData.error.errors[0].message },
        { status: 400 }
      );
    }

    const {
      _id,
      subCategoryName,
      subCategorySlug,
      subCategoryDescription,
      subCategoryImage,
      categoryId,
    } = validatedData.data;

    const existingSubCategory = await SubCategory.findOne({
      $or: [{ _id, subCategoryName }, { subCategorySlug }],
    });

    if (existingSubCategory) {
      return NextResponse.json(
        {
          success: false,
          error: "Category with this name has already created.",
        },
        { status: 409 }
      );
    }

    const newSubCategory = await SubCategory.create({
      subCategoryName,
      subCategorySlug,
      subCategoryDescription,
      subCategoryImage,
      categoryId,
    });

    console.log("Category has created: ", newSubCategory);

    return NextResponse.json(
      { success: true, data: newSubCategory },
      { status: 201 }
    );
  } catch (err) {
    console.error("Subcategory API ERROR: ", err);
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const subCategories = await SubCategory.find({})
      .populate("categoryId", "categoryName")
      .sort({ createdAt: -1 });
    //console.log("Subcategories fetched: ", subCategories);
    return NextResponse.json(
      { success: true, data: subCategories },
      { status: 200 }
    );
  } catch (err) {
    console.error("Category API GET ERROR: ", err);
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
