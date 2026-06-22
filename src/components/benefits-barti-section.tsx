"use client";

import { Container } from "@/components/container";
import Image from "next/image";
import { motion } from "framer-motion";
import { staggerContainer, cardItem, fadeUp } from "@/lib/animations";

export function BenefitsBartiSection() {
  return (
    <section id="benefits" className="bg-[#F3F2EE] py-16 md:py-20 relative overflow-hidden ">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-[40px] items-start w-full max-w-[1280px] mx-auto relative z-10">
          
          {/* Left Column - Organizations We Serve */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="section-heading-custom text-[#0B1F3A] leading-[1.1] tracking-tight">
              Organizations We Serve
            </h2>
            
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1"
            >
              
              {/* Category 1 */}
              <motion.div
                variants={cardItem}
                className="bg-[#F4F7FB] border-l-4 border-l-[#2563EB] border border-[#DCE4F0]/60 p-6 flex flex-col items-start justify-center min-h-[90px] cursor-pointer hover:shadow-lg hover:scale-[1.02] hover:bg-white transition-all duration-300 group"
              >
                <span className="text-sm font-bold text-[#0B1F3A] uppercase tracking-wide">Government Libraries</span>
                <span className="text-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-1 text-lg leading-none">→</span>
              </motion.div>

              {/* Category 2 */}
              <motion.div
                variants={cardItem}
                className="bg-[#FDF6E2] border-l-4 border-l-[#D97706] border border-[#F5E6BE]/60 p-6 flex flex-col items-start justify-center min-h-[90px] cursor-pointer hover:shadow-lg hover:scale-[1.02] hover:bg-white transition-all duration-300 group"
              >
                <span className="text-sm font-bold text-[#0B1F3A] uppercase tracking-wide">Universities &amp; Colleges</span>
                <span className="text-[#D97706] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-1 text-lg leading-none">→</span>
              </motion.div>

              {/* Category 3 */}
              <motion.div
                variants={cardItem}
                className="bg-[#F0F8F6] border-l-4 border-l-[#0D9488] border border-[#D1EBE5]/60 p-6 flex flex-col items-start justify-center min-h-[90px] cursor-pointer hover:shadow-lg hover:scale-[1.02] hover:bg-white transition-all duration-300 group"
              >
                <span className="text-sm font-bold text-[#0B1F3A] uppercase tracking-wide">Research Institutions</span>
                <span className="text-[#0D9488] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-1 text-lg leading-none">→</span>
              </motion.div>

              {/* Category 4 */}
              <motion.div
                variants={cardItem}
                className="bg-[#F8F5FC] border-l-4 border-l-[#6D28D9] border border-[#E8DEF5]/60 p-6 flex flex-col items-start justify-center min-h-[90px] cursor-pointer hover:shadow-lg hover:scale-[1.02] hover:bg-white transition-all duration-300 group"
              >
                <span className="text-sm font-bold text-[#0B1F3A] uppercase tracking-wide">Social Justice Orgs</span>
                <span className="text-[#6D28D9] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-1 text-lg leading-none">→</span>
              </motion.div>

            </motion.div>
          </div>

          {/* Right Column - Benefits for BARTI & Readers */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-6 bg-white border border-[#E4E7EC]/80  p-8 lg:p-10 relative overflow-hidden min-h-[380px] shadow-[0_12px_30px_rgba(11,31,58,0.03)] flex flex-col justify-between"
          >
            
            {/* Background Line-Sketch overlay (Huge & Highly Visible) */}
            <div className="absolute right-0 bottom-0 w-[450px] md:w-[500px] h-[320px] md:h-[360px] opacity-40 pointer-events-none z-0 mix-blend-multiply">
              <Image 
                src="/images/readers_sketch_clean.webp" 
                alt="Readers &amp; Researchers Studying Sketch" 
                width={500} 
                height={360}
                className="object-contain object-center object-right"
                priority
              />
            </div>

            <div className="relative z-10 space-y-6">
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C89B3C] block">
                BENEFITS FOR BARTI &amp; READERS —
              </span>

              <ul className="space-y-4 pt-1">
                <li className="flex items-start">
                  <span className="text-[#C89B3C] font-bold select-none mr-3 flex-shrink-0">—</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0B1F3A] leading-relaxed">Centralized knowledge preservation ecosystem</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#C89B3C] font-bold select-none mr-3 flex-shrink-0">—</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0B1F3A] leading-relaxed">Enhanced search discovery &amp; digital downloads</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#C89B3C] font-bold select-none mr-3 flex-shrink-0">—</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0B1F3A] leading-relaxed">Data-driven reporting on resource utilization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#C89B3C] font-bold select-none mr-3 flex-shrink-0">—</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0B1F3A] leading-relaxed">Empowered academic research and learning community</span>
                </li>
              </ul>
            </div>

          </motion.div>

        </div>
      </Container>
    </section>
  );
}
