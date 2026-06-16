"use client";

import React, { useState, useMemo, useCallback } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { SearchInput } from "@/components/shared/search-input";
import { EmptyState } from "@/components/shared/empty-state";
import { TableSkeleton } from "@/components/shared/loading-skeleton";
import { ErrorState } from "@/components/shared/error-state";
import { Modal } from "@/components/shared/modal";
import { toast } from "sonner";
import {
  Upload,
  FileText,
  BookOpen,
  Mic,
  ScrollText,
  FileBarChart,
  Star,
  Download,
  X,
  ChevronLeft,
  ChevronRight,
  Globe,
  Lock,
} from "lucide-react";

type DocType = "research" | "publication" | "speech" | "historical" | "report";

interface Document {
  id: string;
  title: string;
  description: string;
  type: DocType;
  category: string;
  tags: string[];
  uploadDate: string;
  downloads: number;
  bookmarked: boolean;
  author: string;
  publicAccess: boolean;
  fileSize: string;
  pages: number;
}

const documentIcons: Record<DocType, typeof FileText> = {
  research: FileText,
  publication: BookOpen,
  speech: Mic,
  historical: ScrollText,
  report: FileBarChart,
};

const docTypeLabels: Record<DocType, string> = {
  research: "Research Paper",
  publication: "Publication",
  speech: "Speech",
  historical: "Historical",
  report: "Report",
};

const docTypeColors: Record<DocType, string> = {
  research: "bg-blue-50 text-blue-700",
  publication: "bg-purple-50 text-purple-700",
  speech: "bg-amber-50 text-amber-700",
  historical: "bg-teal-50 text-teal-700",
  report: "bg-rose-50 text-rose-700",
};

const ITEMS_PER_PAGE = 8;

