"use client";

import { motion } from "framer-motion";
import { staggerContainer, cardItem } from "@/lib/animations";
import { CAPABILITIES } from "@/lib/constants";
import { Container } from "@/components/container";
import { Search, Sparkles, Folder, FileText, CheckCircle2, Server, Barcode, Database, Cpu } from "lucide-react";

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

const mockups = [
  LibraryOperationsMockup,
  DigitalRepositoryMockup,
  KnowledgeDiscoveryMockup,
  AIIntelligenceMockup,
];

export function ModulesSection() {
  return (
    <section id="capabilities" className="bg-[#FAFAF8] py-16 md:py-20">
      <Container>
        {/* Section Header */}
        <div className="text-left mb-12">
          <h2 className="section-heading-custom text-[#0B1F3A] leading-[1.1] tracking-tight">
            Core Platform Capabilities
          </h2>
        </div>

        {/* 4-column capabilities grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-[1280px] mx-auto"
        >
          {CAPABILITIES.cards.map((card, index) => {
            const MockupComponent = mockups[index] || LibraryOperationsMockup;

            return (
              <motion.div
                key={card.title}
                variants={cardItem}
                className="bg-white border border-[#E4E7EC]/60 rounded-[24px] p-6 shadow-[0_12px_30px_rgba(11,31,58,0.03)] hover:shadow-[0_20px_40px_rgba(11,31,58,0.06)] transition-all duration-300 flex flex-col justify-between min-h-[420px] group"
              >
                {/* Upper block - Title and description */}
                <div className="space-y-4">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#C89B3C] bg-[#C89B3C]/5 border border-[#C89B3C]/10 px-2 py-0.5 rounded">
                    {card.label}
                  </span>
                  
                  <h3 className="text-xl font-bold text-[#0B1F3A] tracking-tight pt-1">
                    {card.title}
                  </h3>
                  
                  <p className="text-xs text-[#5E6573] leading-relaxed">
                    {card.description}
                  </p>
                  
                  {/* Features list */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {card.features.slice(0, 3).map((feat) => (
                      <span key={feat} className="px-2 py-0.5 bg-[#F3F2EE] text-[#5E6573] text-[9px] font-bold rounded uppercase tracking-wider">
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Down block - Detailed Screenshot Mockup */}
                <div className="mt-6 pt-2 border-t border-[#E4E7EC]/40 group-hover:border-[#C89B3C]/30 transition-colors duration-300">
                  <MockupComponent />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
