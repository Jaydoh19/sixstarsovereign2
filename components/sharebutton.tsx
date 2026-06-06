"use client";

import { Button } from "@/components/ui/button";

type ShareEventButtonProps = {
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
};

export default function ShareEventButton({
  title,
  date,
  time,
  location,
  address,
}: ShareEventButtonProps) {
  async function handleShare() {
    const shareUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;

    const shareData = {
      title,
      text: `${title} — ${date} at ${time} in ${location}`,
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          `${shareData.title}\n${shareData.text}\n${shareData.url}`
        );
        alert("Event info copied to clipboard.");
      }
    } catch (error) {
      console.error("Error sharing event:", error);
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleShare}
      className="rounded-full cursor-pointer border-white/20 bg-transparent px-6 py-3 font-bold uppercase text-white hover:bg-white hover:text-black"
    >
      Share Event
    </Button>
  );
}

