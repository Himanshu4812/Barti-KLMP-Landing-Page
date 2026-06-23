"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/container";
import { WHY_CHOOSE } from "@/lib/features";
import { staggerContainer, cardItem } from "@/lib/animations";

const CARD_IMAGES = [
  "/images/why-choose/gov_institution.webp",
  "/images/why-choose/ambedkar_heritage.webp",
  "/images/why-choose/scalable_network.webp",
  "/images/why-choose/data_decisions.webp",
  "/images/why-choose/ai_intelligence.webp",
  "/images/why-choose/citizen_access.webp"
];

const CARD_BG_COLORS = [
  "bg-[#FDF6EE]/70",
  "bg-[#F0FBFB]/70",
  "bg-[#FBF0F6]/70",
  "bg-[#F6FBF0]/70",
  "bg-[#F5F0FB]/70",
  "bg-[#FEFBF0]/70"
];

export function WhyChooseSection() {
  return (
    <section id="why-choose" className="bg-[#F5E6C8] py-16 md:py-20 scroll-mt-[-50px] border-b border-[#E4E7EC]/40 relative overflow-hidden ">
      
      {/* Top blur transition from previous section */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#FAFAF8] to-transparent pointer-events-none z-10" />

      {/* Bottom blur transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#FAFAF8] to-transparent pointer-events-none z-10" />

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
            const numStr = String(index + 1).padStart(2, "0");

            return (
              <motion.div
                key={card.title}
                variants={cardItem}
                className={`relative overflow-hidden ${CARD_BG_COLORS[index]} border border-[#E4E7EC]/80 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_20px_50px_rgba(11,31,58,0.18)] hover:border-[#C89B3C]/40 transition-all duration-500 group flex flex-col justify-between min-h-[220px]`}
              >
                {/* Dynamic Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-100 scale-100 lg:opacity-0 lg:scale-105 lg:group-hover:opacity-60 lg:group-hover:scale-100 transition-all duration-700 ease-out pointer-events-none z-0"
                  style={{ backgroundImage: `url(${CARD_IMAGES[index]})` }}
                />

                {/* Dark Gradient Overlay */}
                <div 
                  className="absolute inset-0 bg-gradient-to-b from-[#0B1F3A]/40 via-[#0B1F3A]/65 to-[#0B1F3A]/80 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"
                />

                {/* Content Container (elevated above background) */}
                <div className="relative z-20 space-y-4 flex flex-col justify-between h-full w-full">
                  {/* Serif Typographic Index */}
                  <span className="text-2xl font-serif font-bold text-white lg:text-[#C89B3C] block select-none lg:group-hover:text-white transition-colors duration-300">
                    {numStr}
                  </span>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-[#C89B3C] lg:text-[#0B1F3A] tracking-tight lg:group-hover:text-white transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-200/90 lg:text-[#5E6573] lg:group-hover:text-white/90 leading-relaxed transition-colors duration-300">
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


