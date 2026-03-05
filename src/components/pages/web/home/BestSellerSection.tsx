"use client"

import Link from "next/link"
import { ProductCard } from "@/components/card/ProductCard"
import { products } from "@/constants/products"
import { useTranslations } from "next-intl"

const BestSellerSection = () => {
    const t = useTranslations("translation")
    return (
        <section className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-gray-900">
                    {t("bestSellers")}
                </h2>
                <Link href="/shop" className="text-sm font-semibold">
                    {t("viewAll")}
                </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {products.slice(0, 4).map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        </section>
    )
}

export default BestSellerSection