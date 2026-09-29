"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { profile, socialLinks } from "@/src/data/profile";

// ── Toggle this to hide/show the project availability badge ──
const IS_AVAILABLE = true;

export default function Footer() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const socialRef   = useRef<HTMLDivElement>(null);

  /* ── 1. Word-by-word reveal (IntersectionObserver) ── */
  useEffect(() => {
    const h2 = headlineRef.current;
    if (!h2) return;

    // Collect every <span data-word> we rendered
    const words = Array.from(h2.querySelectorAll<HTMLElement>("[data-word]"));

    // Set starting state
    gsap.set(words, {
      y: "110%",
      opacity: 0,
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          gsap.to(words, {
            y: "0%",
            opacity: 1,
            stagger: 0.12,
            duration: 1,
            ease: "power4.out",
          });
          observer.disconnect();
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(h2);
    return () => observer.disconnect();
  }, []);

  /* ── 4. Social links stagger via IntersectionObserver + CSS class ── */
  useEffect(() => {
    const el = socialRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          el.classList.add("footer-socials-in-view");
          observer.disconnect();
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      id="contact"
      className="relative z-20 bg-[#111111] px-6 md:px-12 pb-12 pt-8 md:pb-24 md:pt-16 text-[#FAFAFA] overflow-x-clip"
    >
      {/* ======================= */}
      {/* CLOUD PATTERN (TOP BORDER) */}
      {/* ======================= */}
      <div className="absolute inset-x-0 top-0 h-[20vw] transform -translate-y-[99%] overflow-visible pointer-events-none z-10 w-full">
        
        {/* BACK CLOUD LAYER (Depth) */}
        <div className="absolute inset-0 origin-bottom z-10">
          <div className="absolute bottom-[-10vh] left-[-10vw] right-[-10vw] h-[18vh] bg-[#1d1d1d]"></div>
          
          <div className="absolute rounded-full bg-[#1d1d1d] w-[50vw] h-[50vw] md:w-[20vw] md:h-[20vw] -left-[20vw] md:-left-[8vw] -bottom-[18vw] md:-bottom-[7vw]"></div>
          <div className="absolute rounded-full bg-[#1d1d1d] w-[65vw] h-[65vw] md:w-[26vw] md:h-[26vw] -left-[30vw] md:-left-[12vw] -bottom-[38vw] md:-bottom-[15vw]"></div>
          
          <div className="absolute rounded-full bg-[#1d1d1d] w-[55vw] h-[55vw] md:w-[22vw] md:h-[22vw] left-[10vw] md:left-[4vw] -bottom-[35vw] md:-bottom-[14vw]"></div>
          <div className="absolute rounded-full bg-[#1d1d1d] w-[70vw] h-[70vw] md:w-[28vw] md:h-[28vw] left-[30vw] md:left-[21vw] -bottom-[48vw] md:-bottom-[19vw]"></div>
          <div className="absolute rounded-full bg-[#1d1d1d] w-[85vw] h-[85vw] md:w-[34vw] md:h-[34vw] left-[15vw] md:left-[41vw] -bottom-[60vw] md:-bottom-[24vw]"></div>
          <div className="absolute rounded-full bg-[#1d1d1d] w-[60vw] h-[60vw] md:w-[24vw] md:h-[24vw] right-[5vw] md:right-[19vw] -bottom-[38vw] md:-bottom-[15vw]"></div>
          
          <div className="absolute rounded-full bg-[#1d1d1d] w-[45vw] h-[45vw] md:w-[18vw] md:h-[18vw] right-[12vw] md:right-[5vw] -bottom-[22vw] md:-bottom-[9vw]"></div>
          <div className="absolute rounded-full bg-[#1d1d1d] w-[75vw] h-[75vw] md:w-[30vw] md:h-[30vw] -right-[30vw] md:-right-[12vw] -bottom-[48vw] md:-bottom-[19vw]"></div>
          <div className="absolute rounded-full bg-[#1d1d1d] w-[55vw] h-[55vw] md:w-[22vw] md:h-[22vw] -right-[20vw] md:-right-[8vw] -bottom-[28vw] md:-bottom-[11vw]"></div>
        </div>

        {/* FRONT CLOUD LAYER */}
        <div className="absolute inset-0 origin-bottom z-20">
          <div className="absolute bottom-[-10vh] left-[-10vw] right-[-10vw] h-[15vh] bg-[#111111]"></div>
          
          <div className="absolute rounded-full bg-[#111111] w-[45vw] h-[45vw] md:w-[18vw] md:h-[18vw] -left-[20vw] md:-left-[8vw] -bottom-[20vw] md:-bottom-[8vw]"></div>
          <div className="absolute rounded-full bg-[#111111] w-[60vw] h-[60vw] md:w-[24vw] md:h-[24vw] -left-[30vw] md:-left-[12vw] -bottom-[40vw] md:-bottom-[16vw]"></div>
          
          <div className="absolute rounded-full bg-[#111111] w-[50vw] h-[50vw] md:w-[20vw] md:h-[20vw] left-[12vw] md:left-[5vw] -bottom-[38vw] md:-bottom-[15vw]"></div>
          <div className="absolute rounded-full bg-[#111111] w-[65vw] h-[65vw] md:w-[26vw] md:h-[26vw] left-[35vw] md:left-[22vw] -bottom-[50vw] md:-bottom-[20vw]"></div>
          <div className="absolute rounded-full bg-[#111111] w-[80vw] h-[80vw] md:w-[32vw] md:h-[32vw] left-[20vw] md:left-[42vw] -bottom-[62vw] md:-bottom-[25vw]"></div>
          <div className="absolute rounded-full bg-[#111111] w-[55vw] h-[55vw] md:w-[22vw] md:h-[22vw] right-[10vw] md:right-[20vw] -bottom-[40vw] md:-bottom-[16vw]"></div>
          
          <div className="absolute rounded-full bg-[#111111] w-[40vw] h-[40vw] md:w-[16vw] md:h-[16vw] right-[15vw] md:right-[6vw] -bottom-[25vw] md:-bottom-[10vw]"></div>
          <div className="absolute rounded-full bg-[#111111] w-[70vw] h-[70vw] md:w-[28vw] md:h-[28vw] -right-[30vw] md:-right-[12vw] -bottom-[50vw] md:-bottom-[20vw]"></div>
          <div className="absolute rounded-full bg-[#111111] w-[50vw] h-[50vw] md:w-[20vw] md:h-[20vw] -right-[20vw] md:-right-[8vw] -bottom-[30vw] md:-bottom-[12vw]"></div>
        </div>
      </div>

      {/* FLOATING PARTICLES (Bubbles) - Moved into main footer area */}
      <div className="absolute inset-0 z-[15] pointer-events-none">
        <div className="absolute top-[20%] left-[8vw] w-[60px] h-[60px] rounded-full bg-[#32A3E6] shadow-[0_0_20px_#32A3E6] opacity-40 mix-blend-screen"></div>
        <div className="absolute top-[60%] left-[3vw] w-[90px] h-[90px] rounded-full bg-[#32A3E6] shadow-[0_0_30px_#32A3E6] opacity-30 mix-blend-screen"></div>
        <div className="absolute top-[80%] left-[15vw] w-[35px] h-[35px] rounded-full bg-[#32A3E6] shadow-[0_0_10px_#32A3E6] opacity-50 mix-blend-screen"></div>

        <div className="absolute top-[15%] right-[4vw] w-[45px] h-[45px] rounded-full bg-[#32A3E6] shadow-[0_0_15px_#32A3E6] opacity-40 mix-blend-screen"></div>
        <div className="absolute top-[65%] right-[3vw] w-[75px] h-[75px] rounded-full bg-[#32A3E6] shadow-[0_0_25px_#32A3E6] opacity-30 mix-blend-screen"></div>
        <div className="absolute top-[30%] right-[15vw] w-[25px] h-[25px] rounded-full bg-[#32A3E6] shadow-[0_0_10px_#32A3E6] opacity-50 mix-blend-screen"></div>
        <div className="absolute bottom-[5%] right-[25vw] w-[30px] h-[30px] rounded-full bg-[#32A3E6] shadow-[0_0_10px_#32A3E6] opacity-20 mix-blend-screen"></div>
      </div>

      <div className="relative mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-start md:items-end gap-16 z-[20]">

        {/* ── Left column: headline + email CTA ── */}
        <div className="flex flex-col gap-8 w-full md:max-w-none lg:w-[75%]">

          {/* 1. Headline, each word wrapped for clip reveal */}
          <h2
            ref={headlineRef}
            className="font-space text-[10vw] md:text-[clamp(3.5rem,6vw,7rem)] lg:text-7xl font-black uppercase tracking-tighter leading-[0.95]"
          >
            {/* Line 1 */}
            <span className="inline-flex flex-wrap gap-x-[0.25em]">
              {["Got", "a", "product"].map((w) => (
                <span key={w} className="inline-block overflow-hidden">
                  <span data-word className="inline-block">
                    {w}
                  </span>
                </span>
              ))}
            </span>
            <br />
            {/* Line 2 keeps the accent colour */}
            <span className="inline-flex flex-wrap gap-x-[0.25em] text-[#32A3E6] font-corpta font-medium">
              {["worth", "selling", "?"].map((w) => (
                <span
                  key={w}
                  className={`inline-block ${w === "?" ? "pl-[0.03em] pr-[0.05em]" : "overflow-hidden"}`}
                >
                  <span
                    data-word
                    className={`inline-block ${w === "?" ? "text-[0.84em] leading-none -translate-y-[0.02em]" : ""}`}
                  >
                    {w}
                  </span>
                </span>
              ))}
            </span>
          </h2>

          {/* 2. Email CTA with animated underline */}
          <Link
            href="/contact"
            className="footer-email-link group inline-flex items-center gap-4 text-xl md:text-3xl font-medium hover:text-[#32A3E6] transition-colors w-max"
          >
            <span className="relative pb-1">
              Let&apos;s talk about it
            </span>
            <svg
              className="w-6 h-6 transition-transform group-hover:translate-x-2 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* ── Right column: badge + socials + copyright ── */}
        <div className="flex flex-col md:items-end gap-6">

          {/* 3. Availability badge */}
          {IS_AVAILABLE && (
            <div className="inline-flex items-center gap-2 rounded-full border border-[#333333] px-4 py-1.5 text-xs font-semibold text-[#A0A0A0]">
              <span className="animate-pulse w-1.5 h-1.5 rounded-full bg-[#32A3E6] flex-shrink-0" />
              Available for new projects
            </div>
          )}

          {/* 4. Social links, stagger via CSS + IntersectionObserver class */}
          <div
            ref={socialRef}
            className="flex gap-6 font-medium text-[#A0A0A0] md:justify-end footer-socials"
          >
            {socialLinks.map((link, i) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="footer-social-link hover:text-[#FAFAFA] transition-colors" style={{ "--delay": `${i * 90}ms` } as React.CSSProperties}>
                {link.label}
              </a>
            ))}
          </div>

          {/* 5. Two-column copyright bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-2 md:gap-6 mt-2">
            <p className="text-[#555555] text-sm">
              &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
