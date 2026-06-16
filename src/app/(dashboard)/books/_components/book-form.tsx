"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "Ambedkar Literature",
  "Constitutional Studies",
  "Social Justice",
  "Law",
  "Public Policy",
  "Research",
  "General",
] as const;

const LANGUAGES = ["English", "Hindi", "Marathi", "Sanskrit", "Other"] as const;

interface BookFormData {
  isbn: string;
  title: string;
  subtitle: string;
  author: string;
  publisher: string;
  language: string;
  category: string;
  keywords: string;
  shelf_location: string;
  publication_year: string;
  page_count: string;
  total_copies: string;
  description: string;
}

interface BookFormProps {
  initialData?: BookFormData;
  onSubmit: (data: BookFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const defaultFormData: BookFormData = {
  isbn: "",
  title: "",
  subtitle: "",
  author: "",
  publisher: "",
  language: "English",
  category: "General",
  keywords: "",
  shelf_location: "",
  publication_year: "",
  page_count: "",
  total_copies: "1",
  description: "",
};

export function BookForm({ initialData, onSubmit, onCancel, isLoading }: BookFormProps) {
  const [form, setForm] = useState<BookFormData>(initialData ?? defaultFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof BookFormData, string>>>({});

  const handleChange = (field: keyof BookFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof BookFormData, string>> = {};
    if (!form.isbn.trim()) newErrors.isbn = "ISBN is required";
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.author.trim()) newErrors.author = "Author is required";
    if (!form.category) newErrors.category = "Category is required";
    if (!form.total_copies || parseInt(form.total_copies) < 1)
      newErrors.total_copies = "At least 1 copy required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(form);
  };

  const inputClass = (field: keyof BookFormData) =>
    cn(
      "w-full px-3 py-2 text-sm border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-colors",
      errors[field] ? "border-red-400" : "border-gray-200"
    );

  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>ISBN *</label>
          <input
            type="text"
            value={form.isbn}
            onChange={(e) => handleChange("isbn", e.target.value)}
            className={inputClass("isbn")}
            placeholder="978-0-1234-5678-9"
          />
          {errors.isbn && <p className="text-xs text-red-500 mt-1">{errors.isbn}</p>}
        </div>
        <div>
          <label className={labelClass}>Publication Year</label>
          <input
            type="number"
            value={form.publication_year}
            onChange={(e) => handleChange("publication_year", e.target.value)}
            className={inputClass("publication_year")}
            placeholder="2024"
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass}>Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className={inputClass("title")}
            placeholder="Book title"
          />
          {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
        </div>
        <div className="md:col-span-2">
          <label className={labelClass}>Subtitle</label>
          <input
            type="text"
            value={form.subtitle}
            onChange={(e) => handleChange("subtitle", e.target.value)}
            className={inputClass("subtitle")}
            placeholder="Book subtitle (optional)"
          />
        </div>
        <div>
          <label className={labelClass}>Author *</label>
          <input
            type="text"
            value={form.author}
            onChange={(e) => handleChange("author", e.target.value)}
            className={inputClass("author")}
            placeholder="Author name"
          />
          {errors.author && <p className="text-xs text-red-500 mt-1">{errors.author}</p>}
        </div>
        <div>
          <label className={labelClass}>Publisher</label>
          <input
            type="text"
            value={form.publisher}
            onChange={(e) => handleChange("publisher", e.target.value)}
            className={inputClass("publisher")}
            placeholder="Publisher name"
          />
        </div>
        <div>
          <label className={labelClass}>Language</label>
          <select
            value={form.language}
            onChange={(e) => handleChange("language", e.target.value)}
            className={inputClass("language")}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Category *</label>
          <select
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className={inputClass("category")}
          >
            <option value="">Select category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
        </div>
        <div>
          <label className={labelClass}>Shelf Location</label>
          <input
            type="text"
            value={form.shelf_location}
            onChange={(e) => handleChange("shelf_location", e.target.value)}
            className={inputClass("shelf_location")}
            placeholder="A-12-3"
          />
        </div>
        <div>
          <label className={labelClass}>Page Count</label>
          <input
            type="number"
            value={form.page_count}
            onChange={(e) => handleChange("page_count", e.target.value)}
            className={inputClass("page_count")}
            placeholder="250"
          />
        </div>
        <div>
          <label className={labelClass}>Total Copies *</label>
          <input
            type="number"
            value={form.total_copies}
            onChange={(e) => handleChange("total_copies", e.target.value)}
            className={inputClass("total_copies")}
            min={1}
          />
          {errors.total_copies && <p className="text-xs text-red-500 mt-1">{errors.total_copies}</p>}
        </div>
        <div className="md:col-span-2">
          <label className={labelClass}>Keywords</label>
          <input
            type="text"
            value={form.keywords}
            onChange={(e) => handleChange("keywords", e.target.value)}
            className={inputClass("keywords")}
            placeholder="Comma-separated keywords"
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass}>Description</label>
          <textarea
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className={cn(inputClass("description"), "min-h-[100px] resize-y")}
            placeholder="Book description"
          />
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-white bg-navy rounded-lg hover:bg-navy-light transition-colors disabled:opacity-50 inline-flex items-center gap-2"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          {initialData ? "Update Book" : "Add Book"}
        </button>
      </div>
    </form>
  );
}

export type { BookFormData };
export { CATEGORIES, LANGUAGES };
