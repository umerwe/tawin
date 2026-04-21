"use client";

import { MoreVertical } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations, useLocale } from "next-intl";
import React from "react";

interface WeeklyReportChartProps {
  data: any[];       // Summary stats row (Total, Verified, etc.)
  chartData: any[];  // Actual graph points from API (label, customers)
  title?: string;
  filter?: React.ReactNode; // Slot for the DateRangeFilter dropdown
}

export default function WeeklyReportChart({ 
  data, 
  chartData, 
  title, 
  filter 
}: WeeklyReportChartProps) {
  const t = useTranslations("translation");
  const locale = useLocale() as "en" | "ar";

  return (
    <Card className="border shadow-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="text-lg font-bold">
          {t(title || "weeklyReport")}
        </CardTitle>
        
        <div className="flex items-center gap-3">
          {/* If a filter component is passed, render it; otherwise show default buttons */}
          {filter ? (
            filter
          ) : (
            <div className="flex bg-[#f8f9fa] p-1 rounded-lg border border-gray-100">
              <button className="px-4 py-2 text-xs bg-white shadow-sm rounded-md text-aqua font-medium">
                {t("thisWeek")}
              </button>
              <button className="px-4 py-2 text-xs text-gray-400 hover:text-gray-600 transition-colors">
                {t("lastWeek")}
              </button>
            </div>
          )}
          
          {/* <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <MoreVertical size={20} />
          </button> */}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Top Summary Stats Bar */}
        <div className="flex justify-between px-6 sm:px-10 py-6 border-b border-gray-50">
          {data?.map((stat: any, i: number) => (
            <div key={i} className="text-center relative cursor-pointer group">
              <div className="text-xl sm:text-2xl font-bold text-black">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-xs text-gray-400 mt-1 uppercase tracking-wider font-medium">
                {typeof stat.label === "object" ? stat.label[locale] : t(stat.label)}
              </div>
              {stat.active && (
                <div className="absolute -bottom-[25px] left-0 right-0 h-[3px] bg-aqua rounded-full" />
              )}
            </div>
          ))}
        </div>

        {/* Recharts Area Chart */}
        <div className="h-[320px] w-full pt-10 pb-4 pr-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart 
              data={chartData} 
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorAqua" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--brand-aqua)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--brand-aqua)" stopOpacity={0} />
                </linearGradient>
              </defs>
              
              <CartesianGrid 
                strokeDasharray="0" 
                vertical={false} 
                stroke="#f1f1f1" 
              />
              
              <XAxis
                dataKey="label" // From your JSON: "2026-04-01"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 11 }}
                dy={10}
                // Optional: Shorten date string for better mobile view
                tickFormatter={(val) => val.split('-').slice(1).join('/')}
              />
              
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 11 }}
                tickFormatter={(val) => val >= 1000 ? `${val / 1000}k` : val}
              />
              
              <Tooltip
                cursor={{ 
                  stroke: "var(--brand-aqua)", 
                  strokeWidth: 1, 
                  strokeDasharray: "5 5" 
                }}
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white border border-gray-100 p-3 rounded-xl shadow-lg text-center relative mb-2">
                        <p className="text-[10px] font-bold text-gray-400 mb-1 uppercase">
                          {label}
                        </p>
                        <p className="text-lg font-bold text-aqua">
                          {payload[0].value}
                        </p>
                        <p className="text-[10px] text-gray-500">
                          {t("customers")}
                        </p>
                        {/* Tooltip arrow */}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-r border-b border-gray-100" />
                      </div>
                    );
                  }
                  return null;
                }}
              />
              
              <Area
                type="monotone"
                dataKey="customers" // From your JSON: "customers": 5
                stroke="var(--brand-aqua)"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorAqua)"
                activeDot={{ 
                  r: 6, 
                  fill: "#fff", 
                  stroke: "var(--brand-aqua)", 
                  strokeWidth: 2 
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}