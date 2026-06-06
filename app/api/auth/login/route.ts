import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import { createToken } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const client = await clientPromise;
  const db = client.db();

  const admin = await db.collection("admins").findOne({ email });

  if (!admin) {
    return NextResponse.json(
      { message: "Invalid login" },
      { status: 401 }
    );
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    return NextResponse.json(
      { message: "Invalid login" },
      { status: 401 }
    );
  }

  const token = createToken({
    email: admin.email,
    role: admin.role,
  });

  const response = NextResponse.json({ message: "Logged in" });

  response.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}