import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import ShareEventButton from "@/components/sharebutton";
import FadeIn from "@/components/fade-in";
import { getEvents } from "@/lib/get-events";
export const dynamic = "force-dynamic";


export default async function EventsPage() {
  const upcomingEvents = await getEvents();

  return (
    <main className="bg-black text-white">
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden px-4 py-24 text-center sm:px-6 md:px-8">
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <h1 className="text-4xl font-extrabold uppercase sm:text-5xl md:text-6xl lg:text-7xl">
            Upcoming Events
          </h1>
          <p className="mt-6 text-base leading-relaxed text-zinc-300 sm:text-lg md:text-xl">
            Stay connected with upcoming meets, cruises, and community events
            from Six Star Sovereigns.
          </p>
        </div>
      </section>

      {/* Event Cards */}
      <section className="mx-auto mt-[-50] w-full max-w-7xl px-4 py-16 sm:px-6 md:px-8 md:py-10">
        <FadeIn delay={0.2}>
          <div className="no-scrollbar flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 xl:grid-cols-3">
            {upcomingEvents.map((event, index) => (
              <article
                key={`${event._id}-${event.date}`}
                className="min-w-[85%] overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-xl sm:min-w-[70%] md:min-w-0"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title || "Event image"}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/25" />
                </div>

                <div className="p-6">
                  <p className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
                    {event.date} • {event.time}
                  </p>

                  <h2 className="mt-3 text-2xl font-bold uppercase">
                    {event.title}
                  </h2>

                  <p className="mt-3 text-sm font-medium uppercase tracking-wide text-zinc-400">
                    {event.location}
                  </p>

                  <p className="mt-5 text-base leading-relaxed text-zinc-300">
                    {event.description}
                  </p>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="mt-6 cursor-pointer rounded-full border border-white/20 px-5 py-3 text-sm font-bold uppercase text-white transition-all duration-300 hover:bg-white hover:text-black">
                        Learn More
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="max-h-[90vh] overflow-y-auto border-white/10 bg-zinc-950 text-white sm:max-w-2xl">
                      <div className="relative mt-5 h-64 w-full overflow-hidden rounded-xl sm:h-80">
                        <Image
                          src={event.image}
                          alt={event.title || "Event image"}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover object-[center_75%]"
                        />
                      </div>

                      <DialogHeader className="pt-4">
                        <DialogTitle className="text-2xl font-extrabold uppercase sm:text-3xl">
                          {event.title}
                        </DialogTitle>
                        <DialogDescription className="text-zinc-400">
                          Full event details and information.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                            Date
                          </p>
                          <p className="mt-2 text-base font-semibold text-white">
                            {event.date}
                          </p>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                            Time
                          </p>
                          <p className="mt-2 text-base font-semibold text-white">
                            {event.time}
                          </p>
                        </div>

                        <div className="rounded-xl border border-white/10 bg-black/40 p-4 sm:col-span-2">
                          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                            Location
                          </p>
                          <p className="mt-2 text-base font-semibold text-white">
                            {event.location}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 pt-2">
                        <Button
                          asChild
                          className="cursor-pointer rounded-full bg-white px-6 py-3 font-bold uppercase text-black hover:bg-zinc-200"
                        >
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                              event.address
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Directions
                          </a>
                        </Button>

                        <ShareEventButton
                          title={event.title}
                          date={event.date}
                          time={event.time}
                          location={event.location}
                          address={event.address}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </article>
            ))}
          </div>
        </FadeIn>
      </section>
    </main>
  );
}