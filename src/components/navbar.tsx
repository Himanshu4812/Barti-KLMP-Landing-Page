"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Platform", href: "#" },
  { label: "Roadmap", href: "#journey" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Discovery", href: "#discovery" },
  { label: "Contact", href: "#cta" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    window.history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full",
        scrolled 
          ? "bg-[#FAFAF8]/95 backdrop-blur-md border-b border-[#E4E7EC] shadow-sm" 
          : "bg-[#FAFAF8]/80 backdrop-blur-sm border-b border-[#E4E7EC]/50"
      )}
    >
      <div className="mx-auto max-w-[1440px] px-4 md:px-8">
        <nav className="flex items-center justify-between h-20 w-full max-w-[1280px] mx-auto">
          {/* Logo Brand Area */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Detailed Circular Golden Crest SVG representing BARTI logo */}
            <div className="relative w-12 h-12 flex-shrink-0">
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
              <span className="text-2xl font-serif font-black tracking-tight text-[#0B1F3A] uppercase">
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

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[14px] font-semibold text-[#0B1F3A]/85 hover:text-[#C89B3C] transition-all duration-300 relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C89B3C] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA Action Button */}
          <div className="hidden lg:flex items-center">
            <a
              href="#discovery"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0B1F3A] text-white hover:bg-[#C89B3C] hover:text-[#0B1F3A] text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 shadow-sm hover:shadow"
            >
              Explore KLMP
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-[#0B1F3A] hover:text-[#C89B3C] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#FAFAF8] border-t border-[#E4E7EC] overflow-hidden"
          >
            <div className="px-6 py-6 space-y-3 max-w-[1280px] mx-auto">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-[#0B1F3A] text-base font-semibold hover:text-[#C89B3C] transition-colors py-2.5 border-b border-[#F3F2EE]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#discovery"
                onClick={() => setMobileOpen(false)}
                className="block text-center px-5 py-3.5 bg-[#0B1F3A] text-white hover:bg-[#C89B3C] hover:text-[#0B1F3A] text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 mt-4"
              >
                Explore KLMP
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
