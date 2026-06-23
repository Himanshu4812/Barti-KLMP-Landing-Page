"use client";

import { useRef } from "react";
import { ChevronRight } from "lucide-react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.currentTime >= 7) {
      video.currentTime = 0;
    }
  };

  return (
    <section className="relative min-h-[90vh] md:min-h-screen w-full bg-[#FAFAF8] overflow-hidden pt-[140px]">
      
      {/* Right Side - Cinematic Warm Library Background */}
      <div className="absolute top-0 right-0 w-full lg:w-[65%] h-full bg-[#FAFAF8] pointer-events-none z-0">
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            autoPlay
            onTimeUpdate={handleTimeUpdate}
            className="absolute inset-0 w-full h-full object-cover object-right opacity-40 lg:opacity-95"
            suppressHydrationWarning
          >
            <source src="/images/page_turn.webm" type="video/webm" />
          </video>
          {/* Cinematic lighting enhancement overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAF8]/95 via-[#FAFAF8]/70 to-[#FAFAF8]/95 lg:bg-gradient-to-r lg:from-[#FAFAF8] lg:via-transparent lg:to-transparent" />
          <div className="absolute inset-0 bg-amber-950/5 mix-blend-color-burn" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
          
          {/* Curved Organic Divider SVG */}
          <div className="absolute top-0 bottom-0 left-0 w-[200px] z-10 hidden lg:block pointer-events-none">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-[#FAFAF8] fill-current">
              <path d="M0,0 L45,0 C85,20 85,80 45,100 L0,100 Z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-start max-w-[1400px] mx-auto pb-10 lg:pb-16">
          
          {/* Left Column - Content */}
          <div className="w-full lg:w-[35%] flex flex-col justify-center space-y-8 pr-0 lg:pr-8 text-left">

            {/* Tagline */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C89B3C] block">
                EMPOWERING KNOWLEDGE. ENABLING IMPACT. —
              </span>
            </div>

            {/* Headline */}
            <h1 className="hero-heading text-[#0B1F3A] leading-[0.95] tracking-tight">
              <span className="whitespace-nowrap">
                <span className="font-serif font-black">BARTI</span>{" "}
                <span className="italic text-[#C89B3C] font-serif font-normal">
                  Knowledge
                </span>
              </span>
              <br />
              <span className="whitespace-nowrap">
                &amp; Library Management
              </span>
              <br />
              Platform
            </h1>

            {/* Subheadline */}
            <p className="body-text-custom text-[#5E6573] max-w-[540px]">
              A unified digital ecosystem to preserve, discover and disseminate knowledge for social transformation.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-6 pt-2">
              <a
                href="#features"
                onClick={(e) => {
                  if (window.innerWidth < 768) {
                    e.preventDefault();
                    document.getElementById("features-mobile")?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0B1F3A] text-white hover:bg-[#C89B3C] hover:text-[#0B1F3A] text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow"
              >
                Explore Features
                <ChevronRight size={16} />
              </a>
          </div>

        </div>


        </div>
      </div>

    </section>
  );
}
