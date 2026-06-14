import Image from "next/image";
import { Instagram } from "lucide-react";
import Link from "next/link";

const leadership = [
  {
    id: 1,
    name: "Jamel",
    role: "President / Community Lead",
    description:
      "Focused on building the culture and direction behind Six Star Sovereigns while bringing enthusiasts together.",
    instagram: "https://www.instagram.com/rx_kururugi/",
    instahandle: "@rx_kururugi",
  },
  {
    id: 2,
    name: "Mike",
    role: "Vice President / Event Coordinator",
    description:
      "Helps organize meets, cruises, and community events while supporting the vision of the group.",
    instagram: "https://www.instagram.com/f3isti/",
    instahandle: "@f3isti",
  },
  {
    id: 3,
    name: "Andrew",
    role: "Vice President / Operations",
    description:
      "Supports community growth and helps maintain the organization behind Six Star Sovereigns.",
    instagram: "https://www.instagram.com/andrewdubois_3/",
    instahandle: "@andrewdubois_3",
  },
  {
    id: 4,
    name: "Sam",
    role: "Treasurer",
    description:
      "Manages the financial aspects of the organization and supports community growth.",
      instagram: "https://www.instagram.com/flipflopqueen93/",
    instahandle: "@flipflopqueen93",
  },
];

const mediaTeam = [
  {
    id: 1,
    name: "Bri",
    role: "Media Team",
    description:
      "Focused on creative edits and media production like banners and social posts.",
    instagram: "https://www.instagram.com/itsbuchi.png/",
    instahandle: "@itsbuchi.png",
  },
  {
    id: 2,
    name: "Bryan",
    role: "Media Team",
    description:
      "Captures cinematic moments and visual storytelling for the community and helps with media creation.",
    instagram: "https://www.instagram.com/x_nam3less_x/",
    instahandle: "@x_nam3less_x",
  },
  {
    id: 3,
    name: "Jayden",
    role: "Web Developer / Media",
    description:
      "Develops the website and contributes to media and branding for Six Star Sovereigns.",
    instagram: "https://www.instagram.com/jay.blunt19/",
    instahandle: "@jay.blunt19",
  },
];

export default function ContactPage() {
  return (
    <main className="relative overflow-hidden bg-black text-white">
      {/* Background Logo */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <Image
          src="/logo.png"
          alt="Background Logo"
          width={900}
          height={900}
          className="opacity-[0.03] object-contain"
        />
      </div>

      {/* Hero */}
      <section className="relative z-10 flex min-h-[40vh] items-center justify-center px-6 text-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-extrabold uppercase md:text-6xl">
            Socials
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-zinc-400 md:text-base">
            Connect with the leadership, media team, and official Six Star
            Sovereigns social platforms.
          </p>
        </div>
      </section>

      {/* Main Instagram */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-6 mt-[-10vh]">
        <h2 className="mb-6 text-center text-2xl font-bold uppercase">
          Main Page
        </h2>

        <div className="flex justify-center">
          <Link
            href="https://instagram.com/sixstarsovereigns"
            target="_blank"
            className="flex items-center gap-3 border border-white/10 bg-zinc-950 px-6 py-4 font-bold uppercase transition-all duration-300 hover:bg-white hover:text-black"
          >
            <Instagram />
            @sixstarsovereigns
          </Link>
        </div>
      </section>

      {/* Leadership */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-12">
        <h2 className="mb-10 text-center text-3xl font-bold uppercase">
          Leadership
        </h2>

        <div className="grid gap-6 md:grid-cols-4">
          {leadership.map((member) => (
            <div
              key={member.id}
              className="border border-white/10 bg-zinc-950/80 p-6 text-center backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold uppercase">
                {member.name}
              </h3>

              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
                {member.role}
              </p>

              <p className="mt-5 text-sm leading-relaxed text-zinc-400">
                {member.description}
              </p>

              <Link
                href={member.instagram}
                target="_blank"
                className="mt-6 inline-flex items-center gap-2 text-zinc-300 transition hover:text-white"
              >
                {member.instagram == "" ? null : <Instagram size={18} />}
                {member.instahandle}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Media Team */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 py-12">
        <h2 className="mb-10 text-center text-3xl font-bold uppercase">
          Media Team
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {mediaTeam.map((member) => (
            <div
              key={member.id}
              className="border border-white/10 bg-zinc-950/80 p-6 text-center backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold uppercase">
                {member.name}
              </h3>

              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-zinc-500">
                {member.role}
              </p>

              <p className="mt-5 text-sm leading-relaxed text-zinc-400">
                {member.description}
              </p>

              <Link
                href={member.instagram}
                target="_blank"
                className="mt-6 inline-flex items-center gap-2 text-zinc-300 transition hover:text-white"
              >
                <Instagram size={18} />
                {member.instahandle}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}