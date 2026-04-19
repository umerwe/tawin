"use client";

import { useState, useMemo } from "react";
import { Plus, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FilterSection from "@/components/FilterSection";
import BrandsTable from "@/components/tables/BrandsTable";
import MiniCard from "@/components/card/MiniCard";
import { useTranslations } from "next-intl";
import AddBrandDialog from "@/components/dialog/AddBrandDialog";
import { useGetCategories } from "@/hooks/useCategories";
import { useBrands } from "@/hooks/useBrand";
import { SpinnerLoader } from "@/components/common/SpinnerLoader";
import { useDebounce } from "@/hooks/useDebounce";

const CATEGORY_PAGE_SIZE = 8;

const Brand = () => {
    const [activeTab, setActiveTab] = useState("All Brands");
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [categoryPage, setCategoryPage] = useState(1);
    const [brandPage, setBrandPage] = useState(1);
    const [search, setSearch] = useState("");
    const [isReversed, setIsReversed] = useState(false);

    const t = useTranslations("translation");
    const debouncedSearch = useDebounce(search, 500);

    // Fetch Brands Data
    const queryParams = useMemo(() => ({
        page: brandPage,
        search: debouncedSearch,
        status: activeTab === "All Brands" ? undefined : activeTab.toLowerCase(),
    }), [brandPage, debouncedSearch, activeTab]);

    const { data: brandsResponse, isLoading: brandsLoading, refetch, isFetching } = useBrands(queryParams);

    // Fetch Categories Data
    const { data: categoriesData, isLoading: categoriesLoading } = useGetCategories({
        limit: CATEGORY_PAGE_SIZE,
        page: categoryPage,
        isAdmin: true,
    });

    const brandsList = brandsResponse?.data?.data || [];
    const brandsMeta = brandsResponse?.data?.meta || { totalPages: 1, page: 1 };

    const categories = categoriesData?.data?.categories || [];
    const categoryTotalPages = categoriesData?.data?.pagination?.pages ?? 1;

    const displayedBrands = useMemo(() => {
        if (!brandsList) return [];
        return isReversed ? [...brandsList].reverse() : brandsList;
    }, [brandsList, isReversed]);

    return (
        <div className="space-y-6 p-1">
            {/* Header */}
            <div className="flex items-center justify-end gap-3">
                <Button variant="outline" size="sm" className="w-32">
                    <MoreVertical className="h-4 w-4 mr-2" /> {t('more')}
                </Button>
                <Button variant="primary" className="w-44" size="sm" onClick={() => setIsAddDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" /> {t('addBrand')}
                </Button>
            </div>

            {/* Category Grid with backend pagination */}
            <div>
                <div className="flex items-center justify-end mb-3">
                    <div className="flex items-center gap-1.5">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setCategoryPage(p => Math.max(1, p - 1))}
                            disabled={categoryPage === 1 || categoriesLoading}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-xs text-muted-foreground min-w-[48px] text-center">
                            {categoryPage} / {categoryTotalPages}
                        </span>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setCategoryPage(p => Math.min(categoryTotalPages, p + 1))}
                            disabled={categoryPage >= categoryTotalPages || categoriesLoading}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <MiniCard
                        data={categories}
                        isLoading={categoriesLoading}
                    />
                </div>
            </div>

            {/* Brands Table Card */}
            <Card className="border shadow-none overflow-hidden">
                <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <FilterSection
                        type="brand"
                        activeTab={activeTab}
                        setActiveTab={(tab) => {
                            setActiveTab(tab);
                            setBrandPage(1);
                        }}
                        data={brandsList}
                        search={search}
                        setSearch={(val) => {
                            setSearch(val);
                            setBrandPage(1);
                        }}
                        isReversed={isReversed}
                        setIsReversed={setIsReversed}
                        onRefetch={refetch}
                        isFetching={isFetching}
                    />
                </CardHeader>
                <CardContent>
                    <BrandsTable
                        activeTab={activeTab}
                        data={displayedBrands}
                        isLoading={brandsLoading || isFetching}
                        meta={brandsMeta}
                        setPage={setBrandPage}
                    />
                </CardContent>
            </Card>

            <AddBrandDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
        </div>
    );
};

export default Brand;