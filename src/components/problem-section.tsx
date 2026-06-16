"use client";

import { motion } from "framer-motion";
import { staggerContainer, cardItem } from "@/lib/animations";
import { Container } from "./container";
import { ListChecks, BookOpen, BarChart3, AlertCircle } from "lucide-react";

export function ProblemSection() {
  return (
    <section id="challenges" className="bg-[#F3F2EE] py-16 md:py-20">
      <Container>
        {/* Section Header */}
        <div className="text-left mb-12 max-w-3xl">
          <h2 className="section-heading-custom text-[#0B1F3A] leading-[1.1] tracking-tight">
            Current Challenges
          </h2>
        </div>

        {/* 3 Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-[1280px] mx-auto"
        >
          
          {/* Card 1 - Operational */}
          <motion.div
            variants={cardItem}
            className="bg-white border border-[#E4E7EC]/60 rounded-[24px] p-8 shadow-[0_12px_30px_rgba(11,31,58,0.04)] hover:shadow-[0_20px_40px_rgba(11,31,58,0.08)] transition-all duration-500 flex flex-col items-start"
          >
            <span className="w-14 h-14 rounded-2xl bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444] flex items-center justify-center mb-6 shadow-sm">
              <ListChecks size={26} />
            </span>
            <h3 className="text-xl font-bold text-[#0B1F3A] tracking-tight mb-5">
              Operational Challenges
            </h3>
            <ul className="space-y-4 w-full">
              <li className="flex items-start gap-3 text-sm text-[#4A515E] leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mt-2 flex-shrink-0" />
                <span>Manual cataloging with no centralized inventory tracking</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#4A515E] leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mt-2 flex-shrink-0" />
                <span>Slow book discovery and physical checkout operations</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#4A515E] leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mt-2 flex-shrink-0" />
                <span>No automated tracking for issue, return, or overdue books</span>
              </li>
            </ul>
          </motion.div>

          {/* Card 2 - Reader */}
          <motion.div
            variants={cardItem}
            className="bg-white border border-[#E4E7EC]/60 rounded-[24px] p-8 shadow-[0_12px_30px_rgba(11,31,58,0.04)] hover:shadow-[0_20px_40px_rgba(11,31,58,0.08)] transition-all duration-500 flex flex-col items-start"
          >
            <span className="w-14 h-14 rounded-2xl bg-[#0D9488]/10 border border-[#0D9488]/20 text-[#0D9488] flex items-center justify-center mb-6 shadow-sm">
              <BookOpen size={26} />
            </span>
            <h3 className="text-xl font-bold text-[#0B1F3A] tracking-tight mb-5">
              Reader Challenges
            </h3>
            <ul className="space-y-4 w-full">
              <li className="flex items-start gap-3 text-sm text-[#4A515E] leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] mt-2 flex-shrink-0" />
                <span>No digital access, remote search, or booking catalog</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#4A515E] leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] mt-2 flex-shrink-0" />
                <span>Lack of borrowing history and automated reservation queues</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#4A515E] leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] mt-2 flex-shrink-0" />
                <span>Limited accessibility for remote research scholars</span>
              </li>
            </ul>
          </motion.div>

          {/* Card 3 - Management */}
          <motion.div
            variants={cardItem}
            className="bg-white border border-[#E4E7EC]/60 rounded-[24px] p-8 shadow-[0_12px_30px_rgba(11,31,58,0.04)] hover:shadow-[0_20px_40px_rgba(11,31,58,0.08)] transition-all duration-500 flex flex-col items-start"
          >
            <span className="w-14 h-14 rounded-2xl bg-[#C89B3C]/10 border border-[#C89B3C]/20 text-[#C89B3C] flex items-center justify-center mb-6 shadow-sm">
              <BarChart3 size={26} />
            </span>
            <h3 className="text-xl font-bold text-[#0B1F3A] tracking-tight mb-5">
              Management Challenges
            </h3>
            <ul className="space-y-4 w-full">
              <li className="flex items-start gap-3 text-sm text-[#4A515E] leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C89B3C] mt-2 flex-shrink-0" />
                <span>No analytics or reporting on resource consumption</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#4A515E] leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C89B3C] mt-2 flex-shrink-0" />
                <span>Difficult to verify resource status or stock quantities</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#4A515E] leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C89B3C] mt-2 flex-shrink-0" />
                <span>Scattered documents without a single digital repository</span>
              </li>
            </ul>
          </motion.div>

        </motion.div>
      </Container>
    </section>
  );
}
