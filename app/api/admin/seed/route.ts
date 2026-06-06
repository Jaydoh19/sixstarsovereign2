import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";

export async function POST() {
  const client = await clientPromise;
  const db = client.db();

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    return NextResponse.json({ message: "Missing admin credentials" }, { status: 500 });
  }

  const existingAdmin = await db.collection("admins").findOne({ email });

  if (existingAdmin) {
    return NextResponse.json({ message: "Admin already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.collection("admins").insertOne({
    email,
    password: hashedPassword,
    role: "admin",
    createdAt: new Date(),
  });

  return NextResponse.json({ message: "Admin created" });
}