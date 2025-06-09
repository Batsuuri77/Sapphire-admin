import { productSchema } from "@/lib/validations/product";
import Product from "@/models/Products/Product";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.errors[0].message },
      { status: 400 }
    );
  }

  const validData = parsed.data;

  const newProduct = await Product.create(validData);

  return NextResponse.json(
    { success: true, data: newProduct },
    { status: 201 }
  );
}
