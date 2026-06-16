"use client";

import { ArrowLeftRight, UserPlus, BookOpen, RotateCcw } from "lucide-react";

const activities = [
  { action: "Book issued", detail: "Annihilation of Caste → Rahul S.", time: "2 min ago", icon: ArrowLeftRight, color: "text-blue-600 bg-blue-50" },
  { action: "Book returned", detail: "The Buddha and His Dhamma → Priya M.", time: "15 min ago", icon: RotateCcw, color: "text-green-600 bg-green-50" },
  { action: "New member", detail: "Anita Sharma (Student)", time: "1 hour ago", icon: UserPlus, color: "text-purple-600 bg-purple-50" },
  { action: "Book issued", detail: "India After Gandhi → Vikram K.", time: "2 hours ago", icon: ArrowLeftRight, color: "text-blue-600 bg-blue-50" },
  { action: "Book reserved", detail: "Waiting for Visa → Deepa R.", time: "3 hours ago", icon: BookOpen, color: "text-amber-600 bg-amber-50" },
  { action: "Book returned", detail: "The Argumentative Indian → Arun P.", time: "4 hours ago", icon: RotateCcw, color: "text-green-600 bg-green-50" },
];

export function RecentActivity() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-base font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.color}`}>
              <item.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{item.action}</p>
              <p className="text-xs text-gray-500 truncate">{item.detail}</p>
            </div>
            <span className="text-xs text-gray-400 shrink-0">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
