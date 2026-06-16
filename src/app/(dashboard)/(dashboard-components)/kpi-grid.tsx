"use client";

import { BookOpen, BookCheck, BookX, Users, CalendarCheck, DoorOpen } from "lucide-react";
import { KpiCard } from "@/components/shared/kpi-card";

const mockKpis = {
  totalBooks: 12450,
  availableBooks: 10820,
  issuedBooks: 1630,
  totalMembers: 8430,
  activeReservations: 245,
  visitorsToday: 68,
};

export function BooksKpiGrid() {
  const kpis = [
    { title: "Total Books", value: mockKpis.totalBooks.toLocaleString(), icon: BookOpen },
    { title: "Available Books", value: mockKpis.availableBooks.toLocaleString(), icon: BookCheck, trend: { value: 2.4, isPositive: true } },
    { title: "Issued Books", value: mockKpis.issuedBooks.toLocaleString(), icon: BookX },
    { title: "Total Members", value: mockKpis.totalMembers.toLocaleString(), icon: Users, trend: { value: 5.1, isPositive: true } },
    { title: "Active Reservations", value: mockKpis.activeReservations.toLocaleString(), icon: CalendarCheck },
    { title: "Visitors Today", value: mockKpis.visitorsToday.toLocaleString(), icon: DoorOpen, trend: { value: 12, isPositive: true } },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpis.map((kpi) => (
        <KpiCard key={kpi.title} {...kpi} />
      ))}
    </div>
  );
}
