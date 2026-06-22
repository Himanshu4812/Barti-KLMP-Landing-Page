"use client";

import { Container } from "@/components/container";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

export function CTASection() {
  return (
    <section id="cta" className="relative overflow-hidden bg-[#FAFAF8] py-20 lg:py-28 border-t border-[#E4E7EC] ">
      
      {/* Background Stacked Books & Ambedkar Sketch Illustration (Huge & Anchored) */}
      <div className="absolute right-0 bottom-0 w-[600px] md:w-[700px] h-[450px] md:h-[530px] opacity-40 pointer-events-none hidden lg:block select-none mix-blend-multiply z-0">
        <Image 
          src="/images/ambedkar_books_sketch_clean.webp" 
          alt="Books &amp; Ambedkar Portrait Sketch" 
          width={700} 
          height={530}
          className="object-contain object-center object-right"
          priority
        />
      </div>

      <Container className="relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row items-center justify-between gap-12 w-full max-w-[1280px] mx-auto"
        >
          
          {/* Left Side - Text & Buttons */}
          <div className="space-y-8 max-w-3xl text-left">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-serif text-[#0B1F3A] leading-[1.08] tracking-tight">
              Join the Movement of <br />
              Knowledge &amp; Equality
            </h2>
            
            <p className="text-2xl md:text-3xl font-serif text-[#C89B3C] italic font-normal tracking-wide">
              Explore. Learn. Transform.
            </p>
            
          </div>

        </motion.div>
      </Container>
    </section>
  );
}
