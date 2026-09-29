"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const stats = [
    {
      value: "10M", suffix: "+", title: "Total Ad Views", desc: "Scroll-stopping UGC & AI commercials across Meta, TikTok & Instagram",
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="16" rx="2" /><polygon points="10 9 15 12 10 15 10 9" />
        </svg>
      )
    },
    {
      value: "3x", suffix: "+", title: "ROAS & Conversions", desc: "High-converting ad creatives built to maximize e-commerce sales",
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 17l5-6 4 4 4-7 5 6" /><circle cx="8" cy="11" r="1" /><circle cx="16" cy="8" r="1" />
        </svg>
      )
    },
    {
      value: "100", suffix: "%", title: "Psychology Backed", desc: "Using consumer behavior & buyer triggers to craft winning hooks",
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" />
        </svg>
      )
    }
  ];

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardsRef.current[index] = el;
  };

  useEffect(() => {
    let ctx: gsap.Context;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        requestAnimationFrame(() => {
          ctx = gsap.context(() => {
            let mm = gsap.matchMedia();

            // ── DESKTOP // ──
            mm.add("(min-width: 1024px)", () => {
              gsap.set(bgRef.current, { backgroundColor: "#FAFAFA" });
              gsap.set(".text-element-dark", { color: "#111111" });
              gsap.set(".text-element-muted", { color: "#555555" });
              gsap.set(".ghost-watermark", { opacity: 0.04, color: "#111111" });
              gsap.set(cardsRef.current, { y: 150, opacity: 0 });

              const enterTl = gsap.timeline({ paused: true });
              enterTl.to(bgRef.current, { backgroundColor: "#050505", duration: 0.8 }, 0);
              enterTl.to(".text-element-dark", { color: "#FAFAFA", duration: 0.8 }, 0);
              enterTl.to(".text-element-muted", { color: "#A0A0A0", duration: 0.8 }, 0);
              enterTl.to(".ghost-watermark", { opacity: 0.03, color: "#FFFFFF", duration: 0.8 }, 0);
              enterTl.to(cardsRef.current, { y: 0, opacity: 1, duration: 1.0, stagger: 0.15, ease: "back.out(1.2)" }, 0.2);

              ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top 60%", 
                onEnter: () => enterTl.play(),
                onLeaveBack: () => enterTl.reverse()
              });
            });

            // ── MOBILE: STAGGERED VERTICAL REVEAL ──
            mm.add("(max-width: 1023px)", () => {
               gsap.set(bgRef.current, { backgroundColor: "#FAFAFA" });
               gsap.set(".text-element-dark", { color: "#111111" });
               gsap.set(".text-element-muted", { color: "#555555" });
               gsap.set(".ghost-watermark", { opacity: 0.04, color: "#111111" });

               const stTl = gsap.timeline({
                  scrollTrigger: {
                     trigger: sectionRef.current,
                     start: "top 40%",
                     end: "top 10%",
                     scrub: true
                  }
               });
               
               stTl.to(bgRef.current, { backgroundColor: "#050505" }, 0);
               stTl.to(".text-element-dark", { color: "#FAFAFA" }, 0);
               stTl.to(".text-element-muted", { color: "#A0A0A0" }, 0);
               stTl.to(".ghost-watermark", { opacity: 0.03, color: "#FFFFFF" }, 0);

               gsap.fromTo(cardsRef.current, 
                 { y: 60, opacity: 0 },
                 { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power2.out", 
                   scrollTrigger: { trigger: ".mobile-cards-trigger", start: "top 75%" }
                 }
               );
            });
          }, sectionRef);
        });
        
        observer.disconnect();
      }
    }, { rootMargin: "300px" });

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative w-full overflow-hidden min-h-screen py-16 lg:py-20 flex items-center">
      
      {/* Dynamic Background Void */}
      <div ref={bgRef} className="absolute inset-0 z-0 h-full w-full" />
      
      {/* Cinematic Textures */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes film-noise {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-2%, -2%); }
          20% { transform: translate(-4%, 2%); }
          30% { transform: translate(2%, -4%); }
          40% { transform: translate(-2%, 6%); }
          50% { transform: translate(-4%, 2%); }
          60% { transform: translate(6%, 0); }
          70% { transform: translate(0, 6%); }
          80% { transform: translate(2%, 2%); }
          90% { transform: translate(-4%, 4%); }
        }
        .film-grain-overlay {
          pointer-events: none;
          position: absolute;
          inset: -100%;
          width: 300%;
          height: 300%;
          z-index: 5;
          opacity: 0.12;
          mix-blend-mode: multiply;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          animation: film-noise 0.3s infinite steps(2);
        }
      `}} />
      <div className="film-grain-overlay" />

      {/* Ghost Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <h2 className="ghost-watermark font-space text-[clamp(8rem,18vw,26rem)] font-black whitespace-nowrap leading-none tracking-tighter mix-blend-overlay">
          CONVERSION
        </h2>
      </div>

      <div ref={containerRef} className="mx-auto max-w-[85rem] w-full px-6 md:px-12 flex flex-col lg:flex-row gap-16 lg:gap-24 relative z-10 items-center">
        
        {/* ── LEFT COLUMN: EDITORIAL TEXT ── */}
        <div className="relative z-[15] w-full min-w-0 lg:w-5/12 flex flex-col justify-center">
          <div className="flex lg:hidden items-center gap-3 mb-8">
            <span className="block w-5 h-px bg-[#32A3E6]" />
            <span className="font-space text-xs font-bold uppercase tracking-[0.2em] text-[#32A3E6]">
              Introduction
            </span>
          </div>
          
          <h2 className="text-element-dark font-space text-[clamp(1.7rem,7.5vw,2.75rem)] md:text-[clamp(2.1rem,3.5vw,3.4rem)] font-black uppercase tracking-tight mb-10 md:mb-12 leading-[0.98] md:leading-[0.95] flex flex-col transition-colors duration-[1.5s] max-w-full">
            <span className="block break-words">AI ads by craft,</span>
            <span className="block text-[#32A3E6] lg:ml-8 mt-2 font-corpta font-medium break-normal leading-[0.95]">
              <span className="whitespace-nowrap">psychologist</span> by training.
            </span>
          </h2>
          
          <p className="text-element-muted text-[1.15rem] md:text-[1.3rem] leading-[1.65] max-w-xl font-medium relative transition-colors duration-[1.5s]">
            <span className="hidden md:block absolute -left-8 top-1 text-5xl font-serif leading-none opacity-40">"</span>
            I&apos;m Muhammad Adil, an AI commercials expert based in Sialkot, Pakistan. I create high-production, scroll-stopping UGC-style video ads and AI commercials using Seedance — content that looks and feels like real creator footage, without the cost of a traditional shoot. I help e-commerce brands get ad creative that converts on Meta, TikTok, and Instagram.
            <br/><br/>
            I also hold a Master&apos;s degree in Psychology. It&apos;s my unfair advantage: I understand consumer behaviour, buyer triggers and human emotion, and I build every ad around them. Most AI ads look fake. Mine don&apos;t.
          </p>
        </div>

        {/* ── RIGHT COLUMN: BENTO GRID ── */}
        <div className="mobile-cards-trigger w-full lg:w-7/12 flex items-center justify-center mt-12 lg:mt-0">
          <div className="w-full max-w-[400px] md:max-w-none mx-auto grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4 xl:gap-6 min-h-[600px] md:min-h-[460px] lg:min-h-[500px]">
            {stats.map((stat, i) => (
              <div 
                key={i}
                ref={setCardRef(i)}
                className={`w-full h-full rounded-[1.5rem] p-6 lg:p-8 flex flex-col justify-between shadow-2xl backdrop-blur-xl border transform-gpu
                  ${i === 0 ? 'bg-white/10 border-white/20 md:row-span-2 min-h-[280px] md:min-h-0' : 'bg-white/5 border-white/10 min-h-[200px] md:min-h-0'}
                `}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* High-End Watermark Icon */}
                <div className={`absolute pointer-events-none text-white overflow-hidden rounded-[1.5rem] flex items-start justify-end inset-0 z-0 opacity-5`}>
                   <div className={`${i === 0 ? 'w-80 h-80 -mt-16 -mr-20' : 'w-56 h-56 -mt-12 -mr-16'}`}>
                     {stat.icon}
                   </div>
                </div>

                <div className="w-3 h-3 rounded-full bg-[#32A3E6] shadow-[0_0_15px_rgba(50,163,230,0.8)] relative z-10" />
                
                <div className="flex flex-col gap-2 mt-auto md:mt-0 relative z-10">
                  <div className={`font-space font-black tracking-tighter text-white drop-shadow-md flex items-end ${i === 0 ? 'text-7xl xl:text-8xl' : 'text-5xl xl:text-6xl'}`}>
                    {stat.value}<span className={`text-[#32A3E6] mb-1 xl:mb-2 ${i === 0 ? 'text-5xl xl:text-6xl' : 'text-4xl xl:text-5xl'}`}>{stat.suffix}</span>
                  </div>
                  <div className="font-space text-[10px] xl:text-xs font-bold uppercase tracking-[0.2em] text-white/90">
                    {stat.title}
                  </div>
                  <p className="mt-2 text-white/60 text-xs xl:text-sm font-medium leading-relaxed line-clamp-4">
                    {stat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
