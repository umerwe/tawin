"use client";

import { useState } from "react";
import OrderStatsHeader from "@/components/pages/admin/orders/Header";
import OrderTable from "@/components/tables/OrderTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FilterSection from "@/components/pages/admin/orders/FilterSection";

const orders = [
    { 
        id: 1, 
        orderId: "#ORD0001", 
        product: "Wireless Bluetooth Headphones", 
        img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&auto=format&fit=crop", 
        date: "01-01-2025", 
        price: "49.99", 
        payment: "Paid", 
        status: "Completed", 
        color: "text-emerald-500", 
        dot: "bg-emerald-500" 
    },
    { 
        id: 2, 
        orderId: "#ORD0002", 
        product: "Wireless Bluetooth Headphones", 
        img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=200&auto=format&fit=crop", 
        date: "02-01-2025", 
        price: "49.99", 
        payment: "Paid", 
        status: "Processing", 
        color: "text-orange-500", 
        dot: "bg-orange-500" 
    },
    { 
        id: 3, 
        orderId: "#ORD0003", 
        product: "Wireless Bluetooth Headphones", 
        img: "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=200&auto=format&fit=crop", 
        date: "03-01-2025", 
        price: "49.99", 
        payment: "Paid", 
        status: "Completed", 
        color: "text-emerald-500", 
        dot: "bg-emerald-500" 
    },
    { 
        id: 4, 
        orderId: "#ORD0004", 
        product: "Wireless Bluetooth Headphones", 
        img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=200&auto=format&fit=crop", 
        date: "04-01-2025", 
        price: "49.99", 
        payment: "Unpaid", 
        status: "Cancelled", 
        color: "text-red-500", 
        dot: "bg-red-500" 
    },
    { 
        id: 5, 
        orderId: "#ORD0005", 
        product: "Apple Watch Series 9", 
        img: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=200&auto=format&fit=crop", 
        date: "05-01-2025", 
        price: "399.00", 
        payment: "Paid", 
        status: "Completed", 
        color: "text-emerald-500", 
        dot: "bg-emerald-500" 
    },
    { 
        id: 6, 
        orderId: "#ORD0006", 
        product: "iPhone 15 Pro Silicone Case", 
        img: "https://images.unsplash.com/photo-1603313011101-31c726a54881?q=80&w=200&auto=format&fit=crop", 
        date: "06-01-2025", 
        price: "59.00", 
        payment: "Paid", 
        status: "Processing", 
        color: "text-orange-500", 
        dot: "bg-orange-500" 
    },
    { 
        id: 7, 
        orderId: "#ORD0007", 
        product: "MacBook Air M3", 
        img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=200&auto=format&fit=crop", 
        date: "07-01-2025", 
        price: "1299.00", 
        payment: "Unpaid", 
        status: "Cancelled", 
        color: "text-red-500", 
        dot: "bg-red-500" 
    },
    { 
        id: 8, 
        orderId: "#ORD0008", 
        product: "AirPods Pro 2", 
        img: "https://images.unsplash.com/photo-1588423770674-f28552818216?q=80&w=200&auto=format&fit=crop", 
        date: "08-01-2025", 
        price: "249.00", 
        payment: "Paid", 
        status: "Completed", 
        color: "text-emerald-500", 
        dot: "bg-emerald-500" 
    },
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