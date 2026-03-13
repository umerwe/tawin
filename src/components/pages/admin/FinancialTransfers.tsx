"use client";

import { useState } from "react";
import FilterSection from "@/components/FilterSection";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FinancialTable from "@/components/tables/FinancialTable";
import { FinancialCard } from "@/components/card/FinancialCard";
import StatsCard from "@/components/card/StatsCard";

const transferStats = [
    {
        title: { en: "Transfers in Progress", ar: "تحويلات قيد التنفيذ" },
        value: "150",
        trend: "85%",
        isUp: true,
        footerLabel: { en: "Last 7 Days", ar: "آخر ٧ أيام" }
    },
    {
        title: { en: "Total Transfers", ar: "إجمالي التحويلات" },
        value: "3,150",
        trend: "20%",
        isUp: true,
        footerLabel: { en: "Last 7 Days", ar: "آخر ٧ أيام" }
    },
    {
        title: { en: "Completed Transfers", ar: "التحويلات المكتملة" },
        value: "150",
        trend: "85%",
        isUp: true,
        footerLabel: { en: "Last 7 Days", ar: "آخر ٧ أيام" }
    },
    {
        title: { en: "Cancelled Transfers", ar: "التحويلات الملغاة" },
        value: "75",
        trend: "15%",
        isUp: false,
        footerLabel: { en: "Last 7 Days", ar: "آخر ٧ أيام" }
    },
];

const financialData = [
    {
        id: 1,
        userCode: "#CUST001",
        name: "John Doe",
        date: "01-01-2025",
        total: "$2,904",
        method: { en: "Debit Card", ar: "بطاقة مدى" },
        status: { en: "Completed", ar: "مكتمل" }
    },
    {
        id: 2,
        userCode: "#CUST001",
        name: "John Doe",
        date: "01-01-2025",
        total: "$2,904",
        method: { en: "Visa Card", ar: "بطاقة فيزا" },
        status: { en: "Cancelled", ar: "ملغى" }
    },
    {
        id: 3,
        userCode: "#CUST001",
        name: "John Doe",
        date: "01-01-2025",
        total: "$2,904",
        method: { en: "Visa Card", ar: "بطاقة فيزا" },
        status: { en: "In Progress", ar: "قيد التنفيذ" }
    },
];

const FinancialTransfers = () => {
    const [activeTab, setActiveTab] = useState("All Orders");

    return (
        <div className="space-y-6 p-1">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {transferStats.map((stat, i) => (
                        <StatsCard key={i} data={stat} />
                    ))}
                </div>

                <div className="lg:col-span-2">
                    <FinancialCard />
                </div>
            </div>

            <Card className="border shadow-none overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-6">
                    <FilterSection
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        data={financialData}
                        type="order"
                    />
                </CardHeader>
                <CardContent>
                    <FinancialTable data={financialData} activeTab={activeTab} />
                </CardContent>
            </Card>
        </div>
    );
};

export default FinancialTransfers;