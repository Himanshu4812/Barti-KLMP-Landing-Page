"use client";

import { useState, useEffect, useRef } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { cn } from "@/lib/utils";
import {
  Bot,
  Send,
  Sparkles,
  TrendingUp,
  TrendingDown,
  BookOpen,
  User,
  MessageSquare,
  Lightbulb,
} from "lucide-react";

interface ChatMessage {
  id: string;
  role: "ai" | "user";
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  "What are the key themes in Dr. Ambedkar's writings?",
  "Summarize the Constitution's fundamental rights",
  "Show me trending research in social justice",
  "Find books on caste discrimination",
];

const mockBooks = [
  { title: "Annihilation of Caste", author: "Dr. B.R. Ambedkar", color: "bg-navy", reason: "Based on your history" },
  { title: "The Constitution of India", author: "B. Shiva Rao", color: "bg-teal", reason: "Popular in your network" },
  { title: "India After Gandhi", author: "Ramachandra Guha", color: "bg-gold/80", reason: "Trending this week" },
  { title: "Why I Am Not a Hindu", author: "Kancha Ilaiah", color: "bg-navy-light", reason: "Based on your history" },
  { title: "Caste: Origins of My Discontent", author: "Dr. B.R. Ambedkar", color: "bg-teal-light", reason: "New release" },
  { title: "The Buddha and His Dhamma", author: "Dr. B.R. Ambedkar", color: "bg-navy", reason: "Recommended for you" },
];

const trendingTopics = [
  { name: "Caste Discrimination", count: 342, growth: 12, direction: "up" as const },
  { name: "Ambedkar Studies", count: 298, growth: 8, direction: "up" as const },
  { name: "Constitutional Law", count: 256, growth: -3, direction: "down" as const },
  { name: "Buddhist Philosophy", count: 215, growth: 15, direction: "up" as const },
  { name: "Social Justice", count: 198, growth: 10, direction: "up" as const },
  { name: "Reservation Policy", count: 167, growth: -5, direction: "down" as const },
  { name: "Historical Manuscripts", count: 145, growth: 7, direction: "up" as const },
  { name: "Human Rights", count: 132, growth: 4, direction: "up" as const },
  { name: "Education Reform", count: 98, growth: -2, direction: "down" as const },
  { name: "Pali Literature", count: 76, growth: 18, direction: "up" as const },
];

function getTopicSize(count: number): string {
  if (count >= 300) return "text-lg font-bold";
  if (count >= 200) return "text-base font-semibold";
  if (count >= 150) return "text-sm font-medium";
  return "text-xs font-normal";
}

