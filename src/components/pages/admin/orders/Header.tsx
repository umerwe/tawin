"use client";

import { MoreVertical, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderStatCard } from "@/components/card/OrderStatsCard";

const stats = [
    { 
        title: { en: "Total Orders", ar: "إجمالي الطلبات" }, 
        value: "1,240", 
        trend: "+14.4%", 
        isUp: true, 
        time: { en: "Last 7 days", ar: "آخر 7 أيام" } 
    },
    { 
        title: { en: "New Orders", ar: "طلبات جديدة" }, 
        value: "240", 
        trend: "+20%", 
        isUp: true, 
        time: { en: "Last 7 days", ar: "آخر 7 أيام" } 
    },
    { 
        title: { en: "Completed Orders", ar: "طلبات مكتملة" }, 
        value: "960", 
        trend: "+85%", 
        isUp: true, 
        time: { en: "Last 7 days", ar: "آخر 7 أيام" } 
    },
    { 
        title: { en: "Cancelled Orders", ar: "طلبات ملغاة" }, 
        value: "87", 
        trend: "-5%", 
        isUp: false, 
        time: { en: "Last 7 days", ar: "آخر 7 أيام" } 
    },
];

const OrderStatsHeader = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-end gap-3">
                <Button
                    variant="primary"
                    className="w-32"
                    size="sm"
                >
                    <Plus className="h-4 w-4 mr-2" /> Add Order
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    className="w-32"
                >
                    <MoreVertical className="h-4 w-4 mr-2" /> More
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <OrderStatCard key={i} {...stat} />
                ))}
            </div>
        </div>
    );
};

export default OrderStatsHeader;