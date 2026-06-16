"use client";

import { Container } from "@/components/container";
import { BookOpen, Users, ShieldCheck, Clock } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { staggerContainer, cardItem } from "@/lib/animations";

export function StatsSection() {
  return (
    <section className="relative bg-[#0B1F3A] py-16 md:py-20 overflow-hidden">
      
      {/* Blueprint Circular Overlay Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0 select-none">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full stroke-white/20 fill-none" strokeWidth="0.1">
          <circle cx="50" cy="50" r="40" />
          <circle cx="50" cy="50" r="30" strokeDasharray="2 2" />
          <circle cx="20" cy="20" r="25" />
          <circle cx="80" cy="80" r="35" />
        </svg>
      </div>

      {/* Inverted Parliament outline watermark overlaid on dark blue */}
      <div className="absolute right-0 bottom-0 w-[700px] h-[450px] opacity-20 pointer-events-none z-0 select-none invert mix-blend-screen">
        <Image 
          src="/images/parliament_sketch_clean.png" 
          alt="Parliament Sketch Background" 
          width={700} 
          height={450} 
          className="object-contain object-center object-right"
          priority
        />
      </div>

      <Container className="relative z-10">
        {/* Section Divider Header */}
        <div className="flex items-center justify-center gap-4 mb-12 w-full">
          <div className="h-[1px] bg-white/15 flex-1 hidden sm:block" />
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/60 whitespace-nowrap">
            PLATFORM IMPACT —
          </span>
          <div className="h-[1px] bg-white/15 flex-1 hidden sm:block" />
        </div>

        {/* Metrics Grid Layout */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-[1280px] mx-auto"
        >
          
          {/* Metric 1 */}
          <motion.div
            variants={cardItem}
            className="flex items-center gap-5 group"
          >
            <span className="w-20 h-20 rounded-full border border-white/25 flex items-center justify-center text-[#C89B3C] bg-white/5 flex-shrink-0 group-hover:border-[#C89B3C] group-hover:bg-[#C89B3C]/10 transition-all duration-500 shadow-md">
              <BookOpen size={30} />
            </span>
            <div className="flex flex-col text-left">
              <span className="text-4xl font-extrabold font-heading text-[#C89B3C] tracking-tight">12,000+</span>
              <span className="text-[10px] text-white/75 font-bold tracking-wider uppercase mt-1">Books &amp; Resources</span>
            </div>
          </motion.div>

          {/* Metric 2 */}
          <motion.div
            variants={cardItem}
            className="flex items-center gap-5 group"
          >
            <span className="w-20 h-20 rounded-full border border-white/25 flex items-center justify-center text-[#C89B3C] bg-white/5 flex-shrink-0 group-hover:border-[#C89B3C] group-hover:bg-[#C89B3C]/10 transition-all duration-500 shadow-md">
              <Users size={30} />
            </span>
            <div className="flex flex-col text-left">
              <span className="text-4xl font-extrabold font-heading text-[#C89B3C] tracking-tight">8,000+</span>
              <span className="text-[10px] text-white/75 font-bold tracking-wider uppercase mt-1">Active Members</span>
            </div>
          </motion.div>

          {/* Metric 3 */}
          <motion.div
            variants={cardItem}
            className="flex items-center gap-5 group"
          >
            <span className="w-20 h-20 rounded-full border border-white/25 flex items-center justify-center text-[#C89B3C] bg-white/5 flex-shrink-0 group-hover:border-[#C89B3C] group-hover:bg-[#C89B3C]/10 transition-all duration-500 shadow-md">
              <ShieldCheck size={30} />
            </span>
            <div className="flex flex-col text-left">
              <span className="text-4xl font-extrabold font-heading text-[#C89B3C] tracking-tight">98%</span>
              <span className="text-[10px] text-white/75 font-bold tracking-wider uppercase mt-1">Resource Availability</span>
            </div>
          </motion.div>

          {/* Metric 4 */}
          <motion.div
            variants={cardItem}
            className="flex items-center gap-5 group"
          >
            <span className="w-20 h-20 rounded-full border border-white/25 flex items-center justify-center text-[#C89B3C] bg-white/5 flex-shrink-0 group-hover:border-[#C89B3C] group-hover:bg-[#C89B3C]/10 transition-all duration-500 shadow-md">
              <Clock size={30} />
            </span>
            <div className="flex flex-col text-left">
              <span className="text-4xl font-extrabold font-heading text-[#C89B3C] tracking-tight">24/7</span>
              <span className="text-[10px] text-white/75 font-bold tracking-wider uppercase mt-1">Digital Access</span>
            </div>
          </motion.div>

        </motion.div>
      </Container>
    </section>
  );
}
