"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type AdminEvent = {
  _id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  description: string;
  image: string;
};

type AdminMedia = {
  _id: string;
  sectionTitle: string;
  caption: string;
  category: string;
  image: string;
};

type Message = {
  text: string;
  type: "success" | "error" | "loading";
};

export default function AdminDashboardClient() {
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [media, setMedia] = useState<AdminMedia[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);
  const [editingEvent, setEditingEvent] = useState<AdminEvent | null>(null);
  const [editingMedia, setEditingMedia] = useState<AdminMedia | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<{
    type: "event" | "media" | "section";
    id?: string;
    title: string;
  } | null>(null);

  useEffect(() => {
    if (!message || message.type === "loading") return;

    const timer = setTimeout(() => {
      setMessage(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  async function fetchData() {
    const [eventsRes, mediaRes] = await Promise.all([
      fetch("/api/events"),
      fetch("/api/media"),
    ]);

    setEvents(await eventsRes.json());
    setMedia(await mediaRes.json());
  }

  useEffect(() => {
    let ignore = false;

    async function loadData() {
      if (!ignore) {
        await fetchData();
      }
    }

    loadData();

    return () => {
      ignore = true;
    };
  }, []);

  async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Image upload failed");

    return res.json();
  }

  async function updateEvent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingEvent) return;

    setLoading(true);
    setMessage({
      text: "Updating event...",
      type: "loading",
    });

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      await fetch("/api/events", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingEvent._id,
          title: formData.get("title"),
          date: formData.get("date"),
          time: formData.get("time"),
          location: formData.get("location"),
          address: formData.get("address"),
          description: formData.get("description"),
        }),
      });

      setEditingEvent(null);
      await fetchData();

      setMessage({
        text: "Event updated successfully.",
        type: "success",
      });
    } catch {
      setMessage({
        text: "Event update failed.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  async function updateMedia(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingMedia) return;

    setLoading(true);
    setMessage({
      text: "Updating media...",
      type: "loading",
    });

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      await fetch("/api/media", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingMedia._id,
          sectionTitle: formData.get("sectionTitle"),
          caption: formData.get("caption"),
          category: formData.get("category"),
        }),
      });

      setEditingMedia(null);
      await fetchData();

      setMessage({
        text: "Media updated successfully.",
        type: "success",
      });
    } catch {
      setMessage({
        text: "Media update failed.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleEventSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    setMessage({
      text: "Adding event...",
      type: "loading",
    });

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const file = formData.get("image") as File;

      const uploaded = await uploadImage(file);

      await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.get("title"),
          date: formData.get("date"),
          time: formData.get("time"),
          location: formData.get("location"),
          address: formData.get("address"),
          description: formData.get("description"),
          image: uploaded.imageUrl,
          publicId: uploaded.publicId,
        }),
      });

      form.reset();
      await fetchData();

      setMessage({
        text: "Event added successfully.",
        type: "success",
      });
    } catch {
      setMessage({
        text: "Event upload failed.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleMediaSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    setMessage({
      text: "Uploading media...",
      type: "loading",
    });

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const files = formData.getAll("images") as File[];

      for (const file of files) {
        const uploaded = await uploadImage(file);

        await fetch("/api/media", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sectionTitle: formData.get("sectionTitle"),
            caption: formData.get("caption"),
            category: formData.get("category"),
            image: uploaded.imageUrl,
            publicId: uploaded.publicId,
          }),
        });
      }

      form.reset();
      await fetchData();

      setMessage({
        text: "Media uploaded successfully.",
        type: "success",
      });
    } catch {
      setMessage({
        text: "Upload failed.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;

    setLoading(true);
    setMessage({
      text: `Deleting ${deleteTarget.type}...`,
      type: "loading",
    });

    try {
      if (deleteTarget.type === "event") {
        await fetch("/api/events", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: deleteTarget.id }),
        });
      }

      if (deleteTarget.type === "media") {
        await fetch("/api/media", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: deleteTarget.id }),
        });
      }

      if (deleteTarget.type === "section") {
        await fetch("/api/media", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sectionTitle: deleteTarget.title }),
        });
      }

      setDeleteTarget(null);
      await fetchData();

      setMessage({
        text: "Deleted successfully.",
        type: "success",
      });
    } catch {
      setMessage({
        text: "Delete failed.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  const groupedMedia: Record<string, AdminMedia[]> = {};

  media.forEach((item) => {
    const section = item.sectionTitle || "Uncategorized";

    if (!groupedMedia[section]) {
      groupedMedia[section] = [];
    }

    groupedMedia[section].push(item);
  });

  return (
    <div className="mt-16 flex flex-col gap-12">
      {message && (
        <div
          className={`fixed left-1/2 top-6 z-100 -translate-x-1/2 border px-6 py-3 text-sm font-bold uppercase shadow-2xl backdrop-blur-md transition-all duration-300 ${
            message.type === "success"
              ? "border-green-500/30 bg-green-500/10 text-green-400"
              : message.type === "error"
                ? "border-red-500/30 bg-red-500/10 text-red-400"
                : "border-white/20 bg-black/70 text-white"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        <form
          onSubmit={handleEventSubmit}
          className="flex flex-col gap-4 border border-white/10 bg-zinc-950 p-6"
        >
          <h2 className="text-2xl font-bold uppercase">Add New Event</h2>

          <input
            name="title"
            placeholder="Event Title"
            required
            className="bg-black p-3"
          />
          <input
            name="date"
            placeholder="Date"
            required
            className="bg-black p-3"
          />
          <input
            name="time"
            placeholder="Time"
            required
            className="bg-black p-3"
          />
          <input
            name="location"
            placeholder="Location"
            required
            className="bg-black p-3"
          />
          <input
            name="address"
            placeholder="Google Maps Address"
            required
            className="bg-black p-3"
          />

          <textarea
            name="description"
            placeholder="Description"
            required
            rows={4}
            className="resize-none bg-black p-3"
          />

          <input
            name="image"
            type="file"
            accept="image/*"
            required
            className="bg-black p-3"
          />

          <button
            disabled={loading}
            className="bg-white p-3 font-bold uppercase text-black transition hover:bg-zinc-300 disabled:opacity-50"
          >
            {loading ? "Working..." : "Add Event"}
          </button>
        </form>

        <form
          onSubmit={handleMediaSubmit}
          className="flex flex-col gap-4 border border-white/10 bg-zinc-950 p-6"
        >
          <h2 className="text-2xl font-bold uppercase">Upload Media</h2>

          <input
            name="sectionTitle"
            placeholder="Section Title"
            required
            className="bg-black p-3"
          />
          <input
            name="caption"
            placeholder="Caption"
            required
            className="bg-black p-3"
          />
          <input
            name="category"
            placeholder="Category"
            required
            className="bg-black p-3"
          />

          <input
            name="images"
            type="file"
            accept="image/*"
            multiple
            required
            className="bg-black p-3"
          />

          <button
            disabled={loading}
            className="bg-white p-3 font-bold uppercase text-black transition hover:bg-zinc-300 disabled:opacity-50"
          >
            {loading ? "Working..." : "Upload Photo"}
          </button>
        </form>
      </div>

      <section>
        <h2 className="text-3xl font-bold uppercase">Current Events</h2>

        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => (
            <div
              key={event._id}
              className="border border-white/10 bg-zinc-950 p-4"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={event.image}
                  alt={event.title || "Event image"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>

              <h3 className="mt-4 text-xl font-bold uppercase">
                {event.title}
              </h3>

              <p className="mt-1 text-sm text-zinc-400">
                {event.date} • {event.time}
              </p>

              <p className="mt-1 text-sm text-zinc-400">{event.location}</p>

              <button
                onClick={() => setEditingEvent(event)}
                className="mt-4 mr-2 bg-white px-4 py-2 text-sm font-bold uppercase text-black transition hover:bg-zinc-300"
              >
                Edit
              </button>

              <button
                onClick={() =>
                  setDeleteTarget({
                    type: "event",
                    id: event._id,
                    title: event.title,
                  })
                }
                className="mt-4 bg-red-600 px-4 py-2 text-sm font-bold uppercase text-white transition hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold uppercase">Current Media</h2>

        <div className="mt-6 flex flex-col gap-10">
          {Object.entries(groupedMedia).map(([sectionTitle, items]) => (
            <div
              key={sectionTitle}
              className="border border-white/10 bg-zinc-950 p-5"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-2xl font-bold uppercase">
                    {sectionTitle}
                  </h3>

                  <p className="mt-1 text-sm text-zinc-400">
                    {items.length} photo{items.length === 1 ? "" : "s"}
                  </p>
                </div>

                <button
                  onClick={() =>
                    setDeleteTarget({
                      type: "section",
                      title: sectionTitle,
                    })
                  }
                  className="bg-red-600 px-4 py-2 text-sm font-bold uppercase text-white transition hover:bg-red-700"
                >
                  Delete Section
                </button>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="border border-white/10 bg-black p-4"
                  >
                    <div className="relative h-48 w-full">
                      <Image
                        src={item.image}
                        alt={item.caption || item.sectionTitle || "Media image"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover"
                      />
                    </div>

                    <p className="mt-2 text-sm text-zinc-400">
                      {item.category}
                    </p>

                    <p className="mt-2 text-sm text-zinc-300">
                      {item.caption}
                    </p>

                    <button
                      onClick={() => setEditingMedia(item)}
                      className="mt-4 mr-2 bg-white px-4 py-2 text-sm font-bold uppercase text-black transition hover:bg-zinc-300"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        setDeleteTarget({
                          type: "media",
                          id: item._id,
                          title: item.caption || item.sectionTitle,
                        })
                      }
                      className="mt-4 bg-red-600 px-4 py-2 text-sm font-bold uppercase text-white transition hover:bg-red-700"
                    >
                      Delete Photo
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4 backdrop-blur-sm">
          <form
            onSubmit={updateEvent}
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto border border-white/10 bg-zinc-950 shadow-2xl"
          >
            <div className="grid md:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-72 border-b border-white/10 md:border-b-0 md:border-r md:border-white/10">
                <Image
                  src={editingEvent.image}
                  alt={editingEvent.title || "Event image"}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/25" />
              </div>

              <div className="p-6">
                <div className="mb-6 flex items-start justify-between gap-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500">
                      Admin Editor
                    </p>

                    <h2 className="mt-2 text-3xl font-extrabold uppercase">
                      Edit Event
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => setEditingEvent(null)}
                    className="text-2xl text-zinc-400 hover:text-white"
                  >
                    ×
                  </button>
                </div>

                <div className="grid gap-4">
                  <label className="flex flex-col gap-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                    Title
                    <input
                      name="title"
                      defaultValue={editingEvent.title}
                      className="border border-white/10 bg-black p-3 text-base font-normal normal-case tracking-normal text-white outline-none focus:border-white/40"
                    />
                  </label>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="flex flex-col gap-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                      Date
                      <input
                        name="date"
                        defaultValue={editingEvent.date}
                        className="border border-white/10 bg-black p-3 text-base font-normal normal-case tracking-normal text-white outline-none focus:border-white/40"
                      />
                    </label>

                    <label className="flex flex-col gap-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                      Time
                      <input
                        name="time"
                        defaultValue={editingEvent.time}
                        className="border border-white/10 bg-black p-3 text-base font-normal normal-case tracking-normal text-white outline-none focus:border-white/40"
                      />
                    </label>
                  </div>

                  <label className="flex flex-col gap-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                    Location
                    <input
                      name="location"
                      defaultValue={editingEvent.location}
                      className="border border-white/10 bg-black p-3 text-base font-normal normal-case tracking-normal text-white outline-none focus:border-white/40"
                    />
                  </label>

                  <label className="flex flex-col gap-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                    Maps Address
                    <input
                      name="address"
                      defaultValue={editingEvent.address}
                      className="border border-white/10 bg-black p-3 text-base font-normal normal-case tracking-normal text-white outline-none focus:border-white/40"
                    />
                  </label>

                  <label className="flex flex-col gap-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                    Description
                    <textarea
                      name="description"
                      defaultValue={editingEvent.description}
                      rows={5}
                      className="resize-none border border-white/10 bg-black p-3 text-base font-normal normal-case tracking-normal text-white outline-none focus:border-white/40"
                    />
                  </label>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button className="bg-white px-5 py-3 font-bold uppercase text-black transition hover:bg-zinc-300 disabled:opacity-50">
                    {loading ? "Saving..." : "Save Changes"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditingEvent(null)}
                    className="border border-white/20 px-5 py-3 font-bold uppercase text-white transition hover:bg-white hover:text-black"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {editingMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4 backdrop-blur-sm">
          <form
            onSubmit={updateMedia}
            className="w-full max-w-xl border border-white/10 bg-zinc-950 p-6 shadow-2xl"
          >
            <div className="mb-6 flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500">
                  Admin Editor
                </p>

                <h2 className="mt-2 text-3xl font-extrabold uppercase">
                  Edit Media
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setEditingMedia(null)}
                className="text-2xl text-zinc-400 hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="grid gap-4">
              <label className="flex flex-col gap-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                Section Title
                <input
                  name="sectionTitle"
                  defaultValue={editingMedia.sectionTitle}
                  className="border border-white/10 bg-black p-3 text-base font-normal normal-case tracking-normal text-white outline-none focus:border-white/40"
                />
              </label>

              <label className="flex flex-col gap-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                Caption
                <input
                  name="caption"
                  defaultValue={editingMedia.caption}
                  className="border border-white/10 bg-black p-3 text-base font-normal normal-case tracking-normal text-white outline-none focus:border-white/40"
                />
              </label>

              <label className="flex flex-col gap-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                Category
                <input
                  name="category"
                  defaultValue={editingMedia.category}
                  className="border border-white/10 bg-black p-3 text-base font-normal normal-case tracking-normal text-white outline-none focus:border-white/40"
                />
              </label>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button className="bg-white px-5 py-3 font-bold uppercase text-black transition hover:bg-zinc-300 disabled:opacity-50">
                {loading ? "Saving..." : "Save Changes"}
              </button>

              <button
                type="button"
                onClick={() => setEditingMedia(null)}
                className="border border-white/20 px-5 py-3 font-bold uppercase text-white transition hover:bg-white hover:text-black"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md border border-white/10 bg-zinc-950 p-6 shadow-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-500">
              Confirm Delete
            </p>

            <h2 className="mt-3 text-3xl font-extrabold uppercase">
              Are you sure?
            </h2>

            <p className="mt-4 leading-relaxed text-zinc-400">
              This will permanently delete{" "}
              <span className="font-bold text-white">{deleteTarget.title}</span>.
              This action cannot be undone.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={confirmDelete}
                className="bg-red-600 px-5 py-3 font-bold uppercase text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>

              <button
                onClick={() => setDeleteTarget(null)}
                className="border border-white/20 px-5 py-3 font-bold uppercase text-white transition hover:bg-white hover:text-black"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}