export default function AIPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "ai",
      content: "Hello! I'm BARTI's AI Knowledge Assistant. I can help you explore our library collection, answer questions about Dr. Ambedkar's works, Indian Constitution, social justice topics, and more. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSuggestedClick = (question: string) => {
    const userMsg: ChatMessage = {
      id: String(Date.now()),
      role: "user",
      content: question,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: String(Date.now() + 1),
        role: "ai",
        content: getMockResponse(question),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="AI Knowledge Center"
        description="Phase 3 — Coming Soon"
      />

      {/* AI Chat Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-navy to-navy-light">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm">Ask BARTI</h3>
              <p className="text-xs text-white/60">AI-powered knowledge assistant</p>
            </div>
            <span className="ml-auto px-2 py-0.5 text-xs font-medium bg-amber-50 text-amber-700 rounded-full">
              Preview
            </span>
          </div>
        </div>

        <div className="h-80 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex gap-3",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {msg.role === "ai" && (
                <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-gold" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-[75%] rounded-2xl px-4 py-3 text-sm",
                  msg.role === "ai"
                    ? "bg-white border border-gray-200 text-gray-800"
                    : "bg-navy text-white"
                )}
              >
                <p className="leading-relaxed">{msg.content}</p>
                <p className={cn("text-xs mt-1.5", msg.role === "ai" ? "text-gray-400" : "text-white/50")}>
                  {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-gold" />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="px-6 py-4 border-t border-gray-100 bg-white">
          <div className="flex flex-wrap gap-2 mb-3">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSuggestedClick(q)}
                disabled={isTyping}
                className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full hover:bg-navy/10 hover:text-navy transition-colors disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                disabled
                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 text-gray-400 cursor-not-allowed"
                placeholder="Ask a question... Coming Soon"
              />
            </div>
            <button
              disabled
              className="px-4 py-2.5 bg-gray-200 text-gray-400 rounded-xl cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Reading */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-gold" />
          <h2 className="text-lg font-semibold text-gray-900">Recommended Reading</h2>
          <span className="px-2 py-0.5 text-xs font-medium bg-navy/5 text-navy rounded-full">AI Curated</span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2">
          {mockBooks.map((book) => (
            <div
              key={book.title}
              className="flex-shrink-0 w-56 bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className={`h-28 ${book.color} flex items-center justify-center`}>
                <BookOpen className="w-10 h-10 text-white/40" />
              </div>
              <div className="p-4">
                <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">{book.title}</h4>
                <p className="text-xs text-gray-500 mt-0.5">{book.author}</p>
                <span className="inline-block mt-2 px-2 py-0.5 text-xs font-medium bg-gold/10 text-gold rounded-full">
                  {book.reason}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Topics */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-navy" />
          <h2 className="text-lg font-semibold text-gray-900">Trending Topics</h2>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex flex-wrap gap-3">
            {trendingTopics.map((topic) => (
              <div
                key={topic.name}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-100 hover:border-gold/30 hover:bg-gold/5 transition-colors cursor-pointer",
                  getTopicSize(topic.count)
                )}
              >
                <span className="text-gray-800">{topic.name}</span>
                <span className="text-xs text-gray-400">({topic.count})</span>
                {topic.direction === "up" ? (
                  <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function getMockResponse(question: string): string {
  const responses: Record<string, string> = {
    "What are the key themes in Dr. Ambedkar's writings?":
      "Dr. Ambedkar's writings primarily explore themes of **social justice**, **caste annihilation**, **constitutional democracy**, and **Buddhist philosophy**. His seminal work *Annihilation of Caste* critiques the Hindu caste system and advocates for social equality. In *The Buddha and His Dhamma*, he reinterprets Buddhism as a rational, ethical philosophy centered on liberty, equality, and fraternity. His economic writings like *The Problem of the Rupee* showcase his expertise in economics. Across his works, three pillars stand out: **liberty, equality, and fraternity** as the foundation of a just society.",
    "Summarize the Constitution's fundamental rights":
      "The Indian Constitution guarantees six fundamental rights under Part III (Articles 12–35):\n\n1. **Right to Equality** (Art. 14–18): Equality before law, prohibition of discrimination, abolition of untouchability.\n2. **Right to Freedom** (Art. 19–22): Freedom of speech, assembly, movement, profession, and protection against arbitrary arrest.\n3. **Right against Exploitation** (Art. 23–24): Prohibition of human trafficking and child labor.\n4. **Right to Freedom of Religion** (Art. 25–28): Freedom of conscience and practice of religion.\n5. **Cultural & Educational Rights** (Art. 29–30): Protection of minorities' cultural and educational institutions.\n6. **Right to Constitutional Remedies** (Art. 32): Right to move the Supreme Court for enforcement of these rights — described by Dr. Ambedkar as the 'heart and soul of the Constitution.'",
    "Show me trending research in social justice":
      "Here are the top trending research areas in social justice at BARTI this month:\n\n1. **Caste-based discrimination in urban employment** — 34 new papers\n2. **Impact of reservations in higher education** — 28 new papers\n3. **Buddhist conversion movements in Maharashtra** — 22 new papers\n4. **Intersectionality of caste and gender** — 19 new papers\n5. **Constitutional morality in contemporary India** — 17 new papers\n\nWould you like me to find specific papers from any of these areas? I can help you locate them in our digital repository.",
    "Find books on caste discrimination":
      "I found **47 books** in our collection related to caste discrimination. Here are the most relevant:\n\n1. **Annihilation of Caste** — Dr. B.R. Ambedkar (Available: 3 copies)\n2. **Why I Am Not a Hindu** — Kancha Ilaiah (Available: 2 copies)\n3. **Caste: Origins of Our Discontents** — Isabel Wilkerson (Available: 1 copy)\n4. **The Caste Question** — Anupama Rao (Available: 2 copies)\n5. **Caste in Indian Politics** — Rajni Kothari (Available: 1 copy)\n\nWould you like me to show you where these are located in the library or reserve a copy?",
  };
  return responses[question] || "That's an excellent question! I'm still learning and will be able to provide detailed answers once the full AI Knowledge Center launches in Phase 3. For now, I recommend searching our Digital Repository or checking with the library staff for more information.";
}
