"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/container";
import { BookOpen, Bookmark, ChevronRight, ChevronLeft, Star } from "lucide-react";
import { toast } from "sonner";

interface MockBook {
  id: number;
  title: string;
  subtitle: string;
  author: string;
  authors: string[];
  isbn: string;
  publisher: string;
  language: string;
  category: string;
  year: number;
  pages: number;
  shelf: string;
  description: string;
  available: boolean;
  totalCopies: number;
  availableCopies: number;
}

const MOCK_BOOKS: Record<number, MockBook> = {
  1: {
    id: 1, title: "Annihilation of Caste", subtitle: "A Critical Analysis of the Caste System in India",
    author: "Dr. B. R. Ambedkar", authors: ["Dr. B. R. Ambedkar"],
    isbn: "978-0-14-342435-4", publisher: "Oxford University Press", language: "English",
    category: "Ambedkar Literature", year: 1936, pages: 412, shelf: "A3-05-B",
    description: "Annihilation of Caste is an undelivered speech written by Dr. B. R. Ambedkar in 1936. It presents a powerful critique of the caste system in India and argues for its complete annihilation. The work remains one of the most influential texts on social justice and caste discrimination, challenging orthodox Hindu beliefs and advocating for a society based on equality, liberty, and fraternity.",
    available: true, totalCopies: 8, availableCopies: 3,
  },
  2: {
    id: 2, title: "The Constitution of India",
    subtitle: "With Critical Commentary by Dr. B. R. Ambedkar",
    author: "Dr. B. R. Ambedkar", authors: ["Dr. B. R. Ambedkar"],
    isbn: "978-0-19-563892-1", publisher: "Government of India Press", language: "English",
    category: "Constitutional Studies", year: 1950, pages: 624, shelf: "B1-12-A",
    description: "The Constitution of India is the supreme law of India. Dr. B. R. Ambedkar served as the Chairman of the Drafting Committee and is widely regarded as the chief architect of the Indian Constitution. This comprehensive volume includes the full text of the Constitution along with critical commentary on its provisions, fundamental rights, and directive principles.",
    available: true, totalCopies: 12, availableCopies: 5,
  },
  3: {
    id: 3, title: "Who Were the Shudras?",
    subtitle: "An Investigation into the Origins of the Shudra Class",
    author: "Dr. B. R. Ambedkar", authors: ["Dr. B. R. Ambedkar"],
    isbn: "978-0-19-806609-3", publisher: "Oxford University Press", language: "English",
    category: "Ambedkar Literature", year: 1946, pages: 348, shelf: "A3-06-C",
    description: "In this seminal work, Dr. Ambedkar investigates the historical origins of the Shudra class in ancient Indian society. He challenges the traditional interpretation of the Rigveda and argues that Shudras were originally Kshatriyas who were degraded due to conflicts with Brahmins. The book is a landmark in the study of caste hierarchy and social stratification.",
    available: false, totalCopies: 5, availableCopies: 0,
  },
  4: {
    id: 4, title: "Bharatiya Rajyaghat va Ambedkar",
    subtitle: "The Indian Constitution and Ambedkar's Role",
    author: "Dr. B. R. Ambedkar", authors: ["Dr. B. R. Ambedkar"],
    isbn: "978-81-901635-1-8", publisher: "BARTI Publications", language: "Marathi",
    category: "Constitutional Studies", year: 1951, pages: 528, shelf: "B1-14-D",
    description: "A Marathi-language volume detailing the drafting of the Indian Constitution and the pivotal role played by Dr. B. R. Ambedkar. This work provides deep insights into the constitutional assembly debates and the philosophical foundations of India's democratic framework.",
    available: true, totalCopies: 15, availableCopies: 7,
  },
  5: {
    id: 5, title: "Caste and Democratic Politics",
    subtitle: "The Politics of Social Justice in India",
    author: "Prof. M. S. Gore", authors: ["Prof. M. S. Gore"],
    isbn: "978-81-250-2345-6", publisher: "Sage Publications", language: "English",
    category: "Social Justice", year: 2002, pages: 276, shelf: "C2-08-A",
    description: "A comprehensive analysis of the intersection between caste hierarchies and democratic politics in India. Prof. M. S. Gore examines how caste identities shape political participation, representation, and policy outcomes in contemporary Indian democracy.",
    available: true, totalCopies: 4, availableCopies: 2,
  },
  6: {
    id: 6, title: "Maharashtrachi Samajik Chalwal",
    subtitle: "Social Movements in Maharashtra",
    author: "Dadasaheb Shinde", authors: ["Dadasaheb Shinde"],
    isbn: "978-81-87439-56-7", publisher: "Mumbai University Press", language: "Marathi",
    category: "Social Justice", year: 1998, pages: 320, shelf: "C2-10-B",
    description: "An extensive survey of social movements in Maharashtra from the 19th century onwards. The book covers the Bhakti movement, Phule's reform movement, the Dalit movement, and contemporary struggles for social justice in the state.",
    available: false, totalCopies: 3, availableCopies: 0,
  },
  7: {
    id: 7, title: "The Indian Constitution: Cornerstone of a Nation",
    subtitle: "A Constitutional History of India",
    author: "Granville Austin", authors: ["Granville Austin"],
    isbn: "978-0-19-564765-7", publisher: "Oxford University Press", language: "English",
    category: "Constitutional Studies", year: 1966, pages: 456, shelf: "B1-15-C",
    description: "Granville Austin's classic work traces the making of the Indian Constitution from 1946 to 1950. It provides an in-depth account of the Constituent Assembly debates, the personalities involved, and the political compromises that shaped India's constitutional framework.",
    available: true, totalCopies: 6, availableCopies: 4,
  },
  8: {
    id: 8, title: "Ambedkar: The Hidden Story",
    subtitle: "Uncovering the Life and Legacy of Dr. B. R. Ambedkar",
    author: "K. N. Jadhav", authors: ["K. N. Jadhav"],
    isbn: "978-93-81345-67-8", publisher: "Navayana Publishing", language: "English",
    category: "Ambedkar Literature", year: 2015, pages: 368, shelf: "A3-08-D",
    description: "A biographical work that uncovers lesser-known aspects of Dr. Ambedkar's life — his struggles, intellectual evolution, political strategies, and his enduring legacy in shaping India's social and constitutional landscape.",
    available: true, totalCopies: 7, availableCopies: 3,
  },
  9: {
    id: 9, title: "Gramin Bharat aur Samajik Nyay",
    subtitle: "Rural India and Social Justice",
    author: "D. S. Khairmode", authors: ["D. S. Khairmode"],
    isbn: "978-81-90234-12-6", publisher: "BARTI Publications", language: "Hindi",
    category: "Social Justice", year: 2010, pages: 240, shelf: "C2-12-A",
    description: "A Hindi-language examination of social justice issues in rural India. The book analyzes land distribution, caste dynamics in villages, access to education and healthcare, and the impact of government policies on marginalized communities.",
    available: true, totalCopies: 5, availableCopies: 2,
  },
  10: {
    id: 10, title: "Philosophy of Hinduism",
    subtitle: "A Critical Examination of Hindu Religious Philosophy",
    author: "Dr. B. R. Ambedkar", authors: ["Dr. B. R. Ambedkar"],
    isbn: "978-81-85279-12-3", publisher: "Critical Quest Publications", language: "English",
    category: "Philosophy", year: 1960, pages: 298, shelf: "D1-03-A",
    description: "Dr. Ambedkar's critical examination of Hindu philosophy, analyzing its scriptures, doctrines, and social implications. He argues that the philosophical foundations of Hinduism are inextricably linked with the caste system and advocates for a rational, egalitarian ethical framework.",
    available: false, totalCopies: 4, availableCopies: 0,
  },
  11: {
    id: 11, title: "Buddha and His Dhamma",
    subtitle: "A Comprehensive Study of the Life and Teachings of the Buddha",
    author: "Dr. B. R. Ambedkar", authors: ["Dr. B. R. Ambedkar"],
    isbn: "978-81-85146-22-7", publisher: "Siddharth Publications", language: "English",
    category: "Philosophy", year: 1957, pages: 432, shelf: "D1-04-B",
    description: "A comprehensive presentation of the life of the Buddha and his teachings, compiled and interpreted by Dr. Ambedkar. The work presents Buddhism as a rational, ethical, and socially engaged philosophy that offers a path to liberation from caste oppression and social inequality.",
    available: true, totalCopies: 10, availableCopies: 6,
  },
  12: {
    id: 12, title: "Economic Development of Maharashtra",
    subtitle: "Growth, Inequality, and Policy Challenges",
    author: "Dr. V. M. Dandekar", authors: ["Dr. V. M. Dandekar"],
    isbn: "978-81-250-1987-9", publisher: "Gokhale Institute Press", language: "English",
    category: "Economics", year: 2005, pages: 384, shelf: "E2-06-C",
    description: "An economic analysis of Maharashtra's development trajectory, examining growth patterns, regional disparities, agricultural transformation, industrialization, and policy interventions. The book offers insights into the state's economic challenges and opportunities.",
    available: true, totalCopies: 3, availableCopies: 1,
  },
};

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