const mockDocuments: Document[] = [
  { id: "1", title: "Annihilation of Caste: A Critical Analysis", description: "An in-depth analysis of Dr. Ambedkar's seminal work on the caste system in India, examining its historical context and contemporary relevance.", type: "research", category: "Social Justice", tags: ["caste", "ambedkar", "social justice"], uploadDate: "2026-06-01", downloads: 342, bookmarked: true, author: "Dr. B.R. Ambedkar", publicAccess: true, fileSize: "2.4 MB", pages: 45 },
  { id: "2", title: "The Constitution of India: Origins and Impact", description: "A comprehensive study of the framing of the Indian Constitution and Dr. Ambedkar's pivotal role as its chief architect.", type: "publication", category: "Constitutional Studies", tags: ["constitution", "ambedkar", "law"], uploadDate: "2026-05-28", downloads: 289, bookmarked: false, author: "BARTI Research Division", publicAccess: true, fileSize: "5.1 MB", pages: 120 },
  { id: "3", title: "Speech on Untouchability — 1936", description: "Transcript of Dr. Ambedkar's historic speech on the abolition of untouchability delivered before the 'Jat-Pat-Todak Mandal' of Lahore.", type: "speech", category: "Ambedkar Literature", tags: ["speech", "untouchability", "1936"], uploadDate: "2026-05-20", downloads: 456, bookmarked: true, author: "Dr. B.R. Ambedkar", publicAccess: true, fileSize: "0.8 MB", pages: 18 },
  { id: "4", title: "Depressed Classes and the Round Table Conference", description: "Historical document detailing the representations made by the Depressed Classes at the Round Table Conference in London, 1931.", type: "historical", category: "History", tags: ["round table", "depressed classes", "london"], uploadDate: "2026-05-15", downloads: 178, bookmarked: false, author: "BARTI Archives", publicAccess: false, fileSize: "3.2 MB", pages: 78 },
  { id: "5", title: "Annual Library Utilization Report 2025-26", description: "Comprehensive report on library usage statistics, member engagement, and collection development for the fiscal year.", type: "report", category: "Report", tags: ["annual report", "utilization", "statistics"], uploadDate: "2026-05-10", downloads: 92, bookmarked: false, author: "Library Management", publicAccess: true, fileSize: "1.6 MB", pages: 34 },
  { id: "6", title: "Buddhist Revival in Modern India", description: "Research paper exploring the resurgence of Buddhism in India following Dr. Ambedkar's conversion in 1956 and its sociopolitical implications.", type: "research", category: "Social Justice", tags: ["buddhism", "conversion", "modern india"], uploadDate: "2026-05-05", downloads: 215, bookmarked: true, author: "Prof. Aniket Sharma", publicAccess: true, fileSize: "1.9 MB", pages: 52 },
  { id: "7", title: "Caste Census: Data and Policy Implications", description: "Analysis of the socio-economic conditions of Scheduled Castes and Scheduled Tribes based on government census data.", type: "report", category: "Report", tags: ["census", "sc/st", "policy"], uploadDate: "2026-04-28", downloads: 167, bookmarked: false, author: "Policy Research Cell", publicAccess: true, fileSize: "4.2 MB", pages: 95 },
  { id: "8", title: "The Problem of the Rupee: Its Origin and Solution", description: "Dr. Ambedkar's classic economic treatise examining the currency and exchange rate problems faced by India under British rule.", type: "publication", category: "Ambedkar Literature", tags: ["economics", "rupee", "colonial"], uploadDate: "2026-04-20", downloads: 134, bookmarked: false, author: "Dr. B.R. Ambedkar", publicAccess: true, fileSize: "6.7 MB", pages: 156 },
  { id: "9", title: "Mahad Satyagraha 1927: A Turning Point", description: "Historical account of the Mahad Satyagraha led by Dr. Ambedkar for the right of Dalits to access public water sources.", type: "historical", category: "History", tags: ["mahad", "satyagraha", "water rights"], uploadDate: "2026-04-15", downloads: 298, bookmarked: true, author: "BARTI Archives", publicAccess: true, fileSize: "2.1 MB", pages: 48 },
  { id: "10", title: "Affirmative Action in Higher Education", description: "Research paper examining the effectiveness of reservations in Indian higher education institutions over the past seven decades.", type: "research", category: "Social Justice", tags: ["reservation", "education", "affirmative action"], uploadDate: "2026-04-10", downloads: 201, bookmarked: false, author: "Dr. Meera Joshi", publicAccess: false, fileSize: "3.5 MB", pages: 67 },
  { id: "11", title: "Speech at the Constituent Assembly — 1949", description: "Transcript of Dr. Ambedkar's concluding speech in the Constituent Assembly on the adoption of the Constitution of India.", type: "speech", category: "Constitutional Studies", tags: ["constituent assembly", "constitution", "1949"], uploadDate: "2026-04-05", downloads: 523, bookmarked: true, author: "Dr. B.R. Ambedkar", publicAccess: true, fileSize: "0.5 MB", pages: 12 },
  { id: "12", title: "Digital Preservation of Pali Manuscripts", description: "Report on the digitization project of ancient Pali Buddhist manuscripts held at the BARTI library and archive.", type: "report", category: "Report", tags: ["pali", "manuscripts", "digitization"], uploadDate: "2026-03-28", downloads: 76, bookmarked: false, author: "Digital Archives Team", publicAccess: false, fileSize: "8.3 MB", pages: 88 },
];

const categories = ["All", "Social Justice", "Constitutional Studies", "Ambedkar Literature", "History", "Report"];
const docTypes: ("All" | DocType)[] = ["All", "research", "publication", "speech", "historical", "report"];

