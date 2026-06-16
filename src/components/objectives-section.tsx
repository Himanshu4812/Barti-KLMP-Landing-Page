"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/container";
import { OBJECTIVES } from "@/lib/constants";
import { Landmark, Users, GraduationCap, CheckCircle2, Quote } from "lucide-react";
import { staggerContainer, cardItem, fadeUp } from "@/lib/animations";

export function ObjectivesSection() {
  return (
    <section id="objectives" className="bg-[#FAFAF8] py-16 md:py-20 border-b border-[#E4E7EC]/40 relative overflow-hidden">
      
      {/* Blueprint grid watermark */}
      <div className="absolute inset-0 opacity-5 pointer-events-none z-0 select-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[40px] items-stretch w-full max-w-[1280px] mx-auto"
        >
          {/* Left Column - Vision Statement Card */}
          <motion.div 
            variants={cardItem}
            className="lg:col-span-5 flex flex-col justify-between bg-white border border-[#E4E7EC] rounded-[24px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.015)] relative overflow-hidden group hover:shadow-[0_15px_40px_rgb(0,0,0,0.03)] transition-all duration-500"
          >
            {/* Visual Gold Crest accent line */}
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#C89B3C]" />
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C89B3C]">
                  OUR VISION —
                </span>
                <span className="text-[#C89B3C]/10 group-hover:text-[#C89B3C]/25 transition-colors duration-500">
                  <Quote size={56} fill="currentColor" stroke="none" />
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-serif text-[#0B1F3A] leading-tight font-bold tracking-tight">
                Maharashtra’s Digital Knowledge Gateway
              </h2>

              <p className="text-base md:text-[18px] font-serif text-[#4A515E] leading-relaxed italic border-l-2 border-[#C89B3C] pl-4 pt-1">
                "{OBJECTIVES.vision}"
              </p>
            </div>

            {/* Micro layout details */}
            <div className="pt-8 flex items-center gap-3 text-xs text-[#5E6573]/80 border-t border-[#F3F2EE] mt-6">
              <span className="font-bold tracking-widest text-[#0B1F3A] uppercase">BARTI Initiative</span>
              <span className="w-1 h-1 rounded-full bg-[#C89B3C]" />
              <span>Preserving Knowledge</span>
            </div>
          </motion.div>

          {/* Right Column - Objectives for BARTI & Readers */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
              
              {/* Card 1 - Objectives for BARTI */}
              <motion.div 
                variants={cardItem}
                className="bg-white border border-[#E4E7EC] rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] flex flex-col justify-between hover:shadow-[0_15px_40px_rgb(0,0,0,0.03)] hover:border-[#0B1F3A]/20 transition-all duration-500 group"
              >
                <div className="space-y-6">
                  {/* Icon Block */}
                  <span className="w-12 h-12 rounded-2xl bg-[#0B1F3A]/5 border border-[#0B1F3A]/10 text-[#0B1F3A] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                    <Landmark size={22} />
                  </span>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#0B1F3A] tracking-tight">
                      For BARTI Operations
                    </h3>
                    <p className="text-xs text-[#5E6573] leading-relaxed">
                      Optimizing administrative oversight, asset protection, and operational logistics.
                    </p>
                  </div>

                  <ul className="space-y-3.5 pt-2">
                    {OBJECTIVES.forBarti.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-xs text-[#4A515E] leading-relaxed font-semibold">
                        <CheckCircle2 size={15} className="text-[#0B1F3A] mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Card 2 - Objectives for Readers */}
              <motion.div 
                variants={cardItem}
                className="bg-white border border-[#DCEBE8] rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] flex flex-col justify-between hover:shadow-[0_15px_40px_rgb(0,0,0,0.03)] hover:border-[#0D9488]/20 transition-all duration-500 group"
              >
                <div className="space-y-6">
                  {/* Icon Block */}
                  <span className="w-12 h-12 rounded-2xl bg-[#0D9488]/5 border border-[#0D9488]/10 text-[#0D9488] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                    <Users size={22} />
                  </span>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#0B1F3A] tracking-tight">
                      For Readers &amp; Scholars
                    </h3>
                    <p className="text-xs text-[#5E6573] leading-relaxed">
                      Empowering citizens, researchers, and students with seamless digital access.
                    </p>
                  </div>

                  <ul className="space-y-3.5 pt-2">
                    {OBJECTIVES.forReaders.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-xs text-[#4A515E] leading-relaxed font-semibold">
                        <CheckCircle2 size={15} className="text-[#0D9488] mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
