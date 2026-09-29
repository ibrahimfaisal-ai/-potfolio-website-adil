"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  categories,
  work,
  type CategoryId,
  type WorkVideo,
} from "@/src/data/work";
import WorkCard from "./WorkCard";
import VideoLightbox from "./VideoLightbox";

type Filter = CategoryId | "all";

export default function WorkShowcase() {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<WorkVideo | null>(null);

  const railRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  // Arrows and the progress bar only make sense when the rail overflows.
  const [canScroll, setCanScroll] = useState(false);

  // Drag-to-scroll for the vertical rail. `moved` gates the click so a drag
  // never opens a video.
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false });

  const visible = useMemo(
    () => (filter === "all" ? work : work.filter((v) => v.category === filter)),
    [filter]
  );
  const vertical = useMemo(() => visible.filter((v) => v.orientation === "vertical"), [visible]);
  const landscape = useMemo(() => visible.filter((v) => v.orientation === "landscape"), [visible]);

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([["all", work.length]]);
    for (const c of categories) map.set(c.id, work.filter((v) => v.category === c.id).length);
    return map;
  }, []);

  const syncProgress = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanScroll(max > 1);
    setProgress(max > 0 ? el.scrollLeft / max : 0);
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const raf = requestAnimationFrame(syncProgress);
    el.addEventListener("scroll", syncProgress, { passive: true });
    window.addEventListener("resize", syncProgress);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", syncProgress);
      window.removeEventListener("resize", syncProgress);
    };
  }, [syncProgress]);

  // Reset the rail when the filter changes so a new set starts from the left,
  // and re-measure since the new set may or may not overflow.
  useEffect(() => {
    railRef.current?.scrollTo({ left: 0, behavior: "auto" });
    const raf = requestAnimationFrame(syncProgress);
    return () => cancelAnimationFrame(raf);
  }, [filter, syncProgress]);

  const scrollByCards = (direction: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-work-card]");
    const step = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * direction * 2, behavior: "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const el = railRef.current;
    if (!el) return;
    drag.current = { down: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = railRef.current;
    if (!el || !drag.current.down) return;
    const delta = e.clientX - drag.current.startX;
    if (Math.abs(delta) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - delta;
  };
  const endDrag = () => {
    drag.current.down = false;
    window.setTimeout(() => (drag.current.moved = false), 0);
  };

  const activeBlurb = filter === "all"
    ? "AI commercials, film scenes, product campaigns and creator-style ads across every category."
    : categories.find((c) => c.id === filter)?.blurb ?? "";

  return (
    <>
      <section
        id="work"
        // The footer's cloud edge rises ~32vw above it on phones and ~20vw from md up,
        // so the bottom padding scales with the viewport to keep every card clear of it.
        className="relative z-20 bg-[#FAFAFA] scroll-mt-24 md:scroll-mt-28 pt-24 md:pt-32 pb-[calc(32vw+3rem)] md:pb-[calc(20vw+4rem)] overflow-hidden"
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
            .work-rail { scrollbar-width: none; -ms-overflow-style: none; }
            .work-rail::-webkit-scrollbar { display: none; }
            .filter-row { scrollbar-width: none; -ms-overflow-style: none; }
            .filter-row::-webkit-scrollbar { display: none; }
          `,
          }}
        />

        {/* ── Header ── */}
        <div className="w-full max-w-[90rem] mx-auto px-6 md:px-12 mb-10 md:mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-8 h-px bg-[#32A3E6]" />
              <span className="font-space text-xs font-bold uppercase tracking-[0.2em] text-[#32A3E6]">
                Selected work · {work.length} pieces
              </span>
            </div>
            <h2 className="font-corpta text-5xl md:text-7xl font-medium uppercase tracking-tighter text-[#111111] leading-[0.92]">
              The work.
            </h2>
          </div>
          <p className="max-w-md text-[#555555] text-lg font-medium lg:pb-2">
            AI commercials made with Seedance. Filter by category, hover to
            preview, and click to watch with sound.
          </p>
        </div>

        {/* ── Category filter ── */}
        <div className="w-full max-w-[90rem] mx-auto px-6 md:px-12 mb-3">
          <div className="filter-row flex lg:flex-wrap gap-2.5 overflow-x-auto lg:overflow-visible pb-2 -mx-1 px-1" role="tablist" aria-label="Filter work by category">
            {([{ id: "all" as Filter, label: "All work" }, ...categories]).map((c) => {
              const isActive = filter === c.id;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFilter(c.id as Filter)}
                  className={`shrink-0 rounded-full border px-4 py-2.5 font-space text-[11px] md:text-xs font-bold uppercase tracking-[0.12em]
                    transition-all duration-300 cursor-pointer
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#32A3E6]
                    ${isActive
                      ? "bg-[#111111] border-[#111111] text-white shadow-[0_8px_20px_rgba(0,0,0,0.18)]"
                      : "bg-white border-[#e4e4e4] text-[#555555] hover:border-[#111111] hover:text-[#111111]"}`}
                >
                  {c.label}
                  <span className={`ml-2 tabular-nums ${isActive ? "text-[#32A3E6]" : "text-[#aaaaaa]"}`}>
                    {counts.get(c.id as Filter) ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-sm text-[#888888] font-medium">{activeBlurb}</p>
        </div>

        {/* ── Vertical block ── */}
        {vertical.length > 0 && (
          <div className="mt-10">
            <div className="w-full max-w-[90rem] mx-auto px-6 md:px-12 flex items-center justify-between gap-4 mb-5">
              <span className="font-space text-[11px] font-bold uppercase tracking-[0.2em] text-[#999999]">
                Vertical · 9:16 · {vertical.length}
              </span>
              {canScroll && (
                <div className="hidden sm:flex items-center gap-2">
                  <button
                    onClick={() => scrollByCards(-1)}
                    aria-label="Previous"
                    className="w-10 h-10 rounded-full border border-[#e0e0e0] bg-white text-[#111111] flex items-center justify-center hover:bg-[#111111] hover:text-white hover:border-[#111111] transition-colors duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#32A3E6]"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => scrollByCards(1)}
                    aria-label="Next"
                    className="w-10 h-10 rounded-full border border-[#e0e0e0] bg-white text-[#111111] flex items-center justify-center hover:bg-[#111111] hover:text-white hover:border-[#111111] transition-colors duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#32A3E6]"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            <div
              ref={railRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerLeave={endDrag}
              className="work-rail flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory
                px-6 md:px-12 pb-6 cursor-grab active:cursor-grabbing select-none
                [scroll-padding-left:1.5rem] md:[scroll-padding-left:3rem]"
            >
              {vertical.map((v, i) => (
                <WorkCard
                  key={v.slug}
                  video={v}
                  index={i}
                  onOpen={setActive}
                  shouldIgnoreClick={() => drag.current.moved}
                />
              ))}
            </div>

            <div className={`w-full max-w-[90rem] mx-auto px-6 md:px-12 flex items-center gap-6 ${canScroll ? "" : "invisible"}`}>
              <div className="relative h-[3px] flex-1 rounded-full bg-[#e6e6e6] overflow-hidden">
                <span
                  className="absolute inset-y-0 left-0 rounded-full bg-[#32A3E6] transition-[width] duration-200 ease-out"
                  style={{ width: `${Math.max(8, progress * 100)}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ── Landscape block ── */}
        {landscape.length > 0 && (
          <div className="mt-16">
            <div className="w-full max-w-[90rem] mx-auto px-6 md:px-12 mb-5">
              <span className="font-space text-[11px] font-bold uppercase tracking-[0.2em] text-[#999999]">
                Landscape · 16:9 · {landscape.length}
              </span>
            </div>
            <div className="w-full max-w-[90rem] mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                {landscape.map((v, i) => (
                  <WorkCard
                    key={v.slug}
                    video={v}
                    index={i}
                    // Widen the first tile only when it evens out the two-column grid.
                    feature={landscape.length > 2 && landscape.length % 2 === 1 && i === 0}
                    onOpen={setActive}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      <VideoLightbox video={active} onClose={() => setActive(null)} />
    </>
  );
}
