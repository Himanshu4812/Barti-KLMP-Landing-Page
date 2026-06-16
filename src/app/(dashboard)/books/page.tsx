"use client";

import { useMemo, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Edit,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/shared/page-header";
import { SearchInput } from "@/components/shared/search-input";
import { EmptyState } from "@/components/shared/empty-state";
import { ErrorState } from "@/components/shared/error-state";
import { TableSkeleton } from "@/components/shared/loading-skeleton";
import { Modal } from "@/components/shared/modal";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { BookForm, type BookFormData } from "./_components/book-form";
import { cn } from "@/lib/utils";

interface BookRecord {
  id: string;
  isbn: string;
  title: string;
  subtitle: string;
  author: string;
  publisher: string;
  language: string;
  category: string;
  total_copies: number;
  available_copies: number;
  shelf_location: string;
  keywords: string;
  publication_year: number;
  page_count: number;
  description: string;
}

const MOCK_BOOKS: BookRecord[] = [
  { id: "B001", isbn: "978-81-234-5678-9", title: "Annihilation of Caste", subtitle: "With a Reply to Mahatma Gandhi", author: "Dr. B. R. Ambedkar", publisher: "BARTI Publications", language: "English", category: "Ambedkar Literature", total_copies: 15, available_copies: 8, shelf_location: "A-01-01", keywords: "caste, social justice, ambedkar", publication_year: 1936, page_count: 420, description: "The iconic undelivered speech on caste system." },
  { id: "B002", isbn: "978-81-234-5679-6", title: "The Constitution of India", subtitle: "A Comprehensive Commentary", author: "Dr. B. R. Ambedkar", publisher: "Government Press", language: "English", category: "Constitutional Studies", total_copies: 25, available_copies: 12, shelf_location: "B-02-01", keywords: "constitution, india, law", publication_year: 1950, page_count: 850, description: "Original constitution with commentary." },
  { id: "B003", isbn: "978-81-234-5680-2", title: "Who Were the Shudras?", subtitle: "", author: "Dr. B. R. Ambedkar", publisher: "BARTI Publications", language: "English", category: "Social Justice", total_copies: 10, available_copies: 3, shelf_location: "A-01-02", keywords: "shudras, caste, history", publication_year: 1946, page_count: 320, description: "Historical analysis of the Shudra community." },
  { id: "B004", isbn: "978-81-234-5681-9", title: "Buddha and His Dhamma", subtitle: "A Critical Edition", author: "Dr. B. R. Ambedkar", publisher: "Siddharth Publications", language: "English", category: "Ambedkar Literature", total_copies: 20, available_copies: 15, shelf_location: "A-01-03", keywords: "buddhism, dhamma, philosophy", publication_year: 1957, page_count: 560, description: "Foundational text on Buddhist philosophy." },
  { id: "B005", isbn: "978-81-234-5682-6", title: "Maharashtrachi Samajik Jagruti", subtitle: "Ek Aitihasik Drishtikon", author: "Prof. Anil Sawant", publisher: "Mumbai University Press", language: "Marathi", category: "Social Justice", total_copies: 8, available_copies: 5, shelf_location: "C-03-01", keywords: "maharashtra, social awakening, history", publication_year: 2018, page_count: 280, description: "Social awakening movements in Maharashtra." },
  { id: "B006", isbn: "978-81-234-5683-3", title: "Bharatiya Rajyaghatana", subtitle: "Mul Tattve ani Vyakhya", author: "Dr. B. R. Ambedkar", publisher: "BARTI Publications", language: "Marathi", category: "Constitutional Studies", total_copies: 12, available_copies: 7, shelf_location: "B-02-02", keywords: "constitution, marathi, law", publication_year: 1950, page_count: 720, description: "Marathi translation of constitutional commentary." },
  { id: "B007", isbn: "978-81-234-5684-0", title: "Social Justice in India", subtitle: "Policies and Perspectives", author: "Dr. Sanjay Paswan", publisher: "Deep & Deep Publications", language: "English", category: "Social Justice", total_copies: 7, available_copies: 2, shelf_location: "C-03-02", keywords: "social justice, policy, india", publication_year: 2020, page_count: 340, description: "Analysis of social justice policies in India." },
  { id: "B008", isbn: "978-81-234-5685-7", title: "The Indian Constitution", subtitle: "A Dialogue with the People", author: "Prof. Madhav Khosla", publisher: "Oxford University Press", language: "English", category: "Constitutional Studies", total_copies: 6, available_copies: 1, shelf_location: "B-02-03", keywords: "constitution, dialogue, democracy", publication_year: 2019, page_count: 290, description: "A modern dialogue on the Indian Constitution." },
  { id: "B009", isbn: "978-81-234-5686-4", title: "Samata Sainik Dal", subtitle: "Itihaas ani Karya", author: "Shri. D. T. Rupavate", publisher: "BARTI Archives", language: "Marathi", category: "General", total_copies: 5, available_copies: 4, shelf_location: "D-04-01", keywords: "samata, sainik, dal, history", publication_year: 1995, page_count: 180, description: "History of the Samata Sainik Dal movement." },
  { id: "B010", isbn: "978-81-234-5687-1", title: "Public Policy in India", subtitle: "Challenges and Reforms", author: "Dr. N. C. Sahni", publisher: "SAGE Publications", language: "English", category: "Public Policy", total_copies: 9, available_copies: 6, shelf_location: "E-05-01", keywords: "public policy, reforms, india", publication_year: 2021, page_count: 410, description: "Comprehensive overview of public policy in India." },
  { id: "B011", isbn: "978-81-234-5688-8", title: "Dr. Ambedkar and the Indian Constitution", subtitle: "The Architect's Vision", author: "Prof. S. N. Mishra", publisher: "Kalinga Publications", language: "English", category: "Constitutional Studies", total_copies: 11, available_copies: 9, shelf_location: "B-02-04", keywords: "ambedkar, constitution, architect", publication_year: 2016, page_count: 380, description: "Dr. Ambedkar's role in drafting the Constitution." },
  { id: "B012", isbn: "978-81-234-5689-5", title: "Law and Social Transformation", subtitle: "", author: "Dr. Upendra Baxi", publisher: "Eastern Book Company", language: "English", category: "Law", total_copies: 7, available_copies: 3, shelf_location: "F-06-01", keywords: "law, social transformation, jurisprudence", publication_year: 2017, page_count: 450, description: "Role of law in social transformation in India." },
  { id: "B013", isbn: "978-81-234-5690-1", title: "Bharatil Streevanchya Prabodhanachi Watachal", subtitle: "", author: "Dr. Meena Khandare", publisher: "BARTI Publications", language: "Marathi", category: "Social Justice", total_copies: 6, available_copies: 4, shelf_location: "C-03-03", keywords: "women, empowerment, marathi", publication_year: 2022, page_count: 230, description: "Women's empowerment in Maharashtra." },
  { id: "B014", isbn: "978-81-234-5691-8", title: "Research Methods in Social Sciences", subtitle: "A Practical Guide", author: "Prof. B. L. Verma", publisher: "Tata McGraw Hill", language: "English", category: "Research", total_copies: 14, available_copies: 10, shelf_location: "G-07-01", keywords: "research, methodology, social sciences", publication_year: 2020, page_count: 520, description: "Practical guide to social science research methods." },
  { id: "B015", isbn: "978-81-234-5692-5", title: "Hindu Code Bill", subtitle: "A Revolutionary Reform", author: "Dr. B. R. Ambedkar", publisher: "BARTI Publications", language: "English", category: "Law", total_copies: 5, available_copies: 2, shelf_location: "F-06-02", keywords: "hindu code, reform, law", publication_year: 1951, page_count: 190, description: "The Hindu Code Bill and its impact on Indian society." },
  { id: "B016", isbn: "978-81-234-5693-2", title: "Gram Panchayat Raj", subtitle: "Ek Safal Prayog", author: "Shri. T. K. Oommen", publisher: "BARTI Archives", language: "Marathi", category: "Public Policy", total_copies: 8, available_copies: 6, shelf_location: "E-05-02", keywords: "panchayat, rural, governance", publication_year: 2015, page_count: 200, description: "Case studies of Gram Panchayat governance." },
  { id: "B017", isbn: "978-81-234-5694-9", title: "Sanshodhanachi Mooltatve", subtitle: "", author: "Dr. Prakash Damle", publisher: "Pune University Press", language: "Marathi", category: "Research", total_copies: 10, available_copies: 8, shelf_location: "G-07-02", keywords: "research, basics, marathi", publication_year: 2019, page_count: 310, description: "Fundamentals of research methodology in Marathi." },
  { id: "B018", isbn: "978-81-234-5695-6", title: "Caste in Modern India", subtitle: "Continuity and Change", author: "Prof. M. N. Srinivas", publisher: "Penguin India", language: "English", category: "Social Justice", total_copies: 13, available_copies: 11, shelf_location: "C-03-04", keywords: "caste, modern india, sociology", publication_year: 1962, page_count: 360, description: "Seminal work on caste dynamics in modern India." },
  { id: "B019", isbn: "978-81-234-5696-3", title: "Bharatache Shikshan Dhoran", subtitle: "Ek Sameeksha", author: "Dr. S. S. Patil", publisher: "BARTI Publications", language: "Marathi", category: "Public Policy", total_copies: 7, available_copies: 5, shelf_location: "E-05-03", keywords: "education, policy, marathi", publication_year: 2023, page_count: 260, description: "Review of India's education policy." },
  { id: "B020", isbn: "978-81-234-5697-0", title: "Towards an Inclusive Society", subtitle: "Essays on Social Justice", author: "Dr. Anand Teltumbde", publisher: "SAGE Publications", language: "English", category: "Social Justice", total_copies: 9, available_copies: 4, shelf_location: "C-03-05", keywords: "inclusive, society, essays, social justice", publication_year: 2021, page_count: 400, description: "Collection of essays on building an inclusive society." },
];

const columnHelper = createColumnHelper<BookRecord>();

const CATEGORIES = [
  "All",
  "Ambedkar Literature",
  "Constitutional Studies",
  "Social Justice",
  "Law",
  "Public Policy",
  "Research",
  "General",
] as const;

const LANGUAGES = ["All", "English", "Hindi", "Marathi", "Sanskrit", "Other"] as const;

const STATUS_OPTIONS = ["All", "Available", "Low Stock", "Out of Stock"] as const;

function getBookStatus(available: number, total: number): string {
  if (available === 0) return "Out of Stock";
  if (available <= Math.ceil(total * 0.25)) return "Low Stock";
  return "Available";
}

const statusColors: Record<string, string> = {
  Available: "bg-green-50 text-green-700 border-green-200",
  "Low Stock": "bg-amber-50 text-amber-700 border-amber-200",
  "Out of Stock": "bg-red-50 text-red-700 border-red-200",
};

export default function BooksPage() {
  const [data, setData] = useState<BookRecord[]>(MOCK_BOOKS);
  const [globalFilter, setGlobalFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [languageFilter, setLanguageFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<BookRecord | null>(null);
  const [deletingBook, setDeletingBook] = useState<BookRecord | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredData = useMemo(() => {
    return data.filter((book) => {
      if (categoryFilter !== "All" && book.category !== categoryFilter) return false;
      if (languageFilter !== "All" && book.language !== languageFilter) return false;
      if (statusFilter !== "All") {
        const status = getBookStatus(book.available_copies, book.total_copies);
        if (status !== statusFilter) return false;
      }
      return true;
    });
  }, [data, categoryFilter, languageFilter, statusFilter]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("isbn", {
        header: "ISBN",
        cell: (info) => (
          <span className="font-mono text-xs text-gray-500">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("title", {
        header: "Title",
        cell: (info) => (
          <div className="max-w-[250px]">
            <p className="text-sm font-medium text-gray-900 truncate">{info.getValue()}</p>
            {info.row.original.subtitle && (
              <p className="text-xs text-gray-500 truncate">{info.row.original.subtitle}</p>
            )}
          </div>
        ),
      }),
      columnHelper.accessor("author", {
        header: "Author",
        cell: (info) => <span className="text-sm text-gray-700">{info.getValue()}</span>,
      }),
      columnHelper.accessor("category", {
        header: "Category",
        cell: (info) => (
          <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-navy/5 text-navy">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor("total_copies", {
        header: "Copies",
        cell: (info) => (
          <span className="text-sm text-gray-700">
            {info.row.original.available_copies}/{info.getValue()}
          </span>
        ),
      }),
      columnHelper.display({
        id: "status",
        header: "Status",
        cell: (info) => {
          const status = getBookStatus(info.row.original.available_copies, info.row.original.total_copies);
          return (
            <span
              className={cn(
                "inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border",
                statusColors[status]
              )}
            >
              {status}
            </span>
          );
        },
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: (info) => (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setEditingBook(info.row.original)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-navy hover:bg-navy/5 transition-colors"
              title="Edit"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeletingBook(info.row.original)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    pageCount: Math.ceil(filteredData.length / 10),
    initialState: { pagination: { pageSize: 10 } },
  });

  const handleAddBook = async (formData: BookFormData) => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    const newBook: BookRecord = {
      id: `B${String(data.length + 1).padStart(3, "0")}`,
      isbn: formData.isbn,
      title: formData.title,
      subtitle: formData.subtitle,
      author: formData.author,
      publisher: formData.publisher,
      language: formData.language,
      category: formData.category,
      total_copies: parseInt(formData.total_copies) || 1,
      available_copies: parseInt(formData.total_copies) || 1,
      shelf_location: formData.shelf_location,
      keywords: formData.keywords,
      publication_year: parseInt(formData.publication_year) || 0,
      page_count: parseInt(formData.page_count) || 0,
      description: formData.description,
    };
    setData((prev) => [newBook, ...prev]);
    setIsSubmitting(false);
    setIsAddModalOpen(false);
    toast.success("Book added successfully");
  };

  const handleEditBook = async (formData: BookFormData) => {
    if (!editingBook) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setData((prev) =>
      prev.map((book) =>
        book.id === editingBook.id
          ? {
              ...book,
              isbn: formData.isbn,
              title: formData.title,
              subtitle: formData.subtitle,
              author: formData.author,
              publisher: formData.publisher,
              language: formData.language,
              category: formData.category,
              total_copies: parseInt(formData.total_copies) || 1,
              available_copies: formData.total_copies !== String(editingBook.total_copies)
                ? parseInt(formData.total_copies) || 1
                : book.available_copies,
              shelf_location: formData.shelf_location,
              keywords: formData.keywords,
              publication_year: parseInt(formData.publication_year) || 0,
              page_count: parseInt(formData.page_count) || 0,
              description: formData.description,
            }
          : book
      )
    );
    setIsSubmitting(false);
    setEditingBook(null);
    toast.success("Book updated successfully");
  };

  const handleDeleteBook = async () => {
    if (!deletingBook) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setData((prev) => prev.filter((book) => book.id !== deletingBook.id));
    setIsSubmitting(false);
    setDeletingBook(null);
    toast.success("Book deleted successfully");
  };

  const getEditFormData = (book: BookRecord): BookFormData => ({
    isbn: book.isbn,
    title: book.title,
    subtitle: book.subtitle,
    author: book.author,
    publisher: book.publisher,
    language: book.language,
    category: book.category,
    keywords: book.keywords,
    shelf_location: book.shelf_location,
    publication_year: String(book.publication_year || ""),
    page_count: String(book.page_count || ""),
    total_copies: String(book.total_copies),
    description: book.description,
  });

  if (isError) {
    return (
      <div>
        <PageHeader title="Book Management" />
        <ErrorState onRetry={() => setIsError(false)} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Book Management"
        description="Manage your library's book inventory"
        actions={
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-navy rounded-lg hover:bg-navy-light transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Book
          </button>
        }
      />

      <div className="bg-card-bg rounded-xl border border-border-light shadow-sm">
        <div className="p-4 border-b border-border-light space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <SearchInput
              value={globalFilter}
              onChange={setGlobalFilter}
              placeholder="Search by ISBN, title, author..."
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat === "All" ? "All Categories" : cat}</option>
              ))}
            </select>
            <select
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>{lang === "All" ? "All Languages" : lang}</option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s === "All" ? "All Status" : s}</option>
              ))}
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="p-6">
            <TableSkeleton rows={5} cols={6} />
          </div>
        ) : filteredData.length === 0 ? (
          <div className="p-6">
            <EmptyState
              title="No books found"
              description={globalFilter || categoryFilter !== "All" || languageFilter !== "All" || statusFilter !== "All" ? "Try adjusting your search or filters." : "Get started by adding your first book."}
            />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="border-b border-border-light bg-gray-50/50">
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          onClick={header.column.getToggleSortingHandler()}
                          className="px-4 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider cursor-pointer hover:text-text-primary select-none"
                        >
                          <div className="flex items-center gap-1">
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {header.column.getCanSort() && (
                              {
                                asc: <ChevronUp className="w-3 h-3" />,
                                desc: <ChevronDown className="w-3 h-3" />,
                              }[header.column.getIsSorted() as string] ?? <ChevronsUpDown className="w-3 h-3" />
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-border-light hover:bg-gray-50/50 transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-4 py-3">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between px-4 py-3 border-t border-border-light">
              <span className="text-sm text-text-muted">
                Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
                {" "}-{" "}
                {Math.min(
                  (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                  filteredData.length
                )}{" "}
                of {filteredData.length} books
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <span className="text-sm text-text-muted px-2">
                  Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Book"
        size="xl"
      >
        <BookForm onSubmit={handleAddBook} onCancel={() => setIsAddModalOpen(false)} isLoading={isSubmitting} />
      </Modal>

      <Modal
        isOpen={!!editingBook}
        onClose={() => setEditingBook(null)}
        title="Edit Book"
        size="xl"
      >
        {editingBook && (
          <BookForm
            initialData={getEditFormData(editingBook)}
            onSubmit={handleEditBook}
            onCancel={() => setEditingBook(null)}
            isLoading={isSubmitting}
          />
        )}
      </Modal>

      <ConfirmDialog
        isOpen={!!deletingBook}
        onClose={() => setDeletingBook(null)}
        onConfirm={handleDeleteBook}
        title="Delete Book"
        message={`Are you sure you want to delete "${deletingBook?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        isLoading={isSubmitting}
        variant="danger"
      />
    </div>
  );
}
