"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { KpiCard } from "@/components/shared/kpi-card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from "recharts";
import {
  BookOpen,
  RotateCcw,
  Users,
  UserPlus,
  AlertTriangle,
  Library,
  Download,
  FileText,
  FileSpreadsheet,
} from "lucide-react";
import { toast } from "sonner";

const COLORS = ["#0B2341", "#D4A017", "#0F766E", "#475569", "#64748B", "#163A5E", "#E8B830", "#14A89E"];

const periodOptions = ["Today", "This Week", "This Month", "This Quarter", "This Year", "Custom Range"] as const;

const kpiData = {
  totalIssues: { value: "1,247", trend: { value: 12, isPositive: true }, description: "vs last period" },
  totalReturns: { value: "1,182", trend: { value: 8, isPositive: true }, description: "vs last period" },
  activeMembers: { value: "3,456", trend: { value: 5, isPositive: true }, description: "currently active" },
  newMembers: { value: "89", trend: { value: 23, isPositive: true }, description: "this period" },
  overdueRate: { value: "4.2%", trend: { value: 1, isPositive: false }, description: "of total issued" },
  collectionUtilization: { value: "68.5%", trend: { value: 3, isPositive: true }, description: "of total collection" },
};

const topBooks = [
  { book: "Annihilation of Caste", count: 187 },
  { book: "The Buddha and His Dhamma", count: 164 },
  { book: "India After Gandhi", count: 142 },
  { book: "Waiting for a Visa", count: 128 },
  { book: "Why I Am Not a Hindu", count: 115 },
  { book: "Dr. Ambedkar: Life and Mission", count: 98 },
  { book: "The Constitution of India", count: 87 },
  { book: "Who Were the Shudras?", count: 76 },
  { book: "The Problem of Rupee", count: 65 },
  { book: "Caste: Origins of Our Discontents", count: 54 },
];

const borrowingTrends = [
  { month: "Jul 2025", issues: 145, returns: 130 },
  { month: "Aug 2025", issues: 162, returns: 148 },
  { month: "Sep 2025", issues: 158, returns: 155 },
  { month: "Oct 2025", issues: 178, returns: 167 },
  { month: "Nov 2025", issues: 195, returns: 182 },
  { month: "Dec 2025", issues: 210, returns: 198 },
  { month: "Jan 2026", issues: 185, returns: 175 },
  { month: "Feb 2026", issues: 172, returns: 168 },
  { month: "Mar 2026", issues: 198, returns: 188 },
  { month: "Apr 2026", issues: 225, returns: 210 },
  { month: "May 2026", issues: 240, returns: 228 },
  { month: "Jun 2026", issues: 235, returns: 220 },
];

const categoryData = [
  { name: "Ambedkar Literature", value: 35 },
  { name: "Constitutional Studies", value: 25 },
  { name: "Social Justice", value: 20 },
  { name: "History", value: 12 },
  { name: "Law & Policy", value: 8 },
];

const overdueTrends = [
  { month: "Jul", overdue: 23 },
  { month: "Aug", overdue: 28 },
  { month: "Sep", overdue: 25 },
  { month: "Oct", overdue: 32 },
  { month: "Nov", overdue: 29 },
  { month: "Dec", overdue: 35 },
  { month: "Jan", overdue: 30 },
  { month: "Feb", overdue: 27 },
  { month: "Mar", overdue: 33 },
  { month: "Apr", overdue: 38 },
  { month: "May", overdue: 36 },
  { month: "Jun", overdue: 31 },
];

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("This Month");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  const handleExport = (format: string) => {
    toast.success(`Export ${format} ready`, { description: `Your ${format} file has been generated.` });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports & Analytics"
        description="Comprehensive insights into library operations"
      />

      <div className="flex flex-wrap items-center gap-2">
        {periodOptions.map((option) => (
          <button
            key={option}
            onClick={() => setSelectedPeriod(option)}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              selectedPeriod === option
                ? "bg-navy text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {option}
          </button>
        ))}
        {selectedPeriod === "Custom Range" && (
          <div className="flex items-center gap-2 ml-2">
            <input
              type="date"
              value={customFrom}
              onChange={(e) => setCustomFrom(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
            />
            <span className="text-gray-400">to</span>
            <input
              type="date"
              value={customTo}
              onChange={(e) => setCustomTo(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KpiCard title="Total Issues" value={kpiData.totalIssues.value} icon={BookOpen} description={kpiData.totalIssues.description} trend={kpiData.totalIssues.trend} />
        <KpiCard title="Total Returns" value={kpiData.totalReturns.value} icon={RotateCcw} description={kpiData.totalReturns.description} trend={kpiData.totalReturns.trend} />
        <KpiCard title="Active Members" value={kpiData.activeMembers.value} icon={Users} description={kpiData.activeMembers.description} trend={kpiData.activeMembers.trend} />
        <KpiCard title="New Members" value={kpiData.newMembers.value} icon={UserPlus} description={kpiData.newMembers.description} trend={kpiData.newMembers.trend} />
        <KpiCard title="Overdue Rate" value={kpiData.overdueRate.value} icon={AlertTriangle} description={kpiData.overdueRate.description} trend={kpiData.overdueRate.trend} />
        <KpiCard title="Collection Util." value={kpiData.collectionUtilization.value} icon={Library} description={kpiData.collectionUtilization.description} trend={kpiData.collectionUtilization.trend} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-1">Most Borrowed Books</h3>
          <p className="text-sm text-gray-500 mb-6">Top 10 books this period</p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topBooks} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <YAxis dataKey="book" type="category" tick={{ fontSize: 11, fill: "#475569" }} axisLine={false} tickLine={false} width={180} />
                <Tooltip />
                <Bar dataKey="count" fill="#0B2341" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-1">Borrowing Trends</h3>
          <p className="text-sm text-gray-500 mb-6">Issues and returns over the last 12 months</p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={borrowingTrends}>
                <defs>
                  <linearGradient id="issuesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0B2341" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#0B2341" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="returnsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4A017" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#D4A017" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="issues" stroke="#0B2341" fill="url(#issuesGrad)" strokeWidth={2} name="Issues" />
                <Area type="monotone" dataKey="returns" stroke="#D4A017" fill="url(#returnsGrad)" strokeWidth={2} name="Returns" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-1">Category Distribution</h3>
          <p className="text-sm text-gray-500 mb-6">Collection by category</p>
          <div className="h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  dataKey="value"
                  label={(props: { name?: string; percent?: number }) => `${props.name ?? ""} ${((props.percent ?? 0) * 100).toFixed(0)}%`}
                >
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-1">Overdue Trends</h3>
          <p className="text-sm text-gray-500 mb-6">Monthly overdue counts</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={overdueTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="overdue" stroke="#D4A017" strokeWidth={2} dot={{ fill: "#D4A017", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">Export:</span>
        <button
          onClick={() => handleExport("PDF")}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-navy rounded-lg hover:bg-navy-light transition-colors"
        >
          <FileText className="w-4 h-4" />
          Export PDF
        </button>
        <button
          onClick={() => handleExport("CSV")}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-navy bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <FileSpreadsheet className="w-4 h-4" />
          Export CSV
        </button>
        <button
          onClick={() => handleExport("Excel")}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-navy bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export Excel
        </button>
      </div>
    </div>
  );
}
