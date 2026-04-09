"use client"

import CategoryCard from "@/components/card/CategoryCard"
import { useTranslations } from "next-intl"
import { useGetCategories } from "@/hooks/useCategories"

export default function ShopByCategory() {
    const { data } = useGetCategories();
    const categoriesData = data?.data || [];
    
    const t = useTranslations("translation")
    return (
        <section className="mt-10">
            <h2 className="text-2xl font-semibold text-center mb-12 text-gray-800">
                {t("shopByCategory")}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-12 gap-x-6">
                {categoriesData?.map((category: any) => (
                    <CategoryCard key={category._id} data={category} />
                ))}
            </div>
        </section>
    )
}