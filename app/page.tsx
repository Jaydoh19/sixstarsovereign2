import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/fade-in";

export default function HomePage() {
  return (
    <main className="bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        <Image
          src="/cider-mill.jpg"
          alt="Six Star Sovereigns lineup"
          fill
          priority
          className="object-cover object-[center_80%]"
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center">
          <div className="mx-auto flex max-w-5xl flex-col items-center">
            <FadeIn>
              <h1 className="max-w-4xl text-4xl font-extrabold uppercase leading-none text-white md:text-7xl xl:text-5xl">
                Join our community and help define it.
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-12 max-w-6xl text-md  uppercase leading-loose text-white md:text-2xl">
                Explore a collaborative culture of inclusion, growth, and
                originality, supported by resources that make a difference in
                the car community.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <Link
                href="/about"
                className="mt-10 inline-flex rounded-full bg-white px-3 py-3 text-sm md:px-10 md:py-5 md:text-lg font-bold uppercase text-black transition-all duration-300 hover:scale-105 hover:bg-chart-2 hover:text-white"
              >
                Learn More About Us
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Section 1 */}
      <section
        className="relative overflow-hidden py-48 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/shark.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" />

        <div className="relative z-10 mx-auto flex w-full max-w-450 flex-col items-center justify-between gap-16 px-6 lg:flex-row lg:px-16">
          <FadeIn delay={0.2}>
            <div className="flex w-full justify-center lg:w-[60%]">
              <Image
                src="/images/shark.jpg"
                alt="Blue Subaru"
                width={900}
                height={700}
                  className="h-auto w-[80%] max-w-87.5 object-cover shadow-2xl sm:max-w-112.5 md:max-w-150 lg:w-full lg:max-w-237.5 xl:max-w-275"
                priority
              />
            </div>
          </FadeIn>

          <div className="flex w-full flex-col lg:w-[40%]">
            <FadeIn delay={0.4}>
              <h2 className="text-center text-4xl font-extrabold uppercase leading-none text-white md:text-6xl xl:text-7xl">
                Our Commitment
              </h2>
            </FadeIn>

            <FadeIn delay={0.6}>
              <p className="text-center mt-10 text-md font-bold uppercase leading-relaxed text-white md:text-2xl">
                Welcome to our car community! Whether youre here to share your
                ride, swap tips, or just hang out with fellow enthusiasts, youre
                in the right place.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  );
}
