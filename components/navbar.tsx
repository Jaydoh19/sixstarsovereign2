"use client";

import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
import { Roboto } from "next/font/google";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";

const drugsther = localFont({
  src: "../app/fonts/Drugsther.otf",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const navLinks = [
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

export default function Navbar() {
  return (
    <header className="absolute top-0 left-0 z-50 w-full">
      <div className="mx-auto grid w-full max-w-8xl grid-cols-[auto_1fr_auto] items-center px-4 py-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="inline-flex w-fit items-center gap-3">
          <Image
            src="/logo.png"
            alt="Six Star Sovereigns logo"
            width={70}
            height={70}
            className="h-20 w-20 object-contain sm:h-24 sm:w-24"
            priority
          />
          <span
            className={`${drugsther.className} block leading-[0.9] tracking-[0.08em] text-white text-2xl sm:text-2xl lg:text-4xl`}
          >
            Six Star Sovereigns
          </span>
        </Link>

        {/* Spacer */}
        <div />

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 justify-self-end lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className={`${roboto.className} inline-block text-lg font-bold text-white transition-all duration-300 ease-out hover:scale-110 hover:text-chart-2`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu */}
        <div className="justify-self-end lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 hover:text-white"
              >
                <Menu className="h-7 w-7" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="border-white/10 bg-black/95 px-6 text-white"
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="mt-2 flex flex-col gap-6">
                <Link href="/" className="inline-flex w-fit items-center gap-3">
                  <Image
                    src="/logo.png"
                    alt="Six Star Sovereigns logo"
                    width={40}
                    height={40}
                    className="h-20 w-20 object-contain"
                  />
                  <span
                    className={`${drugsther.className} text-xl tracking-[0.08em] text-white`}
                  >
                    Six Star Sovereigns
                  </span>
                </Link>

                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className={`${roboto.className} text-xl text-white duration-300 hover:scale-105 hover:text-chart-2`}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
