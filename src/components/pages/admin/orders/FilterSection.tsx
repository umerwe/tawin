"use client";

import { Button } from "@/components/ui/button";
import SearchInput from "@/components/ui/searchInput";
import { FileText, MoreHorizontal, ArrowUpDown, Filter, RefreshCcw, CirclePlus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterSectionProps {
    activeTab: string;
    setActiveTab: (val: string) => void;
    data: any[];
    type?: string;
}

const FilterSection = ({ activeTab, setActiveTab, data, type = "order" }: FilterSectionProps) => {
    const tabs = ["All Orders", "Completed", "Processing", "Cancelled"];

    const actions = [
        { icon: <RefreshCcw className="h-4 w-4" />, color: "text-gray-500" },
        { icon: <Filter className="h-4 w-4" />, color: "text-gray-500" },
        { icon: <ArrowUpDown className="h-4 w-4" />, color: "text-gray-500" },
        { icon: <MoreHorizontal className="h-4 w-4" />, color: "text-gray-500" },
        { icon: <FileText className="h-4 w-4" />, color: "text-red-500" },
    ];

    return (
        <>
            {
                type === "order" ? (
                    <div className="flex items-center gap-1 bg-emerald-50/40 p-1 rounded-lg border border-gray-100">
                        {tabs.map((tab) => (
                            <Button
                                key={tab}
                                variant="ghost"
                                size="sm"
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "h-8 px-4 text-xs font-medium transition-all",
                                    activeTab === tab
                                        ? "bg-white shadow-sm text-gray-900 border border-gray-100 hover:bg-white"
                                        : "text-muted-foreground hover:bg-emerald-100/30"
                                )}
                            >
                                {tab}
                                {tab === "All Orders" && <span className="ml-1 text-aqua font-bold">({data.length})</span>}
                            </Button>
                        ))}
                    </div>
                )
                    :
                    <h1 className="text-lg font-bold">
                        Users List
                    </h1>
            }

            <div className="flex items-center gap-2">
                <SearchInput
                    placeholder="Search users..."
                    className="w-[240px]"
                />

                <div className="flex items-center gap-2">
                    {actions.map((action, idx) => (
                        <Button
                            key={idx}
                            variant="outline"
                            size="icon"
                            className={cn("h-9 w-9 border-gray-200 bg-white", action.color)}
                        >
                            {action.icon}
                        </Button>
                    ))}
                    {
                        type === "user" && (
                            <Button
                                variant="primary"
                                size="xs"
                                className="w-28"
                            >
                                Add User
                                <CirclePlus className="h-3 w-3" />
                            </Button>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default FilterSection;