"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Container } from "@/components/container";
import { Search, SlidersHorizontal, ChevronDown, ChevronLeft, ChevronRight, BookOpen, X } from "lucide-react";

interface BookData {
  id: number;
  title: string;
  author: string;
  category: string;
  isbn: string;
  available: boolean;
  language: string;
  year: number;
}

const CATEGORIES = ["Ambedkar Literature", "Constitutional Studies", "Social Justice", "Research Papers", "History", "Philosophy", "Law", "Economics"];

const LANGUAGES = ["English", "Marathi", "Hindi", "Sanskrit"];

const MOCK_BOOKS: BookData[] = [
  { id: 1, title: "Annihilation of Caste", author: "Dr. B. R. Ambedkar", category: "Ambedkar Literature", isbn: "978-0-14-342435-4", available: true, language: "English", year: 1936 },
  { id: 2, title: "The Constitution of India", author: "Dr. B. R. Ambedkar", category: "Constitutional Studies", isbn: "978-0-19-563892-1", available: true, language: "English", year: 1950 },
  { id: 3, title: "Who Were the Shudras?", author: "Dr. B. R. Ambedkar", category: "Ambedkar Literature", isbn: "978-0-19-806609-3", available: false, language: "English", year: 1946 },
  { id: 4, title: "Bharatiya Rajyaghat va Ambedkar", author: "Dr. B. R. Ambedkar", category: "Constitutional Studies", isbn: "978-81-901635-1-8", available: true, language: "Marathi", year: 1951 },
  { id: 5, title: "Caste and Democratic Politics", author: "Prof. M. S. Gore", category: "Social Justice", isbn: "978-81-250-2345-6", available: true, language: "English", year: 2002 },
  { id: 6, title: "Maharashtrachi Samajik Chalwal", author: "Dadasaheb Shinde", category: "Social Justice", isbn: "978-81-87439-56-7", available: false, language: "Marathi", year: 1998 },
  { id: 7, title: "The Indian Constitution: Cornerstone of a Nation", author: "Granville Austin", category: "Constitutional Studies", isbn: "978-0-19-564765-7", available: true, language: "English", year: 1966 },
  { id: 8, title: "Ambedkar: The Hidden Story", author: "K. N. Jadhav", category: "Ambedkar Literature", isbn: "978-93-81345-67-8", available: true, language: "English", year: 2015 },
  { id: 9, title: "Gramin Bharat aur Samajik Nyay", author: "D. S. Khairmode", category: "Social Justice", isbn: "978-81-90234-12-6", available: true, language: "Hindi", year: 2010 },
  { id: 10, title: "Philosophy of Hinduism", author: "Dr. B. R. Ambedkar", category: "Philosophy", isbn: "978-81-85279-12-3", available: false, language: "English", year: 1960 },
  { id: 11, title: "Buddha and His Dhamma", author: "Dr. B. R. Ambedkar", category: "Philosophy", isbn: "978-81-85146-22-7", available: true, language: "English", year: 1957 },
  { id: 12, title: "Economic Development of Maharashtra", author: "Dr. V. M. Dandekar", category: "Economics", isbn: "978-81-250-1987-9", available: true, language: "English", year: 2005 },
  { id: 13, title: "Dalit Movement in India", author: "Eleanor Zelliot", category: "History", isbn: "978-0-19-567092-1", available: true, language: "English", year: 1992 },
  { id: 14, title: "Sansadiche Karyapranali", author: "Dr. M. P. Pawar", category: "Law", isbn: "978-81-90345-67-4", available: false, language: "Marathi", year: 2018 },
  { id: 15, title: "Social Justice and Human Rights", author: "Justice P. N. Bhagwati", category: "Law", isbn: "978-81-7534-789-6", available: true, language: "English", year: 2008 },
  { id: 16, title: "Dr. Ambedkar and Social Transformation", author: "Dr. S. B. Gokhale", category: "Ambedkar Literature", isbn: "978-93-81234-56-7", available: true, language: "Marathi", year: 2020 },
  { id: 17, title: "Samajik Samata ani Dharma", author: "Prof. K. B. Kole", category: "Social Justice", isbn: "978-81-94321-56-9", available: false, language: "Marathi", year: 2016 },
  { id: 18, title: "Indian Federalism", author: "Dr. B. R. Ambedkar", category: "Constitutional Studies", isbn: "978-0-19-567243-7", available: true, language: "English", year: 1954 },
  { id: 19, title: "Global Research Trends on Social Justice", author: "Dr. A. R. Desai", category: "Research Papers", isbn: "978-93-81267-89-9", available: true, language: "English", year: 2023 },
  { id: 20, title: "Maharashtra: History and Heritage", author: "Dr. G. S. Sardesai", category: "History", isbn: "978-81-250-1234-5", available: true, language: "English", year: 2001 },
];

