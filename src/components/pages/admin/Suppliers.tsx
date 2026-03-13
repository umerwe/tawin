"use client";

import { useState } from "react";
import WeeklyReportChart from "@/components/charts/WeeklyReportChart";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FilterSection from "@/components/FilterSection";
import SuppliersTable from "@/components/tables/SuppliersTable";
import StatsCard from "@/components/card/StatsCard";

const stats = [
    {
        title: { en: "Total suppliers", ar: "إجمالي الموردين" },
        value: "11,040",
        trend: "+14.4%",
        isUp: true,
        footerLabel: { en: "Last 7 days", ar: "آخر 7 أيام" }
    },
    {
        title: { en: "New suppliers", ar: "موردون جدد" },
        value: "240",
        trend: "+14.4%",
        isUp: true,
        footerLabel: { en: "Last 7 days", ar: "آخر 7 أيام" }
    },
    {
        title: { en: "Efficiency", ar: "الكفاءة" },
        value: "98.2%", // Adjusted value to fit "Efficiency" context
        trend: "+14.4%",
        isUp: true,
        footerLabel: { en: "Last 7 days", ar: "آخر 7 أيام" }
    },
];

const tableStats = [
    { label: { en: "Active suppliers", ar: "الموردون النشطون" }, value: "25k", active: true },
    { label: { en: "New suppliers", ar: "موردون جدد" }, value: "5.6k" },
    { label: { en: "Top 10 Suppliers Sales", ar: "مبيعات أفضل 10 موردين" }, value: "250k" },
    { label: { en: "Conversion rate", ar: "معدل التحويل" }, value: "5.5%" },
];

const Suppliers = () => {
    const [activeTab, setActiveTab] = useState("All Suppliers");

    return (
        <div className="space-y-6 p-1" dir="ltr">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <WeeklyReportChart
                        data={tableStats}
                        title="supplierStatistics"
                    />
                </div>

                {/* Stats Section - Right (1/3) */}
                <div className="lg:col-span-1 flex flex-col gap-4">
                    {stats.map((stat, i) => (
                        <StatsCard key={i} data={stat} />
                    ))}
                </div>
            </div>

            <Card className="border shadow-none overflow-hidden">
                <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6">
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

export default Suppliers;