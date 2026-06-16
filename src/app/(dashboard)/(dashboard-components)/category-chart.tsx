"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "Ambedkar Literature", value: 2850, color: "#0B2341" },
  { name: "Constitutional Studies", value: 2100, color: "#D4A017" },
  { name: "Social Justice", value: 1850, color: "#0F766E" },
  { name: "Research Papers", value: 3200, color: "#475569" },
  { name: "Law", value: 1200, color: "#64748B" },
  { name: "Public Policy", value: 950, color: "#163A5E" },
  { name: "General", value: 2300, color: "#94A3B8" },
];

export function CategoryChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-base font-semibold text-gray-900 mb-1">Book Categories</h3>
      <p className="text-sm text-gray-500 mb-6">Distribution across major categories</p>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              iconType="circle"
              iconSize={8}
              formatter={(value: string) => (
                <span className="text-sm text-gray-600">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
