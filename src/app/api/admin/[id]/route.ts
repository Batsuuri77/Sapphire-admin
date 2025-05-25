import { connectToDatabase } from "@/lib/db";
import Admin from "@/models/Users/Admin";
import { adminSignupSchema } from "@/lib/validations/admin";
import { NextResponse } from "next/server";

// GET by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  const admin = await Admin.findById(params.id);
  if (!admin) {
    return NextResponse.json({ message: "Admin not found" }, { status: 404 });
  }
  return NextResponse.json(admin);
}

// UPDATE
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  const body = await req.json();
  const parsed = adminSignupSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
  }

  const updatedAdmin = await Admin.findByIdAndUpdate(params.id, body, {
    new: true,
    runValidators: true,
  });

  return NextResponse.json(updatedAdmin);
}

// DELETE
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  await Admin.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Admin deleted" });
}
