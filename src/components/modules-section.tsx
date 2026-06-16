"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, cardItem, fadeUp } from "@/lib/animations";
import { FEATURES_HIGHLIGHT } from "@/lib/constants";
import { Container } from "@/components/container";
import { 
  Search, 
  Sparkles, 
  Folder, 
  FileText, 
  Barcode, 
  QrCode, 
  Sliders, 
  Contact,
  ArrowRight,
  Database,
  Cpu,
  LayoutGrid
} from "lucide-react";

// Mockup 1: Library Operations Dashboard Mockup (Cataloging & Inventory Tabs)
function LibraryOperationsMockup() {
  return (
    <div className="bg-[#FAFAF8] border border-[#E4E7EC] rounded-xl text-[9px] font-sans text-[#0B1F3A] h-48 overflow-hidden flex flex-col shadow-inner bg-white">
      {/* Window Title Bar */}
      <div className="bg-[#0B1F3A] p-2 flex justify-between items-center text-white text-[8px] font-mono select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          <span className="w-2 h-2 rounded-full bg-yellow-500" />
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-white/60 ml-2 font-sans font-bold">LIBRARY_OPS_V1.2</span>
        </div>
        <span className="px-1.5 py-0.5 bg-[#C89B3C] text-[#0B1F3A] text-[6.5px] font-bold rounded">LIVE</span>
      </div>

      {/* Tabs Menu inside the Mockup */}
      <div className="flex border-b border-[#E4E7EC] bg-[#FAFAF8] text-[7.5px] font-bold text-[#5E6573]">
        <div className="px-3 py-1.5 border-r border-[#E4E7EC] bg-white text-[#0B1F3A] border-b border-white">Cataloging</div>
        <div className="px-3 py-1.5 border-r border-[#E4E7EC] hover:bg-white/50 cursor-pointer">Inventory</div>
        <div className="px-3 py-1.5 border-r border-[#E4E7EC] hover:bg-white/50 cursor-pointer">Loans</div>
      </div>

      {/* Grid content */}
      <div className="flex-1 p-2.5 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Active catalog details table */}
          <table className="w-full text-left text-[7px] border-collapse">
            <thead>
              <tr className="border-b border-[#E4E7EC] text-[#5E6573] font-bold uppercase tracking-wider">
                <th className="pb-1">Book Title</th>
                <th className="pb-1">ISBN</th>
                <th className="pb-1">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EC]/50 font-medium text-[#0B1F3A]">
              <tr>
                <td className="py-1 truncate max-w-[120px]">Dr. Ambedkar Speech Vol I</td>
                <td className="py-1 font-mono">978-81-79</td>
                <td className="py-1 text-green-600 font-bold">In Library</td>
              </tr>
              <tr>
                <td className="py-1 truncate max-w-[120px]">Constitution of India Draft</td>
                <td className="py-1 font-mono">978-93-85</td>
                <td className="py-1 text-amber-600 font-bold">On Loan</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Sync Status bar */}
        <div className="flex justify-between items-center text-[7px] text-[#5E6573]/80 pt-1.5 border-t border-[#E4E7EC]/50">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span>Barcode Scanner: Connected</span>
          </div>
          <span className="font-mono bg-[#FAFAF8] px-1 rounded border border-[#E4E7EC]">SYNC OK</span>
        </div>
      </div>
    </div>
  );
}

