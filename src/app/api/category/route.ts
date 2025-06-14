import { connectToDatabase } from "@/lib/db";
import { categorySchema } from "@/lib/validations/category";
import Category from "@/models/Category/Category";
import { NextResponse } from "next/server";

export async function createCategory(req: Request) {
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

    const { categoryname, categoryslug, categorydescription, categoryimage } =
      validatedData.data;

    const existingCategory = await Category.findOne({
      $or: [
        { categoryname },
        { categoryslug },
        { categorydescription },
        { categoryimage },
      ],
    });

    if (existingCategory) {
      return NextResponse.json(
        {
          success: false,
          error: "Category with this name has already created.",
        },
        { status: 409 }
      );
    }

    const newCategory = await Category.create({
      categoryname,
      categoryslug,
      categorydescription,
      categoryimage,
    });

    console.log("Category has created: ", newCategory);

    return NextResponse.json(
      { success: true, data: newCategory },
      { status: 201 }
    );
  } catch (err) {
    console.error("Category API ERROR: ", err);
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
