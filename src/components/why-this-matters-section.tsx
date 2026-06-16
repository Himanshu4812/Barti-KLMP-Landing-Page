"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/container";
import Image from "next/image";

export function WhyThisMattersSection() {
  return (
    <section id="why-this-matters" className="bg-[#FAFAF8] py-16 md:py-20 relative overflow-hidden">
      
      {/* Background Parliament Line-Art Sketch Illustration (Huge & Integrated) */}
      <div className="absolute right-0 bottom-0 w-[800px] md:w-[900px] h-[480px] md:h-[540px] opacity-40 pointer-events-none hidden lg:block select-none mix-blend-multiply z-0">
        <Image 
          src="/images/parliament_sketch_clean.png" 
          alt="Parliament Sketch" 
          width={900} 
          height={540} 
          className="object-contain object-center object-right"
          priority
        />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[40px] items-center w-full max-w-[1280px] mx-auto"
        >
          {/* Left Column - Headline */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C89B3C] block">
              WHY THIS MATTERS —
            </span>
            <h2 className="section-heading-custom text-[#0B1F3A] leading-[1.1] tracking-tight">
              Knowledge is the <br className="hidden lg:inline" />
              foundation of <br />
              <span className="italic text-[#C89B3C] font-serif font-normal text-heading">Social Transformation.</span>
            </h2>
          </div>

          {/* Right Column - Mission statement */}
          <div className="lg:col-span-7 pt-2 lg:pt-6">
            <p className="text-xl md:text-2xl font-serif text-[#0B1F3A] leading-relaxed italic max-w-[660px]">
              BARTI KLMP brings together vast intellectual resources, research, and literature on social justice, equality, and empowerment — making them accessible to every seeker of knowledge.
            </p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
