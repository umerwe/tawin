"use client";

import { MoreVertical, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

interface StatCardProps {
    title: { en: string; ar: string };
    value: string;
    trend: string;
    isUp: boolean;
    time: { en: string; ar: string };
}

export const OrderStatCard = ({ title, value, trend, isUp, time }: StatCardProps) => {
    const locale = useLocale() as "en" | "ar";

    return (
        <Card className="border shadow-none">
            <CardContent>
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-black">{title[locale]}</h3>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex flex-col">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold">{value}</span>
                        <span className={cn(
                            "text-xs font-medium flex items-center gap-1",
                            isUp ? "text-aqua" : "text-red-500"
                        )}>
                            {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            {trend}
                        </span>
                    </div>

                    <span className="text-sm text-muted-foreground whitespace-nowrap pt-3">
                        {time[locale]}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
};