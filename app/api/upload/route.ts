import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { getAdminSession } from "@/lib/auth";
import type { UploadApiResponse } from "cloudinary";

export async function POST(req: Request) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const result = await new Promise<UploadApiResponse>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "six-star-sovereigns",
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          if (!result) {
            reject(new Error("Cloudinary upload failed"));
            return;
          }

          resolve(result);
        },
      )
      .end(buffer);
  });

  return NextResponse.json({
    imageUrl: result.secure_url,
    publicId: result.public_id,
  });
}
