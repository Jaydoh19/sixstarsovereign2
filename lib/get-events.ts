// lib/get-events.ts
import clientPromise from "@/lib/mongodb";

export async function getEvents() {
  const client = await clientPromise;
  const db = client.db();

  const events = await db
    .collection("events")
    .find({})
    .sort({ eventDate: 1 })
    .toArray();

  return events.map((event) => ({
    _id: event._id.toString(),
    title: event.title,
    date: event.date,
    time: event.time,
    location: event.location,
    address: event.address,
    description: event.description,
    image: event.image,
  }));
}