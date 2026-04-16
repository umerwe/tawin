"use client";

import { useState, useMemo } from "react";
import {
    Plus,
    MoreVertical,
    RefreshCcw,
    Filter,
    ArrowUpDown,
    MoreHorizontal,
    FileText,
    CirclePlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SearchInput from "@/components/ui/searchInput";
import ProductTable from "@/components/tables/ProductTable";
import MiniCard from "@/components/card/MiniCard";
import { useTranslations } from "next-intl";
import { useGetCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const ProductList = () => {
    const [activeTab, setActiveTab] = useState("All Products");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [isReversed, setIsReversed] = useState(false);

    const t = useTranslations("translation");
    const router = useRouter();

    // Debounced search value
    const debouncedSearch = useDebounce(search, 500);

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setPage(1);
    };

    // Reset page when tab changes
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setPage(1);
    };

    const { data: categoriesData, isLoading: categoriesLoading } = useGetCategories();

    const queryParams = useMemo(() => ({
        allProducts: activeTab === "All Products",
        featuredProducts: activeTab === "Featured Products",
        reduced: activeTab === "Reduced",
        outOfStock: activeTab === "Out of Stock",
        page,
        search: debouncedSearch,
    }), [activeTab, page, debouncedSearch]);

    const { data: productsData, isLoading: productsLoading, refetch, isFetching } = useProducts(queryParams);

    const categories = categoriesData?.data || [];
    const products = productsData?.data || [];
    const pagination = productsData?.meta || {};

    // Logic for Client-Side Reverse
    const displayedProducts = useMemo(() => {
        if (!products) return [];
        return isReversed ? [...products].reverse() : products;
    }, [products, isReversed]);

    const tabs = [
        { id: "All Products", label: t("allProducts") },
        { id: "Featured Products", label: t("featuredProducts") },
        { id: "Reduced", label: t("reduced") },
        { id: "Out of Stock", label: t("outOfStock") },
    ];

    const actions = [
        {
            icon: <RefreshCcw className={cn("h-4 w-4", isFetching && "animate-spin")} />,
            color: "text-gray-500",
            onClick: () => {
                // Option A: Standard refetch
                refetch();
            }
        },
        { icon: <Filter className="h-4 w-4" />, color: "text-gray-500" },
        {
            icon: <ArrowUpDown className="h-4 w-4" />,
            color: isReversed ? "text-aqua font-bold" : "text-gray-500",
            onClick: () => setIsReversed(!isReversed)
        },
        {
            icon: <MoreHorizontal className="h-4 w-4" />,
        },
        { icon: <FileText className="h-4 w-4" />, color: "text-red-500" },
    ];

    return (
        <div className="space-y-6 p-1">
            {/* Top Header */}
            <div className="flex items-center justify-end gap-3">
                <Button variant="outline" size="sm" className="w-28 sm:w-32">
                    <MoreVertical className="h-4 w-4 mr-1 sm:mr-2" /> {t('more')}
                </Button>
                <Button variant="primary" className="w-28 sm:w-32" size="sm">
                    <Plus className="h-4 w-4 mr-1 sm:mr-2" /> {t('addCategory')}
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <MiniCard data={categories} isLoading={categoriesLoading} />
            </div>

            <Card className="border shadow-none overflow-hidden">
                <CardHeader className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-2">
                    <div className={cn(
                        "w-full xl:w-auto overflow-x-auto",
                        "scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent",
                        "[&::-webkit-scrollbar]:h-1"
                    )}>
                        <div className="flex items-center gap-1 bg-emerald-50/40 p-1 rounded-lg border border-gray-100 min-w-max">
                            {tabs.map((tab) => (
                                <Button
                                    key={tab.id}
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleTabChange(tab.id)}
                                    className={cn(
                                        "h-8 px-4 text-xs font-medium transition-all shrink-0",
                                        activeTab === tab.id
                                            ? "bg-white shadow-sm text-gray-900 border border-gray-100 hover:bg-white"
                                            : "text-muted-foreground hover:bg-aqua/10"
                                    )}
                                >
                                    {tab.label}
                                    {tab.id === "All Products" && (
                                        <span className="ml-1 text-aqua font-bold">({pagination?.totalDocs || 0})</span>
                                    )}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Search & Actions Container */}
                    <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 w-full xl:w-auto">
                        <div className="flex items-center gap-2 flex-1">
                            <SearchInput
                                value={search}
                                onChange={handleSearchChange}
                                placeholder={`${t("search")}...`}
                                className="flex-1 md:w-[200px] lg:w-[240px]"
                            />
                            <div className="flex items-center gap-1 shrink-0">
                                {actions.map((action, idx) => (
                                    <Button
                                        key={idx}
                                        variant="outline"
                                        size="icon"
                                        onClick={action.onClick}
                                        className={cn("h-9 w-9 border-gray-200 bg-white shrink-0", action.color)}
                                    >
                                        {action.icon}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <Button
                            variant="primary"
                            size="sm"
                            className="w-full lg:w-40 gap-2 shrink-0 h-9"
                            onClick={() => router.push("/admin/products/add")}
                        >
                            <span className="truncate">{t("addProduct")}</span>
                            <CirclePlus className="h-3 w-3" />
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="p-0 sm:p-6">
                    <ProductTable
                        activeTab={activeTab}
                        data={displayedProducts}
                        isLoading={productsLoading || isFetching}
                        pagination={pagination}
                        page={page}
                        setPage={setPage}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default ProductList;