import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
  const client = await clientPromise;
  const db = client.db();

  const media = await db
    .collection("media")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return NextResponse.json(media);
}

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const client = await clientPromise;
  const db = client.db();

  const result = await db.collection("media").insertOne({
    sectionTitle: body.sectionTitle,
    caption: body.caption,
    category: body.category,
    image: body.image,
    publicId: body.publicId,
    createdAt: new Date(),
  });

  return NextResponse.json({ insertedId: result.insertedId });
}

export async function PUT(req: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const client = await clientPromise;
  const db = client.db();

  await db.collection("media").updateOne(
    { _id: new ObjectId(body.id) },
    {
      $set: {
        sectionTitle: body.sectionTitle,
        caption: body.caption,
        category: body.category,
        updatedAt: new Date(),
      },
    }
  );

  return NextResponse.json({ message: "Media updated" });
}

export async function DELETE(req: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id, sectionTitle } = await req.json();
  const client = await clientPromise;
  const db = client.db();

  if (sectionTitle) {
    const items = await db.collection("media").find({ sectionTitle }).toArray();

    await Promise.all(
      items
        .filter((item) => item.publicId)
        .map((item) => cloudinary.uploader.destroy(item.publicId))
    );

    await db.collection("media").deleteMany({ sectionTitle });

    return NextResponse.json({ message: "Section deleted" });
  }

  if (id) {
    const item = await db.collection("media").findOne({ _id: new ObjectId(id) });

    if (item?.publicId) {
      await cloudinary.uploader.destroy(item.publicId);
    }

    await db.collection("media").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ message: "Media deleted" });
  }

  return NextResponse.json({ message: "Missing id or sectionTitle" }, { status: 400 });
}