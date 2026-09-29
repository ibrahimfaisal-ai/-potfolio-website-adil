"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

/** Smooth-scroll to a section id; retries while the node is missing (e.g. dynamic imports). */
function scrollToAnchorId(id: string) {
  const maxAttempts = 40;
  const intervalMs = 50;
  let attempt = 0;
  const run = () => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      return;
    }
    attempt += 1;
    if (attempt < maxAttempts) {
      setTimeout(run, intervalMs);
    }
  };
  run();
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const logoLettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // Cross-page navigation scroll fix for App Router
    if (pathname === "/" && typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.slice(1);
      setTimeout(() => scrollToAnchorId(id), 0);
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScrollTarget = () => {
      const sectionIds = ["about", "services", "work", "contact"];
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Active if the section's top is past the upper third of the screen
          // and the section hasn't completely scrolled out of view.
          if (rect.top <= window.innerHeight / 3 && rect.bottom >= 100) {
            current = id;
          }
        }
      }

      if (current) {
        setActiveSection(current);
      } else if (window.scrollY < 200) {
        // If we are at the very top, clear active section
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScrollTarget, { passive: true });

    // Set initial active state if loaded with hash
    if (window.location.hash) {
      setActiveSection(window.location.hash.slice(1));
    } else {
      handleScrollTarget();
    }

    return () => window.removeEventListener("scroll", handleScrollTarget);
  }, []);

  const handleLogoEnter = () => {
    gsap.fromTo(
      logoLettersRef.current,
      { yPercent: -4 },
      { yPercent: 0, duration: 0.3, stagger: 0.04, ease: "back.out(3)", overwrite: "auto" }
    );
  };

  const closeMobileMenu = () => setIsMobileOpen(false);

  const logoText = "MUHAMMAD ADIL";

  return (
    <>
      <nav
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[calc(100%-2rem)] md:w-auto rounded-2xl md:rounded-full bg-[#ffffff]/80 backdrop-blur-xl border border-[#e6e6e6] shadow-sm ${scrolled
          ? "top-3 sm:top-4 py-2 sm:py-3"
          : "top-4 sm:top-6 py-3 sm:py-4"
          }`}
      >
        <div className="w-full h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between md:justify-center md:gap-16 lg:gap-32">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2"
            onMouseEnter={handleLogoEnter}
          >
            <span className="flex font-corpta text-xl sm:text-2xl font-medium text-[#111111] tracking-tighter uppercase drop-shadow-sm mix-blend-multiply">
              {logoText.split("").map((char, index) => (
                <span
                  key={index}
                  ref={(el) => { if (el) logoLettersRef.current[index] = el; }}
                  className="inline-block"
                >
                  {char === " " ? " " : char}
                </span>
              ))}
            </span>
            <span className="h-2 w-2 rounded-full bg-[#32A3E6] shadow-[0_0_8px_#32A3E6]" />
          </Link>

          {/* Centre nav links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {[
              { name: "About", href: "/#about" },
              { name: "Services", href: "/#services" },
              { name: "Work", href: "/#work" },
            ].map((item) => {
              const isActive = item.href.startsWith("/#")
                ? activeSection === item.href.split("#")[1]
                : pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    if (item.href.startsWith("/#")) {
                      const id = item.href.split("#")[1];
                      setActiveSection(id);
                      if (pathname === "/") {
                        e.preventDefault();
                        scrollToAnchorId(id);
                        window.history.pushState(null, "", `/#${id}`);
                      }
                    }
                  }}
                  className="relative flex flex-col items-center group mix-blend-multiply"
                >
                  <span className={`whitespace-nowrap text-sm font-medium transition-colors duration-300 ${isActive ? "text-[#111111]" : "text-[#555555] group-hover:text-[#111111]"
                    }`}>
                    {item.name}
                  </span>
                  {/* Active Indicator Line */}
                  <span
                    className={`absolute -bottom-[6px] left-0 w-full h-[2px] rounded-full bg-[#32A3E6] shadow-[0_0_8px_#32A3E6] transition-transform duration-300 origin-center ${isActive ? "scale-x-100" : "scale-x-0"}`}
                  />
                </Link>
              );
            })}
            <div className="relative flex flex-col items-center group ml-2 lg:ml-4 block p-1">
              <Link
                href="/contact"
                className="whitespace-nowrap rounded-full bg-[#111111] px-5 py-2 text-sm font-semibold text-[#ffffff] transition-all duration-300 hover:bg-[#32A3E6] hover:text-[#111111] hover:shadow-[0_0_15px_#32A3E6]"
              >
                Let&apos;s Talk
              </Link>

            </div>
          </div>

          {/* Mobile Nav Toggle */}
          <button
            className="relative md:hidden flex flex-col items-center justify-center w-8 h-8 z-[60] focus:outline-none mix-blend-multiply"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle mobile menu"
          >
            <span className={`block absolute h-0.5 w-6 bg-[#111111] transition-transform duration-300 ease-in-out ${isMobileOpen ? 'rotate-45' : '-translate-y-1.5'}`} />
            <span className={`block absolute h-0.5 w-6 bg-[#111111] transition-opacity duration-300 ease-in-out ${isMobileOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`block absolute h-0.5 w-6 bg-[#111111] transition-transform duration-300 ease-in-out ${isMobileOpen ? '-rotate-45' : 'translate-y-1.5'}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-[55] md:hidden transition-opacity duration-300 ${isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <div
          className="absolute inset-0 bg-[#ffffff]/90 backdrop-blur-xl"
          onClick={closeMobileMenu}
        />

        {/* Drawer Menu */}
        <div
          className={`absolute top-0 right-0 w-full sm:w-[80%] max-w-sm h-full bg-[#ffffff] border-l border-[#e6e6e6]/50 flex flex-col justify-center px-12 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isMobileOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* Dedicated Close Button */}
          <button 
            onClick={closeMobileMenu}
            className="absolute top-6 right-6 sm:top-8 sm:right-8 w-12 h-12 flex items-center justify-center rounded-full bg-[#f5f5f5] text-[#111111] hover:bg-[#e0e0e0] transition-colors focus:outline-none"
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className="flex flex-col gap-10">
            {[
              { name: "About", href: "/#about" },
              { name: "Services", href: "/#services" },
              { name: "Work", href: "/#work" },
              { name: "Contact", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  closeMobileMenu();
                  if (item.href.startsWith("/#")) {
                    const id = item.href.split("#")[1];
                    setActiveSection(id);
                    if (pathname === "/") {
                      e.preventDefault();
                      scrollToAnchorId(id);
                      window.history.pushState(null, "", `/#${id}`);
                    }
                  }
                }}
                className="font-space text-3xl font-black uppercase text-[#111111] hover:text-[#32A3E6] hover:drop-shadow-[0_0_8px_rgba(50,163,230,0.5)] transition-all"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
