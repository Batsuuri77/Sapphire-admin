// src/app/api/company/route.ts

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Admin from "@/models/User/Admin";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const company = await Company.create(body);
    return NextResponse.json({ success: true, data: company }, { status: 201 });
  } catch (err) {
    console.error("API ERROR:", err);
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
