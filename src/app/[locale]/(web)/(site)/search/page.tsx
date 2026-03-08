"use client"

import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useTranslations, useLocale } from "next-intl"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { products } from "@/constants/products"
import { ProductCard } from "@/components/card/ProductCard"
import { cn } from "@/lib/utils"

const allCategories = (locale: "en" | "ar") => {
    const cats = products.map((p) => p.category[locale])
    return ["All", ...Array.from(new Set(cats))]
}

const priceRanges = [
    { label: "All Prices", min: 0, max: Infinity },
    { label: "Under $100", min: 0, max: 100 },
    { label: "$100 – $500", min: 100, max: 500 },
    { label: "$500 – $2000", min: 500, max: 2000 },
    { label: "Over $2000", min: 2000, max: Infinity },
]

export default function SearchPage() {
    const t = useTranslations("translation")
    const locale = useLocale() as "en" | "ar"
    const searchParams = useSearchParams()

    const initialQuery = searchParams.get("q") ?? ""
    const [query] = useState(initialQuery)
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedPriceIdx, setSelectedPriceIdx] = useState(0)
    const [showFilters, setShowFilters] = useState(false)

    const categories = allCategories(locale)

    const filtered = useMemo(() => {
        const range = priceRanges[selectedPriceIdx]
        return products.filter((p) => {
            const name = locale === "en" ? p.title.en : p.title.ar
            const cat = locale === "en" ? p.category.en : p.category.ar
            const matchesQuery = query.trim() === "" || name.toLowerCase().includes(query.toLowerCase())
            const matchesCat = selectedCategory === "All" || cat === selectedCategory
            const matchesPrice = p.price >= range.min && p.price < range.max
            return matchesQuery && matchesCat && matchesPrice
        })
    }, [query, selectedCategory, selectedPriceIdx, locale])

    const clearAll = () => {
        setSelectedCategory("All")
        setSelectedPriceIdx(0)
    }

    const hasActiveFilters = selectedCategory !== "All" || selectedPriceIdx !== 0

    return (
        <div className="min-h-screen bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Top bar: result count + mobile filter toggle + clear all */}
                <div className="flex items-center justify-between mb-6 gap-3">
                    <p className="text-sm text-gray-500">
                        <span className="font-semibold text-gray-900">{filtered.length}</span>{" "}
                        {t("resultsFound") ?? "results found"}
                        {query && (
                            <> {t("searchFor") ?? "for"}{" "}
                                <span className="font-medium text-gray-900">"{query}"</span>
                            </>
                        )}
                    </p>

                    <div className="flex items-center gap-2">
                        {hasActiveFilters && (
                            <button
                                onClick={clearAll}
                                className="text-xs text-red-400 hover:text-red-600 transition-colors whitespace-nowrap"
                            >
                                {t("clearAll") ?? "Clear all"}
                            </button>
                        )}
                        <button
                            onClick={() => setShowFilters((v) => !v)}
                            className={cn(
                                "flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg border transition-all md:hidden",
                                showFilters
                                    ? "bg-aqua text-white border-aqua"
                                    : "bg-white border-gray-200 text-gray-600"
                            )}
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            {t("filters") ?? "Filters"}
                        </button>
                    </div>
                </div>

                <div className="flex gap-8">

                    {/* Mobile overlay backdrop */}
                    {showFilters && (
                        <div
                            className="fixed inset-0 z-40 bg-black/30 md:hidden"
                            onClick={() => setShowFilters(false)}
                        />
                    )}

                    {/* Sidebar */}
                    <aside
                        className={cn(
                            "hidden md:block w-52 lg:w-60 shrink-0 space-y-6 self-start sticky top-24",
                            showFilters && "block! fixed top-0 ltr:left-0 rtl:right-0 h-full w-72 z-50 bg-white p-6 overflow-y-auto shadow-xl"
                        )}
                    >
                        {/* Mobile header */}
                        <div className="flex items-center justify-between md:hidden mb-2">
                            <span className="font-semibold text-gray-900">{t("filters") ?? "Filters"}</span>
                            <button onClick={() => setShowFilters(false)} className="p-1 hover:text-red-500 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Category */}
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                                {t("category") ?? "Category"}
                            </p>
                            <div className="flex flex-col gap-0.5">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => {
                                            setSelectedCategory(cat)
                                            setShowFilters(false)
                                        }}
                                        className={cn(
                                            "ltr:text-left rtl:text-right text-sm px-3 py-2 rounded-lg transition-all",
                                            selectedCategory === cat
                                                ? "bg-aqua/10 text-aqua font-medium"
                                                : "text-gray-600 hover:bg-gray-100"
                                        )}
                                    >
                                        {cat === "All" ? (t("allCategories") ?? "All") : cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price Range */}
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                                {t("priceRange") ?? "Price Range"}
                            </p>
                            <div className="flex flex-col gap-0.5">
                                {priceRanges.map((range, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setSelectedPriceIdx(idx)
                                            setShowFilters(false)
                                        }}
                                        className={cn(
                                            "ltr:text-left rtl:text-right text-sm px-3 py-2 rounded-lg transition-all",
                                            selectedPriceIdx === idx
                                                ? "bg-aqua/10 text-aqua font-medium"
                                                : "text-gray-600 hover:bg-gray-100"
                                        )}
                                    >
                                        {range.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {hasActiveFilters && (
                            <button
                                onClick={clearAll}
                                className="text-xs text-red-400 hover:text-red-600 transition-colors px-3"
                            >
                                {t("clearAll") ?? "Clear all"}
                            </button>
                        )}
                    </aside>

                    {/* Results grid */}
                    <div className="flex-1 min-w-0">
                        {filtered.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-32 text-center gap-4">
                                <Search className="w-12 h-12 text-gray-200" />
                                <p className="text-gray-500 text-sm">{t("noResults") ?? "No results found"}</p>
                                {hasActiveFilters && (
                                    <button onClick={clearAll} className="text-sm text-aqua hover:underline">
                                        {t("clearAll") ?? "Clear filters"}
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                                {filtered.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        id={product.id}
                                        image={product.image}
                                        title={product.title}
                                        price={product.price}
                                        originalPrice={product.originalPrice}
                                        isNew={product.isNew}
                                        discount={product.discount}
                                        category={product.category}
                                        rating={product.rating}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}