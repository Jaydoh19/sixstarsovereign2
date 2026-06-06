import Image from "next/image";
import FadeIn from "@/components/fade-in";
import localFont from "next/font/local";

const drugsther = localFont({
  src: "../fonts/Drugsther.otf",
});

export default function AboutPage() {
  return (
    <main className="flex flex-col justify-center  text-white md:mt-28 mb-20">
      <section className="mx-auto mt-24 w-full max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <FadeIn delay={0.2}>
            <div className="mb-8 flex flex-col items-center justify-center sm:mb-10">
              <h1 className="text-3xl font-extrabold uppercase sm:text-4xl md:text-5xl lg:text-6xl">
                How it Started
              </h1>
              <div className="my-3 h-px w-2/3 bg-white/10 sm:w-1/2" />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mb-10">
              <p className="text-white/40">
                {`"To be the swords of opportunity and cultivate change"`}
              </p>
            </div>
          </FadeIn>
          <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.6fr]">
            <FadeIn
              delay={0.4}
              className="flex justify-center lg:justify-start"
            >
              <p className="max-w-md text-center text-base leading-8 text-zinc-300 sm:text-lg md:text-xl lg:text-left">
                Established in 2025 and built on the principles of Subaru love.
                The Six Star Sovereigns was formed by three Subaru loyalists who
                seek to give back to the community and become more than an
                average car club.
              </p>
            </FadeIn>

            <FadeIn delay={0.6} className="w-full">
              <div className="flex flex-col items-center gap-6">
                <p
                  className={`text-xl
              sm:text-2xl tracking-[0.08em] ${drugsther.className}`}
                >
                  The Founders
                </p>
                <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
                  {[
                    { name: "Mike", src: "/mike.jpg", alt: "Mike" },
                    { name: "Mel", src: "/jamel.webp", alt: "Mel" },
                    { name: "Andrew", src: "/andrew.jpg", alt: "Andrew" },
                  ].map((founder) => (
                    <div
                      key={founder.name}
                      className="flex flex-col items-center"
                    >
                      <div className="aspect-3/4 w-[65%] max-w-55 overflow-hidden sm:w-full sm:max-w-65 md:max-w-75">
                        <Image
                          src={founder.src}
                          alt={founder.alt}
                          width={400}
                          height={500}
                          className="h-full w-full object-cover shadow-xl"
                        />
                      </div>
                      <p className="mt-2 text-lg font-semibold">
                        {founder.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <div className="relative my-8 flex items-center justify-center sm:my-10">
        <div className="absolute h-px w-11/12 bg-white/10 sm:w-3/4" />

        <Image
          src="/logo.png"
          alt="Six Star Sovereigns logo"
          width={120}
          height={120}
          className="relative z-10 h-20 w-20 bg-background object-contain px-2 sm:h-24 sm:w-24 md:h-28 md:w-28"
          priority
        />
      </div>

      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 md:px-8 md:py-12">
        <div className="flex flex-col gap-10 md:gap-12 lg:flex-row lg:gap-16">
          <div className="flex-1">
            <FadeIn delay={0.2}>
              <div className="mb-8 flex flex-col items-center justify-center text-center">
                <h2 className="mb-6 text-3xl font-extrabold uppercase sm:text-4xl md:mb-8 md:text-5xl lg:text-6xl">
                  Our Vision
                </h2>
                <p className="max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg md:text-xl">
                  To build a recognized and respected car community where
                  passion, creativity, and individuality come together creating
                  a space where enthusiasts can connect, grow, and represent
                  something bigger than themselves.
                </p>
                <div className="my-4 h-px w-full bg-white/10" />
              </div>
            </FadeIn>
          </div>

          <div className="flex-1">
            <FadeIn delay={0.4}>
              <div className="mb-8 flex flex-col items-center justify-center text-center">
                <h2 className="mb-6 text-3xl font-extrabold uppercase sm:text-4xl md:mb-8 md:text-5xl lg:text-6xl">
                  Mission
                </h2>
                <p className="max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg md:text-xl">
                  To bring car enthusiasts together through meets, cruises, and
                  shared experiences, while fostering a culture of respect,
                  originality, and unity within the automotive community.
                </p>
                <div className="my-4 h-px w-full bg-white/10" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  );
}
