import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
import { Roboto } from "next/font/google";
import { Instagram, Mail, MapPin } from "lucide-react";

const drugsther = localFont({
  src: "../app/fonts/Drugsther.otf",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const footerLinks = [
  { href: "/", label: "Home", external: false },
  { href: "/about", label: "About", external: false },
  { href: "/events", label: "Events", external: false },
  { href: "/contact", label: "Socials", external: false },
  { href: "/gallery", label: "Gallery", external: false },
  {
    href: "https://bc-printed.square.site/shop/six-star-sovereigns/GOROJZLEHF5GVITVWHLRJYWH",
    label: "Shop",
    external: true,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-14 sm:px-8 lg:px-10">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Six Star Sovereigns logo"
                width={56}
                height={56}
                className="h-14 w-14 object-contain"
              />
              <h2
                className={`${drugsther.className} text-2xl tracking-[0.08em]`}
              >
                Six Star Sovereigns
              </h2>
            </div>

            <p
              className={`${roboto.className} max-w-sm text-sm leading-6 text-zinc-400`}
            >
              A car community built on passion, originality, and bringing
              enthusiasts together through meets, events, and culture.
            </p>
          </div>

          <div>
            <h3 className={`${roboto.className} text-lg font-bold`}>
              Navigation
            </h3>

            <div className="mt-4 flex flex-col gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={`${roboto.className} text-sm text-zinc-400 transition-colors duration-300 hover:text-white`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className={`${roboto.className} text-lg font-bold`}>Contact</h3>

            <div className="mt-4 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-zinc-400">
                <Mail className="h-4 w-4" />
                <span className={`${roboto.className} text-sm`}>
                  Sixstarsovereigns@outlook.com
                </span>
              </div>

              <div className="flex items-center gap-3 text-zinc-400">
                <Instagram className="h-4 w-4" />
                <a
                  href="https://www.instagram.com/sixstarsovereigns/"
                  className={`${roboto.className} text-sm`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @sixstarsovereigns
                </a>
              </div>

              <div className="flex items-center gap-3 text-zinc-400">
                <MapPin className="h-4 w-4" />
                <span className={`${roboto.className} text-sm`}>New York</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className={`${roboto.className} text-sm text-zinc-500`}>
            © 2026 Six Star Sovereigns. All rights reserved.
          </p>

          <p className={`${roboto.className} text-sm text-zinc-500`}>
            Built for the culture.
          </p>
        </div>
      </div>
    </footer>
  );
}
