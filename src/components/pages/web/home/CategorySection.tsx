"use client"

import { categories } from "@/constants/categories"
import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"

export default function ShopByCategory() {
    const t = useTranslations("translation")
    return (
        <section className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-semibold text-center mb-12 text-gray-800">
                {t("shopByCategory")}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-12 gap-x-6">
                {categories.map((category) => (
                    <Link
                        key={category.title}
                        href={`/shop`}
                        className="group flex flex-col items-center text-center"
                    >
                        {/* Circular Image Container */}
                        <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden bg-[#F3F5F7] border-2 border-transparent group-hover:border-aqua transition-all duration-300 shadow-sm">
                            <Image
                                src={category.image}
                                alt={category.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>

                        {/* Category Label */}
                        <span className="mt-4 text-[13px] md:text-sm font-semibold text-gray-600 group-hover:text-aqua transition-colors line-clamp-2 px-2">
                            {category.title}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    )
}