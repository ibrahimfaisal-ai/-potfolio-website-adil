"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { WorkVideo } from "@/src/data/work";

const blurDataURL = "data:image/gif;base64,R0lGODlhAQABAAAAACw=";

type Props = {
  video: WorkVideo;
  index: number;
  /** Landscape feature tiles get larger type and a bigger play lens. */
  feature?: boolean;
  onOpen: (video: WorkVideo) => void;
  /** Suppresses the click when a drag-scroll was in progress. */
  shouldIgnoreClick?: () => boolean;
};

export default function WorkCard({ video, index, feature = false, onOpen, shouldIgnoreClick }: Props) {
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVertical = video.orientation === "vertical";
  const canPreview = video.source.kind === "local";

  const enter = () => {
    setHovered(true);
    // The hover preview is muted so it can start without a gesture; the
    // lightbox plays with sound. `preload="none"` keeps it off the wire until now.
    const el = videoRef.current;
    if (el) {
      el.currentTime = 0;
      void el.play().catch(() => {});
    }
  };

  const leave = () => {
    setHovered(false);
    videoRef.current?.pause();
  };

  return (
    <button
      type="button"
      data-work-card
      onMouseEnter={enter}
      onMouseLeave={leave}
      onFocus={enter}
      onBlur={leave}
      onClick={() => {
        if (shouldIgnoreClick?.()) return;
        onOpen(video);
      }}
      aria-label={`Play ${video.title}`}
      className={`group relative overflow-hidden rounded-[1.5rem] bg-[#111111] text-left ring-1 ring-black/5
        will-change-transform transition-all duration-[0.7s] ease-[cubic-bezier(0.16,1,0.3,1)]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#32A3E6]
        ${isVertical
          ? "shrink-0 snap-start w-[68vw] sm:w-[280px] md:w-[300px] lg:w-[316px] aspect-[9/16]"
          : `w-full aspect-video ${feature ? "md:col-span-2 md:aspect-[2.4/1]" : ""}`}
        ${hovered
          ? "shadow-[0_30px_60px_rgba(0,0,0,0.35)] -translate-y-2"
          : "shadow-[0_16px_36px_rgba(0,0,0,0.12)]"}`}
    >
      <Image
        src={video.thumbnail}
        alt={`${video.title}, ${video.format}`}
        fill
        sizes={isVertical ? "(max-width: 640px) 68vw, 316px" : feature ? "(max-width: 768px) 100vw, 1400px" : "(max-width: 768px) 100vw, 700px"}
        quality={80}
        loading="lazy"
        placeholder="blur"
        blurDataURL={blurDataURL}
        draggable={false}
        className={`object-cover transition-all duration-[0.9s] ease-[cubic-bezier(0.16,1,0.3,1)]
          ${hovered ? "scale-[1.06] opacity-100" : "scale-100 opacity-85 grayscale-[15%]"}`}
      />

      {canPreview && (
        <video
          ref={videoRef}
          src={video.source.kind === "local" ? video.source.src : undefined}
          poster={video.thumbnail}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500
            ${hovered ? "opacity-100" : "opacity-0"}`}
        />
      )}

      <div
        className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-700 pointer-events-none
          ${hovered
            ? "from-[#050505] via-[#050505]/45 to-transparent opacity-95"
            : "from-[#0a0a0a] via-[#0a0a0a]/25 to-transparent opacity-85"}`}
      />

      {/* Index, duration, and the principle chip on hover */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-3 pointer-events-none">
        <span className="font-space text-[10px] font-bold tracking-[0.2em] text-white/60">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-2">
          {canPreview && (
            <span
              className={`rounded-full border border-white/20 bg-black/40 backdrop-blur-md px-2 py-1
                font-space text-[9px] font-bold uppercase tracking-[0.14em] text-white/70
                transition-opacity duration-500 ${hovered ? "opacity-0" : "opacity-100"}`}
            >
              Preview
            </span>
          )}
          <span className="rounded-full border border-white/20 bg-black/40 backdrop-blur-md px-2 py-1 font-space text-[9px] font-bold tracking-[0.14em] text-white/80">
            {video.duration}
          </span>
        </div>
      </div>

      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 pointer-events-none
          ${hovered ? "opacity-0 scale-110" : "opacity-100 scale-100"}`}
      >
        <span className={`glass-play flex items-center justify-center rounded-full ${feature ? "w-20 h-20" : "w-16 h-16"}`}>
          <svg className={`ml-1 text-white ${feature ? "w-8 h-8" : "w-6 h-6"}`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </div>

      <div className={`absolute inset-x-0 bottom-0 pointer-events-none ${feature ? "p-7 md:p-10" : "p-5 md:p-6"}`}>
        <span className="block font-space text-[10px] font-bold uppercase tracking-[0.16em] text-[#32A3E6]/90 mb-2">
          {video.style}
        </span>
        <h3
          className={`font-space font-black uppercase tracking-tight text-white leading-[1.05]
            ${feature ? "text-3xl md:text-5xl" : isVertical ? "text-lg" : "text-2xl md:text-3xl"}`}
        >
          {video.title}
        </h3>
        <div
          className={`overflow-hidden transition-all duration-[0.8s] ease-[cubic-bezier(0.16,1,0.3,1)]
            ${hovered ? "max-h-24 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"}`}
        >
          <p className={`text-[#cfcfcf] leading-relaxed font-medium ${feature ? "text-sm md:text-base max-w-xl" : "text-[13px]"}`}>
            {video.hook}
          </p>
        </div>
      </div>
    </button>
  );
}
