"use client";

import { motion } from "framer-motion";
import { Search, Play, BookOpen, Building2, Scale, FileText, Landmark, ChevronRight } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen w-full bg-[#FAFAF8] overflow-hidden pt-[96px]">
      
      {/* Right Side - Cinematic Warm Library Background */}
      <div className="absolute top-0 right-0 w-full lg:w-[65%] h-full bg-[#FAFAF8] hidden lg:block pointer-events-none z-0">
        <div className="relative w-full h-full">
          <Image 
            src="/images/library_hero_bg.png" 
            alt="BARTI Library Background"
            fill
            className="object-cover object-right opacity-95"
            priority
          />
          {/* Cinematic lighting enhancement overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAF8] via-transparent to-transparent" />
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
                BARTI{" "}
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
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <a
                href="#discovery"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0B1F3A] text-white hover:bg-[#C89B3C] hover:text-[#0B1F3A] text-sm font-bold uppercase tracking-wider rounded-lg transition-all duration-300 shadow-sm hover:shadow"
              >
                Explore Collections
                <ChevronRight size={16} />
              </a>
              
              <button
                onClick={() => document.getElementById("journey")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-[#0B1F3A] hover:text-[#C89B3C] transition-all duration-300"
              >
                <span className="w-10 h-10 rounded-full bg-white border border-[#E4E7EC] flex items-center justify-center text-[#0B1F3A] group shadow-sm hover:border-[#C89B3C] transition-colors duration-300">
                  <Play size={14} className="fill-[#0B1F3A] stroke-[#0B1F3A] translate-x-[1px]" />
                </span>
                Watch Overview
              </button>
            </div>

          </div>

          {/* Right Column - Large Interactive Library Card Search Widget */}
          <div className="w-full lg:w-[65%] flex justify-center lg:justify-end pt-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="relative w-full max-w-[540px] bg-white border border-[#E4E7EC]/85 rounded-[18px] shadow-[0_8px_24px_rgba(0,0,0,0.08)] p-6 md:p-8 space-y-6"
            >
              
              {/* Header Bar */}
              <div className="flex justify-between items-center pb-2 border-b border-[#E4E7EC]">
                <span className="text-[11px] font-bold tracking-widest text-[#5E6573] uppercase">
                  BARTI DIGITAL REPOSITORY
                </span>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search knowledge, books, authors, topics..."
                  className="w-full bg-[#FAFAF8] border border-[#E4E7EC] rounded-xl pl-5 pr-12 py-3.5 text-sm text-[#0B1F3A] placeholder-[#5E6573]/60 focus:outline-none focus:border-[#C89B3C] focus:bg-white transition-all duration-300"
                  readOnly
                />
                <Search size={18} className="absolute right-4 top-4 text-[#5E6573] cursor-pointer hover:text-[#C89B3C] transition-colors" />
              </div>

              {/* Explore Collections Grid */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B1F3A]">
                    Explore Collections
                  </h3>
                  <a href="#discovery" className="text-[10px] font-bold text-[#C89B3C] uppercase tracking-wider hover:underline">
                    View all
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-3.5">
                  {/* Category 1 */}
                  <a href="#discovery" className="flex items-center gap-3 p-3 rounded-xl bg-[#FAFAF8] border border-[#E4E7EC]/60 hover:border-[#C89B3C] hover:bg-white hover:shadow-sm transition-all duration-300 group">
                    <span className="w-8 h-8 rounded-lg bg-[#F97316]/10 text-[#F97316] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <BookOpen size={15} />
                    </span>
                    <span className="text-xs font-bold text-[#0B1F3A] truncate">Ambedkar Literature</span>
                  </a>
                  {/* Category 2 */}
                  <a href="#discovery" className="flex items-center gap-3 p-3 rounded-xl bg-[#FAFAF8] border border-[#E4E7EC]/60 hover:border-[#C89B3C] hover:bg-white hover:shadow-sm transition-all duration-300 group">
                    <span className="w-8 h-8 rounded-lg bg-[#C89B3C]/10 text-[#C89B3C] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <Landmark size={15} />
                    </span>
                    <span className="text-xs font-bold text-[#0B1F3A] truncate">Constitutional Studies</span>
                  </a>
                  {/* Category 3 */}
                  <a href="#discovery" className="flex items-center gap-3 p-3 rounded-xl bg-[#FAFAF8] border border-[#E4E7EC]/60 hover:border-[#C89B3C] hover:bg-white hover:shadow-sm transition-all duration-300 group">
                    <span className="w-8 h-8 rounded-lg bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <Scale size={15} />
                    </span>
                    <span className="text-xs font-bold text-[#0B1F3A] truncate">Social Justice</span>
                  </a>
                  {/* Category 4 */}
                  <a href="#discovery" className="flex items-center gap-3 p-3 rounded-xl bg-[#FAFAF8] border border-[#E4E7EC]/60 hover:border-[#C89B3C] hover:bg-white hover:shadow-sm transition-all duration-300 group">
                    <span className="w-8 h-8 rounded-lg bg-[#EF4444]/10 text-[#EF4444] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <FileText size={15} />
                    </span>
                    <span className="text-xs font-bold text-[#0B1F3A] truncate">Research Papers</span>
                  </a>
                  {/* Category 5 */}
                  <a href="#discovery" className="flex items-center gap-3 p-3 rounded-xl bg-[#FAFAF8] border border-[#E4E7EC]/60 hover:border-[#C89B3C] hover:bg-white hover:shadow-sm transition-all duration-300 group">
                    <span className="w-8 h-8 rounded-lg bg-[#D97706]/10 text-[#D97706] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <Landmark size={15} />
                    </span>
                    <span className="text-xs font-bold text-[#0B1F3A] truncate">Archives &amp; Documents</span>
                  </a>
                  {/* Category 6 */}
                  <a href="#discovery" className="flex items-center gap-3 p-3 rounded-xl bg-[#FAFAF8] border border-[#E4E7EC]/60 hover:border-[#C89B3C] hover:bg-white hover:shadow-sm transition-all duration-300 group">
                    <span className="w-8 h-8 rounded-lg bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <Building2 size={15} />
                    </span>
                    <span className="text-xs font-bold text-[#0B1F3A] truncate">Government Publications</span>
                  </a>
                </div>
              </div>

              {/* Recent Publications - Hardcover Spine Book Row */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B1F3A]">
                    Recent Publications
                  </h3>
                  <a href="#discovery" className="text-[10px] font-bold text-[#C89B3C] uppercase tracking-wider hover:underline">
                    View all
                  </a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* Book Card 1 */}
                  <div className="flex items-center gap-3 bg-white border border-[#E4E7EC] rounded-xl p-3 hover:border-[#C89B3C] hover:shadow-md transition-all duration-300 w-full group cursor-pointer">
                    {/* Hardcover Spine */}
                    <div className="relative w-11 h-15 bg-[#0B1F3A] rounded-sm shadow-md flex-shrink-0 overflow-hidden flex flex-col justify-between p-1 text-white border-l-[3px] border-[#C89B3C]">
                      <div className="absolute top-0 bottom-0 left-0.5 w-[1px] bg-white/20" />
                      <span className="text-[5px] font-serif uppercase tracking-widest text-[#C89B3C] font-bold text-center leading-none mt-1">BARTI</span>
                      <span className="text-[6px] font-bold uppercase leading-tight font-serif text-center text-white/90 line-clamp-2">CONST. INDIA</span>
                      <div className="h-[2px] bg-[#C89B3C]/80 w-full" />
                    </div>
                    <div className="min-w-0 text-left">
                      <h4 className="text-[11px] font-bold font-serif text-[#0B1F3A] leading-snug group-hover:text-[#C89B3C] transition-colors line-clamp-2">The Constitution of India</h4>
                      <p className="text-[9px] text-[#5E6573] truncate">B.R. Ambedkar</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[7.5px] font-bold text-[#C89B3C] uppercase bg-[#C89B3C]/10 px-1 rounded-sm">1950</span>
                        <span className="text-[7.5px] text-[#5E6573]/60 font-mono">Vol I</span>
                      </div>
                    </div>
                  </div>

                  {/* Book Card 2 */}
                  <div className="flex items-center gap-3 bg-white border border-[#E4E7EC] rounded-xl p-3 hover:border-[#C89B3C] hover:shadow-md transition-all duration-300 w-full group cursor-pointer">
                    {/* Hardcover Spine */}
                    <div className="relative w-11 h-15 bg-[#78350F] rounded-sm shadow-md flex-shrink-0 overflow-hidden flex flex-col justify-between p-1 text-white border-l-[3px] border-[#C89B3C]">
                      <div className="absolute top-0 bottom-0 left-0.5 w-[1px] bg-white/20" />
                      <span className="text-[5px] font-serif uppercase tracking-widest text-[#C89B3C] font-bold text-center leading-none mt-1">BARTI</span>
                      <span className="text-[6px] font-bold uppercase leading-tight font-serif text-center text-white/90 line-clamp-2">ANNIH. CASTE</span>
                      <div className="h-[2px] bg-[#C89B3C]/80 w-full" />
                    </div>
                    <div className="min-w-0 text-left">
                      <h4 className="text-[11px] font-bold font-serif text-[#0B1F3A] leading-snug group-hover:text-[#C89B3C] transition-colors line-clamp-2">Annihilation of Caste</h4>
                      <p className="text-[9px] text-[#5E6573] truncate">B.R. Ambedkar</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[7.5px] font-bold text-[#C89B3C] uppercase bg-[#C89B3C]/10 px-1 rounded-sm">1936</span>
                        <span className="text-[7.5px] text-[#5E6573]/60 font-mono">Vol II</span>
                      </div>
                    </div>
                  </div>

                  {/* Book Card 3 */}
                  <div className="flex items-center gap-3 bg-white border border-[#E4E7EC] rounded-xl p-3 hover:border-[#C89B3C] hover:shadow-md transition-all duration-300 w-full group cursor-pointer">
                    {/* Hardcover Spine */}
                    <div className="relative w-11 h-15 bg-[#064E3B] rounded-sm shadow-md flex-shrink-0 overflow-hidden flex flex-col justify-between p-1 text-white border-l-[3px] border-[#C89B3C]">
                      <div className="absolute top-0 bottom-0 left-0.5 w-[1px] bg-white/20" />
                      <span className="text-[5px] font-serif uppercase tracking-widest text-[#C89B3C] font-bold text-center leading-none mt-1">BARTI</span>
                      <span className="text-[6px] font-bold uppercase leading-tight font-serif text-center text-white/90 line-clamp-2">PHIL. HINDU</span>
                      <div className="h-[2px] bg-[#C89B3C]/80 w-full" />
                    </div>
                    <div className="min-w-0 text-left">
                      <h4 className="text-[11px] font-bold font-serif text-[#0B1F3A] leading-snug group-hover:text-[#C89B3C] transition-colors line-clamp-2">Riddles in Hinduism</h4>
                      <p className="text-[9px] text-[#5E6573] truncate">B.R. Ambedkar</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[7.5px] font-bold text-[#C89B3C] uppercase bg-[#C89B3C]/10 px-1 rounded-sm">1956</span>
                        <span className="text-[7.5px] text-[#5E6573]/60 font-mono">Vol III</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>

    </section>
  );
}
