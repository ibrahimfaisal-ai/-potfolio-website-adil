"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { WorkVideo } from "@/src/data/work";
import { categories } from "@/src/data/work";

type Props = {
  video: WorkVideo | null;
  onClose: () => void;
};

/**
 * Full-screen player with a creative-note panel.
 *
 * Nothing is fetched until a video is selected: the YouTube iframe and the
 * self-hosted MP4 are both mounted only while `video` is non-null.
 */
export default function VideoLightbox({ video, onClose }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Escape to close, plus a scroll lock while open.
  useEffect(() => {
    if (!video) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [video, onClose]);

  useEffect(() => {
    if (!video) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(rootRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: "power2.out" });
      gsap.fromTo(stageRef.current,
        { autoAlpha: 0, scale: 0.94, y: 24 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 0.7, ease: "power4.out", delay: 0.05 });
      gsap.fromTo(panelRef.current ? Array.from(panelRef.current.children) : [],
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.07, ease: "power3.out", delay: 0.2 });
      gsap.fromTo(closeRef.current,
        { autoAlpha: 0, scale: 0.6, rotate: -90 },
        { autoAlpha: 1, scale: 1, rotate: 0, duration: 0.5, ease: "back.out(1.6)", delay: 0.25 });
    }, rootRef);
    return () => ctx.revert();
  }, [video]);

  if (!video) return null;

  const isVertical = video.orientation === "vertical";
  const categoryLabel = categories.find((c) => c.id === video.category)?.label ?? video.category;

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      className="fixed inset-0 z-[120] bg-[#070707]/97 backdrop-blur-xl overflow-y-auto custom-scrollbar"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="Close video"
        className="fixed z-[130] top-5 right-5 md:top-8 md:right-8 w-11 h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center
          bg-white/10 hover:bg-white text-white hover:text-[#111111] border border-white/20
          backdrop-blur-md transition-colors duration-300 cursor-pointer shadow-xl
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#32A3E6]"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div
        className={`min-h-full w-full max-w-[100rem] mx-auto px-4 sm:px-8 py-20 md:py-16 flex flex-col gap-10
          ${isVertical ? "lg:flex-row lg:items-center lg:justify-center lg:gap-16" : "lg:gap-14"}`}
      >
        {/* ── Player ── */}
        <div ref={stageRef} className={`w-full shrink-0 ${isVertical ? "lg:w-auto lg:flex lg:justify-end" : ""}`}>
          <div
            className={`relative mx-auto overflow-hidden rounded-2xl md:rounded-[1.75rem] bg-black shadow-[0_40px_120px_rgba(0,0,0,0.7)] ring-1 ring-white/10
              ${isVertical
                ? "w-full max-w-[min(78vw,340px)] sm:max-w-[360px] lg:max-w-none lg:w-[min(38vw,420px)] aspect-[9/16]"
                : "w-full max-w-[min(100%,1180px)] aspect-video"}`}
          >
            {video.source.kind === "youtube" ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.source.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="eager"
                className="absolute inset-0 h-full w-full border-0"
              />
            ) : (
              /* Opened by a click, so playback with sound is normally allowed.
                 If the browser still blocks it, fall back to muted autoplay. */
              <video
                key={video.source.src}
                src={video.source.src}
                poster={video.thumbnail}
                controls
                loop
                playsInline
                preload="auto"
                ref={(el) => {
                  if (!el || el.dataset.started) return;
                  el.dataset.started = "1";
                  el.play().catch(() => {
                    el.muted = true;
                    void el.play().catch(() => {});
                  });
                }}
                className="absolute inset-0 h-full w-full object-contain"
              />
            )}
          </div>
        </div>

        {/* ── Creative note ── */}
        <div ref={panelRef} className={`w-full ${isVertical ? "lg:max-w-xl lg:flex-1" : "max-w-3xl"}`}>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="rounded-full border border-[#32A3E6]/30 bg-[#32A3E6]/10 px-3 py-1 font-space text-[10px] md:text-[11px] font-bold uppercase tracking-[0.18em] text-[#32A3E6]">
              {categoryLabel}
            </span>
            <span className="font-space text-[10px] md:text-[11px] font-bold uppercase tracking-[0.18em] text-[#6a6a6a]">
              {video.format}
            </span>
            <span className="font-space text-[10px] md:text-[11px] font-bold uppercase tracking-[0.18em] text-[#6a6a6a]">
              {video.duration}
            </span>
          </div>

          <h2 className="font-space text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter text-[#FAFAFA] leading-[0.92] mb-5">
            {video.title}
          </h2>

          {video.credit && (
            <p className="-mt-2 mb-5 font-space text-[11px] md:text-xs font-bold uppercase tracking-[0.18em] text-[#8a8a8a]">
              Created by <span className="text-[#cfcfcf]">{video.credit}</span>
            </p>
          )}

          <p className="text-[#FAFAFA] text-lg md:text-xl font-medium leading-snug mb-8">{video.hook}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div>
              <span className="block text-[#5c5c5c] font-space text-[10px] md:text-[11px] uppercase tracking-[0.22em] font-bold mb-2">
                Buyer trigger
              </span>
              <span className="text-[#32A3E6] font-space text-sm md:text-base font-bold uppercase tracking-wide">
                {video.trigger}
              </span>
            </div>
            <div>
              <span className="block text-[#5c5c5c] font-space text-[10px] md:text-[11px] uppercase tracking-[0.22em] font-bold mb-2">
                Look
              </span>
              <span className="text-[#cfcfcf] font-space text-sm md:text-base font-bold uppercase tracking-wide">
                {video.style}
              </span>
            </div>
          </div>

          <div className="mb-10">
            <span className="block text-[#5c5c5c] font-space text-[10px] md:text-[11px] uppercase tracking-[0.22em] font-bold mb-3">
              Creative note
            </span>
            <p className="text-[#A0A0A0] text-sm md:text-base leading-relaxed max-w-2xl">{video.note}</p>
          </div>

          {video.source.kind === "youtube" && (
            <a
              href={`https://www.youtube.com/watch?v=${video.source.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 py-3
                font-space text-[11px] md:text-xs font-bold uppercase tracking-[0.18em] text-[#FAFAFA]
                hover:bg-white hover:text-[#111111] transition-colors duration-300"
            >
              Watch on YouTube
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
