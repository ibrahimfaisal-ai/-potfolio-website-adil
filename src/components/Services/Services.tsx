"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { servicesData } from "./ServicesData";

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: gsap.Context;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        requestAnimationFrame(() => {
          ctx = gsap.context(() => {
            const panels = gsap.utils.toArray<HTMLElement>(".portal-layer");

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: `+=${(panels.length - 1) * 100}%`,
                scrub: 1.2,
                pin: true,
                anticipatePin: 1,
              },
            });

            panels.forEach((panel, i) => {
              if (i === 0) return;

              const currentContent = panel.querySelector(".portal-content");
              const prevContent = panels[i - 1].querySelector(".portal-content");

              tl.addLabel(`plunge-${i}`)
                .fromTo(panel,
                  { clipPath: "circle(0% at 50% 50%)" },
                  { clipPath: "circle(150% at 50% 50%)", ease: "none", duration: 1 },
                  `plunge-${i}`)
                .fromTo(currentContent,
                  { scale: 1.25, filter: "blur(5px)" },
                  { scale: 1, filter: "blur(0px)", ease: "power2.out", duration: 1 },
                  `plunge-${i}`)
                .to(prevContent,
                  { scale: 0.8, filter: "blur(8px)", opacity: 0, ease: "power2.in", duration: 1 },
                  `plunge-${i}`);
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
    <section id="services" className="relative z-20 bg-[#FAFAFA] clip-path-fix w-full">

      {/* 3D PORTAL PLUNGE (GSAP Pinned timeline bounds) */}
      <div
         ref={sectionRef}
         className="relative w-full h-screen overflow-hidden bg-[#FAFAFA]"
      >
         {servicesData.map((service, i) => (
            <div
               key={i}
               className={`portal-layer absolute inset-0 w-full h-full flex items-center justify-center ${service.theme.bg}`}
               style={{ zIndex: i + 1, clipPath: i === 0 ? "none" : "circle(0% at 50% 50%)" }}
            >
                <div className="portal-content relative w-full h-full flex flex-col items-center justify-center will-change-transform">
                   {service.isIntro ? (
                      /* INITIATION LAYER 0 */
                      <div className="max-w-[100rem] w-full px-6 md:px-12 xl:px-24 flex flex-col justify-center">
                         <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                           <span className="block w-8 md:w-16 h-px bg-[#32A3E6]" />
                          <span className="font-space text-sm md:text-lg font-bold uppercase tracking-[0.2em] text-[#32A3E6]">What I Do</span>
                         </div>
                         <h2 className="font-corpta text-[10.5vw] md:text-[12vw] xl:text-[10vw] font-medium uppercase tracking-tighter leading-[0.82] mb-8 md:mb-12 text-[#111111]">
                          THE<br/>SERVICES.
                         </h2>
                         <p className="max-w-3xl text-[#555555] text-lg md:text-3xl font-medium leading-relaxed">
                          Ad creative that looks real and sells. Every service is built with Seedance and grounded in consumer psychology.
                         </p>
                      </div>
                   ) : (
                      /* SERVICE LAYERS 1-4 */
                      <div className="w-full h-full max-w-[120rem] mx-auto px-6 md:px-12 xl:px-24 flex flex-col justify-center">
                         {/* Gargantuan Dimensional Watermark Text */}
                         <span className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-space font-black text-[clamp(6rem,18vw,24rem)] whitespace-nowrap opacity-[0.03] select-none pointer-events-none tracking-tighter ${service.theme.text} mix-blend-normal`}>
                           {service.watermark}
                         </span>

                         {/* The heading column takes whatever the copy column leaves, and the
                             heading scales with the viewport so its longest word ("COMMERCIALS",
                             ~7.4em wide) always fits inside it instead of running under the copy. */}
                         <div className="relative z-10 w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-12 mt-12 lg:mt-32">
                            <div className="flex flex-col gap-6 lg:gap-12 w-full md:w-auto md:flex-1 md:min-w-0 max-w-4xl">
                               <span className={`inline-flex px-4 md:px-6 py-2 rounded-full border ${service.theme.tagStyle} font-space text-xs md:text-sm font-bold uppercase tracking-widest backdrop-blur-md w-fit`}>
                                  {service.tag}
                               </span>
                               <h3 className={`font-corpta text-[11.5vw] sm:text-[9vw] md:text-[clamp(2.5rem,calc(7.5vw-1.25rem),7rem)] font-medium uppercase ${service.theme.text} leading-[0.85] tracking-tighter mix-blend-normal pb-2`}>
                                  {service.name}
                               </h3>
                            </div>
                            <div className="flex flex-col w-full md:w-[30%] md:min-w-[280px] md:max-w-md md:shrink-0 gap-3 md:gap-6 max-w-lg">
                               <span className={`font-space text-lg lg:text-2xl font-bold ${service.theme.accent} uppercase tracking-widest opacity-90`}>
                                  {service.deliverables}
                               </span>
                               <p className={`text-base md:text-xl font-medium leading-relaxed ${service.theme.text} opacity-80 mt-1 md:mt-2`}>
                                  {service.description}
                               </p>
                            </div>
                         </div>
                      </div>
                   )}
                </div>
            </div>
         ))}
      </div>
    </section>
  );
}
