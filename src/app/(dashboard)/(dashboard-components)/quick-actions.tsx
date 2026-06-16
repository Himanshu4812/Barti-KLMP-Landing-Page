"use client";

import Link from "next/link";
import { BookOpen, UserPlus, ArrowLeftRight, Upload } from "lucide-react";

const actions = [
  { label: "Add Book", href: "/dashboard/books", icon: BookOpen, color: "text-navy bg-navy/5" },
  { label: "Add Member", href: "/dashboard/members", icon: UserPlus, color: "text-gold bg-gold/5" },
  { label: "Issue Book", href: "/dashboard/issues", icon: ArrowLeftRight, color: "text-teal bg-teal/5" },
  { label: "Bulk Import", href: "/dashboard/books", icon: Upload, color: "text-gray-600 bg-gray-100" },
];

export function QuickActions() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-base font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color} group-hover:scale-105 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-gray-700">{action.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