export default function BookDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const book = MOCK_BOOKS[id];

  if (!book) {
    notFound();
  }

  const relatedBooks = Object.values(MOCK_BOOKS)
    .filter((b) => b.id !== book.id && b.category === book.category)
    .slice(0, 4);

  const coverGrad = coverBg[id % coverBg.length];
  const colorClass = colorPalette[id % colorPalette.length];

  const handleReserve = () => {
    toast.info("Online reservation is coming soon. Please visit the library to reserve this book.");
  };

  return (
    <>
      <section className="bg-bg-primary pt-28 pb-16 md:pt-36 md:pb-20">
        <Container>
          <nav className="flex items-center gap-2 text-sm text-text-muted mb-8">
            <Link href="/" className="hover:text-navy transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/catalog" className="hover:text-navy transition-colors">Catalog</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-text-secondary font-medium truncate max-w-[200px]">{book.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2">
              <div className={`h-[400px] rounded-2xl bg-gradient-to-br ${coverGrad} flex items-center justify-center shadow-lg`}>
                <div className="text-center">
                  <BookOpen className="w-16 h-16 text-white/20 mx-auto" />
                  <span className="block text-8xl font-bold text-white/10 mt-2">{book.title[0]}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="flex items-start gap-3 mb-2">
                <span className={`px-3 py-0.5 text-xs font-semibold rounded-full ${colorClass}`}>{book.category}</span>
                <span className={`px-3 py-0.5 text-xs font-semibold rounded-full ${
                  book.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}>
                  {book.available ? "Available" : "Issued"}
                </span>
              </div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy leading-tight mt-3">
                {book.title}
              </h1>
              {book.subtitle && (
                <p className="text-text-muted text-lg mt-1">{book.subtitle}</p>
              )}
              <p className="text-text-secondary mt-2">
                by <span className="font-semibold text-navy">{book.author}</span>
              </p>

              <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-8 p-6 bg-card-bg rounded-2xl border border-border-light">
                <DetailRow label="ISBN" value={book.isbn} />
                <DetailRow label="Publisher" value={book.publisher} />
                <DetailRow label="Language" value={book.language} />
                <DetailRow label="Publication Year" value={String(book.year)} />
                <DetailRow label="Page Count" value={`${book.pages} pages`} />
                <DetailRow label="Shelf Location" value={book.shelf} />
              </div>

              <div className="mt-6">
                <h3 className="font-heading font-bold text-navy text-lg mb-2">Description</h3>
                <p className="text-text-secondary leading-relaxed">{book.description}</p>
              </div>

              <div className="mt-8 p-6 bg-card-bg rounded-2xl border border-border-light">
                <h3 className="font-heading font-bold text-navy text-lg mb-4">Availability</h3>
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-navy">{book.totalCopies}</p>
                    <p className="text-text-muted text-xs">Total Copies</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-teal">{book.availableCopies}</p>
                    <p className="text-text-muted text-xs">Available Copies</p>
                  </div>
                  <div className="text-center">
                    <span className={`inline-block px-4 py-1.5 text-sm font-semibold rounded-xl ${
                      book.availableCopies > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {book.availableCopies > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleReserve}
                  disabled={book.availableCopies === 0}
                  className="mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-navy text-white text-sm font-semibold rounded-xl hover:bg-navy-light transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Bookmark className="w-4 h-4" />
                  Reserve This Book
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {relatedBooks.length > 0 && (
        <section className="pb-20 bg-bg-primary">
          <Container>
            <h2 className="font-heading text-2xl font-bold text-navy mb-8">Related Books</h2>
            <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-thin">
              {relatedBooks.map((rb) => {
                const rg = coverBg[rb.id % coverBg.length];
                const rc = colorPalette[rb.id % colorPalette.length];
                return (
                  <Link
                    key={rb.id}
                    href={`/book/${rb.id}`}
                    className="min-w-[240px] bg-card-bg rounded-2xl shadow-sm border border-border-light overflow-hidden hover:shadow-md transition-all shrink-0 snap-start group"
                  >
                    <div className={`h-36 bg-gradient-to-br ${rg} flex items-center justify-center`}>
                      <BookOpen className="w-8 h-8 text-white/20" />
                    </div>
                    <div className="p-4">
                      <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold rounded-full ${rc} mb-2`}>{rb.category}</span>
                      <h3 className="font-heading font-bold text-navy text-sm leading-snug line-clamp-2 group-hover:text-gold transition-colors">{rb.title}</h3>
                      <p className="text-text-muted text-xs mt-1 truncate">{rb.author}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-text-muted text-xs font-medium uppercase tracking-wider">{label}</p>
      <p className="text-text-primary text-sm font-medium mt-0.5">{value}</p>
    </div>
  );
}
