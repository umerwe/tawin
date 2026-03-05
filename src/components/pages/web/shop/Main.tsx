"use client"

import { FilterBar } from "@/components/pages/web/shop/Filterbar"
import { ProductCard } from "@/components/card/ProductCard"
import { Button } from "@/components/ui/button"
import { products } from "@/constants/products"
import ContactSection from "@/components/pages/web/shop/ContactSection"
import { useState } from "react"
import { getGridClasses } from "@/utils/getGridClasses"
import Hero from "./Hero"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"

const Shop = () => {
    const t = useTranslations("translation");
    const params = useSearchParams();
    const category = params.get("category");
    let data = category ? products.filter((x) => x.category.en.toLowerCase() === category) : products;

    const [viewMode, setViewMode] = useState("grid4");

    return (
        <div className="space-y-8 pb-16">
            <Hero activeCategory={category} />

            <FilterBar viewMode={viewMode} onViewModeChange={setViewMode} />

            <div className={getGridClasses(viewMode)}>
                {data.map((product) => (
                    <ProductCard
                        {...product as any}
                        isListView={viewMode === "list"}
                    />
                ))}
            </div>

            <div className="flex items-center justify-center">
                <Button
                    className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-10 rounded-full"
                    size="sm"
                >
                    {t("showMore")}
                </Button>
            </div>

            <ContactSection />
        </div>
    )
}

export default Shop