// Mockup 2: Digital Repository File Explorer Mockup (Collections & Ingest Tabs)
function DigitalRepositoryMockup() {
  return (
    <div className="bg-[#FAFAF8] border border-[#E4E7EC] rounded-xl text-[9px] font-sans text-[#0B1F3A] h-48 overflow-hidden flex flex-col shadow-inner bg-white">
      {/* Window Title Bar */}
      <div className="bg-[#0D9488] p-2 flex justify-between items-center text-white text-[8px] font-mono select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="text-white/80 ml-2 font-sans font-bold">REPOS_BROWSER</span>
        </div>
        <span className="text-[6px] font-mono tracking-widest opacity-80">COLLECTIONS</span>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-[#E4E7EC] bg-[#FAFAF8] text-[7.5px] font-bold text-[#5E6573]">
        <div className="px-3 py-1.5 border-r border-[#E4E7EC] bg-white text-[#0D9488] border-b border-white">Collections</div>
        <div className="px-3 py-1.5 border-r border-[#E4E7EC] hover:bg-white/50 cursor-pointer">Preservation</div>
        <div className="px-3 py-1.5 border-r border-[#E4E7EC] hover:bg-white/50 cursor-pointer">Ingest Queue</div>
      </div>

      {/* Directory Content Area */}
      <div className="flex-1 flex bg-white">
        {/* Sidebar */}
        <div className="w-16 bg-[#FAFAF8] border-r border-[#E4E7EC] p-2 flex flex-col gap-1.5 text-[#5E6573] text-[7px] font-medium">
          <div className="font-bold text-[#0B1F3A] text-[7.5px] uppercase tracking-wider mb-1">Folders</div>
          <div className="flex items-center gap-1 text-[#0D9488]"><Folder size={8} /> Books</div>
          <div className="flex items-center gap-1 pl-2"><Folder size={8} /> Speeches</div>
          <div className="flex items-center gap-1"><Folder size={8} /> Archives</div>
        </div>

        {/* Folder items */}
        <div className="flex-1 p-2 flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-1.5 bg-[#FAFAF8] border border-[#E4E7EC] rounded flex flex-col gap-1 hover:border-[#0D9488] cursor-pointer">
              <span className="text-sm">📄</span>
              <span className="font-bold text-[6.5px] truncate w-full">Constitutional_Draft.pdf</span>
              <span className="text-[5.5px] text-[#5E6573] font-mono">1.2 MB</span>
            </div>
            <div className="p-1.5 bg-[#FAFAF8] border border-[#E4E7EC] rounded flex flex-col gap-1 hover:border-[#0D9488] cursor-pointer">
              <span className="text-sm">📄</span>
              <span className="font-bold text-[6.5px] truncate w-full">Writings_Vol14.epub</span>
              <span className="text-[5.5px] text-[#5E6573] font-mono">4.5 MB</span>
            </div>
          </div>
          <div className="text-[6px] text-[#5E6573]/80 border-t border-[#E4E7EC]/40 pt-1.5 truncate">
            Last Archive Ingest: Ingested Constitutional_Draft.pdf (OK)
          </div>
        </div>
      </div>
    </div>
  );
}

// Mockup 3: Knowledge Discovery Faceted Search
function KnowledgeDiscoveryMockup() {
  return (
    <div className="bg-[#FAFAF8] border border-[#E4E7EC] rounded-xl text-[9px] font-sans text-[#0B1F3A] h-48 overflow-hidden flex flex-col justify-between bg-white shadow-inner">
      {/* Window Title Bar */}
      <div className="bg-[#C89B3C] p-2 flex justify-between items-center text-white text-[8px] font-mono select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="text-[#0B1F3A] ml-2 font-sans font-bold">DISCOVERY_SEARCH</span>
        </div>
        <span className="text-[6.5px] text-[#0B1F3A] font-bold">FACETED</span>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-[#E4E7EC] bg-[#FAFAF8] text-[7.5px] font-bold text-[#5E6573]">
        <div className="px-3 py-1.5 border-r border-[#E4E7EC] bg-white text-[#C89B3C] border-b border-white">Search</div>
        <div className="px-3 py-1.5 border-r border-[#E4E7EC] hover:bg-white/50 cursor-pointer">Filters</div>
        <div className="px-3 py-1.5 border-r border-[#E4E7EC] hover:bg-white/50 cursor-pointer">Index</div>
      </div>

      {/* Search Input and Output */}
      <div className="flex-1 p-2.5 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Active Search box simulation */}
          <div className="relative">
            <input 
              type="text" 
              value="B.R. Ambedkar Speeches" 
              className="w-full bg-[#FAFAF8] border border-[#E4E7EC] rounded px-2 py-1 text-[7.5px] font-semibold focus:outline-none"
              readOnly
            />
            <Search size={8} className="absolute right-2 top-2 text-[#5E6573]" />
          </div>

          {/* Search Result Items */}
          <div className="space-y-1.5">
            <div className="p-1.5 bg-[#FAFAF8] border border-[#E4E7EC] rounded flex justify-between items-center text-[7px]">
              <div>
                <div className="font-bold text-[#0B1F3A]">Dr. Ambedkar Speech Vol 14</div>
                <div className="text-[#5E6573] text-[6px]">Hindu Code Bill Arguments</div>
              </div>
              <span className="px-1.5 py-0.5 bg-[#C89B3C]/10 text-[#C89B3C] rounded-[3px] text-[5.5px] font-bold font-mono">Speeches</span>
            </div>
          </div>
        </div>

        <div className="text-[6.5px] text-[#5E6573]/80 border-t border-[#E4E7EC]/40 pt-1.5">
          Filtered by: Subject=Social Justice, Matches: 120
        </div>
      </div>
    </div>
  );
}

// Mockup 4: AI Intelligence Chat Box
function AIIntelligenceMockup() {
  return (
    <div className="bg-[#FAFAF8] border border-[#E4E7EC] rounded-xl text-[9px] font-sans text-[#0B1F3A] h-48 overflow-hidden flex flex-col justify-between bg-white shadow-inner">
      {/* Window Title Bar */}
      <div className="bg-[#6D28D9] p-2 flex justify-between items-center text-white text-[8px] font-mono select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="text-white/80 ml-2 font-sans font-bold">BARTI_ASSISTANT_AI</span>
        </div>
        <span className="text-[6.5px] font-mono tracking-widest animate-pulse text-purple-200">ACTIVE</span>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-[#E4E7EC] bg-[#FAFAF8] text-[7.5px] font-bold text-[#5E6573]">
        <div className="px-3 py-1.5 border-r border-[#E4E7EC] hover:bg-white/50 cursor-pointer">Recommendations</div>
        <div className="px-3 py-1.5 border-r border-[#E4E7EC] hover:bg-white/50 cursor-pointer">Insights</div>
        <div className="px-3 py-1.5 border-r border-[#E4E7EC] bg-white text-[#6D28D9] border-b border-white">Assistant</div>
      </div>

      {/* Chat Thread Messages */}
      <div className="flex-1 p-2.5 flex flex-col justify-between">
        <div className="space-y-2 flex-1 overflow-y-auto max-h-[90px]">
          {/* User query bubble */}
          <div className="flex gap-1.5 items-end justify-end">
            <div className="bg-[#FAFAF8] border border-[#E4E7EC] p-1.5 rounded-lg text-[7.5px] text-[#5E6573] max-w-[80%] text-right font-medium">
              Summarize Hindu Code Bill speech
            </div>
          </div>
          {/* AI Response bubble */}
          <div className="flex gap-1.5 items-start">
            <div className="w-4 h-4 rounded-full bg-[#0B1F3A] text-[#C89B3C] text-[6.5px] font-bold flex items-center justify-center flex-shrink-0 shadow-sm">B</div>
            <div className="bg-[#6D28D9]/5 border border-[#6D28D9]/10 p-1.5 rounded-lg text-[7px] text-[#0B1F3A] max-w-[80%] leading-relaxed">
              <p className="font-semibold text-purple-900">Dr. Ambedkar argued for gender equality, marriage reform, and unified inheritance rights.</p>
              <div className="text-[5.5px] text-purple-600 font-bold mt-1">Source: Writings Vol 14, p.238</div>
            </div>
          </div>
        </div>

        {/* Input area */}
        <div className="relative mt-1 border-t border-[#E4E7EC]/40 pt-1.5">
          <input 
            type="text" 
            placeholder="Type query to Ask BARTI..." 
            className="w-full bg-[#FAFAF8] border border-[#E4E7EC] rounded pl-2 pr-6 py-1 text-[7.5px] focus:outline-none"
            readOnly
          />
          <Sparkles size={9} className="absolute right-2 top-3 text-[#6D28D9]" />
        </div>
      </div>
    </div>
  );
}

// Icons mapping for the 6 core features
const FEATURE_ICONS = [
  Barcode,       // Barcode Cataloging
  QrCode,        // QR-Based Issue & Return
  Search,        // Smart Book Discovery
  Sliders,       // Configurable Rules
  Contact,       // Digital Membership Cards
  FileText       // Government-Grade Reporting
];

const MOCKUP_TABS = [
  { id: "ops", label: "Library Operations", component: LibraryOperationsMockup, desc: "Barcode cataloging, real-time inventory adjustments, and loan processing dashboards." },
  { id: "repo", label: "Digital Repository", component: DigitalRepositoryMockup, desc: "Online document preservation engine supporting upload, synchronization, and secure browsing." },
  { id: "discovery", label: "Faceted Discovery", component: KnowledgeDiscoveryMockup, desc: "Faceted filtering across categories, author directories, and historic subject tags." },
  { id: "ai", label: "AI Knowledge Assistant", component: AIIntelligenceMockup, desc: "Ask BARTI conversational engine retrieving contextually accurate excerpts from Ambedkarite volumes." }
];

export function FeaturesSection() {
  const [activeTab, setActiveTab] = useState("ops");
  const CurrentMockup = MOCKUP_TABS.find(t => t.id === activeTab)?.component || LibraryOperationsMockup;
  const currentDesc = MOCKUP_TABS.find(t => t.id === activeTab)?.desc || "";

  return (
    <section id="features" className="bg-[#F3F2EE] py-16 md:py-20 border-b border-[#E4E7EC]/40">
      <Container>
        
        {/* Section Header */}
        <div className="text-left mb-12">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C89B3C] block mb-3">
            PLATFORM HIGHLIGHTS —
          </span>
          <h2 className="section-heading-custom text-[#0B1F3A] leading-[1.1] tracking-tight">
            {FEATURES_HIGHLIGHT.title}
          </h2>
        </div>

        {/* 6-column features grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1280px] mx-auto mb-16"
        >
          {FEATURES_HIGHLIGHT.cards.map((card, index) => {
            const IconComponent = FEATURE_ICONS[index] || Barcode;

            return (
              <motion.div
                key={card.title}
                variants={cardItem}
                className="bg-white border border-[#E4E7EC]/80 rounded-[24px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-[0_15px_40px_rgb(0,0,0,0.03)] hover:border-[#C89B3C]/20 transition-all duration-300 flex flex-col justify-between min-h-[180px] group"
              >
                <div className="space-y-4">
                  <span className="w-10 h-10 rounded-xl bg-[#0B1F3A]/5 border border-[#0B1F3A]/10 text-[#0B1F3A] flex items-center justify-center shadow-sm group-hover:scale-105 transition-all duration-300">
                    <IconComponent size={20} />
                  </span>
                  
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-[#0B1F3A] tracking-tight group-hover:text-[#C89B3C] transition-colors duration-300">
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

        {/* Premium System Preview Dashboard (Tabs-based Mockups showcase) */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-white border border-[#E4E7EC] rounded-[24px] p-6 md:p-8 shadow-[0_12px_30px_rgba(11,31,58,0.02)] w-full max-w-[1280px] mx-auto relative overflow-hidden"
        >
          {/* Accent strip */}
          <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#0B1F3A]" />

          <div className="flex flex-col lg:flex-row items-stretch gap-8 relative z-10">
            {/* Left side: Navigation tabs & details */}
            <div className="lg:w-[45%] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#C89B3C] font-bold text-xs uppercase tracking-wider">
                  <LayoutGrid size={16} />
                  <span>Interactive Preview</span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-[#0B1F3A] tracking-tight leading-tight">
                  Experience the Core Management Dashboard
                </h3>
                
                <p className="text-xs text-[#5E6573] leading-relaxed">
                  Toggle through the tabs below to preview the live interface layouts designed specifically for BARTI administrative officers and visiting scholars.
                </p>
              </div>

              {/* Navigation button tabs */}
              <div className="flex flex-col gap-2.5">
                {MOCKUP_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`text-left px-4 py-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all duration-300 ${
                      activeTab === tab.id
                        ? "bg-[#0B1F3A] border-[#0B1F3A] text-white shadow-md"
                        : "bg-[#FAFAF8] border-[#E4E7EC] text-[#4A515E] hover:bg-[#F3F2EE]"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <ArrowRight size={14} className={activeTab === tab.id ? "opacity-100 translate-x-0 transition-all" : "opacity-0 -translate-x-2 transition-all"} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right side: Mockup Display Area with active animation */}
            <div className="lg:w-[55%] flex flex-col justify-center bg-[#FAFAF8] border border-[#E4E7EC]/60 rounded-2xl p-6 relative min-h-[260px]">
              <div className="absolute top-2 left-4 text-[8.5px] uppercase font-bold text-[#5E6573]/60 tracking-widest select-none">
                Interface Preview
              </div>
              
              <div className="space-y-4 pt-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CurrentMockup />
                  </motion.div>
                </AnimatePresence>

                {/* Subtext describing active preview */}
                <motion.p
                  key={`desc-${activeTab}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[11px] text-[#5E6573] leading-relaxed text-center font-medium italic pt-1"
                >
                  {currentDesc}
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>

      </Container>
    </section>
  );
}
