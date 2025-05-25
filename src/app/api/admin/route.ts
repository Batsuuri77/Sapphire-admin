// src/app/api/company/route.ts

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Admin from "@/models/Users/Admin";
import { adminSignupSchema } from "@/lib/validations/admin";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    // Validating input data
    const parsed = adminSignupSchema.safeParse(body);
    if (!parsed.success) {
      console.error("Zod validation error:", parsed.error.flatten());

      return NextResponse.json(
        { success: false, error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email, userName, password } = parsed.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingAdmin = await Admin.findOne({
      $or: [{ email }, { userName }, { phoneNumber: body.phoneNumber }],
    });
    if (existingAdmin) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Admin with this email, username or phone number already exists.",
        },
        { status: 409 }
      );
    }

    // Create new admin
    const newAdmin = await Admin.create({
      email,
      userName,
      password: hashedPassword,
    });

    console.log("Admin created:", newAdmin);
    return NextResponse.json(
      { success: true, data: newAdmin },
      { status: 201 }
    );
  } catch (err) {
    console.error("API ERROR:", err);
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
