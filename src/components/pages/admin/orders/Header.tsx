"use client";

import { MoreVertical, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderStatCard } from "@/components/card/OrderStatsCard";

const stats = [
    { title: "Total Orders", value: "1,240", trend: "+14.4%", isUp: true, time: "Last 7 days" },
    { title: "New Orders", value: "240", trend: "+20%", isUp: true, time: "Last 7 days" },
    { title: "Completed Orders", value: "960", trend: "+85%", isUp: true, time: "Last 7 days" },
    { title: "Cancelled Orders", value: "87", trend: "-5%", isUp: false, time: "Last 7 days" },
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