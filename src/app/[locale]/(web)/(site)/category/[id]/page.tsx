"use client"

import { FilterBar } from "@/components/pages/web/shop/Filterbar"
import { ProductCard } from "@/components/card/ProductCard"
import { Button } from "@/components/ui/button"
import { products } from "@/constants/products"
import ContactSection from "@/components/pages/web/shop/ContactSection"
import { useState } from "react"
import { getGridClasses } from "@/utils/getGridClasses"
import Link from "next/link"
import { useTranslations } from "next-intl"
import Hero from "@/components/pages/web/shop/Hero"
import { useSearchParams } from "next/navigation"

const Shop = () => {
    const t = useTranslations("translation");
    const searchParams = useSearchParams();
    const [viewMode, setViewMode] = useState("grid4");
    const activeCategory = searchParams.get("category") || "all";

    return (
        <div className="space-y-8">
            <Hero activeCategory={activeCategory} />

            <FilterBar viewMode={viewMode} onViewModeChange={setViewMode} />

            <div className={getGridClasses(viewMode)}>
                {products.map((product) => (
                    <Link href={`/shop/${product.id}`}
                        key={product.id}
                    >
                        <ProductCard
                            {...product as any}
                            isListView={viewMode === "list"}
                        />
                    </Link>
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