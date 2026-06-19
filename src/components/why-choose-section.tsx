"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/container";
import { WHY_CHOOSE } from "@/lib/constants";
import { staggerContainer, cardItem } from "@/lib/animations";

export function WhyChooseSection() {
  return (
    <section id="why-choose" className="bg-[#FAFAF8] py-16 md:py-20 border-b border-[#E4E7EC]/40 relative overflow-hidden ">
      
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
                className="bg-white border border-[#E4E7EC]/80  p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_15px_40px_rgb(0,0,0,0.04)] hover:border-[#C89B3C]/20 transition-all duration-500 group flex flex-col justify-between min-h-[190px]"
              >
                <div className="space-y-4">
                  {/* Serif Typographic Index */}
                  <span className="text-2xl font-serif font-bold text-[#C89B3C] block select-none">
                    {numStr}
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

