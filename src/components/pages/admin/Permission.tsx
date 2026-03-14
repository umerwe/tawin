"use client";

import { useState } from "react";
import { Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import StatsCard from "@/components/card/StatsCard";
import FilterSection from "@/components/FilterSection";
import StaffTable from "@/components/tables/StaffTable";
import { useLocale } from "next-intl";

const StaffAccountsPage = () => {
    const locale = useLocale() as "en" | "ar";
    const [activeTab, setActiveTab] = useState("All Accounts");

    // Localized Statistics Object
    const staffStats = [
        {
            title: { en: "Total Staff Accounts", ar: "إجمالي حسابات الموظفين" },
            value: "1,240",
            trend: "12%",
            isUp: true
        },
        {
            title: { en: "New Accounts", ar: "الحسابات الجديدة" },
            value: "240",
            trend: "85%",
            isUp: true,
            subtitle: { en: "Last 7 days", ar: "آخر 7 أيام" }
        },
        {
            title: { en: "Pending Accounts", ar: "الحسابات المعلقة" },
            value: "240",
            trend: "2%",
            isUp: false    
        },
        {
            title: { en: "Closed Accounts", ar: "الحسابات الملغية" },
            value: "240",
            trend: "15%",
            isUp: false
        },
    ];

    // Localized Table Data
    const staffData = [
        { 
            id: 1, 
            code: "#CUST001", 
            name: { en: "Ahmed Shaker", ar: "احمد شاكر" }, 
            phone: "+1234567890", 
            role: { en: "Manager", ar: "مدير" }, 
            status: "Active" 
        },
        { 
            id: 2, 
            code: "#CUST002", 
            name: { en: "Ahmed Shaker", ar: "احمد شاكر" }, 
            phone: "+1234567890", 
            role: { en: "Uploader", ar: "موظف رفع" }, 
            status: "Closed" 
        },
    ];

    return (
        <div className="space-y-6 p-1">
            {/* Top Header Buttons */}
            <div className="flex items-center justify-end gap-3">
                <Button variant="outline" size="sm" className="w-32">
                    <MoreHorizontal className="h-4 w-4 mr-2" /> 
                    {locale === "ar" ? "المزيد" : "More"}
                </Button>
                <Button variant="primary" className="w-32" size="sm">
                    <Plus className="h-4 w-4 mr-2" /> 
                    {locale === "ar" ? "أضف موظف" : "Add Staff"}
                </Button>
            </div>

            {/* Stats Grid using your StatsCard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {staffStats.map((stat, i) => (
                    <StatsCard key={i} data={stat} />
                ))}
            </div>

            {/* Table Section */}
            <Card className="border shadow-none overflow-hidden">
                <CardHeader className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6">
                    <FilterSection
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        data={staffData}
                        type="user"
                    />
                </CardHeader>
                <CardContent>
                    <StaffTable activeTab={activeTab} />
                </CardContent>
            </Card>
        </div>
    );
};

export default StaffAccountsPage;