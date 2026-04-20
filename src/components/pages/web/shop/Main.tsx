"use client"

import { FilterBar } from "@/components/pages/web/shop/Filterbar"
import { ProductCard } from "@/components/card/ProductCard"
import { Button } from "@/components/ui/button"
import ContactSection from "@/components/pages/web/shop/ContactSection"
import { useState } from "react"
import { getGridClasses } from "@/utils/getGridClasses"
import Hero from "./Hero"
import { useTranslations } from "next-intl"
import { useRouter, useSearchParams } from "next/navigation"
import Container from "@/components/common/Container"
import { useProducts, useProductsByCategory } from "@/hooks/useProducts"
import { Product } from "@/types/product"
import ProductSkeleton from "@/components/skeletons/ProductSkeleton"

const Shop = () => {
    const t = useTranslations("translation");
    const params = useSearchParams();
    const router = useRouter();
    const category = params.get("category");

    const { data: productsData, isLoading, error } = category
        ? useProductsByCategory(category)
        : useProducts();

    const data = productsData?.data || [];
    const [viewMode, setViewMode] = useState("grid4");

    const handleCategoryChange = (id: string) => {
        const newParams = new URLSearchParams(params.toString());
        if (id === "all") {
            newParams.delete("category");
        } else {
            newParams.set("category", id);
        }
        router.push(`/shop?${newParams.toString()}`);
    };

    return (
        <div className="space-y-10">
            <Hero activeCategory={category} isLoading={isLoading} />

            <Container className="space-y-10 mb-14">
                <FilterBar
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                    activeCategory={category || "all"}
                    onCategoryChange={handleCategoryChange}
                />

                {isLoading ? (
                    <ProductSkeleton viewMode={viewMode} />
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="bg-red-100 p-6 rounded-full mb-4">
                            <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800">{t("errorLoadingProducts")}</h2>
                        <Button
                            variant="link"
                            className="mt-2 text-aqua"
                            onClick={() => window.location.reload()}
                        >
                            {t("tryAgain")}
                        </Button>
                    </div>
                ) : data.length > 0 ? (
                    <>
                        <div className={getGridClasses(viewMode)}>
                            {data.slice(0, 8).map((product: Product) => (
                                <ProductCard
                                    key={product._id}
                                    {...product as any}
                                    isListView={viewMode === "list"}
                                />
                            ))}
                        </div>

                        {
                            data.length > 8 && (
                                <div className="flex items-center justify-center">
                                    <Button
                                        className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-10 rounded-full"
                                        size="sm"
                                    >
                                        {t("showMore")}
                                    </Button>
                                </div>
                            )
                        }
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="bg-gray-100 p-6 rounded-full mb-4">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800">{t("noProductsFound")}</h2>
                        <Button
                            variant="link"
                            className="mt-2 text-aqua"
                            onClick={() => router.push('/shop')}
                        >
                            {t("viewAllProducts")}
                        </Button>
                    </div>
                )}
            </Container>

            <ContactSection />
        </div>
    )
}

export default Shop;