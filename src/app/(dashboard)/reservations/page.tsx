"use client";

import { useState, useMemo } from "react";
import {
  CalendarCheck, Search, ChevronLeft, ChevronRight, XCircle, CheckCircle,
  Clock, Ban, BookOpen
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/shared/page-header";
import { SearchInput } from "@/components/shared/search-input";
import { EmptyState } from "@/components/shared/empty-state";
import { TableSkeleton } from "@/components/shared/loading-skeleton";
import { ErrorState } from "@/components/shared/error-state";
import { Modal } from "@/components/shared/modal";
import type { Reservation, Book, Member } from "@/lib/types";

const today = new Date();
today.setHours(0, 0, 0, 0);

function fmt(d: Date): string {
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
function toDate(s: string): Date {
  const d = new Date(s);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

type ReservationStatus = "pending" | "ready" | "completed" | "cancelled" | "expired";

interface MockReservation {
  id: string;
  bookTitle: string;
  bookAuthor: string;
  memberName: string;
  memberId: string;
  status: ReservationStatus;
  reservedDate: string;
  readyDate: string | null;
  expiryDate: string | null;
  completedDate: string | null;
}

const MOCK_RESERVATIONS: MockReservation[] = [
  { id: "res-1", bookTitle: "The Great Gatsby", bookAuthor: "F. Scott Fitzgerald", memberName: "Arjun Sharma", memberId: "MEM-2024-001", status: "ready", reservedDate: "2026-06-01", readyDate: "2026-06-08", expiryDate: "2026-06-15", completedDate: null },
  { id: "res-2", bookTitle: "To Kill a Mockingbird", bookAuthor: "Harper Lee", memberName: "Priya Patel", memberId: "MEM-2024-002", status: "pending", reservedDate: "2026-06-05", readyDate: null, expiryDate: null, completedDate: null },
  { id: "res-3", bookTitle: "1984", bookAuthor: "George Orwell", memberName: "Rahul Verma", memberId: "MEM-2024-003", status: "completed", reservedDate: "2026-05-20", readyDate: "2026-05-25", expiryDate: "2026-06-01", completedDate: "2026-05-28" },
  { id: "res-4", bookTitle: "The Da Vinci Code", bookAuthor: "Dan Brown", memberName: "Sneha Reddy", memberId: "MEM-2024-004", status: "pending", reservedDate: "2026-06-07", readyDate: null, expiryDate: null, completedDate: null },
  { id: "res-5", bookTitle: "The Alchemist", bookAuthor: "Paulo Coelho", memberName: "Vikram Singh", memberId: "MEM-2024-005", status: "expired", reservedDate: "2026-05-01", readyDate: "2026-05-08", expiryDate: "2026-05-15", completedDate: null },
  { id: "res-6", bookTitle: "A Brief History of Time", bookAuthor: "Stephen Hawking", memberName: "Anita Desai", memberId: "MEM-2024-006", status: "ready", reservedDate: "2026-06-03", readyDate: "2026-06-10", expiryDate: "2026-06-17", completedDate: null },
  { id: "res-7", bookTitle: "One Hundred Years of Solitude", bookAuthor: "Gabriel Garcia Marquez", memberName: "Arjun Sharma", memberId: "MEM-2024-001", status: "cancelled", reservedDate: "2026-05-15", readyDate: null, expiryDate: null, completedDate: null },
  { id: "res-8", bookTitle: "The Catcher in the Rye", bookAuthor: "J.D. Salinger", memberName: "Priya Patel", memberId: "MEM-2024-002", status: "pending", reservedDate: "2026-06-08", readyDate: null, expiryDate: null, completedDate: null },
  { id: "res-9", bookTitle: "Pride and Prejudice", bookAuthor: "Jane Austen", memberName: "Sneha Reddy", memberId: "MEM-2024-004", status: "completed", reservedDate: "2026-05-25", readyDate: "2026-06-01", expiryDate: "2026-06-08", completedDate: "2026-06-03" },
  { id: "res-10", bookTitle: "Sapiens", bookAuthor: "Yuval Noah Harari", memberName: "Vikram Singh", memberId: "MEM-2024-005", status: "pending", reservedDate: "2026-06-10", readyDate: null, expiryDate: null, completedDate: null },
  { id: "res-11", bookTitle: "The Great Gatsby", bookAuthor: "F. Scott Fitzgerald", memberName: "Anita Desai", memberId: "MEM-2024-006", status: "pending", reservedDate: "2026-06-11", readyDate: null, expiryDate: null, completedDate: null },
  { id: "res-12", bookTitle: "1984", bookAuthor: "George Orwell", memberName: "Rahul Verma", memberId: "MEM-2024-003", status: "ready", reservedDate: "2026-06-06", readyDate: "2026-06-12", expiryDate: "2026-06-19", completedDate: null },
  { id: "res-13", bookTitle: "The Da Vinci Code", bookAuthor: "Dan Brown", memberName: "Arjun Sharma", memberId: "MEM-2024-001", status: "expired", reservedDate: "2026-04-20", readyDate: "2026-04-27", expiryDate: "2026-05-04", completedDate: null },
  { id: "res-14", bookTitle: "To Kill a Mockingbird", bookAuthor: "Harper Lee", memberName: "Sneha Reddy", memberId: "MEM-2024-004", status: "cancelled", reservedDate: "2026-05-30", readyDate: null, expiryDate: null, completedDate: null },
  { id: "res-15", bookTitle: "The Alchemist", bookAuthor: "Paulo Coelho", memberName: "Priya Patel", memberId: "MEM-2024-002", status: "completed", reservedDate: "2026-05-10", readyDate: "2026-05-17", expiryDate: "2026-05-24", completedDate: "2026-05-20" },
];

const statusFilters = ["All", "Pending", "Ready for Pickup", "Completed", "Expired", "Cancelled"] as const;

const ITEMS_PER_PAGE = 10;

function getStatusStyle(status: ReservationStatus): string {
  const map: Record<ReservationStatus, string> = {
    pending: "bg-blue-50 text-blue-700",
    ready: "bg-green-50 text-green-700",
    completed: "bg-gray-100 text-gray-600",
    expired: "bg-red-50 text-red-700",
    cancelled: "bg-amber-50 text-amber-700",
  };
  return map[status];
}

const statusLabel: Record<ReservationStatus, string> = {
  pending: "Pending",
  ready: "Ready for Pickup",
  completed: "Completed",
  expired: "Expired",
  cancelled: "Cancelled",
};

export default function ReservationsPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [page, setPage] = useState(1);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = MOCK_RESERVATIONS;
    if (statusFilter !== "All") {
      const mapped: ReservationStatus | null =
        statusFilter === "Ready for Pickup" ? "ready" :
        statusFilter === "Pending" ? "pending" :
        statusFilter === "Completed" ? "completed" :
        statusFilter === "Expired" ? "expired" :
        statusFilter === "Cancelled" ? "cancelled" : null;
      if (mapped) list = list.filter((r) => r.status === mapped);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (r) =>
          r.bookTitle.toLowerCase().includes(q) ||
          r.memberName.toLowerCase().includes(q)
      );
    }
    return list;
  }, [search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  const handleAction = (id: string, action: string, newStatus: ReservationStatus) => {
    setActionLoading(id);
    setTimeout(() => {
      const res = MOCK_RESERVATIONS.find((r) => r.id === id);
      toast.success(action, {
        description: res ? `${res.bookTitle} - ${res.memberName}` : "",
      });
      setActionLoading(null);
    }, 600);
  };

  const handleCancel = (id: string) => handleAction(id, "Reservation Cancelled", "cancelled");
  const handleComplete = (id: string) => handleAction(id, "Reservation Completed", "completed");
  const handleMarkReady = (id: string) => handleAction(id, "Marked Ready for Pickup", "ready");

  if (error) {
    return (
      <div>
        <PageHeader title="Reservations" description="Manage book reservations and pickups" />
        <ErrorState message={error} onRetry={() => setError(null)} />
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Reservations" description="Manage book reservations and pickups" />

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search by book title or member name..." />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-navy/30"
          >
            {statusFilters.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        <div className="p-6">
          {loading ? (
            <TableSkeleton rows={8} cols={7} />
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-3 font-medium text-gray-500">Book Title</th>
                      <th className="text-left py-3 px-3 font-medium text-gray-500">Member Name</th>
                      <th className="text-left py-3 px-3 font-medium text-gray-500">Reserved Date</th>
                      <th className="text-left py-3 px-3 font-medium text-gray-500">Status</th>
                      <th className="text-left py-3 px-3 font-medium text-gray-500">Ready Date</th>
                      <th className="text-left py-3 px-3 font-medium text-gray-500">Expiry Date</th>
                      <th className="text-left py-3 px-3 font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((res) => (
                      <tr key={res.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-3">
                          <div>
                            <p className="font-medium text-gray-900">{res.bookTitle}</p>
                            <p className="text-xs text-gray-400">{res.bookAuthor}</p>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <p className="text-gray-900">{res.memberName}</p>
                          <p className="text-xs text-gray-400">{res.memberId}</p>
                        </td>
                        <td className="py-3 px-3 text-gray-500">{fmt(toDate(res.reservedDate))}</td>
                        <td className="py-3 px-3">
                          <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", getStatusStyle(res.status))}>
                            {statusLabel[res.status]}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-gray-500">{res.readyDate ? fmt(toDate(res.readyDate)) : "-"}</td>
                        <td className="py-3 px-3 text-gray-500">{res.expiryDate ? fmt(toDate(res.expiryDate)) : "-"}</td>
                        <td className="py-3 px-3">
                          <div className="flex gap-1">
                            {res.status === "pending" && (
                              <>
                                <button
                                  onClick={() => handleMarkReady(res.id)}
                                  disabled={actionLoading === res.id}
                                  className="px-2.5 py-1.5 text-xs font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                                >
                                  Mark Ready
                                </button>
                                <button
                                  onClick={() => handleCancel(res.id)}
                                  disabled={actionLoading === res.id}
                                  className="px-2.5 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors disabled:opacity-50"
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                            {res.status === "ready" && (
                              <button
                                onClick={() => handleComplete(res.id)}
                                disabled={actionLoading === res.id}
                                className="px-2.5 py-1.5 text-xs font-medium text-white bg-navy rounded-md hover:bg-navy-light transition-colors disabled:opacity-50"
                              >
                                Picked Up
                              </button>
                            )}
                            {(res.status === "completed" || res.status === "expired" || res.status === "cancelled") && (
                              <span className="text-xs text-gray-400 italic">No actions</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {paginated.length === 0 && (
                      <tr>
                        <td colSpan={7}>
                          <EmptyState title="No Reservations Found" description="Try adjusting your search or filters." />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
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
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
