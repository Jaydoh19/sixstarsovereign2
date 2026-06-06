import Image from "next/image";
import { getMedia } from "@/lib/get-media";
import FadeIn from "@/components/fade-in";
export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const media = await getMedia();

  const groupedMedia: Record<string, typeof media> = {};

  media.forEach((item) => {
    const section = item.sectionTitle || "Uncategorized";

    if (!groupedMedia[section]) {
      groupedMedia[section] = [];
    }

    groupedMedia[section].push(item);
  });

  return (
    <main className="bg-black text-white">
      <section className="relative flex min-h-[45vh] items-center justify-center overflow-hidden px-4 py-24 text-center sm:px-6 md:px-8">
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 mx-auto max-w-4xl">
          <h1 className="text-4xl font-extrabold uppercase sm:text-5xl md:text-6xl lg:text-7xl">
            Gallery
          </h1>

          <p className="mt-6 text-base leading-relaxed text-zinc-300 sm:text-lg md:text-xl">
            Explore highlights from our meets, cruises, and featured builds.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-400 px-4 pb-24 sm:px-6 md:px-8">
        {media.length === 0 ? (
          <p className="text-center text-zinc-400">
            No gallery media has been uploaded yet.
          </p>
        ) : (
          <div className="flex flex-col gap-20">
            {Object.entries(groupedMedia).map(([sectionTitle, items]) => (
              <FadeIn key={sectionTitle}>
                <div>
                  <div className="mb-6 flex flex-col gap-2">
                    <h2 className="text-3xl font-extrabold uppercase md:text-5xl">
                      {sectionTitle}
                    </h2>

                    <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                      {items.length} photo{items.length === 1 ? "" : "s"}
                    </p>
                  </div>

                  <div className="columns-2 gap-2 md:columns-3 xl:columns-3">
                    {items.map((item) => (
                      <div key={item._id} className="mb-2 break-inside-avoid">
                        <Image
                          src={item.image}
                          alt={item.caption || item.sectionTitle || "Gallery image"}
                          width={1200}
                          height={900}
                          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 33vw"
                          className="h-auto w-full object-contain"
                        />

                        {item.caption && (
                          <p className="mt-2 text-sm text-zinc-400">
                            {item.caption}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}