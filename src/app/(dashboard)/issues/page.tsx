"use client";

import { useState, useMemo, useCallback } from "react";
import {
  ArrowLeftRight, BookOpen, XCircle, CheckCircle, AlertCircle, Clock, Calendar,
  Search, ArrowUpDown, Ban, Receipt, ChevronLeft, ChevronRight, User, Barcode,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/shared/page-header";
import { SearchInput } from "@/components/shared/search-input";
import { EmptyState } from "@/components/shared/empty-state";
import { TableSkeleton } from "@/components/shared/loading-skeleton";
import { ErrorState } from "@/components/shared/error-state";
import type { BorrowTransaction, Member, Book, BookCopy } from "@/lib/types";

const DAY_MS = 86400000;
const todayDate = new Date();
todayDate.setHours(0, 0, 0, 0);

function fmt(d: Date): string {
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
function toDate(s: string): Date {
  const d = new Date(s);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
function addDays(d: Date, n: number): Date {
  return new Date(d.getTime() + n * DAY_MS);
}
function diffDays(a: Date, b: Date): number {
  return Math.round((a.getTime() - b.getTime()) / DAY_MS);
}
function dateStr(d: Date): string {
  return d.toISOString().slice(0, 10);
}
const today = dateStr(todayDate);
const todayDt = toDate(today);
const MOCK_MEMBERS: (Member & { memberType?: { name: string; max_books: number; max_duration_days: number } })[] = [
  { id: "mem-1", profile_id: null, member_id: "MEM-2024-001", full_name: "Arjun Sharma", email: "arjun@example.com", phone: "9876543210", member_type_id: "mt-1", member_type: { id: "mt-1", name: "Student", max_books: 5, max_duration_days: 14, renewal_count: 2, validity_months: 12, auto_renew: false, description: null, created_at: "" }, status: "active", address: null, id_type: null, id_number: null, qr_code_url: null, registered_at: "2024-01-15", expires_at: "2025-01-15", notes: null, created_at: "", updated_at: "" },
  { id: "mem-2", profile_id: null, member_id: "MEM-2024-002", full_name: "Priya Patel", email: "priya@example.com", phone: "9876543211", member_type_id: "mt-2", member_type: { id: "mt-2", name: "Faculty", max_books: 10, max_duration_days: 30, renewal_count: 5, validity_months: 24, auto_renew: false, description: null, created_at: "" }, status: "active", address: null, id_type: null, id_number: null, qr_code_url: null, registered_at: "2024-02-20", expires_at: "2026-02-20", notes: null, created_at: "", updated_at: "" },
  { id: "mem-3", profile_id: null, member_id: "MEM-2024-003", full_name: "Rahul Verma", email: "rahul@example.com", phone: "9876543212", member_type_id: "mt-1", member_type: { id: "mt-1", name: "Student", max_books: 5, max_duration_days: 14, renewal_count: 2, validity_months: 12, auto_renew: false, description: null, created_at: "" }, status: "suspended", address: null, id_type: null, id_number: null, qr_code_url: null, registered_at: "2024-03-10", expires_at: "2025-03-10", notes: null, created_at: "", updated_at: "" },
  { id: "mem-4", profile_id: null, member_id: "MEM-2024-004", full_name: "Sneha Reddy", email: "sneha@example.com", phone: "9876543213", member_type_id: "mt-2", member_type: { id: "mt-2", name: "Faculty", max_books: 10, max_duration_days: 30, renewal_count: 5, validity_months: 24, auto_renew: false, description: null, created_at: "" }, status: "active", address: null, id_type: null, id_number: null, qr_code_url: null, registered_at: "2024-04-05", expires_at: "2026-04-05", notes: null, created_at: "", updated_at: "" },
  { id: "mem-5", profile_id: null, member_id: "MEM-2024-005", full_name: "Vikram Singh", email: "vikram@example.com", phone: "9876543214", member_type_id: "mt-1", member_type: { id: "mt-1", name: "Student", max_books: 5, max_duration_days: 14, renewal_count: 2, validity_months: 12, auto_renew: false, description: null, created_at: "" }, status: "active", address: null, id_type: null, id_number: null, qr_code_url: null, registered_at: "2024-05-12", expires_at: "2025-05-12", notes: null, created_at: "", updated_at: "" },
  { id: "mem-6", profile_id: null, member_id: "MEM-2024-006", full_name: "Anita Desai", email: "anita@example.com", phone: "9876543215", member_type_id: "mt-3", member_type: { id: "mt-3", name: "Research Scholar", max_books: 8, max_duration_days: 60, renewal_count: 3, validity_months: 12, auto_renew: false, description: null, created_at: "" }, status: "active", address: null, id_type: null, id_number: null, qr_code_url: null, registered_at: "2024-06-01", expires_at: "2025-06-01", notes: null, created_at: "", updated_at: "" },
];

const MOCK_BOOKS: (Book & { authors?: { id: string; name: string; biography: string | null; created_at: string }[] })[] = [
  { id: "book-1", isbn: "978-0-14-144114-2", title: "The Great Gatsby", subtitle: null, publisher: "Penguin", language: "English", category_id: null, shelf_location: "A-12", keywords: ["fiction","classic"], description: null, cover_image_url: null, publication_year: 1925, page_count: 180, total_copies: 3, available_copies: 2, authors: [{ id: "auth-1", name: "F. Scott Fitzgerald", biography: null, created_at: "" }], is_active: true, created_at: "", updated_at: "" },
  { id: "book-2", isbn: "978-0-06-112008-4", title: "To Kill a Mockingbird", subtitle: null, publisher: "HarperCollins", language: "English", category_id: null, shelf_location: "B-04", keywords: ["fiction","classic"], description: null, cover_image_url: null, publication_year: 1960, page_count: 281, total_copies: 2, available_copies: 0, authors: [{ id: "auth-2", name: "Harper Lee", biography: null, created_at: "" }], is_active: true, created_at: "", updated_at: "" },
  { id: "book-3", isbn: "978-0-452-28423-4", title: "1984", subtitle: null, publisher: "Signet", language: "English", category_id: null, shelf_location: "B-12", keywords: ["dystopian","fiction"], description: null, cover_image_url: null, publication_year: 1949, page_count: 328, total_copies: 4, available_copies: 3, authors: [{ id: "auth-3", name: "George Orwell", biography: null, created_at: "" }], is_active: true, created_at: "", updated_at: "" },
  { id: "book-4", isbn: "978-0-7432-7356-5", title: "The Da Vinci Code", subtitle: null, publisher: "Doubleday", language: "English", category_id: null, shelf_location: "C-08", keywords: ["mystery","thriller"], description: null, cover_image_url: null, publication_year: 2003, page_count: 489, total_copies: 3, available_copies: 1, authors: [{ id: "auth-4", name: "Dan Brown", biography: null, created_at: "" }], is_active: true, created_at: "", updated_at: "" },
  { id: "book-5", isbn: "978-0-547-92181-2", title: "The Alchemist", subtitle: null, publisher: "HarperOne", language: "English", category_id: null, shelf_location: "A-07", keywords: ["fiction","philosophy"], description: null, cover_image_url: null, publication_year: 1988, page_count: 197, total_copies: 3, available_copies: 1, authors: [{ id: "auth-5", name: "Paulo Coelho", biography: null, created_at: "" }], is_active: true, created_at: "", updated_at: "" },
  { id: "book-6", isbn: "978-0-307-27762-0", title: "A Brief History of Time", subtitle: null, publisher: "Bantam", language: "English", category_id: null, shelf_location: "D-02", keywords: ["science","physics"], description: null, cover_image_url: null, publication_year: 1988, page_count: 256, total_copies: 2, available_copies: 1, authors: [{ id: "auth-6", name: "Stephen Hawking", biography: null, created_at: "" }], is_active: true, created_at: "", updated_at: "" },
  { id: "book-7", isbn: "978-0-14-017739-3", title: "One Hundred Years of Solitude", subtitle: null, publisher: "Penguin", language: "English", category_id: null, shelf_location: "A-15", keywords: ["fiction","magical realism"], description: null, cover_image_url: null, publication_year: 1967, page_count: 417, total_copies: 2, available_copies: 2, authors: [{ id: "auth-7", name: "Gabriel Garcia Marquez", biography: null, created_at: "" }], is_active: true, created_at: "", updated_at: "" },
  { id: "book-8", isbn: "978-0-679-72018-2", title: "The Catcher in the Rye", subtitle: null, publisher: "Little, Brown", language: "English", category_id: null, shelf_location: "A-19", keywords: ["fiction","coming-of-age"], description: null, cover_image_url: null, publication_year: 1951, page_count: 234, total_copies: 3, available_copies: 1, authors: [{ id: "auth-8", name: "J.D. Salinger", biography: null, created_at: "" }], is_active: true, created_at: "", updated_at: "" },
  { id: "book-9", isbn: "978-0-14-118776-0", title: "Pride and Prejudice", subtitle: null, publisher: "Penguin", language: "English", category_id: null, shelf_location: "B-22", keywords: ["fiction","romance"], description: null, cover_image_url: null, publication_year: 1813, page_count: 432, total_copies: 2, available_copies: 2, authors: [{ id: "auth-9", name: "Jane Austen", biography: null, created_at: "" }], is_active: true, created_at: "", updated_at: "" },
  { id: "book-10", isbn: "978-0-307-34152-0", title: "Sapiens", subtitle: "A Brief History of Humankind", publisher: "Harper", language: "English", category_id: null, shelf_location: "D-10", keywords: ["history","anthropology"], description: null, cover_image_url: null, publication_year: 2011, page_count: 443, total_copies: 3, available_copies: 2, authors: [{ id: "auth-10", name: "Yuval Noah Harari", biography: null, created_at: "" }], is_active: true, created_at: "", updated_at: "" },
];

const MOCK_COPIES: (BookCopy & { bookTitle?: string })[] = [
  { id: "copy-1", book_id: "book-1", copy_number: 1, barcode: "BC-001", status: "available", condition: "good", acquired_at: "2024-01-01", discarded_at: null, notes: null, created_at: "" },
  { id: "copy-2", book_id: "book-1", copy_number: 2, barcode: "BC-002", status: "available", condition: "good", acquired_at: "2024-01-01", discarded_at: null, notes: null, created_at: "" },
  { id: "copy-3", book_id: "book-2", copy_number: 1, barcode: "BC-003", status: "issued", condition: "good", acquired_at: "2024-01-01", discarded_at: null, notes: null, created_at: "" },
  { id: "copy-4", book_id: "book-2", copy_number: 2, barcode: "BC-004", status: "issued", condition: "fair", acquired_at: "2024-01-01", discarded_at: null, notes: null, created_at: "" },
  { id: "copy-5", book_id: "book-3", copy_number: 1, barcode: "BC-005", status: "available", condition: "new", acquired_at: "2024-01-01", discarded_at: null, notes: null, created_at: "" },
  { id: "copy-6", book_id: "book-3", copy_number: 2, barcode: "BC-006", status: "available", condition: "good", acquired_at: "2024-01-01", discarded_at: null, notes: null, created_at: "" },
  { id: "copy-7", book_id: "book-4", copy_number: 1, barcode: "BC-007", status: "issued", condition: "good", acquired_at: "2024-01-01", discarded_at: null, notes: null, created_at: "" },
  { id: "copy-8", book_id: "book-4", copy_number: 2, barcode: "BC-008", status: "available", condition: "good", acquired_at: "2024-01-01", discarded_at: null, notes: null, created_at: "" },
  { id: "copy-9", book_id: "book-5", copy_number: 1, barcode: "BC-009", status: "issued", condition: "good", acquired_at: "2024-01-01", discarded_at: null, notes: null, created_at: "" },
  { id: "copy-10", book_id: "book-5", copy_number: 2, barcode: "BC-010", status: "available", condition: "good", acquired_at: "2024-01-01", discarded_at: null, notes: null, created_at: "" },
  { id: "copy-11", book_id: "book-6", copy_number: 1, barcode: "BC-011", status: "issued", condition: "good", acquired_at: "2024-01-01", discarded_at: null, notes: null, created_at: "" },
  { id: "copy-12", book_id: "book-6", copy_number: 2, barcode: "BC-012", status: "available", condition: "fair", acquired_at: "2024-01-01", discarded_at: null, notes: null, created_at: "" },
  { id: "copy-13", book_id: "book-7", copy_number: 1, barcode: "BC-013", status: "available", condition: "good", acquired_at: "2024-01-01", discarded_at: null, notes: null, created_at: "" },
  { id: "copy-14", book_id: "book-7", copy_number: 2, barcode: "BC-014", status: "available", condition: "new", acquired_at: "2024-01-01", discarded_at: null, notes: null, created_at: "" },
  { id: "copy-15", book_id: "book-8", copy_number: 1, barcode: "BC-015", status: "issued", condition: "good", acquired_at: "2024-01-01", discarded_at: null, notes: null, created_at: "" },
  { id: "copy-16", book_id: "book-8", copy_number: 2, barcode: "BC-016", status: "available", condition: "good", acquired_at: "2024-01-01", discarded_at: null, notes: null, created_at: "" },
  { id: "copy-17", book_id: "book-9", copy_number: 1, barcode: "BC-017", status: "available", condition: "good", acquired_at: "2024-01-01", discarded_at: null, notes: null, created_at: "" },
  { id: "copy-18", book_id: "book-9", copy_number: 2, barcode: "BC-018", status: "available", condition: "good", acquired_at: "2024-01-01", discarded_at: null, notes: null, created_at: "" },
  { id: "copy-19", book_id: "book-10", copy_number: 1, barcode: "BC-019", status: "available", condition: "good", acquired_at: "2024-01-01", discarded_at: null, notes: null, created_at: "" },
  { id: "copy-20", book_id: "book-10", copy_number: 2, barcode: "BC-020", status: "issued", condition: "good", acquired_at: "2024-01-01", discarded_at: null, notes: null, created_at: "" },
];
function generateMockTransactions(): BorrowTransaction[] {
  return [
    { id: "tx-1", book_copy_id: "copy-3", member_id: "mem-1", book: MOCK_BOOKS[1], book_copy: MOCK_COPIES[2], member: MOCK_MEMBERS[0], issued_by: "staff-1", returned_to: null, issue_date: dateStr(addDays(todayDt, -25)), due_date: dateStr(addDays(todayDt, -11)), return_date: null, status: "overdue", fine_amount: 0, fine_paid: false, notes: null, created_at: "" },
    { id: "tx-2", book_copy_id: "copy-4", member_id: "mem-2", book: MOCK_BOOKS[1], member: MOCK_MEMBERS[1], issued_by: "staff-1", returned_to: null, issue_date: dateStr(addDays(todayDt, -20)), due_date: dateStr(addDays(todayDt, -6)), return_date: null, status: "overdue", fine_amount: 0, fine_paid: false, notes: null, created_at: "" },
    { id: "tx-3", book_copy_id: "copy-7", member_id: "mem-4", book: MOCK_BOOKS[3], book_copy: MOCK_COPIES[6], member: MOCK_MEMBERS[3], issued_by: "staff-1", returned_to: null, issue_date: dateStr(addDays(todayDt, -15)), due_date: dateStr(addDays(todayDt, -1)), return_date: null, status: "overdue", fine_amount: 5, fine_paid: false, notes: null, created_at: "" },
    { id: "tx-4", book_copy_id: "copy-9", member_id: "mem-5", book: MOCK_BOOKS[4], book_copy: MOCK_COPIES[8], member: MOCK_MEMBERS[4], issued_by: "staff-1", returned_to: null, issue_date: dateStr(addDays(todayDt, -10)), due_date: dateStr(addDays(todayDt, 4)), return_date: null, status: "active", fine_amount: 0, fine_paid: false, notes: null, created_at: "" },
    { id: "tx-5", book_copy_id: "copy-11", member_id: "mem-6", book: MOCK_BOOKS[5], book_copy: MOCK_COPIES[10], member: MOCK_MEMBERS[5], issued_by: "staff-1", returned_to: null, issue_date: dateStr(addDays(todayDt, -8)), due_date: dateStr(addDays(todayDt, 6)), return_date: null, status: "active", fine_amount: 0, fine_paid: false, notes: null, created_at: "" },
    { id: "tx-6", book_copy_id: "copy-15", member_id: "mem-1", book: MOCK_BOOKS[7], book_copy: MOCK_COPIES[14], member: MOCK_MEMBERS[0], issued_by: "staff-1", returned_to: null, issue_date: dateStr(addDays(todayDt, -5)), due_date: dateStr(addDays(todayDt, 9)), return_date: null, status: "active", fine_amount: 0, fine_paid: false, notes: null, created_at: "" },
    { id: "tx-7", book_copy_id: "copy-20", member_id: "mem-2", book: MOCK_BOOKS[9], book_copy: MOCK_COPIES[19], member: MOCK_MEMBERS[1], issued_by: "staff-1", returned_to: null, issue_date: dateStr(addDays(todayDt, -3)), due_date: dateStr(addDays(todayDt, 11)), return_date: null, status: "active", fine_amount: 0, fine_paid: false, notes: null, created_at: "" },
    { id: "tx-8", book_copy_id: "copy-1", member_id: "mem-3", book: MOCK_BOOKS[0], book_copy: MOCK_COPIES[0], member: MOCK_MEMBERS[2], issued_by: "staff-1", returned_to: "staff-1", issue_date: dateStr(addDays(todayDt, -40)), due_date: dateStr(addDays(todayDt, -26)), return_date: dateStr(addDays(todayDt, -30)), status: "returned", fine_amount: 30, fine_paid: true, notes: null, created_at: "" },
    { id: "tx-9", book_copy_id: "copy-5", member_id: "mem-4", book: MOCK_BOOKS[2], book_copy: MOCK_COPIES[4], member: MOCK_MEMBERS[3], issued_by: "staff-1", returned_to: "staff-1", issue_date: dateStr(addDays(todayDt, -35)), due_date: dateStr(addDays(todayDt, -5)), return_date: dateStr(addDays(todayDt, -2)), status: "returned", fine_amount: 15, fine_paid: true, notes: null, created_at: "" },
    { id: "tx-10", book_copy_id: "copy-13", member_id: "mem-5", book: MOCK_BOOKS[6], book_copy: MOCK_COPIES[12], member: MOCK_MEMBERS[4], issued_by: "staff-1", returned_to: "staff-1", issue_date: dateStr(addDays(todayDt, -30)), due_date: dateStr(addDays(todayDt, -16)), return_date: dateStr(addDays(todayDt, -20)), status: "returned", fine_amount: 0, fine_paid: false, notes: null, created_at: "" },
    { id: "tx-11", book_copy_id: "copy-2", member_id: "mem-6", book: MOCK_BOOKS[0], book_copy: MOCK_COPIES[1], member: MOCK_MEMBERS[5], issued_by: "staff-1", returned_to: "staff-1", issue_date: dateStr(addDays(todayDt, -28)), due_date: dateStr(addDays(todayDt, -14)), return_date: dateStr(addDays(todayDt, -15)), status: "returned", fine_amount: 0, fine_paid: false, notes: null, created_at: "" },
    { id: "tx-12", book_copy_id: "copy-8", member_id: "mem-1", book: MOCK_BOOKS[3], book_copy: MOCK_COPIES[7], member: MOCK_MEMBERS[0], issued_by: "staff-1", returned_to: "staff-1", issue_date: dateStr(addDays(todayDt, -22)), due_date: dateStr(addDays(todayDt, -8)), return_date: dateStr(addDays(todayDt, -10)), status: "returned", fine_amount: 0, fine_paid: false, notes: null, created_at: "" },
    { id: "tx-13", book_copy_id: "copy-16", member_id: "mem-2", book: MOCK_BOOKS[7], book_copy: MOCK_COPIES[15], member: MOCK_MEMBERS[1], issued_by: "staff-1", returned_to: "staff-1", issue_date: dateStr(addDays(todayDt, -18)), due_date: dateStr(addDays(todayDt, -4)), return_date: dateStr(addDays(todayDt, -5)), status: "returned", fine_amount: 0, fine_paid: false, notes: null, created_at: "" },
    { id: "tx-14", book_copy_id: "copy-10", member_id: "mem-3", book: MOCK_BOOKS[4], book_copy: MOCK_COPIES[9], member: MOCK_MEMBERS[2], issued_by: "staff-1", returned_to: "staff-1", issue_date: dateStr(addDays(todayDt, -14)), due_date: dateStr(addDays(todayDt, 0)), return_date: dateStr(addDays(todayDt, -1)), status: "returned", fine_amount: 0, fine_paid: false, notes: null, created_at: "" },
    { id: "tx-15", book_copy_id: "copy-6", member_id: "mem-4", book: MOCK_BOOKS[2], book_copy: MOCK_COPIES[5], member: MOCK_MEMBERS[3], issued_by: "staff-1", returned_to: null, issue_date: dateStr(addDays(todayDt, -2)), due_date: dateStr(addDays(todayDt, 12)), return_date: null, status: "active", fine_amount: 0, fine_paid: false, notes: null, created_at: "" },
    { id: "tx-16", book_copy_id: "copy-12", member_id: "mem-5", book: MOCK_BOOKS[5], book_copy: MOCK_COPIES[11], member: MOCK_MEMBERS[4], issued_by: "staff-1", returned_to: null, issue_date: dateStr(addDays(todayDt, -1)), due_date: dateStr(addDays(todayDt, 13)), return_date: null, status: "active", fine_amount: 0, fine_paid: false, notes: null, created_at: "" },
  ];
}

const allTransactions = generateMockTransactions();

const tabs = ["Issue Book", "Return Book", "Active Loans", "Overdue Loans", "History"] as const;
type Tab = (typeof tabs)[number];

function getStatusBadge(status: string) {
  const styles: Record<string, string> = {
    active: "bg-blue-50 text-blue-700",
    returned: "bg-green-50 text-green-700",
    overdue: "bg-red-50 text-red-700",
    lost: "bg-gray-100 text-gray-700",
    pending: "bg-blue-50 text-blue-700",
    ready: "bg-green-50 text-green-700",
    completed: "bg-gray-100 text-gray-600",
    expired: "bg-red-50 text-red-700",
    cancelled: "bg-amber-50 text-amber-700",
  };
  return styles[status] || "bg-gray-100 text-gray-600";
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize", getStatusBadge(status))}>
      {status}
    </span>
  );
}

type SortField = "due_date" | "member_name" | "book_title" | "issue_date";

const ITEMS_PER_PAGE = 10;
export default function IssuesPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Issue Book");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Issue Book state
  const [issueMemberQuery, setIssueMemberQuery] = useState("");
  const [issueMember, setIssueMember] = useState<typeof MOCK_MEMBERS[0] | null>(null);
  const [issueMemberError, setIssueMemberError] = useState("");
  const [issueBookQuery, setIssueBookQuery] = useState("");
  const [issueBook, setIssueBook] = useState<typeof MOCK_BOOKS[0] | null>(null);
  const [issueCopy, setIssueCopy] = useState<typeof MOCK_COPIES[0] | null>(null);
  const [issueBookError, setIssueBookError] = useState("");
  const [issuing, setIssuing] = useState(false);

  // Return Book state
  const [returnMemberQuery, setReturnMemberQuery] = useState("");
  const [returnMember, setReturnMember] = useState<typeof MOCK_MEMBERS[0] | null>(null);
  const [returnMemberError, setReturnMemberError] = useState("");
  const [returnMemberLoans, setReturnMemberLoans] = useState<BorrowTransaction[]>([]);
  const [selectedReturnLoan, setSelectedReturnLoan] = useState<BorrowTransaction | null>(null);
  const [returning, setReturning] = useState(false);

  // Active Loans state
  const [activeSortField, setActiveSortField] = useState<SortField>("due_date");
  const [activeSortAsc, setActiveSortAsc] = useState(true);
  const [activePage, setActivePage] = useState(1);

  // Overdue Loans state
  const [overduePage, setOverduePage] = useState(1);

  // History state
  const [historySearch, setHistorySearch] = useState("");
  const [historyDateFrom, setHistoryDateFrom] = useState("");
  const [historyDateTo, setHistoryDateTo] = useState("");
  const [historyPage, setHistoryPage] = useState(1);
  const handleFindIssueMember = useCallback(() => {
    setIssueMemberError("");
    setIssueMember(null);
    setIssueBook(null);
    setIssueCopy(null);
    if (!issueMemberQuery.trim()) { setIssueMemberError("Please enter a Member ID."); return; }
    const member = MOCK_MEMBERS.find((m) =>
      m.member_id.toLowerCase().includes(issueMemberQuery.toLowerCase()) ||
      m.full_name.toLowerCase().includes(issueMemberQuery.toLowerCase())
    );
    if (!member) { setIssueMemberError("No member found with that ID or name."); return; }
    if (member.status !== "active") { setIssueMemberError('Member status is "' + member.status + '". Only active members can borrow.'); return; }
    setIssueMember(member);
  }, [issueMemberQuery]);

  const handleFindIssueBook = useCallback(() => {
    setIssueBookError("");
    setIssueBook(null);
    setIssueCopy(null);
    if (!issueBookQuery.trim()) { setIssueBookError("Please enter a Book Barcode or Title."); return; }
    const copy = MOCK_COPIES.find((c) =>
      c.barcode.toLowerCase().includes(issueBookQuery.toLowerCase())
    );
    if (!copy) { setIssueBookError("No book copy found with that barcode."); return; }
    const book = MOCK_BOOKS.find((b) => b.id === copy.book_id);
    if (!book) { setIssueBookError("Book not found."); return; }
    if (copy.status !== "available") { setIssueBookError('This copy is "' + copy.status + '". Cannot issue.'); return; }
    if (issueMember) {
      const activeCount = allTransactions.filter(
        (t) => t.member_id === issueMember.id && t.status === "active"
      ).length;
      const maxBooks = issueMember.member_type?.max_books ?? 5;
      if (activeCount >= maxBooks) {
        setIssueBookError("Member has reached the maximum limit of " + maxBooks + " books.");
        return;
      }
    }
    setIssueBook(book);
    setIssueCopy(copy);
  }, [issueBookQuery, issueMember]);

  const handleIssueBook = useCallback(() => {
    if (!issueMember || !issueBook || !issueCopy) return;
    setIssuing(true);
    setTimeout(() => {
      const dueDate = addDays(todayDt, issueMember.member_type?.max_duration_days ?? 14);
      toast.success("Book Issued", {
        description: issueBook.title + " issued to " + issueMember.full_name + ". Due: " + fmt(dueDate),
      });
      setIssuing(false);
      setIssueBook(null);
      setIssueCopy(null);
      setIssueBookQuery("");
    }, 1000);
  }, [issueMember, issueBook, issueCopy]);

  const handleFindReturnMember = useCallback(() => {
    setReturnMemberError("");
    setReturnMember(null);
    setReturnMemberLoans([]);
    setSelectedReturnLoan(null);
    if (!returnMemberQuery.trim()) { setReturnMemberError("Please enter a Member ID."); return; }
    const member = MOCK_MEMBERS.find((m) =>
      m.member_id.toLowerCase().includes(returnMemberQuery.toLowerCase()) ||
      m.full_name.toLowerCase().includes(returnMemberQuery.toLowerCase())
    );
    if (!member) { setReturnMemberError("No member found."); return; }
    setReturnMember(member);
    const loans = allTransactions.filter(
      (t) => t.member_id === member.id && (t.status === "active" || t.status === "overdue")
    );
    setReturnMemberLoans(loans);
  }, [returnMemberQuery]);

  const calcFine = useCallback((dueDate: string) => {
    const due = toDate(dueDate);
    if (todayDt > due) {
      return diffDays(todayDt, due) * 5;
    }
    return 0;
  }, []);

  const handleReturnBook = useCallback(() => {
    if (!selectedReturnLoan || !returnMember) return;
    setReturning(true);
    setTimeout(() => {
      const fine = calcFine(selectedReturnLoan.due_date);
      if (fine > 0) {
        toast("Book Returned with Fine", {
          description: "₹" + fine + " fine applied for " + returnMember.full_name + ". Receipt available.",
          icon: <Receipt className="w-4 h-4" />,
        });
      } else {
        toast.success("Book Returned", {
          description: (selectedReturnLoan.book?.title ?? "Book") + " returned by " + returnMember.full_name + ".",
        });
      }
      setReturning(false);
      setReturnMemberLoans((prev) => prev.filter((l) => l.id !== selectedReturnLoan.id));
      setSelectedReturnLoan(null);
    }, 1000);
  }, [selectedReturnLoan, returnMember, calcFine]);

  const handleReturnAction = useCallback((loan: BorrowTransaction) => {
    setSelectedReturnLoan(loan);
  }, []);

  const handleCheckOut = useCallback((loan: BorrowTransaction) => {
    toast.success("Checked Out", {
      description: (loan.member?.full_name ?? "Member") + " has been checked out for " + (loan.book?.title ?? "Book") + ".",
    });
  }, []);

  const activeLoans = useMemo(() => {
    return allTransactions.filter((t) => t.status === "active");
  }, []);

  const overdueLoans = useMemo(() => {
    return allTransactions.filter((t) => t.status === "overdue");
  }, []);

  const historyLoans = useMemo(() => {
    let filtered = allTransactions.filter((t) => t.status === "returned");
    if (historySearch.trim()) {
      const q = historySearch.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.member?.full_name.toLowerCase().includes(q) ||
          t.book?.title.toLowerCase().includes(q)
      );
    }
    if (historyDateFrom) {
      filtered = filtered.filter((t) => t.issue_date >= historyDateFrom);
    }
    if (historyDateTo) {
      filtered = filtered.filter((t) => (t.return_date ?? t.issue_date) <= historyDateTo);
    }
    return filtered;
  }, [historySearch, historyDateFrom, historyDateTo]);

  const sortedActiveLoans = useMemo(() => {
    const sorted = [...activeLoans];
    sorted.sort((a, b) => {
      let cmp = 0;
      if (activeSortField === "due_date") cmp = a.due_date.localeCompare(b.due_date);
      else if (activeSortField === "issue_date") cmp = a.issue_date.localeCompare(b.issue_date);
      else if (activeSortField === "member_name") cmp = (a.member?.full_name ?? "").localeCompare(b.member?.full_name ?? "");
      else if (activeSortField === "book_title") cmp = (a.book?.title ?? "").localeCompare(b.book?.title ?? "");
      return activeSortAsc ? cmp : -cmp;
    });
    return sorted;
  }, [activeLoans, activeSortField, activeSortAsc]);

  const paginatedActive = useMemo(() => {
    const start = (activePage - 1) * ITEMS_PER_PAGE;
    return sortedActiveLoans.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedActiveLoans, activePage]);

  const paginatedOverdue = useMemo(() => {
    const start = (overduePage - 1) * ITEMS_PER_PAGE;
    return overdueLoans.slice(start, start + ITEMS_PER_PAGE);
  }, [overdueLoans, overduePage]);

  const paginatedHistory = useMemo(() => {
    const start = (historyPage - 1) * ITEMS_PER_PAGE;
    return historyLoans.slice(start, start + ITEMS_PER_PAGE);
  }, [historyLoans, historyPage]);

  const totalActivePages = Math.ceil(activeLoans.length / ITEMS_PER_PAGE);
  const totalOverduePages = Math.ceil(overdueLoans.length / ITEMS_PER_PAGE);
  const totalHistoryPages = Math.ceil(historyLoans.length / ITEMS_PER_PAGE);

  function Pagination({ page, totalPages, setPage }: { page: number; totalPages: number; setPage: (p: number) => void }) {
    if (totalPages <= 1) return null;
    return (
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-500">Page {page} of {totalPages}</p>
        <div className="flex gap-1">
          <button onClick={() => setPage(page - 1)} disabled={page <= 1} className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-30">
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button key={p} onClick={() => setPage(p)} className={cn("w-8 h-8 text-sm rounded-md", p === page ? "bg-navy text-white" : "text-gray-600 hover:bg-gray-100")}>
              {p}
            </button>
          ))}
          <button onClick={() => setPage(page + 1)} disabled={page >= totalPages} className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-30">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <PageHeader title="Issue & Return" description="Manage book checkouts, returns, and track loans" />
        <ErrorState message={error} onRetry={() => setError(null)} />
      </div>
    );
  }
  return (
    <div>
      <PageHeader title="Issue & Return" description="Manage book checkouts, returns, and track loans" />

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
                  activeTab === tab
                    ? "border-navy text-navy"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                )}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {loading ? (
            <TableSkeleton rows={8} cols={5} />
          ) : (
            <>
              {activeTab === "Issue Book" && (
                <div className="space-y-6 max-w-2xl">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-7 h-7 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center">1</span>
                      <h3 className="font-medium text-gray-900">Find Member</h3>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={issueMemberQuery}
                        onChange={(e) => setIssueMemberQuery(e.target.value)}
                        placeholder="Enter Member ID or Name..."
                        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy"
                      />
                      <button onClick={handleFindIssueMember} className="px-4 py-2 text-sm font-medium text-white bg-navy rounded-lg hover:bg-navy-light transition-colors">
                        Find Member
                      </button>
                    </div>
                    {issueMemberError && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> {issueMemberError}
                      </p>
                    )}
                    {issueMember && (
                      <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{issueMember.full_name}</p>
                            <p className="text-sm text-gray-500">{issueMember.member_id} &bull; {issueMember.member_type?.name}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize", issueMember.status === "active" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700")}>
                              {issueMember.status}
                            </span>
                            <span className="text-sm text-gray-500">
                              {allTransactions.filter((t) => t.member_id === issueMember.id && t.status === "active").length}/{issueMember.member_type?.max_books ?? 5} books
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={cn("w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center", issueMember ? "bg-navy text-white" : "bg-gray-200 text-gray-400")}>2</span>
                      <h3 className={cn("font-medium", issueMember ? "text-gray-900" : "text-gray-400")}>Find Book</h3>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={issueBookQuery}
                        onChange={(e) => setIssueBookQuery(e.target.value)}
                        placeholder="Scan or enter Book Barcode..."
                        disabled={!issueMember}
                        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy disabled:bg-gray-50 disabled:text-gray-400"
                      />
                      <button onClick={handleFindIssueBook} disabled={!issueMember} className="px-4 py-2 text-sm font-medium text-white bg-teal rounded-lg hover:bg-teal-light transition-colors disabled:opacity-50">
                        Find Book
                      </button>
                    </div>
                    {issueBookError && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> {issueBookError}
                      </p>
                    )}
                    {issueBook && issueCopy && (
                      <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{issueBook.title}</p>
                            <p className="text-sm text-gray-500">{issueBook.authors?.[0]?.name} &bull; ISBN: {issueBook.isbn}</p>
                            <p className="text-xs text-gray-400 mt-1">Barcode: {issueCopy.barcode} &bull; Copy #{issueCopy.copy_number}</p>
                          </div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">Available</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {issueMember && issueBook && issueCopy && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-7 h-7 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center">3</span>
                        <h3 className="font-medium text-gray-900">Confirm &amp; Issue</h3>
                      </div>
                      <div className="p-4 bg-teal/5 rounded-lg border border-teal/20">
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">{issueBook.title}</span> will be issued to <span className="font-medium">{issueMember.full_name}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                          Due Date: <span className="font-medium">{fmt(addDays(todayDt, issueMember.member_type?.max_duration_days ?? 14))}</span>
                        </p>
                        <button onClick={handleIssueBook} disabled={issuing} className="mt-3 px-5 py-2 text-sm font-medium text-white bg-teal rounded-lg hover:bg-teal-light transition-colors disabled:opacity-50 flex items-center gap-2">
                          {issuing ? "Issuing..." : <><BookOpen className="w-4 h-4" /> Issue Book</>}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {activeTab === "Return Book" && (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-7 h-7 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center">1</span>
                      <h3 className="font-medium text-gray-900">Find Member</h3>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={returnMemberQuery}
                        onChange={(e) => setReturnMemberQuery(e.target.value)}
                        placeholder="Enter Member ID or Name..."
                        className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy"
                      />
                      <button onClick={handleFindReturnMember} className="px-4 py-2 text-sm font-medium text-white bg-navy rounded-lg hover:bg-navy-light transition-colors">
                        Find Member
                      </button>
                    </div>
                    {returnMemberError && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> {returnMemberError}
                      </p>
                    )}
                  </div>

                  {returnMember && (
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="font-medium text-gray-900">{returnMember.full_name}</p>
                      <p className="text-sm text-gray-500">{returnMember.member_id} &bull; {returnMember.member_type?.name}</p>
                    </div>
                  )}

                  {returnMemberLoans.length > 0 && (
                    <div>
                      <h3 className="font-medium text-gray-900 mb-3">Active Loans</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-3 px-3 font-medium text-gray-500">Book Title</th>
                              <th className="text-left py-3 px-3 font-medium text-gray-500">Copy Barcode</th>
                              <th className="text-left py-3 px-3 font-medium text-gray-500">Issue Date</th>
                              <th className="text-left py-3 px-3 font-medium text-gray-500">Due Date</th>
                              <th className="text-left py-3 px-3 font-medium text-gray-500">Days Overdue</th>
                              <th className="text-left py-3 px-3 font-medium text-gray-500">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {returnMemberLoans.map((loan) => {
                              const daysOverdue = loan.status === "overdue" ? diffDays(todayDt, toDate(loan.due_date)) : 0;
                              return (
                                <tr key={loan.id} className={cn("border-b border-gray-100 hover:bg-gray-50", selectedReturnLoan?.id === loan.id && "bg-teal/5")}>
                                  <td className="py-3 px-3 font-medium text-gray-900">{loan.book?.title}</td>
                                  <td className="py-3 px-3 text-gray-500">{loan.book_copy?.barcode ?? "-"}</td>
                                  <td className="py-3 px-3 text-gray-500">{fmt(toDate(loan.issue_date))}</td>
                                  <td className="py-3 px-3 text-gray-500">{fmt(toDate(loan.due_date))}</td>
                                  <td className="py-3 px-3">
                                    {daysOverdue > 0 ? (
                                      <span className="text-red-600 font-medium">{daysOverdue} days</span>
                                    ) : (
                                      <span className="text-gray-400">-</span>
                                    )}
                                  </td>
                                  <td className="py-3 px-3">
                                    <button onClick={() => handleReturnAction(loan)} className="px-3 py-1.5 text-xs font-medium text-white bg-teal rounded-md hover:bg-teal-light transition-colors">
                                      Select
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {returnMemberLoans.length === 0 && returnMember && (
                    <EmptyState title="No Active Loans" description="This member has no books to return." />
                  )}

                  {selectedReturnLoan && (
                    <div className="p-4 bg-teal/5 rounded-lg border border-teal/20">
                      <h3 className="font-medium text-gray-900 mb-2">Return Summary</h3>
                      <p className="text-sm text-gray-600"><span className="font-medium">Book:</span> {selectedReturnLoan.book?.title}</p>
                      <p className="text-sm text-gray-600"><span className="font-medium">Due Date:</span> {fmt(toDate(selectedReturnLoan.due_date))}</p>
                      {(() => {
                        const fine = calcFine(selectedReturnLoan.due_date);
                        return fine > 0 ? (
                          <p className="text-sm text-red-600 font-medium mt-1">Fine: ₹{fine} (₹5/day &times; {diffDays(todayDt, toDate(selectedReturnLoan.due_date))} days overdue)</p>
                        ) : (
                          <p className="text-sm text-green-600 mt-1">No fine due.</p>
                        );
                      })()}
                      <button onClick={handleReturnBook} disabled={returning} className="mt-3 px-5 py-2 text-sm font-medium text-white bg-teal rounded-lg hover:bg-teal-light transition-colors disabled:opacity-50 flex items-center gap-2">
                        {returning ? "Processing..." : <><ArrowLeftRight className="w-4 h-4" /> Return Book</>}
                      </button>
                    </div>
                  )}
                </div>
              )}
              {activeTab === "Active Loans" && (
                <div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-3 font-medium text-gray-500">Member Name</th>
                          <th className="text-left py-3 px-3 font-medium text-gray-500">Book Title</th>
                          <th className="text-left py-3 px-3 font-medium text-gray-500">Issue Date</th>
                          <th className="text-left py-3 px-3 font-medium text-gray-500 cursor-pointer" onClick={() => { setActiveSortField("due_date"); setActiveSortAsc(!activeSortAsc); }}>
                            <span className="flex items-center gap-1">Due Date <ArrowUpDown className="w-3 h-3" /></span>
                          </th>
                          <th className="text-left py-3 px-3 font-medium text-gray-500">Days Remaining</th>
                          <th className="text-left py-3 px-3 font-medium text-gray-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedActive.map((loan) => {
                          const daysRemaining = diffDays(toDate(loan.due_date), todayDt);
                          return (
                            <tr key={loan.id} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="py-3 px-3 font-medium text-gray-900">{loan.member?.full_name}</td>
                              <td className="py-3 px-3 text-gray-600">{loan.book?.title}</td>
                              <td className="py-3 px-3 text-gray-500">{fmt(toDate(loan.issue_date))}</td>
                              <td className="py-3 px-3 text-gray-500">{fmt(toDate(loan.due_date))}</td>
                              <td className="py-3 px-3">
                                <span className={cn("font-medium", daysRemaining <= 3 ? "text-amber-600" : "text-gray-600")}>{daysRemaining} days</span>
                              </td>
                              <td className="py-3 px-3">
                                <button onClick={() => handleCheckOut(loan)} className="px-3 py-1.5 text-xs font-medium text-white bg-teal rounded-md hover:bg-teal-light transition-colors">
                                  Return
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                        {paginatedActive.length === 0 && (
                          <tr>
                            <td colSpan={6}><EmptyState title="No Active Loans" description="All books have been returned." /></td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <Pagination page={activePage} totalPages={totalActivePages} setPage={setActivePage} />
                </div>
              )}

              {activeTab === "Overdue Loans" && (
                <div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-3 font-medium text-gray-500">Member Name</th>
                          <th className="text-left py-3 px-3 font-medium text-gray-500">Book Title</th>
                          <th className="text-left py-3 px-3 font-medium text-gray-500">Issue Date</th>
                          <th className="text-left py-3 px-3 font-medium text-gray-500">Due Date</th>
                          <th className="text-left py-3 px-3 font-medium text-gray-500">Days Overdue</th>
                          <th className="text-left py-3 px-3 font-medium text-gray-500">Fine Amount</th>
                          <th className="text-left py-3 px-3 font-medium text-gray-500">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedOverdue.map((loan) => {
                          const daysOverdue = diffDays(todayDt, toDate(loan.due_date));
                          const fine = daysOverdue * 5;
                          return (
                            <tr key={loan.id} className="border-b border-gray-100 hover:bg-red-50/50">
                              <td className="py-3 px-3 font-medium text-gray-900">{loan.member?.full_name}</td>
                              <td className="py-3 px-3 text-gray-600">{loan.book?.title}</td>
                              <td className="py-3 px-3 text-gray-500">{fmt(toDate(loan.issue_date))}</td>
                              <td className="py-3 px-3 text-gray-500">{fmt(toDate(loan.due_date))}</td>
                              <td className="py-3 px-3">
                                <span className="text-red-600 font-medium">{daysOverdue} days</span>
                              </td>
                              <td className="py-3 px-3 text-red-600 font-medium">₹{fine}</td>
                              <td className="py-3 px-3"><StatusBadge status="overdue" /></td>
                            </tr>
                          );
                        })}
                        {paginatedOverdue.length === 0 && (
                          <tr>
                            <td colSpan={7}><EmptyState title="No Overdue Loans" description="All books are on time." /></td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <Pagination page={overduePage} totalPages={totalOverduePages} setPage={setOverduePage} />
                </div>
              )}
              {activeTab === "History" && (
                <div>
                  <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <div className="flex-1">
                      <SearchInput value={historySearch} onChange={setHistorySearch} placeholder="Search by member or book..." />
                    </div>
                    <div className="flex gap-2 items-center">
                      <label className="text-xs text-gray-500">From:</label>
                      <input type="date" value={historyDateFrom} onChange={(e) => { setHistoryDateFrom(e.target.value); setHistoryPage(1); }} className="px-2 py-1.5 text-sm border border-gray-200 rounded-lg" />
                      <label className="text-xs text-gray-500">To:</label>
                      <input type="date" value={historyDateTo} onChange={(e) => { setHistoryDateTo(e.target.value); setHistoryPage(1); }} className="px-2 py-1.5 text-sm border border-gray-200 rounded-lg" />
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-3 font-medium text-gray-500">Member Name</th>
                          <th className="text-left py-3 px-3 font-medium text-gray-500">Book Title</th>
                          <th className="text-left py-3 px-3 font-medium text-gray-500">Issue Date</th>
                          <th className="text-left py-3 px-3 font-medium text-gray-500">Return Date</th>
                          <th className="text-left py-3 px-3 font-medium text-gray-500">Status</th>
                          <th className="text-left py-3 px-3 font-medium text-gray-500">Fine</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedHistory.map((loan) => (
                          <tr key={loan.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-3 font-medium text-gray-900">{loan.member?.full_name}</td>
                            <td className="py-3 px-3 text-gray-600">{loan.book?.title}</td>
                            <td className="py-3 px-3 text-gray-500">{fmt(toDate(loan.issue_date))}</td>
                            <td className="py-3 px-3 text-gray-500">{loan.return_date ? fmt(toDate(loan.return_date)) : "-"}</td>
                            <td className="py-3 px-3"><StatusBadge status={loan.status} /></td>
                            <td className="py-3 px-3">
                              {loan.fine_amount > 0 ? (
                                <span className={cn("font-medium", loan.fine_paid ? "text-green-600" : "text-red-600")}>
                                  ₹{loan.fine_amount} {loan.fine_paid ? "(Paid)" : "(Unpaid)"}
                                </span>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                          </tr>
                        ))}
                        {paginatedHistory.length === 0 && (
                          <tr>
                            <td colSpan={6}><EmptyState title="No History Found" description="No matching records found in history." /></td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <Pagination page={historyPage} totalPages={totalHistoryPages} setPage={setHistoryPage} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
