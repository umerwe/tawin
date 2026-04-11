"use client";

import { useState } from "react";
import { Plus, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FilterSection from "@/components/FilterSection";
import ProductTable from "@/components/tables/ProductTable";
import MiniCard from "@/components/card/MiniCard";
import { useTranslations } from "next-intl";
import { useGetCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";

const ProductList = () => {
    const [activeTab, setActiveTab] = useState("All Products");
    const t = useTranslations("translation");

    const { data: categoriesData, isLoading: categoriesLoading } = useGetCategories();
    const { data: productsData, isLoading: productsLoading } = useProducts();

    const categories = categoriesData?.data || [];
    const products = productsData?.data || [];
    return (
        <div className="space-y-6 p-1">
            <div className="flex items-center justify-end gap-3">
                <Button variant="outline" size="sm" className="w-32">
                    <MoreVertical className="h-4 w-4 mr-2" /> {t('more')}
                </Button>
                <Button variant="primary" className="w-32" size="sm">
                    <Plus className="h-4 w-4 mr-2" /> {t('addProduct')}
                </Button>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <MiniCard
                    data={categories}
                    isLoading={categoriesLoading}
                />
            </div>

            {/* Main Table Card */}
            <Card className="border shadow-none overflow-hidden">
                <CardHeader className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6">
                    <FilterSection
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        data={products}
                        type="product"
                    />
                </CardHeader>
                <CardContent>
                    <ProductTable
                        activeTab={activeTab}
                        data={products}
                        isLoading={productsLoading}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default ProductList;