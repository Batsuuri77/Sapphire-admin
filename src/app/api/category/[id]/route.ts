import { connectToDatabase } from "@/lib/db";
import { categorySchema } from "@/lib/validations/category";
import Category from "@/models/Category/Category";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const deletedCategory = await Category.findByIdAndDelete(params.id);
    // console.log("PARAMS:", params);
    if (!deletedCategory) {
      return NextResponse.json(
        { success: false, error: "Category not found." },
        { status: 404 }
      );
    }

    // console.log("Category has deleted: ", deletedCategory);
    return NextResponse.json(
      { success: true, data: deletedCategory },
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

    const validatedData = categorySchema.safeParse(body);
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
      categoryName,
      categorySlug,
      categoryDescription,
      categoryImage,
    } = validatedData.data;

    if (!_id) {
      return NextResponse.json(
        { success: false, error: "Category ID is required." },
        { status: 400 }
      );
    }

    const existing = await Category.findOne({ categorySlug });
    if (existing && existing._id.toString() !== _id) {
      return NextResponse.json(
        { success: false, error: "Slug already exists for another category." },
        { status: 400 }
      );
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      _id,
      {
        categoryName,
        categorySlug,
        categoryDescription,
        categoryImage,
      },
      { new: true }
    );

    if (!updatedCategory) {
      return NextResponse.json(
        { success: false, error: "Category not found." },
        { status: 404 }
      );
    }

    console.log("Category has updated: ", updatedCategory);
    return NextResponse.json(
      { success: true, data: updatedCategory },
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
