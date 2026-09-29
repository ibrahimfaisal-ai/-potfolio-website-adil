"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import mindImage from "@/public/hero/hero-illustration.webp";
import artistImage from "@/public/hero/hero-photo.webp";

gsap.registerPlugin(ScrollTrigger);
const INTERACTIVE_BREAKPOINT = 1024;
const HERO_IMAGE_SIZES =
  "(max-width: 640px) 88vw, (max-width: 1024px) 76vw, (max-width: 1280px) 66vw, 58vw";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Hero refs
  const heroContentRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLParagraphElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const bgTextRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLHeadingElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const leftWatermarkRef = useRef<HTMLDivElement>(null);
  const rightWatermarkRef = useRef<HTMLDivElement>(null);
  const baseLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const validLetters = lettersRef.current.filter(Boolean);
      const introTl = gsap.timeline();

      if (greetingRef.current) gsap.set(greetingRef.current, { yPercent: 100 });
      if (validLetters.length > 0)
        gsap.set(validLetters, { yPercent: 100, opacity: 0 });
      gsap.set([subheadlineRef.current], { autoAlpha: 0, y: 20 });

      // The photograph is the full-bust base layer and is never masked. It supplies
      // the body on both sides of the split. Only the illustration is clipped.
      if (baseLayerRef.current)
        gsap.set(baseLayerRef.current, { autoAlpha: 0, y: 30 });
      if (overlayRef.current)
        gsap.set(overlayRef.current, {
          autoAlpha: 0,
          y: 30,
          clipPath: "polygon(50.6% 0%, 100% 0%, 100% 100%, 50.6% 100%)",
          webkitClipPath: "polygon(50.6% 0%, 100% 0%, 100% 100%, 50.6% 100%)",
        });

      if (greetingRef.current) {
        introTl.to(greetingRef.current, {
          yPercent: 0,
          duration: 1.2,
          ease: "power4.out",
        });
      }

      if (validLetters.length > 0) {
        introTl.to(
          validLetters,
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power4.out",
            stagger: 0.1,
          },
          "-=0.9"
        );
      }

      introTl.to(
        [baseLayerRef.current, overlayRef.current],
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.5,
          ease: "power4.out",
        },
        "-=1.2"
      );

      introTl.to(
        [subheadlineRef.current],
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=1.2"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (window.innerWidth < INTERACTIVE_BREAKPOINT) return;

    let clientX = 0;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = (e as React.MouseEvent).clientX;
    }

    const { innerWidth } = window;
    const xPercentage = (clientX / innerWidth) * 100;
    const maskPercentage = 100 - xPercentage;

    // Slide the illustration's left edge; the photograph underneath is untouched.
    gsap.to(overlayRef.current, {
      clipPath: `polygon(${maskPercentage}% 0%, 100% 0%, 100% 100%, ${maskPercentage}% 100%)`,
      webkitClipPath: `polygon(${maskPercentage}% 0%, 100% 0%, 100% 100%, ${maskPercentage}% 100%)`,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });

    // Subtle parallax image shift
    const normalizedX = (clientX / innerWidth) * 2 - 1;
    const maxShift = 100;
    if (imageContainerRef.current) {
      gsap.to(imageContainerRef.current, {
        x: normalizedX * -maxShift,
        duration: 0.8,
        ease: "power3.out",
        overwrite: "auto",
      });
    }

    // Content fade animation based on cursor side
    let leftOp = 1;
    let rightOp = 1;
    let leftWmOp = 0.12;
    let rightWmOp = 0.12;

    if (xPercentage < 45) {
      leftOp = 1;
      rightOp = 0;
      leftWmOp = 0.25;
      rightWmOp = 0;
    } else if (xPercentage > 55) {
      leftOp = 0;
      rightOp = 1;
      leftWmOp = 0;
      rightWmOp = 0.25;
    }

    if (innerWidth >= INTERACTIVE_BREAKPOINT) {
      if (leftTextRef.current)
        gsap.to(leftTextRef.current, {
          opacity: leftOp,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      if (rightTextRef.current)
        gsap.to(rightTextRef.current, {
          opacity: rightOp,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      if (leftWatermarkRef.current)
        gsap.to(leftWatermarkRef.current, {
          opacity: leftWmOp,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      if (rightWatermarkRef.current)
        gsap.to(rightWatermarkRef.current, {
          opacity: rightWmOp,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < INTERACTIVE_BREAKPOINT) return;

    // Reset image mask
    gsap.to(overlayRef.current, {
      clipPath: "polygon(50.6% 0%, 100% 0%, 100% 100%, 50.6% 100%)",
      webkitClipPath: "polygon(50.6% 0%, 100% 0%, 100% 100%, 50.6% 100%)",
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto",
    });

    // Reset parallax image shift
    if (imageContainerRef.current) {
      gsap.to(imageContainerRef.current, {
        x: 0,
        duration: 0.8,
        ease: "power3.out",
        overwrite: "auto",
      });
    }

    // Reset content opacity only on desktop
    if (window.innerWidth >= INTERACTIVE_BREAKPOINT) {
      if (leftTextRef.current)
        gsap.to(leftTextRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      if (rightTextRef.current)
        gsap.to(rightTextRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      if (leftWatermarkRef.current)
        gsap.to(leftWatermarkRef.current, {
          opacity: 0.12,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      if (rightWatermarkRef.current)
        gsap.to(rightWatermarkRef.current, {
          opacity: 0.12,
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto",
        });
    }
  };

  const title = "MUHAMMAD ADIL";

  return (
    <div className="w-full relative">
      <section
        id="hero"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseLeave}
        className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#ffffff] touch-pan-y"
      >
        {/* ======================= */}
        {/* BACKGROUND TEXT         */}
        {/* ======================= */}
        <div className="hidden absolute inset-0 z-[35] w-full h-full flex items-start pt-[35vh] sm:pt-0 sm:items-center justify-center pointer-events-none overflow-hidden">
          <h1
            ref={bgTextRef}
            className="font-corpta flex text-[20vw] md:text-[clamp(8rem,19vw,28rem)] font-medium leading-none tracking-tighter text-[#111111] uppercase whitespace-nowrap opacity-[0.25] md:opacity-[0.15]"
          >
            {title.split("").map((char, index) => (
              <span
                key={index}
                ref={(el) => {
                  if (el) lettersRef.current[index] = el;
                }}
                className="inline-block"
              >
                {char === " " ? " " : char}
              </span>
            ))}
          </h1>
        </div>
        <div
          ref={imageContainerRef}
          className="absolute inset-x-0 bottom-0 z-[40] flex justify-center 
            h-[48vh] sm:h-[50vh] md:h-[52vh] lg:h-[58vh] xl:h-[85vh] 
            pointer-events-none"
        >
          {/* Base layer: the photograph, full bust, never masked. It carries the
              body that both halves of the split share. */}
          <div ref={baseLayerRef} className="absolute inset-0 w-full h-full">
            <Image
              src={artistImage}
              alt="Muhammad Adil - AI commercials expert portrait"
              fill
              priority
              placeholder="empty"
              sizes={HERO_IMAGE_SIZES}
              draggable={false}
              className="z-0 object-contain object-bottom"
            />

            {/* Craft watermark, mirrored to the left of the split. */}
            <div
              ref={leftWatermarkRef}
              className="hidden md:block absolute z-10 bottom-[8vh]
                right-[calc(50%+11vh)] md:max-lg:right-[calc(50%+4vh)] lg:right-[calc(50%+13vh)]
                text-[#111] opacity-[0.12] font-mono font-bold
                text-base lg:text-xl leading-[1.5] lg:leading-[1.8]
                whitespace-pre select-none tracking-widest text-left"
            >
              {`<Seedance.Render>
  shot.ugc("handheld")
  hook.within(3s)
  return feels_real()
<AICommercial/>`}
            </div>
          </div>

          {/* Overlay layer: the illustration, sitting on top of the photograph and
              masked to everything right of the split. Its head is registered to the
              photograph's, so the two halves read as one face. */}
          <div
            ref={overlayRef}
            className="absolute inset-0 w-full h-full"
            style={{
              clipPath: "polygon(50.6% 0%, 100% 0%, 100% 100%, 50.6% 100%)",
              WebkitClipPath: "polygon(50.6% 0%, 100% 0%, 100% 100%, 50.6% 100%)",
            }}
          >
            <Image
              src={mindImage}
              alt="Muhammad Adil - consumer psychology portrait illustration"
              fill
              loading="eager"
              fetchPriority="high"
              placeholder="empty"
              sizes={HERO_IMAGE_SIZES}
              draggable={false}
              className="z-0 object-contain object-bottom"
            />

            {/* Behavioural watermark, revealed with the illustration. */}
            <div
              ref={rightWatermarkRef}
              className="hidden md:block absolute z-10 bottom-[8vh] left-[calc(50%+18vh)] lg:left-[calc(50%+22vh)]
                text-[#111] opacity-[0.12] font-sans font-bold
                text-base lg:text-xl leading-[1.5] lg:leading-[1.8]
                whitespace-pre select-none tracking-widest text-left"
            >
              {`{ trigger: "social_proof" }
emotion.map(buyer)
desire.before(price)
{ trust: "earned" }
<Psychology/>`}
            </div>
          </div>
        </div>

        {/* ======================= */}
        {/* FOREGROUND CONTENT      */}
        {/* ======================= */}
        {/*
          z-index 45: text above the image. Below lg, copy sits low in the top band
          (padding-bottom matches image height) so it sits just above the portrait;
          at lg+ the side-by-side flanking layout returns.
        */}
        <div
          ref={heroContentRef}
          className="absolute inset-0 z-[45] w-full h-full pointer-events-none"
        >
          <div
            className="relative w-full max-w-[90rem] mx-auto h-full px-6 lg:px-16 
              flex flex-col lg:flex-row items-center 
              max-lg:justify-end max-lg:pt-4 max-sm:pt-2 
              max-lg:pb-[48vh] sm:max-lg:pb-[50vh] md:max-lg:pb-[52vh] 
              lg:justify-between lg:pt-0 lg:pb-0"
          >
            {/* ===== LEFT BOX ===== */}
            {/*
              On mobile/tablet/small-desktop (below xl): This acts as the UNIFIED
              content block centered at the top. It contains both titles merged.
              On lg+: This is the left-flanking block with only "AI Commercials Expert".
            */}
            <div
              ref={leftTextRef}
              className="z-50 pointer-events-auto w-full lg:w-auto lg:max-w-[520px] 
                flex justify-center lg:justify-start 
                lg:mb-0 lg:-mt-[5vh] cursor-pointer"
            >
              <div className="hero-scroll-primary w-full text-center lg:text-left">
                <div className="overflow-hidden">
                  <h2
                    ref={greetingRef}
                    className="font-corpta 
                      text-[clamp(1.35rem,6.5vw,1.8rem)] 
                      sm:text-[clamp(1.6rem,5vw,2.1rem)] 
                      md:text-[clamp(1.8rem,4vw,2.4rem)] 
                      lg:text-[clamp(2rem,3.5vw,2.8rem)] 
                      xl:text-[4rem] 
                      tracking-[-0.02em] text-[#32A3E6] font-medium 
                      mb-2 sm:mb-3 md:mb-4 pb-[0.14em]
                      leading-[0.96] uppercase drop-shadow-md"
                  >
                    {/* Combined title shown below xl */}
                    <span className="lg:hidden">
                      &lt;AI COMMERCIALS EXPERT&gt;{" "}
                      <span className="text-[#a0a0a0] font-light text-[1.1rem] sm:text-[1.4rem] md:text-[1.6rem] lg:text-[1.8rem]">
                        &
                      </span>
                      <br />
                      Psychology-led ad creative
                    </span>
                    {/* Left-only title shown at xl+ */}
                    <span className="hidden lg:inline">
                      &lt;AI COMMERCIALS EXPERT&gt;
                    </span>
                  </h2>
                </div>
                <div className="overflow-hidden">
                  <p
                    className="font-sans 
                      text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[18px] 
                      text-[#8a8a8a] font-light leading-[1.52] 
                      max-w-[260px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[320px] 
                      mx-auto lg:mx-0"
                  >
                    <span>
                      Most AI ads look fake. Mine don&apos;t. Seedance video ads
                      and AI commercials that feel like real creator footage.
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* ===== RIGHT BOX ===== */}
            {/*
              Only visible at xl+ where there's room for the side-by-side layout.
              Contains the "Master's in Psychology" content.
            */}
            <div
              ref={rightTextRef}
              className="hidden lg:flex z-50 pointer-events-auto lg:w-[36%] xl:w-[32%] 2xl:w-[30%] 
                justify-end lg:pl-8 xl:pl-10 lg:-mt-[5vh] cursor-pointer lg:translate-x-12"
            >
              <div
                ref={subheadlineRef}
                className="hero-scroll-primary w-full text-center sm:text-right"
              >
                <h2
                  className="font-corpta 
                    lg:text-[2.1rem] xl:text-[2.5rem] 2xl:text-[2.7rem]
                    tracking-[-0.02em] text-[#32A3E6] font-medium 
                    mb-3 md:mb-5 leading-[1.05] uppercase drop-shadow-md"
                >
                  Master&apos;s
                  <br />
                  in
                  <br />
                  Psychology
                </h2>
                <p className="font-sans lg:text-[17px] xl:text-[19px] text-[#909090] font-light leading-[1.6] max-w-[320px] ml-auto mr-0">
                  Buyer triggers, emotion and trust, built into every ad so it
                  converts on Meta, TikTok and Instagram.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ======================= */}
        {/* CLOUDS FOR TRANSITION   */}
        {/* ======================= */}
        <div className="cloud-wrapper absolute inset-0 z-[30] pointer-events-none overflow-visible">
          {/* BACK CLOUD LAYER (Depth) */}
          <div className="cloud-layer-back absolute inset-0 origin-bottom">
            <div className="absolute bottom-[-10vh] left-[-10vw] right-[-10vw] h-[18vh] bg-[#e6e6e6]"></div>
            <div className="absolute rounded-full bg-[#e6e6e6] w-[50vw] h-[50vw] md:w-[20vw] md:h-[20vw] -left-[20vw] md:-left-[8vw] -bottom-[18vw] md:-bottom-[7vw]"></div>
            <div className="absolute rounded-full bg-[#e6e6e6] w-[65vw] h-[65vw] md:w-[26vw] md:h-[26vw] -left-[30vw] md:-left-[12vw] -bottom-[38vw] md:-bottom-[15vw]"></div>
            <div className="absolute rounded-full bg-[#e6e6e6] w-[55vw] h-[55vw] md:w-[22vw] md:h-[22vw] left-[10vw] md:left-[4vw] -bottom-[35vw] md:-bottom-[14vw]"></div>
            <div className="absolute rounded-full bg-[#e6e6e6] w-[70vw] h-[70vw] md:w-[28vw] md:h-[28vw] left-[30vw] md:left-[21vw] -bottom-[48vw] md:-bottom-[19vw]"></div>
            <div className="absolute rounded-full bg-[#e6e6e6] w-[85vw] h-[85vw] md:w-[34vw] md:h-[34vw] left-[15vw] md:left-[41vw] -bottom-[60vw] md:-bottom-[24vw]"></div>
            <div className="absolute rounded-full bg-[#e6e6e6] w-[60vw] h-[60vw] md:w-[24vw] md:h-[24vw] right-[5vw] md:right-[19vw] -bottom-[38vw] md:-bottom-[15vw]"></div>
            <div className="absolute rounded-full bg-[#e6e6e6] w-[45vw] h-[45vw] md:w-[18vw] md:h-[18vw] right-[12vw] md:right-[5vw] -bottom-[22vw] md:-bottom-[9vw]"></div>
            <div className="absolute rounded-full bg-[#e6e6e6] w-[75vw] h-[75vw] md:w-[30vw] md:h-[30vw] -right-[30vw] md:-right-[12vw] -bottom-[48vw] md:-bottom-[19vw]"></div>
            <div className="absolute rounded-full bg-[#e6e6e6] w-[55vw] h-[55vw] md:w-[22vw] md:h-[22vw] -right-[20vw] md:-right-[8vw] -bottom-[28vw] md:-bottom-[11vw]"></div>
          </div>

          {/* FRONT CLOUD LAYER */}
          <div className="cloud-layer-front absolute inset-0 origin-bottom">
            <div className="absolute bottom-[-10vh] left-[-10vw] right-[-10vw] h-[15vh] bg-[#f2f2f2]"></div>
            <div className="absolute rounded-full bg-[#f2f2f2] w-[45vw] h-[45vw] md:w-[18vw] md:h-[18vw] -left-[20vw] md:-left-[8vw] -bottom-[20vw] md:-bottom-[8vw]"></div>
            <div className="absolute rounded-full bg-[#f2f2f2] w-[60vw] h-[60vw] md:w-[24vw] md:h-[24vw] -left-[30vw] md:-left-[12vw] -bottom-[40vw] md:-bottom-[16vw]"></div>
            <div className="absolute rounded-full bg-[#f2f2f2] w-[50vw] h-[50vw] md:w-[20vw] md:h-[20vw] left-[12vw] md:left-[5vw] -bottom-[38vw] md:-bottom-[15vw]"></div>
            <div className="absolute rounded-full bg-[#f2f2f2] w-[65vw] h-[65vw] md:w-[26vw] md:h-[26vw] left-[35vw] md:left-[22vw] -bottom-[50vw] md:-bottom-[20vw]"></div>
            <div className="absolute rounded-full bg-[#f2f2f2] w-[80vw] h-[80vw] md:w-[32vw] md:h-[32vw] left-[20vw] md:left-[42vw] -bottom-[62vw] md:-bottom-[25vw]"></div>
            <div className="absolute rounded-full bg-[#f2f2f2] w-[55vw] h-[55vw] md:w-[22vw] md:h-[22vw] right-[10vw] md:right-[20vw] -bottom-[40vw] md:-bottom-[16vw]"></div>
            <div className="absolute rounded-full bg-[#f2f2f2] w-[40vw] h-[40vw] md:w-[16vw] md:h-[16vw] right-[15vw] md:right-[6vw] -bottom-[25vw] md:-bottom-[10vw]"></div>
            <div className="absolute rounded-full bg-[#f2f2f2] w-[70vw] h-[70vw] md:w-[28vw] md:h-[28vw] -right-[30vw] md:-right-[12vw] -bottom-[50vw] md:-bottom-[20vw]"></div>
            <div className="absolute rounded-full bg-[#f2f2f2] w-[50vw] h-[50vw] md:w-[20vw] md:h-[20vw] -right-[20vw] md:-right-[8vw] -bottom-[30vw] md:-bottom-[12vw]"></div>
          </div>
        </div>
      </section>
    </div>
  );
}