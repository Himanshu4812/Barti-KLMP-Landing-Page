import type { z } from "zod";

export type Role = "super_admin" | "library_manager" | "librarian" | "member";

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  role_id: string;
  role?: Role;
  phone: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Book {
  id: string;
  isbn: string;
  title: string;
  subtitle: string | null;
  publisher: string | null;
  language: string;
  category_id: string | null;
  category?: Category;
  shelf_location: string | null;
  keywords: string[];
  description: string | null;
  cover_image_url: string | null;
  publication_year: number | null;
  page_count: number | null;
  total_copies: number;
  available_copies: number;
  authors?: Author[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BookCopy {
  id: string;
  book_id: string;
  copy_number: number;
  barcode: string;
  status: "available" | "issued" | "reserved" | "maintenance" | "lost" | "damaged" | "discarded";
  condition: "new" | "good" | "fair" | "poor";
  acquired_at: string | null;
  discarded_at: string | null;
  notes: string | null;
  created_at: string;
}

export interface Author {
  id: string;
  name: string;
  biography: string | null;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  slug: string;
  icon: string | null;
  created_at: string;
}

export interface Member {
  id: string;
  profile_id: string | null;
  member_id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  member_type_id: string;
  member_type?: MemberType;
  status: "active" | "suspended" | "expired" | "inactive";
  address: string | null;
  id_type: string | null;
  id_number: string | null;
  qr_code_url: string | null;
  registered_at: string;
  expires_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface MemberType {
  id: string;
  name: string;
  max_books: number;
  max_duration_days: number;
  renewal_count: number;
  validity_months: number;
  auto_renew: boolean;
  description: string | null;
  created_at: string;
}

export interface BorrowTransaction {
  id: string;
  book_copy_id: string;
  book_copy?: BookCopy;
  book?: Book;
  member_id: string;
  member?: Member;
  issued_by: string;
  issued_by_profile?: Profile;
  returned_to: string | null;
  issue_date: string;
  due_date: string;
  return_date: string | null;
  status: "active" | "returned" | "overdue" | "lost";
  fine_amount: number;
  fine_paid: boolean;
  notes: string | null;
  created_at: string;
}

export interface Reservation {
  id: string;
  book_id: string;
  book?: Book;
  member_id: string;
  member?: Member;
  book_copy_id: string | null;
  status: "pending" | "ready" | "completed" | "cancelled" | "expired";
  reserved_at: string;
  ready_at: string | null;
  expires_at: string | null;
  completed_at: string | null;
  cancelled_at: string | null;
  position: number;
  notes: string | null;
  created_at: string;
}

export interface Visitor {
  id: string;
  name: string;
  phone: string | null;
  purpose: string;
  id_type: string | null;
  id_number: string | null;
  checked_in_at: string;
  checked_out_at: string | null;
  checked_in_by: string;
  created_at: string;
}

export interface Notification {
  id: string;
  member_id: string;
  type: string;
  title: string;
  message: string;
  entity_type: string | null;
  entity_id: string | null;
  is_read: boolean;
  is_email_sent: boolean;
  read_at: string | null;
  created_at: string;
}

export interface RepositoryDocument {
  id: string;
  title: string;
  description: string | null;
  document_type: "research_paper" | "publication" | "speech" | "historical" | "report";
  category_id: string | null;
  category?: RepositoryCategory;
  tags: string[];
  file_url: string;
  file_size_bytes: number | null;
  mime_type: string;
  download_count: number;
  uploaded_by: string;
  is_public: boolean;
  is_bookmarked?: boolean;
  created_at: string;
  updated_at: string;
}

export interface RepositoryCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  profile_id: string | null;
  profile?: Profile;
  action: string;
  entity_type: string;
  entity_id: string | null;
  metadata: Record<string, unknown> | null;
  ip_address: string | null;
  created_at: string;
}

export interface Setting {
  id: string;
  key: string;
  value: unknown;
  description: string | null;
  updated_by: string | null;
  updated_at: string;
}

export type ActionResult<T> =
  | { success: true; data: T; message?: string }
  | { success: false; error: string; code?: string };

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

export interface FilterParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  [key: string]: unknown;
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface KpiData {
  totalBooks: number;
  availableBooks: number;
  issuedBooks: number;
  totalMembers: number;
  activeReservations: number;
  visitorsToday: number;
}