const ITEMS_PER_PAGE = 4;

const colorPalette = [
  "bg-red-100 text-red-700",
  "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",
  "bg-purple-100 text-purple-700",
  "bg-amber-100 text-amber-700",
  "bg-teal-100 text-teal-700",
  "bg-indigo-100 text-indigo-700",
  "bg-pink-100 text-pink-700",
];

const coverBg = [
  "from-navy to-navy-light",
  "from-gold to-amber-700",
  "from-teal to-emerald-700",
  "from-navy-light to-blue-800",
  "from-purple-700 to-indigo-800",
  "from-amber-700 to-orange-700",
  "from-emerald-700 to-teal",
  "from-rose-700 to-red-800",
  "from-sky-700 to-blue-900",
  "from-amber-600 to-yellow-800",
];

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [availabilityFilter, setAvailabilityFilter] = useState<"all" | "available" | "issued">("all");
  const [yearRange, setYearRange] = useState<[number, number]>([1930, 2025]);
  const [sortBy, setSortBy] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    setCurrentPage(1);
  };

  const filteredBooks = useMemo(() => {
    let books = [...MOCK_BOOKS];

    if (search.trim()) {
      const q = search.toLowerCase();
      books = books.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.isbn.includes(q)
      );
    }

    if (selectedCategories.length > 0) {
      books = books.filter((b) => selectedCategories.includes(b.category));
    }

    if (selectedLanguage) {
      books = books.filter((b) => b.language === selectedLanguage);
    }

    if (availabilityFilter === "available") {
      books = books.filter((b) => b.available);
    } else if (availabilityFilter === "issued") {
      books = books.filter((b) => !b.available);
    }

    books = books.filter((b) => b.year >= yearRange[0] && b.year <= yearRange[1]);

    switch (sortBy) {
      case "title-asc":
        books.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "author-asc":
        books.sort((a, b) => a.author.localeCompare(b.author));
        break;
      case "newest":
        books.sort((a, b) => b.year - a.year);
        break;
      default:
        break;
    }

    return books;
  }, [search, selectedCategories, selectedLanguage, availabilityFilter, yearRange, sortBy]);

  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <section className="bg-navy pt-28 pb-20 md:pt-36 md:pb-28">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Explore Our <span className="text-gold">Collection</span>
            </h1>
            <p className="mt-4 text-white/60 text-lg max-w-xl mx-auto">
              Discover thousands of books, research papers, and archival materials.
            </p>
            <div className="mt-8 relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                placeholder="Search by title, author, or ISBN..."
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border-0 bg-white text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-gold/50 shadow-md"
              />
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-2.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`px-4 py-1.5 text-xs font-medium rounded-full border transition-all ${
                    selectedCategories.includes(cat)
                      ? "bg-gold text-navy border-gold"
                      : "bg-white/10 text-white/70 border-white/20 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-10 bg-bg-primary">
        <Container>
          <div className="flex items-center justify-between mb-6">
            <p className="text-text-secondary text-sm">
              <span className="font-semibold text-navy">{filteredBooks.length}</span> books found
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-3 py-2 text-sm font-medium text-navy bg-card-bg border border-border-light rounded-xl hover:bg-gray-50 transition-all"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {showFilters ? <ChevronDown className="w-3 h-3 rotate-180" /> : <ChevronDown className="w-3 h-3" />}
              </button>
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-text-muted text-sm hidden sm:inline">Sort by:</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 text-sm border border-border-light bg-card-bg rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-navy/20"
                >
                  <option value="relevance">Relevance</option>
                  <option value="title-asc">Title A-Z</option>
                  <option value="author-asc">Author A-Z</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            <aside className={`w-64 shrink-0 ${showFilters ? "block" : "hidden"} lg:block`}>
              <div className="bg-card-bg rounded-2xl p-6 shadow-sm border border-border-light sticky top-28 space-y-6">
                <div>
                  <h4 className="font-semibold text-navy text-sm mb-3">Category</h4>
                  <div className="space-y-2">
                    {CATEGORIES.map((cat) => (
                      <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat)}
                          onChange={() => toggleCategory(cat)}
                          className="w-4 h-4 rounded border-border-light text-navy focus:ring-navy/30 accent-navy"
                        />
                        <span className="text-sm text-text-secondary group-hover:text-navy transition-colors">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <hr className="border-border-light" />
                <div>
                  <h4 className="font-semibold text-navy text-sm mb-3">Language</h4>
                  <div className="space-y-2">
                    {LANGUAGES.map((lang) => (
                      <label key={lang} className="flex items-center gap-2.5 cursor-pointer group">
                        <input
                          type="radio"
                          name="language"
                          checked={selectedLanguage === lang}
                          onChange={() => { setSelectedLanguage(lang); setCurrentPage(1); }}
                          className="w-4 h-4 border-border-light text-navy focus:ring-navy/30 accent-navy"
                        />
                        <span className="text-sm text-text-secondary group-hover:text-navy transition-colors">{lang}</span>
                      </label>
                    ))}
                    {selectedLanguage && (
                      <button
                        onClick={() => { setSelectedLanguage(""); setCurrentPage(1); }}
                        className="text-xs text-gold font-medium hover:underline"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
                <hr className="border-border-light" />
                <div>
                  <h4 className="font-semibold text-navy text-sm mb-3">Availability</h4>
                  <div className="space-y-2">
                    {(["all", "available", "issued"] as const).map((opt) => (
                      <label key={opt} className="flex items-center gap-2.5 cursor-pointer group">
                        <input
                          type="radio"
                          name="availability"
                          checked={availabilityFilter === opt}
                          onChange={() => { setAvailabilityFilter(opt); setCurrentPage(1); }}
                          className="w-4 h-4 border-border-light text-navy focus:ring-navy/30 accent-navy"
                        />
                        <span className="text-sm text-text-secondary group-hover:text-navy transition-colors capitalize">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <hr className="border-border-light" />
                <div>
                  <h4 className="font-semibold text-navy text-sm mb-3">Publication Year</h4>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={yearRange[0]}
                      onChange={(e) => setYearRange([Number(e.target.value), yearRange[1]])}
                      className="w-full px-2 py-1.5 text-xs border border-border-light rounded-lg bg-white text-text-primary focus:outline-none focus:ring-1 focus:ring-navy/20"
                      min={1900}
                      max={2025}
                    />
                    <span className="text-text-muted text-xs">-</span>
                    <input
                      type="number"
                      value={yearRange[1]}
                      onChange={(e) => setYearRange([yearRange[0], Number(e.target.value)])}
                      className="w-full px-2 py-1.5 text-xs border border-border-light rounded-lg bg-white text-text-primary focus:outline-none focus:ring-1 focus:ring-navy/20"
                      min={1900}
                      max={2025}
                    />
                  </div>
                </div>
              </div>
            </aside>

            <div className="flex-1 min-w-0">
              {paginatedBooks.length === 0 ? (
                <div className="bg-card-bg rounded-2xl p-12 shadow-sm border border-border-light text-center">
                  <BookOpen className="w-12 h-12 text-text-muted mx-auto mb-4" />
                  <h3 className="font-heading text-xl font-bold text-navy mb-2">No Books Found</h3>
                  <p className="text-text-secondary max-w-sm mx-auto">
                    Try adjusting your search terms or filters to discover more books in our collection.
                  </p>
                  <button
                    onClick={() => { setSearch(""); setSelectedCategories([]); setSelectedLanguage(""); setAvailabilityFilter("all"); setYearRange([1930, 2025]); }}
                    className="mt-4 px-4 py-2 text-sm font-medium text-gold hover:text-gold-light underline underline-offset-2"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                  {paginatedBooks.map((book) => {
                    const coverGrad = coverBg[book.id % coverBg.length];
                    const colorClass = colorPalette[book.id % colorPalette.length];
                    return (
                      <Link
                        key={book.id}
                        href={`/book/${book.id}`}
                        className="bg-card-bg rounded-2xl shadow-sm border border-border-light overflow-hidden hover:shadow-md transition-all group"
                      >
                        <div className={`h-44 bg-gradient-to-br ${coverGrad} flex items-center justify-center`}>
                          <BookOpen className="w-10 h-10 text-white/30" />
                          <span className="absolute text-6xl font-bold text-white/10">{book.title[0]}</span>
                        </div>
                        <div className="p-4">
                          <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold rounded-full ${colorClass} mb-2`}>
                            {book.category}
                          </span>
                          <h3 className="font-heading font-bold text-navy text-sm leading-snug line-clamp-2 group-hover:text-gold transition-colors">
                            {book.title}
                          </h3>
                          <p className="text-text-muted text-xs mt-1">{book.author}</p>
                          <div className="mt-3 flex items-center justify-between">
                            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                              book.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }`}>
                              {book.available ? "Available" : "Issued"}
                            </span>
                            <span className="text-[10px] text-text-muted">{book.language}</span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}

              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-xl border border-border-light bg-card-bg text-text-secondary hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${
                        page === currentPage
                          ? "bg-navy text-white"
                          : "border border-border-light bg-card-bg text-text-secondary hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-xl border border-border-light bg-card-bg text-text-secondary hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
