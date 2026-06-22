"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Container } from "./container"
import Image from "next/image"

const CARDS = [
  {
    title: "Operational Gaps",
    accent: "#EF4444",
    image: "/images/operational_gaps_sketch.png",
    items: [
      "Manual book entry & cataloging",
      "No centralized inventory",
      "Time-consuming search process",
      "Risk of misplaced/lost books",
    ],
  },
  {
    title: "Reader Experience",
    accent: "#0D9488",
    image: "/images/reader_experience_sketch.png",
    items: [
      "No digital engagement",
      "Lack of borrowing history",
      "Manual issue & return process",
      "Difficulty tracking availability",
    ],
  },
  {
    title: "Management Blind Spots",
    accent: "#C89B3C",
    image: "/images/management_blindspots_sketch.png",
    items: [
      "No analytics on utilization",
      "Difficulty identifying popular books",
      "Hard to generate reports",
      "No digital knowledge archive",
    ],
  },
]

function hexToRgba(hex: string, alpha: number) {
  const r = Number.parseInt(hex.slice(1, 3), 16)
  const g = Number.parseInt(hex.slice(3, 5), 16)
  const b = Number.parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

interface CardType {
  title: string
  accent: string
  image: string
  items: string[]
}

function DesktopCard({ card, style }: { card: CardType; style: any }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        className="bg-white border border-[#E4E7EC]/80 shadow-[0_12px_45px_rgba(11,31,58,0.05)] w-[85vw] max-w-5xl h-[58vh] rounded-3xl overflow-hidden flex flex-row pointer-events-auto"
        style={style}
      >
        {/* Left side: Content */}
        <div className="w-1/2 p-12 lg:p-14 flex flex-col justify-center">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C89B3C] block mb-2">
              CHALLENGE CATEGORY —
            </span>
            <h3 className="text-2xl lg:text-3xl font-extrabold text-[#0B1F3A] tracking-tight mb-6">
              {card.title}
            </h3>
            <ul className="space-y-4">
              {card.items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start text-sm lg:text-base text-[#4A515E] leading-relaxed"
                >
                  <span className="text-[#C89B3C] font-bold select-none mr-3 flex-shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right side: Image */}
        <div className="w-1/2 relative bg-[#F9FAFB] border-l border-[#E4E7EC]/50 overflow-hidden flex items-center justify-center p-8">
          <div className="absolute inset-0 bg-[radial-gradient(#E4E7EC_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
          <div className="relative w-full h-full max-w-[85%] max-h-[85%] mix-blend-multiply flex items-center justify-center">
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="object-contain"
              sizes="50vw"
              priority
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function MobileCard({ card }: { card: CardType }) {
  return (
    <div className="bg-white border border-[#E4E7EC]/80 shadow-[0_8px_30px_rgba(11,31,58,0.03)] w-full max-w-md mx-auto rounded-2xl overflow-hidden flex flex-col mb-8">
      {/* Top half: Content */}
      <div className="p-8 flex flex-col justify-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C89B3C] block mb-1">
          CHALLENGE CATEGORY —
        </span>
        <h3 className="text-xl font-extrabold text-[#0B1F3A] tracking-tight mb-4">
          {card.title}
        </h3>
        <ul className="space-y-3">
          {card.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start text-xs sm:text-sm text-[#4A515E] leading-relaxed"
            >
              <span className="text-[#C89B3C] font-bold select-none mr-2 flex-shrink-0">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom half: Image */}
      <div className="h-56 relative bg-[#F9FAFB] border-t border-[#E4E7EC]/50 overflow-hidden flex items-center justify-center p-6">
        <div className="absolute inset-0 bg-[radial-gradient(#E4E7EC_1px,transparent_1px)] [background-size:14px_14px] opacity-40" />
        <div className="relative w-full h-full max-w-[80%] max-h-[80%] mix-blend-multiply flex items-center justify-center">
          <Image
            src={card.image}
            alt={card.title}
            fill
            className="object-contain"
            sizes="(max-w-768px) 100vw, 30vw"
          />
        </div>
      </div>
    </div>
  )
}

export function ProblemSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  
  // Track scroll position through the sticky section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  // Desktop transforms (horizontal stack slider)
  // Progress points: [0, 0.15 (start scroll C1), 0.45 (C2 active), 0.55 (start scroll C2), 0.85 (C3 active), 1.0 (end)]
  const progressRange = [0, 0.15, 0.45, 0.55, 0.85, 1.0]

  // Card 1 positions
  const card1X = useTransform(scrollYProgress, progressRange, ["0vw", "0vw", "-80vw", "-80vw", "-160vw", "-160vw"])
  const card1Scale = useTransform(scrollYProgress, progressRange, [1, 1, 0.92, 0.92, 0.85, 0.85])
  const card1Opacity = useTransform(scrollYProgress, progressRange, [1, 1, 0.4, 0.4, 0, 0])
  const card1Z = useTransform(scrollYProgress, progressRange, [30, 30, 20, 20, 10, 10])

  // Card 2 positions
  const card2X = useTransform(scrollYProgress, progressRange, ["80vw", "80vw", "0vw", "0vw", "-80vw", "-80vw"])
  const card2Scale = useTransform(scrollYProgress, progressRange, [0.92, 0.92, 1, 1, 0.92, 0.92])
  const card2Opacity = useTransform(scrollYProgress, progressRange, [0.4, 0.4, 1, 1, 0.4, 0.4])
  const card2Z = useTransform(scrollYProgress, progressRange, [20, 20, 30, 30, 20, 20])

  // Card 3 positions
  const card3X = useTransform(scrollYProgress, progressRange, ["160vw", "160vw", "80vw", "80vw", "0vw", "0vw"])
  const card3Scale = useTransform(scrollYProgress, progressRange, [0.85, 0.85, 0.92, 0.92, 1, 1])
  const card3Opacity = useTransform(scrollYProgress, progressRange, [0, 0, 0.4, 0.4, 1, 1])
  const card3Z = useTransform(scrollYProgress, progressRange, [10, 10, 20, 20, 30, 30])

  // Dots indicator colors and scale
  const dot1Bg = useTransform(scrollYProgress, [0, 0.15, 0.45, 0.55], ["#C89B3C", "#C89B3C", "#94A3B8", "#94A3B8"])
  const dot1Scale = useTransform(scrollYProgress, [0, 0.15, 0.45, 0.55], [1.3, 1.3, 1, 1])

  const dot2Bg = useTransform(scrollYProgress, [0, 0.15, 0.45, 0.55, 0.85, 1.0], ["#94A3B8", "#94A3B8", "#C89B3C", "#C89B3C", "#94A3B8", "#94A3B8"])
  const dot2Scale = useTransform(scrollYProgress, [0, 0.15, 0.45, 0.55, 0.85, 1.0], [1, 1, 1.3, 1.3, 1, 1])

  const dot3Bg = useTransform(scrollYProgress, [0.45, 0.55, 0.85, 1.0], ["#94A3B8", "#94A3B8", "#C89B3C", "#C89B3C"])
  const dot3Scale = useTransform(scrollYProgress, [0.45, 0.55, 0.85, 1.0], [1, 1, 1.3, 1.3])

  return (
    <section id="challenges" className="bg-[#F5E6C8] relative border-t border-b border-[#E4E7EC]/40 scroll-mt-[-50px] ">
      
      {/* Top blur transition: blends from previous section's #FAFAF8 into gold */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#FAFAF8] to-transparent pointer-events-none z-10" />

      {/* Bottom blur transition: blends gold into next section's #FAFAF8 */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#FAFAF8] to-transparent pointer-events-none z-10" />

      {/* Desktop view (Sticky scroll overlapping cards) */}
      <div className="hidden md:block">
        <div ref={sectionRef} className="relative h-[300vh]">
          <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-between pt-20 lg:pt-24 pb-12 lg:pb-16">
            
            {/* Header */}
            <Container className="shrink-0">
              <div className="max-w-4xl mx-auto text-center space-y-4">
                <h2 className="section-heading-custom text-[#0B1F3A] leading-[1.1] tracking-tight">
                  The Problem We Are Solving
                </h2>
                <p className="text-sm md:text-base text-[#4A515E] max-w-2xl mx-auto leading-relaxed">
                  BARTI maintains a large collection of books accessed by students, researchers, scholars, government officers and citizens — but current operations face critical bottlenecks.
                </p>
              </div>
            </Container>

            {/* Cards Container */}
            <div className="flex-1 relative w-full overflow-hidden my-4">
              <DesktopCard
                card={CARDS[0]}
                style={{ x: card1X, scale: card1Scale, opacity: card1Opacity, zIndex: card1Z }}
              />
              <DesktopCard
                card={CARDS[1]}
                style={{ x: card2X, scale: card2Scale, opacity: card2Opacity, zIndex: card2Z }}
              />
              <DesktopCard
                card={CARDS[2]}
                style={{ x: card3X, scale: card3Scale, opacity: card3Opacity, zIndex: card3Z }}
              />
            </div>

            {/* Interactive indicator dots */}
            <div className="shrink-0 flex justify-center items-center gap-3">
              <motion.div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: dot1Bg, scale: dot1Scale }} />
              <motion.div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: dot2Bg, scale: dot2Scale }} />
              <motion.div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: dot3Bg, scale: dot3Scale }} />
            </div>

          </div>
        </div>
      </div>

      {/* Mobile view (Simple vertical list) */}
      <div className="block md:hidden py-16">
        <Container>
          <div className="space-y-4 text-left mb-10">
            <h2 className="section-heading-custom text-[#0B1F3A] leading-[1.1] tracking-tight">
              The Problem We Are Solving
            </h2>
            <p className="text-xs sm:text-sm text-[#4A515E] leading-relaxed">
              BARTI maintains a large collection of books accessed by students, researchers, scholars, government officers and citizens — but current operations face critical bottlenecks.
            </p>
          </div>
          
          <div className="space-y-6">
            <MobileCard card={CARDS[0]} />
            <MobileCard card={CARDS[1]} />
            <MobileCard card={CARDS[2]} />
          </div>
        </Container>
      </div>

    </section>
  )
}

