"use client";

import { Button } from "@/components/ui/button";
import SearchInput from "@/components/ui/searchInput";
import { FileText, MoreHorizontal, ArrowUpDown, Filter, RefreshCcw, CirclePlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface FilterSectionProps {
    activeTab: string;
    setActiveTab: (val: string) => void;
    data: any[];
    type?: "order" | "user" | "supplier" | "product";
}

const FilterSection = ({ activeTab, setActiveTab, data, type = "order" }: FilterSectionProps) => {
    const t = useTranslations("translation");

    const getTabs = () => {
        if (type === "product") return [
            { id: "All Products", label: t("allProducts") },
            { id: "Featured Products", label: t("featuredProducts") },
            { id: "Reduced", label: t("reduced") },
            { id: "Out of Stock", label: t("outOfStock") }
        ];
        return [
            { id: "All Orders", label: t("allOrders") },
            { id: "Completed", label: t("completed") },
            { id: "Processing", label: t("processing") },
            { id: "Cancelled", label: t("cancelled") }
        ];
    };

    const tabs = getTabs();

    const actions = [
        { icon: <RefreshCcw className="h-4 w-4" />, color: "text-gray-500" },
        { icon: <Filter className="h-4 w-4" />, color: "text-gray-500" },
        { icon: <ArrowUpDown className="h-4 w-4" />, color: "text-gray-500" },
        { icon: <MoreHorizontal className="h-4 w-4" />, color: "text-gray-500" },
        { icon: <FileText className="h-4 w-4" />, color: "text-red-500" },
    ];

    const getTitle = () => {
        if (type === "user") return t("usersList");
        if (type === "supplier") return t("suppliersList");
        return "";
    };

    return (
        <>
            <div className="flex items-center">
                {type === "order" || type === "product" ? (
                    <div className="flex items-center gap-1 bg-emerald-50/40 p-1 rounded-lg border border-gray-100">
                        {tabs.map((tab) => (
                            <Button
                                key={tab.id}
                                variant="ghost"
                                size="sm"
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "h-8 px-4 text-xs font-medium transition-all",
                                    activeTab === tab.id
                                        ? "bg-white shadow-sm text-gray-900 border border-gray-100 hover:bg-white"
                                        : "text-muted-foreground hover:bg-aqua/50/30"
                                )}
                            >
                                {tab.label}
                                {(tab.id === "All Orders" || tab.id === "All Products") && (
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

            <div className="flex items-center gap-2">
                <SearchInput
                    placeholder={`${t("search")} ${t(type)}s...`}
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
                </div>

                <div className="flex">

                    {type !== "order" && (
                        <Button
                            variant="primary"
                            size="sm"
                            className="w-40 gap-2"
                        >
                            {type === "user" ? t("addUser") : t("addSupplier")}
                            <CirclePlus className="h-3 w-3" />
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
};

export default FilterSection;