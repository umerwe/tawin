"use client";

import { useState } from "react";
import OrderStatsHeader from "@/components/pages/admin/orders/Header";
import OrderTable from "@/components/pages/admin/orders/OrderTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FilterSection from "@/components/pages/admin/orders/FilterSection";

const orders = [
    { id: 1, orderId: "#ORD0001", product: "Wireless Bluetooth Headphones", img: "/headphone.png", date: "01-01-2025", price: "49.99", payment: "Paid", status: "Completed", color: "text-emerald-500", dot: "bg-emerald-500" },
    { id: 2, orderId: "#ORD0002", product: "Wireless Bluetooth Headphones", img: "/headphone.png", date: "02-01-2025", price: "49.99", payment: "Paid", status: "Processing", color: "text-orange-500", dot: "bg-orange-500" },
    { id: 3, orderId: "#ORD0003", product: "Wireless Bluetooth Headphones", img: "/headphone.png", date: "03-01-2025", price: "49.99", payment: "Paid", status: "Completed", color: "text-emerald-500", dot: "bg-emerald-500" },
    { id: 4, orderId: "#ORD0004", product: "Wireless Bluetooth Headphones", img: "/headphone.png", date: "04-01-2025", price: "49.99", payment: "Unpaid", status: "Cancelled", color: "text-red-500", dot: "bg-red-500" },
    { id: 5, orderId: "#ORD0005", product: "Apple Watch Series 9", img: "/watch.png", date: "05-01-2025", price: "399.00", payment: "Paid", status: "Completed", color: "text-emerald-500", dot: "bg-emerald-500" },
    { id: 6, orderId: "#ORD0006", product: "iPhone 15 Pro Silicone Case", img: "/case.png", date: "06-01-2025", price: "59.00", payment: "Paid", status: "Processing", color: "text-orange-500", dot: "bg-orange-500" },
    { id: 7, orderId: "#ORD0007", product: "MacBook Air M3", img: "/mac.png", date: "07-01-2025", price: "1299.00", payment: "Unpaid", status: "Cancelled", color: "text-red-500", dot: "bg-red-500" },
    { id: 8, orderId: "#ORD0008", product: "AirPods Pro 2", img: "/airpods.png", date: "08-01-2025", price: "249.00", payment: "Paid", status: "Completed", color: "text-emerald-500", dot: "bg-emerald-500" },
];

const OrdersPage = () => {
    const [activeTab, setActiveTab] = useState("All Orders");

    return (
        <div className="space-y-6 p-1" dir="ltr">
            <OrderStatsHeader />

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

export default OrdersPage;