"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jul", issued: 145, returned: 130 },
  { month: "Aug", issued: 162, returned: 148 },
  { month: "Sep", issued: 158, returned: 155 },
  { month: "Oct", issued: 178, returned: 167 },
  { month: "Nov", issued: 195, returned: 182 },
  { month: "Dec", issued: 210, returned: 198 },
  { month: "Jan", issued: 185, returned: 175 },
  { month: "Feb", issued: 172, returned: 168 },
  { month: "Mar", issued: 198, returned: 188 },
  { month: "Apr", issued: 225, returned: 210 },
  { month: "May", issued: 240, returned: 228 },
  { month: "Jun", issued: 235, returned: 220 },
];

export function BorrowingTrendsChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-base font-semibold text-gray-900 mb-1">Monthly Borrowing Trends</h3>
      <p className="text-sm text-gray-500 mb-6">Issues and returns over the last 12 months</p>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="issued" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0B2341" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#0B2341" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="returned" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D4A017" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#D4A017" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Area type="monotone" dataKey="issued" stroke="#0B2341" fill="url(#issued)" strokeWidth={2} />
            <Area type="monotone" dataKey="returned" stroke="#D4A017" fill="url(#returned)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
