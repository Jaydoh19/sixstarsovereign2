import clientPromise from "@/lib/mongodb";

export async function getMedia() {
  const client = await clientPromise;
  const db = client.db();

  const media = await db
    .collection("media")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return media.map((item) => ({
    _id: item._id.toString(),
    sectionTitle: item.sectionTitle || "Uncategorized",
    caption: item.caption || "",
    category: item.category || "",
    image: item.image,
  }));
}