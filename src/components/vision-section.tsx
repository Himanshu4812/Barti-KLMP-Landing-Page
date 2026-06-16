"use client";

import { motion } from "framer-motion";
import { staggerContainer, cardItem } from "@/lib/animations";
import { Container } from "./container";
import { Book, FolderGit2, Brain, ArrowRight } from "lucide-react";

export function VisionSection() {
  return (
    <section id="journey" className="bg-[#FAFAF8] py-16 md:py-20 relative overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="text-left mb-12">
          <h2 className="section-heading-custom text-[#0B1F3A] leading-[1.1] tracking-tight">
            Transformation Journey
          </h2>
        </div>

        {/* Horizontal Journey Flow */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4 w-full max-w-[1280px] mx-auto"
        >
          
          {/* Card 1 - Traditional Library */}
          <motion.div
            variants={cardItem}
            className="w-full lg:w-[30%] bg-[#F4F7FB] border border-[#DCE4F0] rounded-[24px] p-8 shadow-sm flex flex-col justify-between min-h-[280px] relative overflow-hidden group hover:shadow-md transition-all duration-300"
          >
            <div className="space-y-6 relative z-10">
              <span className="w-12 h-12 rounded-full bg-[#0B1F3A] text-white flex items-center justify-center shadow-md">
                <Book size={22} />
              </span>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#0B1F3A] tracking-tight">
                  Traditional Library
                </h3>
                <p className="text-xs text-[#5E6573] leading-relaxed">
                  Physical cataloging, manual lending checkouts, limited search queries, and in-person search requirements.
                </p>
              </div>
            </div>
            
            {/* Highly detailed library sketch outline SVG */}
            <div className="absolute right-3 bottom-3 opacity-15 pointer-events-none group-hover:scale-105 transition-transform duration-500">
              <svg width="120" height="90" viewBox="0 0 120 90" fill="none" stroke="#0B1F3A" strokeWidth="1.2">
                {/* Book stacks and shelves */}
                <rect x="10" y="10" width="100" height="70" rx="3" />
                <line x1="10" y1="32" x2="110" y2="32" />
                <line x1="10" y1="55" x2="110" y2="55" />
                {/* Row 1 Books */}
                <rect x="20" y="14" width="8" height="18" />
                <rect x="28" y="16" width="6" height="16" />
                <rect x="34" y="14" width="10" height="18" />
                <line x1="55" y1="18" x2="65" y2="30" />
                <line x1="58" y1="18" x2="68" y2="30" />
                {/* Row 2 Books */}
                <rect x="15" y="36" width="12" height="19" />
                <rect x="32" y="36" width="8" height="19" />
                <rect x="40" y="38" width="6" height="17" />
                {/* Column details */}
                <path d="M5 5 L5 85 M115 5 L115 85" strokeWidth="2" />
              </svg>
            </div>
          </motion.div>

          {/* Connector 1 */}
          <div className="hidden lg:flex items-center justify-center mx-2 pointer-events-none">
            <ArrowRight size={32} className="text-[#C89B3C] animate-pulse" />
          </div>

          {/* Card 2 - Digital Repository */}
          <motion.div
            variants={cardItem}
            className="w-full lg:w-[30%] bg-[#F0F8F6] border border-[#D1EBE5] rounded-[24px] p-8 shadow-sm flex flex-col justify-between min-h-[280px] relative overflow-hidden group hover:shadow-md transition-all duration-300"
          >
            <div className="space-y-6 relative z-10">
              <span className="w-12 h-12 rounded-full bg-[#0D9488] text-white flex items-center justify-center shadow-md">
                <FolderGit2 size={22} />
              </span>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#0B1F3A] tracking-tight">
                  Digital Repository
                </h3>
                <p className="text-xs text-[#5E6573] leading-relaxed">
                  Digitized text formats, catalog synchronization, remote accessibility, and structured collections archiving.
                </p>
              </div>
            </div>
            
            {/* Highly detailed digital archive server/directories outline SVG */}
            <div className="absolute right-3 bottom-3 opacity-15 pointer-events-none group-hover:scale-105 transition-transform duration-500">
              <svg width="120" height="90" viewBox="0 0 120 90" fill="none" stroke="#0D9488" strokeWidth="1.2">
                {/* Server/Cloud directories */}
                <rect x="15" y="10" width="90" height="20" rx="3" />
                <circle cx="25" cy="20" r="2" fill="#0D9488" />
                <circle cx="33" cy="20" r="2" fill="#0D9488" />
                <line x1="45" y1="20" x2="95" y2="20" />
                
                <rect x="15" y="35" width="90" height="20" rx="3" />
                <circle cx="25" cy="45" r="2" fill="#0D9488" />
                <circle cx="33" cy="45" r="2" fill="#0D9488" />
                <line x1="45" y1="45" x2="95" y2="45" />

                <rect x="15" y="60" width="90" height="20" rx="3" />
                <circle cx="25" cy="70" r="2" fill="#0D9488" />
                <circle cx="33" cy="70" r="2" fill="#0D9488" />
                <line x1="45" y1="70" x2="95" y2="70" />
              </svg>
            </div>
          </motion.div>

          {/* Connector 2 */}
          <div className="hidden lg:flex items-center justify-center mx-2 pointer-events-none">
            <ArrowRight size={32} className="text-[#C89B3C] animate-pulse" />
          </div>

          {/* Card 3 - Knowledge Intelligence */}
          <motion.div
            variants={cardItem}
            className="w-full lg:w-[30%] bg-[#F8F5FC] border border-[#E8DEF5] rounded-[24px] p-8 shadow-sm flex flex-col justify-between min-h-[280px] relative overflow-hidden group hover:shadow-md transition-all duration-300"
          >
            <div className="space-y-6 relative z-10">
              <span className="w-12 h-12 rounded-full bg-[#6D28D9] text-white flex items-center justify-center shadow-md">
                <Brain size={22} />
              </span>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#0B1F3A] tracking-tight">
                  Knowledge Intelligence
                </h3>
                <p className="text-xs text-[#5E6573] leading-relaxed">
                  AI assistant search queries, personalized research insights, catalog auto-tagging, and contextual library analytics.
                </p>
              </div>
            </div>
            
            {/* Highly detailed AI Neural Node Network outline SVG */}
            <div className="absolute right-3 bottom-3 opacity-20 pointer-events-none group-hover:scale-105 transition-transform duration-500">
              <svg width="120" height="90" viewBox="0 0 120 90" fill="none" stroke="#6D28D9" strokeWidth="1.2">
                {/* Node structure */}
                <circle cx="60" cy="45" r="8" />
                <circle cx="30" cy="25" r="5" />
                <circle cx="30" cy="65" r="5" />
                <circle cx="90" cy="25" r="5" />
                <circle cx="90" cy="65" r="5" />
                
                {/* Connecting lines */}
                <line x1="35" y1="28" x2="52" y2="40" />
                <line x1="35" y1="62" x2="52" y2="50" />
                <line x1="85" y1="28" x2="68" y2="40" />
                <line x1="85" y1="62" x2="68" y2="50" />
                
                <line x1="30" y1="30" x2="30" y2="60" />
                <line x1="90" y1="30" x2="90" y2="60" />
                
                {/* Micro pulses */}
                <circle cx="42" cy="34" r="1.5" fill="#6D28D9" />
                <circle cx="78" cy="56" r="1.5" fill="#6D28D9" />
              </svg>
            </div>
          </motion.div>

        </motion.div>
      </Container>
    </section>
  );
}
