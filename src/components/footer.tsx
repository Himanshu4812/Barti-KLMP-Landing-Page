"use client";

import { Container } from "@/components/container";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";

// Custom SVG Social Icons to avoid missing exports in the installed Lucide version
function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
    { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
    { icon: TwitterIcon, href: "https://twitter.com", label: "Twitter" },
  ];

  return (
    <footer className="relative bg-[#0B1F3A] text-white pt-20 pb-8 border-t border-white/10 overflow-hidden">
      {/* Background Image with Dark Navy & Gold Radial Glow Overlays */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/images/library_footer_bg.webp"
          alt="Library Background"
          fill
          className="object-cover opacity-35"
          priority
        />
        {/* Lighter overlays to let the background library image show through clearly */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F3A]/45 via-[#0B1F3A]/75 to-[#0B1F3A]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(200,155,60,0.12),transparent_60%)]" />
      </div>

      <Container className="relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 pb-16">
          
          {/* Brand Logo & Description Column (Left) */}
          <div className="lg:col-span-2 space-y-6">
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
                </svg>
              </div>

              {/* Logo Text */}
              <div className="flex items-center gap-2">
                <span className="font-serif font-black tracking-tight text-white uppercase text-2xl">
                  BARTI
                </span>
                <div className="w-[1px] h-4 bg-white/20" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-white/90">
                    Knowledge & Library
                  </span>
                  <span className="text-[9px] uppercase tracking-wider font-semibold text-white/70 leading-none mt-0.5">
                    Management Platform
                  </span>
                </div>
              </div>
            </Link>

            <p className="text-sm text-white/70 leading-relaxed max-w-sm font-sans">
              BARTI Knowledge &amp; Library Management Platform (KLMP) is a state-of-the-art digital repository preserving Maharashtra&apos;s rich intellectual heritage, including Ambedkarite literature, constitutional studies, and social justice archives.
            </p>

            {/* Follow Us Section */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#C89B3C] font-sans">
                Follow Us
              </h4>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-9 h-9 rounded-full border border-white/10 hover:border-[#C89B3C] hover:text-[#C89B3C] flex items-center justify-center text-white/60 transition-all duration-300 bg-white/5 hover:bg-white/10"
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Subgrid of 3 Columns (Right) */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
            
            {/* Column 1: Our Modules */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#C89B3C] border-b border-white/10 pb-2 font-sans">
                Our Modules
              </h4>
              <ul className="space-y-2.5 text-sm text-white/70 font-sans">
                <li>
                  <Link href="#" className="hover:text-[#C89B3C] transition-colors">
                    Library Operations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#C89B3C] transition-colors">
                    Digital Repository
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#C89B3C] transition-colors">
                    Smart Discovery
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#C89B3C] transition-colors">
                    AI Intelligence
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Resources / Company */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#C89B3C] border-b border-white/10 pb-2 font-sans">
                Quick Links
              </h4>
              <ul className="space-y-2.5 text-sm text-white/70 font-sans">
                <li>
                  <Link href="/#objectives" className="hover:text-[#C89B3C] transition-colors">
                    Our Objectives
                  </Link>
                </li>
                <li>
                  <Link href="/#discovery" className="hover:text-[#C89B3C] transition-colors">
                    Knowledge Discovery
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#C89B3C] transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact Us */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#C89B3C] border-b border-white/10 pb-2 font-sans">
                Contact Us
              </h4>
              <div className="space-y-3.5 text-sm text-white/70 font-sans">
                <a 
                  href="mailto:library@barti.maharashtra.gov.in" 
                  className="flex items-center gap-2.5 hover:text-[#C89B3C] group transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#C89B3C] shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="truncate">library@barti.maharashtra.gov.in</span>
                </a>
                <a 
                  href="tel:+912223731100" 
                  className="flex items-center gap-2.5 hover:text-[#C89B3C] group transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#C89B3C] shrink-0 group-hover:scale-110 transition-transform" />
                  <span>+91 22 2373 1100</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left font-sans">
            <span>&copy; {currentYear} BARTI KLMP. All rights reserved.</span>
            <span className="hidden md:inline text-white/20">|</span>
            <span>
              Commissioned for{" "}
              <span className="text-[#C89B3C] font-semibold">
                Dr. Babasaheb Ambedkar Research &amp; Training Institute (BARTI), Pune
              </span>
            </span>
          </div>

          <div className="flex items-center gap-4 font-sans">
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span className="text-white/20">|</span>
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
