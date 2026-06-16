"use client";

import { Container } from "@/components/container";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1F3A] text-white py-8 border-t border-white/10 relative overflow-hidden">
      {/* Subtle light glow overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(200,155,60,0.02),transparent_70%)] pointer-events-none" />

      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          {/* Brand Logo & Copyright */}
          <div className="flex items-center gap-3">
            <Link href="/" className="font-serif font-black tracking-tight text-white text-sm hover:text-[#C89B3C] transition-colors uppercase">
              BARTI <span className="text-[#C89B3C]">KLMP</span>
            </Link>
            <div className="w-[1px] h-3 bg-white/20" />
            <span>&copy; {currentYear} All rights reserved.</span>
          </div>

          {/* Institutional Note */}
          <div className="flex items-center gap-1.5 text-center md:text-right">
            <span>Commissioned for</span>
            <span className="text-[#C89B3C] font-semibold">
              Dr. Babasaheb Ambedkar Research &amp; Training Institute (BARTI), Pune
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
