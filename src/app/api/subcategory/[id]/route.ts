import { connectToDatabase } from "@/lib/db";
import { subCategorySchema } from "@/lib/validations/subCategory";
import SubCategory from "@/models/Category/SubCategory";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const deletedSubCategory = await SubCategory.findByIdAndDelete(params.id);
    // console.log("PARAMS:", params);
    if (!deletedSubCategory) {
      return NextResponse.json(
        { success: false, error: "Subcategory not found." },
        { status: 404 }
      );
    }

    // console.log("Subcategory has deleted: ", deletedSubCategory);
    return NextResponse.json(
      { success: true, data: deletedSubCategory },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE Category Error:", err);
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
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

    if (!_id) {
      return NextResponse.json(
        { success: false, error: "Subcategory ID is required." },
        { status: 400 }
      );
    }

    const existing = await SubCategory.findOne({ subCategorySlug });
    if (existing && existing._id.toString() !== _id) {
      return NextResponse.json(
        {
          success: false,
          error: "Slug already exists for another subcategory.",
        },
        { status: 400 }
      );
    }

    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
      _id,
      {
        subCategoryName,
        subCategorySlug,
        subCategoryDescription,
        subCategoryImage,
        categoryId,
      },
      { new: true }
    );

    if (!updatedSubCategory) {
      return NextResponse.json(
        { success: false, error: "Subcategory not found." },
        { status: 404 }
      );
    }

    console.log("Category has updated: ", updatedSubCategory);
    return NextResponse.json(
      { success: true, data: updatedSubCategory },
      { status: 200 }
    );
  } catch (err) {
    console.error("Category API PUT ERROR: ", err);
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
