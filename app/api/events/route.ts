import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
  const client = await clientPromise;
  const db = client.db();

  const events = await db
    .collection("events")
    .find({})
    .sort({ eventDate: 1 })
    .toArray();

  return NextResponse.json(events);
}

export async function POST(req: Request) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const client = await clientPromise;
  const db = client.db();

  const result = await db.collection("events").insertOne({
    title: body.title,
    date: body.date,
    eventDate: new Date(body.eventDate),
    time: body.time,
    location: body.location,
    address: body.address,
    description: body.description,
    image: body.image,
    publicId: body.publicId,
    createdAt: new Date(),
  });

  return NextResponse.json({ insertedId: result.insertedId });
}

export async function PUT(req: Request) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const client = await clientPromise;
  const db = client.db();

  await db.collection("events").updateOne(
    { _id: new ObjectId(body.id) },
    {
      $set: {
        title: body.title,
        date: body.date,
        eventDate: new Date(body.eventDate),
        time: body.time,
        location: body.location,
        address: body.address,
        description: body.description,
        ...(body.image && { image: body.image }),
        ...(body.publicId && { publicId: body.publicId }),
        updatedAt: new Date(),
      },
    },
  );

  return NextResponse.json({ message: "Event updated" });
}

export async function DELETE(req: Request) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();

  const client = await clientPromise;
  const db = client.db();

  const event = await db.collection("events").findOne({
    _id: new ObjectId(id),
  });

  if (event?.publicId) {
    await cloudinary.uploader.destroy(event.publicId);
  }

  await db.collection("events").deleteOne({
    _id: new ObjectId(id),
  });

  return NextResponse.json({ message: "Event deleted" });
}