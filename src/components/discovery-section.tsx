"use client";

import { motion } from "framer-motion";
import { staggerContainer, cardItem } from "@/lib/animations";
import { DISCOVERY } from "@/lib/constants";
import { Container } from "@/components/container";
import { ArrowUpRight } from "lucide-react";

const imageMap: Record<string, string> = {
  "Ambedkar Literature": "/images/discovery/ambedkar_literature.png",
  "Constitutional Studies": "/images/discovery/constitutional_studies.png",
  "Social Justice": "/images/discovery/social_justice.png",
  "Research Papers": "/images/discovery/research_papers.png",
  "Archives": "/images/discovery/archives.png",
  "Government Publications": "/images/discovery/government_publications.png",
};

export function DiscoverySection() {
  return (
    <section id="discovery" className="bg-[#F3F2EE] section-padding">
      <Container>
        {/* Section Header */}
        <div className="text-left mb-16">
          <h2 className="section-heading-custom text-[#0B1F3A] leading-[1.1] tracking-tight">
            Knowledge Discovery
          </h2>
        </div>

        {/* Six Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-[32px] w-full max-w-[1280px] mx-auto"
        >
          {DISCOVERY.categories.map((category) => {
            const imageUrl = imageMap[category.title] || "/images/discovery/ambedkar_literature.png";
            return (
              <motion.div
                key={category.title}
                variants={cardItem}
                className="relative rounded-[24px] overflow-hidden min-h-[280px] group cursor-pointer border border-[#E4E7EC] shadow-sm flex flex-col justify-end"
              >
                {/* Background Image Container with Hover Zoom */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url('${imageUrl}')` }}
                />

                {/* Dark Overlay for premium look & accessibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 group-hover:from-black/90 transition-colors duration-500 z-10" />

                {/* Text & Button Area */}
                <div className="relative p-8 z-20 flex justify-between items-end w-full">
                  <div className="space-y-1">
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-white tracking-tight leading-tight">
                      {category.title === "Archives" ? "Archives & Documents" : category.title}
                    </h3>
                  </div>

                  {/* Circular Arrow Button */}
                  <span className="w-8 h-8 rounded-full bg-white text-[#0B1F3A] flex items-center justify-center shadow-sm group-hover:bg-[#C89B3C] group-hover:text-white transition-colors duration-300">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
