import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";

export async function POST() {
  const client = await clientPromise;
  const db = client.db();

  const email = "sixstar_admin@gmail.com";
  const password = "fiPibYa9F6BpjlWI";

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