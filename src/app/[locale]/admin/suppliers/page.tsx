"use client";

import { useState } from "react";
import WeeklyReportChart from "@/components/charts/WeeklyReportChart";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { OrderStatCard } from "@/components/card/OrderStatsCard";
import FilterSection from "@/components/FilterSection";
import SuppliersTable from "@/components/tables/SuppliersTable";
const stats = [
    { 
        title: { en: "Total suppliers", ar: "إجمالي الموردين" }, 
        value: "11,040", 
        trend: "+14.4%", 
        isUp: true, 
        time: { en: "Last 7 days", ar: "آخر 7 أيام" } 
    },
    { 
        title: { en: "New suppliers", ar: "موردون جدد" }, 
        value: "240", 
        trend: "+14.4%", 
        isUp: true, 
        time: { en: "Last 7 days", ar: "آخر 7 أيام" } 
    },
    { 
        title: { en: "Efficiency", ar: "الكفاءة" }, 
        value: "98.2%", // Adjusted value to fit "Efficiency" context
        trend: "+14.4%", 
        isUp: true, 
        time: { en: "Last 7 days", ar: "آخر 7 أيام" } 
    },
];

const tableStats = [
    { label: "Active suppliers", value: "25k", active: true },
    { label: "New suppliers", value: "5.6k" },
    { label: "Top 10 Suppliers Sales", value: "250k" },
    { label: "Conversion rate", value: "5.5%" },
];

const SuppliersPage = () => {
    const [activeTab, setActiveTab] = useState("All Suppliers");

    return (
        <div className="space-y-6 p-1" dir="ltr">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart Section - Left (2/3) */}
                <div className="lg:col-span-2">
                    <WeeklyReportChart
                        data={tableStats}
                        title="Supplier statistics"
                    />
                </div>

                {/* Stats Section - Right (1/3) */}
                <div className="lg:col-span-1 flex flex-col gap-4">
                    {stats.map((stat, i) => (
                        <OrderStatCard key={i} {...stat} />
                    ))}
                </div>
            </div>

            <Card className="border shadow-none overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-6">
                    <FilterSection
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        data={[]}
                        type="supplier"
                    />
                </CardHeader>
                <CardContent>
                    <SuppliersTable activeTab={activeTab} />
                </CardContent>
            </Card>
        </div>
    );
};

export default SuppliersPage;