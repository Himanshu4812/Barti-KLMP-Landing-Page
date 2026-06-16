"use client";

import { useState, useMemo } from "react";
import {
  DoorOpen, UserPlus, LogOut, Users, Clock, TrendingUp,
  X, ChevronLeft, ChevronRight, Search
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/shared/page-header";
import { SearchInput } from "@/components/shared/search-input";
import { EmptyState } from "@/components/shared/empty-state";
import { TableSkeleton } from "@/components/shared/loading-skeleton";
import { ErrorState } from "@/components/shared/error-state";
import { Modal } from "@/components/shared/modal";
import type { Visitor } from "@/lib/types";

const today = new Date();
today.setHours(0, 0, 0, 0);

function fmt(d: Date): string {
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
function fmtTime(s: string): string {
  const d = new Date(s);
  return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
}
function toDate(s: string): Date {
  const d = new Date(s);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
function timeStr(h: number, m: number): string {
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d.toISOString();
}

const purposes = ["Visit", "Study", "Research", "Meeting", "Event", "Other"] as const;

function generateMockVisitors(): Visitor[] {
  const entries: Visitor[] = [];
  const names = [
    "Rajesh Kumar", "Sunita Sharma", "Amit Singh", "Deepa Patel", "Vijay Reddy",
    "Kavita Joshi", "Manish Gupta", "Pooja Verma", "Ravi Deshmukh", "Neha Agarwal",
    "Suresh Iyer", "Lata Menon", "Prakash Rao", "Anjali Nair", "Gaurav Mehta",
    "Rekha Das", "Harshad Kulkarni", "Shweta Pandey", "Dinesh Yadav", "Meera Choudhury",
  ];
  const purposesArr: string[] = ["Visit", "Study", "Research", "Meeting", "Event", "Other"];
  const idTypes = ["Aadhaar", "PAN", "Driver License", "Voter ID", "Passport"];

  for (let i = 0; i < 20; i++) {
    const checkInHour = 8 + Math.floor(Math.random() * 10);
    const checkInMin = Math.floor(Math.random() * 60);
    const checkedOut = i < 14;
    const checkOutHour = checkedOut ? checkInHour + 1 + Math.floor(Math.random() * 4) : 0;
    const checkOutMin = checkedOut ? Math.floor(Math.random() * 60) : 0;

    entries.push({
      id: `vis-${i + 1}`,
      name: names[i],
      phone: `98765${String(40000 + i).slice(0, 5)}`,
      purpose: purposesArr[i % purposesArr.length],
      id_type: idTypes[i % idTypes.length],
      id_number: `ID-${String(10000 + i)}`,
      checked_in_at: timeStr(checkInHour, checkInMin),
      checked_out_at: checkedOut ? timeStr(checkOutHour, checkOutMin) : null,
      checked_in_by: "staff-1",
      created_at: "",
    });
  }
  return entries;
}

const mockVisitors = generateMockVisitors();

const last7DaysFootfall = [
  { day: "Mon", count: 42 },
  { day: "Tue", count: 38 },
  { day: "Wed", count: 55 },
  { day: "Thu", count: 61 },
  { day: "Fri", count: 47 },
  { day: "Sat", count: 33 },
  { day: "Sun", count: 28 },
];

const visitorsToday = mockVisitors;
const currentlyInside = mockVisitors.filter((v) => !v.checked_out_at).length;
const peakHour = "11:00 AM - 12:00 PM";

const ITEMS_PER_PAGE = 10;

const purposeColors: Record<string, string> = {
  Visit: "bg-blue-50 text-blue-700",
  Study: "bg-green-50 text-green-700",
  Research: "bg-purple-50 text-purple-700",
  Meeting: "bg-amber-50 text-amber-700",
  Event: "bg-pink-50 text-pink-700",
  Other: "bg-gray-50 text-gray-600",
};

export default function VisitorsPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showLogModal, setShowLogModal] = useState(false);

  // Log form state
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formPurpose, setFormPurpose] = useState("Visit");
  const [formIdType, setFormIdType] = useState("Aadhaar");
  const [formIdNumber, setFormIdNumber] = useState("");
  const [formNotes, setFormNotes] = useState("");
  const [formError, setFormError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const filtered = useMemo(() => {
    if (!search.trim()) return visitorsToday;
    const q = search.toLowerCase();
    return visitorsToday.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.purpose.toLowerCase().includes(q) ||
        (v.phone && v.phone.includes(q))
    );
  }, [search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  const handleCheckOut = (id: string) => {
    toast.success("Visitor Checked Out", {
      description: "Visitor has been successfully checked out.",
    });
  };

  const handleLogVisitor = () => {
    setFormError("");
    if (!formName.trim()) { setFormError("Name is required."); return; }
    setLoggingIn(true);
    setTimeout(() => {
      toast.success("Visitor Logged", {
        description: `${formName} has been logged in successfully.`,
      });
      setLoggingIn(false);
      setShowLogModal(false);
      setFormName("");
      setFormPhone("");
      setFormPurpose("Visit");
      setFormIdType("Aadhaar");
      setFormIdNumber("");
      setFormNotes("");
    }, 800);
  };

  if (error) {
    return (
      <div>
        <PageHeader title="Visitor Management" description="Track and manage library visitors" />
        <ErrorState message={error} onRetry={() => setError(null)} />
      </div>
    );
  }

  const maxFootfall = Math.max(...last7DaysFootfall.map((d) => d.count));

  return (
    <div>
      <PageHeader
        title="Visitor Management"
        description="Track and manage library visitors"
        actions={
          <button
            onClick={() => setShowLogModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-navy rounded-lg hover:bg-navy-light transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            Log Visitor
          </button>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">Today&apos;s Count</span>
            <div className="w-9 h-9 rounded-lg bg-navy/5 flex items-center justify-center">
              <Users className="w-4 h-4 text-navy" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{visitorsToday.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">Currently Inside</span>
            <div className="w-9 h-9 rounded-lg bg-teal/5 flex items-center justify-center">
              <Clock className="w-4 h-4 text-teal" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{currentlyInside}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">Peak Hour</span>
            <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-gold" />
            </div>
          </div>
          <p className="text-lg font-bold text-gray-900">{peakHour}</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Last 7 Days Footfall</h3>
        <div className="flex items-end justify-between gap-2 h-40">
          {last7DaysFootfall.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-xs text-gray-500 font-medium">{d.count}</span>
              <div
                className="w-full rounded-md transition-all duration-300"
                style={{
                  height: `${Math.max((d.count / maxFootfall) * 120, 8)}px`,
                  backgroundColor: d.count === maxFootfall ? "#D4A017" : "#0B2341",
                  opacity: d.count === maxFootfall ? 1 : 0.6,
                }}
              />
              <span className="text-xs text-gray-400">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search by name, purpose, or phone..." />
        </div>
        <div className="p-6">
          {loading ? (
            <TableSkeleton rows={8} cols={5} />
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-3 font-medium text-gray-500">Visitor Name</th>
                      <th className="text-left py-3 px-3 font-medium text-gray-500">Purpose</th>
                      <th className="text-left py-3 px-3 font-medium text-gray-500">Date</th>
                      <th className="text-left py-3 px-3 font-medium text-gray-500">Time In</th>
                      <th className="text-left py-3 px-3 font-medium text-gray-500">Time Out</th>
                      <th className="text-left py-3 px-3 font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((visitor) => (
                      <tr key={visitor.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-3">
                          <p className="font-medium text-gray-900">{visitor.name}</p>
                          {visitor.phone && <p className="text-xs text-gray-400">{visitor.phone}</p>}
                        </td>
                        <td className="py-3 px-3">
                          <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", purposeColors[visitor.purpose] || "bg-gray-50 text-gray-600")}>
                            {visitor.purpose}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-gray-500">{fmt(toDate(visitor.checked_in_at))}</td>
                        <td className="py-3 px-3 text-gray-500">{fmtTime(visitor.checked_in_at)}</td>
                        <td className="py-3 px-3 text-gray-500">
                          {visitor.checked_out_at ? fmtTime(visitor.checked_out_at) : "-"}
                        </td>
                        <td className="py-3 px-3">
                          {!visitor.checked_out_at ? (
                            <button
                              onClick={() => handleCheckOut(visitor.id)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-teal rounded-md hover:bg-teal-light transition-colors"
                            >
                              <LogOut className="w-3 h-3" />
                              Check Out
                            </button>
                          ) : (
                            <span className="text-xs text-gray-400">Done</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {paginated.length === 0 && (
                      <tr>
                        <td colSpan={6}>
                          <EmptyState title="No Visitors Found" description="No visitors match your search." />
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

      {/* Log Visitor Modal */}
      <Modal isOpen={showLogModal} onClose={() => setShowLogModal(false)} title="Log New Visitor" size="md">
        <div className="space-y-4">
          {formError && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <X className="w-4 h-4" /> {formError}
            </p>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input
              type="text"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy"
              placeholder="Enter visitor name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              value={formPhone}
              onChange={(e) => setFormPhone(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy"
              placeholder="Enter phone number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
            <select
              value={formPurpose}
              onChange={(e) => setFormPurpose(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy"
            >
              {purposes.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ID Type</label>
              <select
                value={formIdType}
                onChange={(e) => setFormIdType(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy"
              >
                <option value="Aadhaar">Aadhaar</option>
                <option value="PAN">PAN</option>
                <option value="Driver License">Driver License</option>
                <option value="Voter ID">Voter ID</option>
                <option value="Passport">Passport</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ID Number</label>
              <input
                type="text"
                value={formIdNumber}
                onChange={(e) => setFormIdNumber(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy"
                placeholder="ID number"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={formNotes}
              onChange={(e) => setFormNotes(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy"
              placeholder="Additional notes..."
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setShowLogModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleLogVisitor}
              disabled={loggingIn}
              className="px-4 py-2 text-sm font-medium text-white bg-navy rounded-lg hover:bg-navy-light transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loggingIn ? "Logging..." : <><UserPlus className="w-4 h-4" /> Log Visitor</>}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
