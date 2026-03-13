"use client";

import { Button } from "@/components/ui/button";
import SearchInput from "@/components/ui/searchInput";
import { FileText, MoreHorizontal, ArrowUpDown, Filter, RefreshCcw, CirclePlus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterSectionProps {
    activeTab: string;
    setActiveTab: (val: string) => void;
    data: any[];
    type?: "order" | "user" | "supplier" | "product";
}

const FilterSection = ({ activeTab, setActiveTab, data, type = "order" }: FilterSectionProps) => {
    const getTabs = () => {
        if (type === "product") return ["All Products", "Featured Products", "Reduced", "Out of Stock"];
        return ["All Orders", "Completed", "Processing", "Cancelled"];
    };
    const tabs = getTabs();

    const actions = [
        { icon: <RefreshCcw className="h-4 w-4" />, color: "text-gray-500" },
        { icon: <Filter className="h-4 w-4" />, color: "text-gray-500" },
        { icon: <ArrowUpDown className="h-4 w-4" />, color: "text-gray-500" },
        { icon: <MoreHorizontal className="h-4 w-4" />, color: "text-gray-500" },
        { icon: <FileText className="h-4 w-4" />, color: "text-red-500" },
    ];

    // Dynamic Title Logic
    const getTitle = () => {
        if (type === "user") return "Users List";
        if (type === "supplier") return "Suppliers List";
        return "";
    };

    return (
        <>
            {/* LEFT SIDE: Order Tabs or Dynamic Title */}
            <div className="flex items-center">
                {type === "order" || type === "product" ? (
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
                                        : "text-muted-foreground hover:bg-aqua/50/30"
                                )}
                            >
                                {tab}
                                {tab === "All Orders" || tab === "All Products" && (
                                    <span className="ml-1 text-aqua font-bold">({data.length})</span>
                                )}
                            </Button>
                        ))}
                    </div>
                ) : (
                    <h1 className="text-lg font-bold text-gray-800">
                        {getTitle()}
                    </h1>
                )}
            </div>

            {/* RIGHT SIDE: Search & Actions */}
            <div className="flex items-center gap-2">
                <SearchInput
                    placeholder={`Search ${type}s...`}
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

                    {/* Show Add Button for non-order types */}
                    {type !== "order" && (
                        <Button
                            variant="primary"
                            size="xs"
                            className="w-32 gap-2"
                        >
                            Add {type === "user" ? "User" : "Supplier"}
                            <CirclePlus className="h-3 w-3" />
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
};

export default FilterSection;