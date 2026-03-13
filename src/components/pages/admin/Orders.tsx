"use client";

import { useState } from "react";
import OrderTable from "@/components/tables/OrderTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FilterSection from "@/components/FilterSection";
import { MoreVertical, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/card/StatsCard";
import { useTranslations } from "next-intl";

const stats = [
    {
        title: { en: "Total Orders", ar: "إجمالي الطلبات" },
        value: "1,240",
        trend: "+14.4%",
        isUp: true,
        footerLabel: { en: "Last 7 days", ar: "آخر 7 أيام" }
    },
    {
        title: { en: "New Orders", ar: "طلبات جديدة" },
        value: "240",
        trend: "+20%",
        isUp: true,
        footerLabel: { en: "Last 7 days", ar: "آخر 7 أيام" }
    },
    {
        title: { en: "Completed Orders", ar: "طلبات مكتملة" },
        value: "960",
        trend: "+85%",
        isUp: true,
        footerLabel: { en: "Last 7 days", ar: "آخر 7 أيام" }
    },
    {
        title: { en: "Cancelled Orders", ar: "طلبات ملغاة" },
        value: "87",
        trend: "-5%",
        isUp: false,
        footerLabel: { en: "Last 7 days", ar: "آخر 7 أيام" }
    },
];

const orders = [
    {
        id: 1,
        orderId: "#ORD0001",
        product: { en: "Wireless Bluetooth Headphones", ar: "سماعات بلوتوث لاسلكية" },
        img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&auto=format&fit=crop",
        date: "01-01-2025",
        price: "49.99",
        payment: { en: "Paid", ar: "تم الدفع" },
        status: { en: "Completed", ar: "مكتمل" },
        color: "text-aqua",
        dot: "bg-aqua"
    },
    {
        id: 2,
        orderId: "#ORD0002",
        product: { en: "Wireless Bluetooth Headphones", ar: "سماعات بلوتوث لاسلكية" },
        img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=200&auto=format&fit=crop",
        date: "02-01-2025",
        price: "49.99",
        payment: { en: "Paid", ar: "تم الدفع" },
        status: { en: "Processing", ar: "قيد المعالجة" },
        color: "text-orange-500",
        dot: "bg-orange-500"
    },
    {
        id: 3,
        orderId: "#ORD0003",
        product: { en: "Wireless Bluetooth Headphones", ar: "سماعات بلوتوث لاسلكية" },
        img: "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=200&auto=format&fit=crop",
        date: "03-01-2025",
        price: "49.99",
        payment: { en: "Paid", ar: "تم الدفع" },
        status: { en: "Completed", ar: "مكتمل" },
        color: "text-aqua",
        dot: "bg-aqua"
    },
    {
        id: 4,
        orderId: "#ORD0004",
        product: { en: "Wireless Bluetooth Headphones", ar: "سماعات بلوتوث لاسلكية" },
        img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=200&auto=format&fit=crop",
        date: "04-01-2025",
        price: "49.99",
        payment: { en: "Unpaid", ar: "غير مدفوع" },
        status: { en: "Cancelled", ar: "ملغى" },
        color: "text-red-500",
        dot: "bg-red-500"
    }
];

const Orders = () => {
    const t = useTranslations("translation")
    const [activeTab, setActiveTab] = useState("All Orders");

    return (
        <div className="space-y-6 p-1" dir="ltr">
            <div className="flex items-center justify-end gap-3">
                <Button
                    variant="primary"
                    className="w-32"
                    size="sm"
                >
                    <Plus className="h-4 w-4 mr-2" /> {t("addOrder")}
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    className="w-32"
                >
                    <MoreVertical className="h-4 w-4 mr-2" /> {t("more")}
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <StatsCard key={i} data={stat} />
                ))}
            </div>

            <Card className="border shadow-none overflow-hidden">
                <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6">
                    <FilterSection
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        data={orders}
                    />
                </CardHeader>

                <CardContent>
                    <OrderTable
                        activeTab={activeTab}
                        data={orders}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default Orders;