export default function RepositoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [uploadForm, setUploadForm] = useState({
    title: "",
    description: "",
    type: "research" as DocType,
    category: "Social Justice",
    tags: "",
    publicAccess: true,
    file: null as File | null,
  });

  const filteredDocs = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch =
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesType = selectedType === "All" || doc.type === selectedType;
      const matchesCategory = selectedCategory === "All" || doc.category === selectedCategory;
      return matchesSearch && matchesType && matchesCategory;
    });
  }, [documents, searchQuery, selectedType, selectedCategory]);

  const totalPages = Math.ceil(filteredDocs.length / ITEMS_PER_PAGE);
  const paginatedDocs = filteredDocs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleBookmark = useCallback((id: string) => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, bookmarked: !d.bookmarked } : d))
    );
    const doc = documents.find((d) => d.id === id);
    toast.success(doc?.bookmarked ? "Bookmark removed" : "Document bookmarked");
  }, [documents]);

  const handleOpenDetail = useCallback((doc: Document) => {
    setSelectedDoc(doc);
    setDetailModalOpen(true);
  }, []);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDoc: Document = {
      id: String(Date.now()),
      title: uploadForm.title,
      description: uploadForm.description,
      type: uploadForm.type,
      category: uploadForm.category,
      tags: uploadForm.tags.split(",").map((t) => t.trim()).filter(Boolean),
      uploadDate: new Date().toISOString().split("T")[0],
      downloads: 0,
      bookmarked: false,
      author: "Current User",
      publicAccess: uploadForm.publicAccess,
      fileSize: "0 MB",
      pages: 0,
    };
    setDocuments((prev) => [newDoc, ...prev]);
    setUploadModalOpen(false);
    setUploadForm({ title: "", description: "", type: "research", category: "Social Justice", tags: "", publicAccess: true, file: null });
    toast.success("Document uploaded successfully");
  };

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader title="Digital Repository" actions={
          <button onClick={() => setError(false)} className="px-4 py-2 text-sm font-medium text-white bg-navy rounded-lg hover:bg-navy-light transition-colors">
            Retry
          </button>
        } />
        <ErrorState title="Failed to load repository" message="There was an error fetching documents. Please try again." onRetry={() => setError(false)} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Digital Repository"
        description="Browse and manage digital documents, research papers, and historical archives"
        actions={
          <button
            onClick={() => setUploadModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-navy rounded-lg hover:bg-navy-light transition-colors"
          >
            <Upload className="w-4 h-4" />
            Upload Document
          </button>
        }
      />

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={selectedType}
          onChange={(e) => { setSelectedType(e.target.value); setCurrentPage(1); }}
          className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
        >
          {docTypes.map((t) => (
            <option key={t} value={t}>{t === "All" ? "All Types" : docTypeLabels[t]}</option>
          ))}
        </select>
        <select
          value={selectedCategory}
          onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
          className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <div className="w-64">
          <SearchInput
            value={searchQuery}
            onChange={(v) => { setSearchQuery(v); setCurrentPage(1); }}
            placeholder="Search by title, description, tags..."
          />
        </div>
      </div>

      {loading ? (
        <TableSkeleton rows={4} cols={4} />
      ) : paginatedDocs.length === 0 ? (
        <EmptyState
          title="No documents found"
          description="Try adjusting your search or filters."
        />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginatedDocs.map((doc) => {
              const Icon = documentIcons[doc.type];
              return (
                <div
                  key={doc.id}
                  onClick={() => handleOpenDetail(doc)}
                  className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-navy/5 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-navy" />
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleBookmark(doc.id); }}
                      className="text-gray-300 hover:text-gold transition-colors"
                    >
                      <Star className={`w-5 h-5 ${doc.bookmarked ? "fill-gold text-gold" : ""}`} />
                    </button>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-navy transition-colors">
                    {doc.title}
                  </h4>
                  <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${docTypeColors[doc.type]} mb-2`}>
                    {docTypeLabels[doc.type]}
                  </span>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{doc.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{doc.uploadDate}</span>
                    <span className="inline-flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      {doc.downloads}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                    page === currentPage
                      ? "bg-navy text-white"
                      : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}

      <Modal isOpen={uploadModalOpen} onClose={() => setUploadModalOpen(false)} title="Upload Document" size="lg">
        <form onSubmit={handleUploadSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input
              type="text"
              value={uploadForm.title}
              onChange={(e) => setUploadForm((f) => ({ ...f, title: e.target.value }))}
              required
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
              placeholder="Document title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={uploadForm.description}
              onChange={(e) => setUploadForm((f) => ({ ...f, description: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold resize-y"
              placeholder="Document description"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Document Type *</label>
              <select
                value={uploadForm.type}
                onChange={(e) => setUploadForm((f) => ({ ...f, type: e.target.value as DocType }))}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
              >
                <option value="research">Research Paper</option>
                <option value="publication">Publication</option>
                <option value="speech">Speech</option>
                <option value="historical">Historical</option>
                <option value="report">Report</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select
                value={uploadForm.category}
                onChange={(e) => setUploadForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
              >
                {categories.filter((c) => c !== "All").map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <input
              type="text"
              value={uploadForm.tags}
              onChange={(e) => setUploadForm((f) => ({ ...f, tags: e.target.value }))}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
              placeholder="Comma separated tags (e.g., ambedkar, constitution)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">File</label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={(e) => setUploadForm((f) => ({ ...f, file: e.target.files?.[0] || null }))}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">
                  {uploadForm.file ? uploadForm.file.name : "Click to upload or drag and drop"}
                </p>
                <p className="text-xs text-gray-400 mt-1">PDF, DOCX, TXT up to 50MB</p>
              </label>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="public-access"
              checked={uploadForm.publicAccess}
              onChange={(e) => setUploadForm((f) => ({ ...f, publicAccess: e.target.checked }))}
              className="rounded border-gray-300 text-navy focus:ring-gold/30"
            />
            <label htmlFor="public-access" className="text-sm text-gray-700">Public Access</label>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setUploadModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-navy rounded-lg hover:bg-navy-light transition-colors"
            >
              Upload
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={detailModalOpen} onClose={() => { setDetailModalOpen(false); setSelectedDoc(null); }} title="Document Details" size="lg">
        {selectedDoc && (
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-navy/5 flex items-center justify-center shrink-0">
                {React.createElement(documentIcons[selectedDoc.type], { className: "w-7 h-7 text-navy" })}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedDoc.title}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">by {selectedDoc.author}</p>
                  </div>
                  <button
                    onClick={() => handleBookmark(selectedDoc.id)}
                    className="text-gray-300 hover:text-gold transition-colors shrink-0"
                  >
                    <Star className={`w-5 h-5 ${selectedDoc.bookmarked ? "fill-gold text-gold" : ""}`} />
                  </button>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600">{selectedDoc.description}</p>

            <div className="flex flex-wrap gap-2">
              <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${docTypeColors[selectedDoc.type]}`}>
                {docTypeLabels[selectedDoc.type]}
              </span>
              <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                {selectedDoc.category}
              </span>
              {selectedDoc.publicAccess ? (
                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-green-50 text-green-700 inline-flex items-center gap-1">
                  <Globe className="w-3 h-3" /> Public
                </span>
              ) : (
                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-500 inline-flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Restricted
                </span>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-lg font-bold text-gray-900">{selectedDoc.downloads}</p>
                <p className="text-xs text-gray-500">Downloads</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-lg font-bold text-gray-900">{selectedDoc.fileSize}</p>
                <p className="text-xs text-gray-500">File Size</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-lg font-bold text-gray-900">{selectedDoc.pages}</p>
                <p className="text-xs text-gray-500">Pages</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1.5">Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedDoc.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 text-xs bg-navy/5 text-navy rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center border border-gray-200">
              <div className="text-center">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500 font-medium">PDF Preview</p>
                <p className="text-xs text-gray-400 mt-1">Preview not available in this view</p>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-gray-100">
              <button
                onClick={() => { setDetailModalOpen(false); setSelectedDoc(null); }}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={() => { toast.success("Download started"); }}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-navy rounded-lg hover:bg-navy-light transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

