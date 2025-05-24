import { connectToDatabase } from "@/lib/mongodb";
import Company from "@/models/User/Company";
import { companySchema } from "@/lib/validations/company";
import { NextResponse } from "next/server";

// GET by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  const company = await Company.findById(params.id);
  if (!company) {
    return NextResponse.json({ message: "Company not found" }, { status: 404 });
  }
  return NextResponse.json(company);
}

// UPDATE
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  const body = await req.json();
  const parsed = companySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
  }

  const updatedCompany = await Company.findByIdAndUpdate(params.id, body, {
    new: true,
    runValidators: true,
  });

  return NextResponse.json(updatedCompany);
}

// DELETE
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectToDatabase();
  await Company.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Company deleted" });
}
