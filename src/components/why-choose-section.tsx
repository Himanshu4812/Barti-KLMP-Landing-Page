"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/container";
import { WHY_CHOOSE } from "@/lib/constants";
import { ShieldCheck, BookMarked, Layers, BarChart3, Cpu, Users } from "lucide-react";
import { staggerContainer, cardItem } from "@/lib/animations";

// Mapping icons to card indices
const ICONS = [
  { icon: ShieldCheck, color: "text-[#0B1F3A]", bg: "bg-[#0B1F3A]/5 border-[#0B1F3A]/10" },
  { icon: BookMarked, color: "text-[#C89B3C]", bg: "bg-[#C89B3C]/5 border-[#C89B3C]/10" },
  { icon: Layers, color: "text-[#0D9488]", bg: "bg-[#0D9488]/5 border-[#0D9488]/10" },
  { icon: BarChart3, color: "text-[#6D28D9]", bg: "bg-[#6D28D9]/5 border-[#6D28D9]/10" },
  { icon: Cpu, color: "text-[#EA580C]", bg: "bg-[#EA580C]/5 border-[#EA580C]/10" },
  { icon: Users, color: "text-[#16A34A]", bg: "bg-[#16A34A]/5 border-[#16A34A]/10" }
];

export function WhyChooseSection() {
  return (
    <section id="why-choose" className="bg-[#FAFAF8] py-16 md:py-20 border-b border-[#E4E7EC]/40 relative overflow-hidden">
      
      {/* Dynamic background element */}
      <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(200,155,60,0.02),transparent_70%)] pointer-events-none" />

      <Container>
        {/* Section Header */}
        <div className="text-left mb-12 max-w-3xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C89B3C] block mb-3">
            PLATFORM ADVANTAGE —
          </span>
          <h2 className="section-heading-custom text-[#0B1F3A] leading-[1.1] tracking-tight">
            {WHY_CHOOSE.title}
          </h2>
        </div>

        {/* 3x2 Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1280px] mx-auto"
        >
          {WHY_CHOOSE.cards.map((card, index) => {
            const iconObj = ICONS[index] || ICONS[0];
            const IconComponent = iconObj.icon;

            return (
              <motion.div
                key={card.title}
                variants={cardItem}
                className="bg-white border border-[#E4E7EC]/80 rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-[0_15px_40px_rgb(0,0,0,0.04)] hover:border-[#C89B3C]/20 transition-all duration-500 group flex flex-col justify-between min-h-[220px]"
              >
                <div className="space-y-4">
                  {/* Icon Container */}
                  <span className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm group-hover:scale-105 transition-transform duration-300 ${iconObj.bg} ${iconObj.color}`}>
                    <IconComponent size={22} />
                  </span>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#0B1F3A] tracking-tight group-hover:text-[#C89B3C] transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[#5E6573] leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
