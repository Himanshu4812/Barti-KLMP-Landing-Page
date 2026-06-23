"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FEATURES_HIGHLIGHT } from "@/lib/features"
import { Barcode, QrCode, Search, Sliders, Contact, FileText } from "lucide-react"

const FEATURE_ICONS = [Barcode, QrCode, Search, Sliders, Contact, FileText]

export function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const totalScrollable = rect.height - window.innerHeight
      if (totalScrollable > 0) {
        // Calculate progress as scrolled ratio relative to sticky container
        const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable))
        setScrollProgress(progress)
      }
    }

    // Initialize progress on mount
    handleScroll()

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  // Elliptical orbit — wider on X-axis to fill left/right space, compact on Y-axis to avoid top/bottom overflow
  const expandRadiusX = scrollProgress * 380
  const expandRadiusY = scrollProgress * 200

  return (
    <div 
      ref={containerRef} 
      id="features"
      className="relative min-h-[180vh] bg-[#FCFCFB] w-full border-y border-black/5 scroll-mt-[-50px]"
    >
      {/* Sticky viewport area */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Subtle high-end glowing background radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,155,60,0.06),transparent_65%)] pointer-events-none" />
        
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.006)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.006)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="relative flex items-center justify-center w-full max-w-6xl h-[600px] mt-16">
          {/* Concentric Circle 1 (Outer) */}
          <div
            className="absolute rounded-full border border-[#0B1F3A]/20 bg-[#0B1F3A]/[0.02] transition-all duration-300 ease-out"
            style={{
              width: `${440 + scrollProgress * 100}px`,
              height: `${440 + scrollProgress * 100}px`,
              opacity: scrollProgress > 0.1 ? 1 : 0,
            }}
          />

          {/* Concentric Circle 2 (Middle) */}
          <div
            className="absolute rounded-full border border-[#C89B3C]/30 bg-[#C89B3C]/[0.03] transition-all duration-300 ease-out"
            style={{
              width: `${350 + scrollProgress * 80}px`,
              height: `${350 + scrollProgress * 80}px`,
              opacity: scrollProgress > 0.2 ? 1 : 0,
            }}
          />

          {/* Central content ring container */}
          <div
            className={`w-[240px] h-[240px] rounded-full p-[1.5px] bg-gradient-to-tr from-[#C89B3C]/80 via-[#C89B3C]/30 to-[#C89B3C]/80 shadow-[0_0_40px_rgba(200,155,60,0.08)] flex items-center justify-center relative z-20 transition-all duration-500 ${
              scrollProgress > 0.25 ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            {/* Inner Light circular content box */}
            <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center p-4 text-center border border-[#C89B3C]/10 shadow-inner">
              <AnimatePresence mode="wait">
                {hoveredIndex === null ? (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center"
                  >
                    <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#C89B3C] mb-2">
                      <span className="font-serif font-black">BARTI</span> KLMP
                    </span>
                    <h2 className="text-xl font-extrabold text-[#0B1F3A] tracking-tight leading-snug mb-2">
                      Core Feature Highlights
                    </h2>
                    <p className="text-gray-500 text-[10.5px] leading-relaxed max-w-[200px]">
                      Scroll down to expand modules, or hover over a card to view its core capabilities.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={hoveredIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center"
                  >
                    {(() => {
                      const card = FEATURES_HIGHLIGHT.cards[hoveredIndex]
                      const Icon = FEATURE_ICONS[hoveredIndex] || Barcode
                      return (
                        <>
                          <div className="w-9 h-9 rounded-full bg-[#C89B3C]/10 border border-[#C89B3C]/30 flex items-center justify-center text-[#C89B3C] mb-2.5 shadow-[0_0_12px_rgba(200,155,60,0.06)]">
                            <Icon size={16} />
                          </div>
                          <h3 className="text-[15px] font-bold text-[#0B1F3A] tracking-tight leading-snug mb-1">
                            {card.title}
                          </h3>
                          <p className="text-gray-600 text-[10.5px] leading-relaxed max-w-[210px]">
                            {card.description}
                          </p>
                        </>
                      )
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Orbiting Cards */}
          {FEATURES_HIGHLIGHT.cards.map((card, index) => {
            // Position in circular layout spaced by 60 degrees (PI / 3) starting from top (-90 degrees)
            const rotationOffset = -Math.PI / 2
            const angle = (index * 2 * Math.PI) / 6 + rotationOffset
            
            const x = expandRadiusX * Math.cos(angle)
            const y = expandRadiusY * Math.sin(angle)
            const isHovered = hoveredIndex === index

            return (
              <div
                key={card.title}
                className="absolute z-30 transition-transform duration-300 ease-out cursor-pointer"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Feature Card Wrapper */}
                <div
                  className={`w-[190px] h-[130px] sm:w-[210px] sm:h-[140px] rounded-xl overflow-hidden border transition-all duration-300 ${
                    isHovered
                      ? "border-[#C89B3C] shadow-[0_12px_35px_rgba(200,155,60,0.18)] scale-105 z-40 bg-white"
                      : "border-black/5 hover:border-black/10 shadow-lg bg-white"
                  }`}
                >
                  {/* Image container */}
                  <div className="w-full h-full overflow-hidden relative bg-[#FAF9F5]">
                    <img
                      src={card.image}
                      alt={card.title}
                      className={`w-full h-full object-cover transition-all duration-300 ${
                        isHovered ? "opacity-100 scale-105" : "opacity-85"
                      }`}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
