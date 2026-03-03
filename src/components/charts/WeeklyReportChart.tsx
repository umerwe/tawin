"use client";

import { MoreVertical } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
    { day: "Sun", value: 15000 },
    { day: "Mon", value: 27000 },
    { day: "Tue", value: 27000 },
    { day: "Wed", value: 19000 },
    { day: "Thu", value: 35000 },
    { day: "Fri", value: 22000 },
    { day: "Sat", value: 30000 },
];

const stats = [
    { label: "Users", value: "52k", active: true },
    { label: "Total Products", value: "3.5k" },
    { label: "Available Products", value: "2.5k" },
    { label: "Out of Stock", value: "0.5k" },
    { label: "Revenue", value: "250k" },
];

export default function WeeklyReportChart() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold text-black">Weekly Report</CardTitle>
                <div className="flex items-center gap-3">
                    <div className="flex bg-[#f8f9fa] p-1 rounded-lg border border-gray-100">
                        <button
                            className="px-4 py-2 text-xs bg-white shadow-sm rounded-md text-aqua">
                            This Week
                        </button>
                        <button className="px-4 py-2 text-xs text-gray-400 hover:text-gray-600 transition-colors">
                            Last Week
                        </button>
                    </div>
                    <button className="text-gray-400">
                        <MoreVertical size={20} />
                    </button>
                </div>
            </CardHeader>

            <CardContent className="p-0">
                <div className="flex justify-between px-10 py-6 border-b border-gray-50">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center relative cursor-pointer">
                            <div className="text-2xl font-semibold text-black">{stat.value}</div>
                            <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{stat.label}</div>
                            {stat.active && (
                                <div className="absolute -bottom-[14px] left-0 right-0 h-[3px] bg-aqua rounded-full" />
                            )}
                        </div>
                    ))}
                </div>

                {/* Chart Section */}
                <div className="h-[320px] w-full pt-12 pb-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorAqua" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--brand-aqua)" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="var(--brand-aqua)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f1f1f1" />
                            <XAxis
                                dataKey="day"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9ca3af', fontSize: 12 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#9ca3af', fontSize: 12}}
                                tickFormatter={(value) => `${value / 1000}k`}
                            />
                            <Tooltip
                                cursor={{ stroke: 'var(--brand-aqua)', strokeWidth: 1, strokeDasharray: '5 5' }}
                                content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="bg-[#c2e9e0] border border-aqua/20 px-4 py-2 rounded-xl text-center shadow-sm relative mb-4">
                                                <p className="text-[10px] font-semibold text-gray-600">{label}</p>
                                                <p className="text-sm font-semibold text-black">{payload[0].value / 1000}k</p>
                                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#c2e9e0] rotate-45 border-r border-b border-aqua/10" />
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="var(--brand-aqua)"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorAqua)"
                                activeDot={{ r: 6, fill: "#fff", stroke: "var(--brand-aqua)", strokeWidth: 2 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}