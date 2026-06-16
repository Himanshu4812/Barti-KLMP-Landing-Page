"use client";

import { X, BookOpen, Calendar, Hash, Award, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";

interface BorrowRecord {
  id: string;
  book_title: string;
  isbn: string;
  issue_date: string;
  due_date: string;
  return_date: string | null;
  status: "active" | "returned" | "overdue" | "lost";
}

interface MemberProfile {
  id: string;
  member_id: string;
  full_name: string;
  email: string;
  phone: string;
  member_type: string;
  status: string;
  address: string;
  id_type: string;
  id_number: string;
  registered_at: string;
  expires_at: string;
  notes: string;
  borrowing_history: BorrowRecord[];
}

interface MemberDetailProps {
  member: MemberProfile;
  onClose: () => void;
}

const statusColors: Record<string, string> = {
  active: "bg-green-50 text-green-700 border-green-200",
  suspended: "bg-amber-50 text-amber-700 border-amber-200",
  expired: "bg-red-50 text-red-700 border-red-200",
  inactive: "bg-gray-50 text-gray-700 border-gray-200",
};

const borrowStatusColors: Record<string, string> = {
  active: "bg-blue-50 text-blue-700",
  returned: "bg-green-50 text-green-700",
  overdue: "bg-red-50 text-red-700",
  lost: "bg-gray-50 text-gray-700",
};

export function MemberDetail({ member, onClose }: MemberDetailProps) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white shadow-xl h-full flex flex-col animate-slide-in">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Member Details</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* QR Membership Card */}
          <div className="px-6 pt-6">
            <div className="rounded-xl bg-navy p-5 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gold/10 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-gold-light font-medium uppercase tracking-wider">BARTI KLMP</p>
                    <p className="text-[10px] text-white/70">Membership Card</p>
                  </div>
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                    <QrCode className="w-7 h-7 text-navy" />
                  </div>
                </div>
                <div className="border-t border-white/20 pt-3 mt-3">
                  <p className="text-base font-semibold">{member.full_name}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-white/80">
                    <span className="flex items-center gap-1">
                      <Hash className="w-3 h-3" />
                      {member.member_id}
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {member.member_type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="px-6 py-5 space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Profile Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-text-muted">Email</p>
                <p className="text-sm text-text-primary">{member.email || "—"}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted">Phone</p>
                <p className="text-sm text-text-primary">{member.phone || "—"}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted">Status</p>
                <span
                  className={cn(
                    "inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full border mt-1",
                    statusColors[member.status]
                  )}
                >
                  {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                </span>
              </div>
              <div>
                <p className="text-xs text-text-muted">Member Type</p>
                <p className="text-sm text-text-primary">{member.member_type}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted">ID Type</p>
                <p className="text-sm text-text-primary">{member.id_type}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted">ID Number</p>
                <p className="text-sm text-text-primary">{member.id_number}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted">Registered On</p>
                <p className="text-sm text-text-primary">{member.registered_at}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted">Valid Until</p>
                <p className="text-sm text-text-primary">{member.expires_at || "—"}</p>
              </div>
            </div>
            {member.address && (
              <div>
                <p className="text-xs text-text-muted">Address</p>
                <p className="text-sm text-text-primary">{member.address}</p>
              </div>
            )}
            {member.notes && (
              <div>
                <p className="text-xs text-text-muted">Notes</p>
                <p className="text-sm text-text-primary">{member.notes}</p>
              </div>
            )}
          </div>

          {/* Borrowing History */}
          <div className="px-6 pb-6">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Borrowing History
            </h3>
            {member.borrowing_history.length === 0 ? (
              <p className="text-sm text-text-muted py-4 text-center">No borrowing history available.</p>
            ) : (
              <div className="space-y-2">
                {member.borrowing_history.map((record) => (
                  <div
                    key={record.id}
                    className="p-3 rounded-lg border border-border-light hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-text-primary truncate">{record.book_title}</p>
                        <p className="text-xs text-text-muted font-mono">{record.isbn}</p>
                      </div>
                      <span
                        className={cn(
                          "inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-full ml-2",
                          borrowStatusColors[record.status]
                        )}
                      >
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-text-muted mt-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Issued: {record.issue_date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Due: {record.due_date}
                      </span>
                      {record.return_date && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Returned: {record.return_date}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slideIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
