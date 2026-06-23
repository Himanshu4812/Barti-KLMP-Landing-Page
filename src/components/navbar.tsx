"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/features";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    window.history.scrollRestoration = "manual";
  }, []);

  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/") {
      document.documentElement.scrollTop = 0;
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 w-full pointer-events-none flex justify-center py-4 md:py-6 px-4 md:px-8"
    >
      <div className="relative w-full max-w-[1280px] flex flex-col items-center">
        {/* Main Floating Capsule */}
        <nav
          className={cn(
            "pointer-events-auto flex items-center justify-between w-full rounded-full border transition-all duration-500 ease-in-out",
            scrolled
              ? "h-16 px-6 bg-[#FAFAF8]/92 backdrop-blur-lg border-[#E4E7EC] shadow-[0_12px_30px_-6px_rgba(11,31,58,0.08)]"
              : "h-20 px-8 bg-[#FAFAF8]/75 backdrop-blur-md border-[#E4E7EC]/40 shadow-[0_8px_20px_-6px_rgba(11,31,58,0.03)]"
          )}
        >
          {/* Logo Brand Area */}
          <Link
            href="/"
            onClick={() => document.documentElement.scrollTop = 0}
            className="flex items-center gap-3 group shrink-0"
          >
            {/* Detailed Circular Golden Crest SVG representing BARTI logo */}
            <div
              className={cn(
                "relative flex-shrink-0 transition-all duration-500",
                scrolled ? "w-10 h-10" : "w-12 h-12"
              )}
            >
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#C89B3C]">
                {/* Outer Ring */}
                <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="50" cy="50" r="41" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
                {/* Inner Crest Core */}
                <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="1.5" />
                {/* Stylized Sunburst/Rays */}
                <path d="M50 22 L50 26 M50 74 L50 78 M22 50 L26 50 M74 50 L78 50 M30 30 L33 33 M70 70 L73 73 M30 70 L33 67 M70 30 L73 33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                {/* Center Star / Symbol */}
                <polygon points="50,38 53,46 62,46 55,51 58,60 50,55 42,60 45,51 38,46 47,46" fill="currentColor" />
                {/* Arch text placeholders */}
                <path id="arch-path" d="M24,50 A26,26 0 0,1 76,50" fill="none" />
                <path id="bottom-arch-path" d="M76,50 A26,26 0 0,1 24,50" fill="none" />
              </svg>
            </div>

            {/* Logo Text */}
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "font-serif font-black tracking-tight text-[#0B1F3A] uppercase transition-all duration-500",
                  scrolled ? "text-xl" : "text-2xl"
                )}
              >
                BARTI
              </span>
              <div className="w-[1px] h-4 bg-[#E4E7EC] hidden sm:block" />
              <div className="flex flex-col">
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#5E6573] hidden sm:block">
                  Knowledge & Library
                </span>
                <span className="text-[9px] uppercase tracking-wider font-semibold text-[#5E6573]/80 leading-none mt-0.5">
                  Management Platform
                </span>
              </div>
            </div>
          </Link>

          {/* Navigation Links - CENTER */}
          <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="w-[1px] h-6 bg-[#0B1F3A]/10 mx-6" />

            <div
              className="flex items-center gap-1.5"
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {NAV_LINKS.map((link, idx) => (
                <a
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  className="relative text-[13px] font-bold text-[#0B1F3A]/80 hover:text-[#0B1F3A] transition-colors duration-300 px-4 py-2 rounded-full tracking-wider uppercase"
                >
                  {hoveredIdx === idx && (
                    <motion.span
                      layoutId="nav-hover"
                      className="absolute inset-0 bg-[#C89B3C]/10 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </a>
              ))}
            </div>

            <div className="w-[1px] h-6 bg-[#0B1F3A]/10 mx-6" />
          </div>

          {/* CTA + Mobile Toggle - RIGHT */}
          <div className="flex items-center gap-4">
            <a
              href="#discovery"
              className="hidden lg:inline-flex items-center justify-center h-10 px-6 bg-[#0B1F3A] hover:bg-[#C89B3C] text-[#FAFAF8] hover:text-[#0B1F3A] text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-[0_4px_12px_rgba(11,31,58,0.1)] hover:shadow-[0_6px_16px_rgba(200,155,60,0.2)]"
            >
              Explore Collections
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 text-[#0B1F3A] hover:text-[#C89B3C] transition-colors rounded-full hover:bg-[#0B1F3A]/5"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer Menu (Floats right below the main capsule) */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute top-[calc(100%+12px)] left-0 right-0 bg-[#FAFAF8]/95 backdrop-blur-lg border border-[#E4E7EC] rounded-[24px] shadow-[0_20px_40px_rgba(11,31,58,0.15)] z-40 overflow-hidden pointer-events-auto p-6 flex flex-col gap-4"
            >
              <div className="flex flex-col">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      setMobileOpen(false);
                      if (link.href === "#features" && window.innerWidth < 768) {
                        e.preventDefault();
                        document.getElementById("features-mobile")?.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="block text-[#0B1F3A] text-sm font-bold uppercase tracking-wider hover:text-[#C89B3C] transition-colors py-3.5 border-b border-[#E4E7EC]/50 last:border-0"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="pt-2">
                <a
                  href="#discovery"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center w-full py-3.5 bg-[#0B1F3A] hover:bg-[#C89B3C] text-[#FAFAF8] hover:text-[#0B1F3A] text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300"
                >
                  Explore Collections
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
