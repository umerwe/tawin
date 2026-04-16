"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { viewModes } from "@/constants/viewModes"
import { useTranslations, useLocale } from "next-intl"
import { useGetCategories } from "@/hooks/useCategories"

interface FilterBarProps {
    viewMode: string
    onViewModeChange: (mode: string) => void
    activeCategory: string;
    onCategoryChange: (id: string) => void; 
}

export function FilterBar({ 
    viewMode, 
    onViewModeChange, 
    activeCategory, 
    onCategoryChange 
}: FilterBarProps) {
    const t = useTranslations("translation");
    const locale = useLocale() as "en" | "ar";
    
    const { data: categoriesData } = useGetCategories();
    const categories = categoriesData?.data || [];

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center justify-between gap-1 md:justify-start">
                <div className="flex items-center gap-1">
                    {viewModes.map(({ mode, icon }) => (
                        <button
                            key={mode}
                            onClick={() => onViewModeChange(mode)}
                            className={`flex h-8 w-8 items-center justify-center rounded transition-colors
                                ${viewMode === mode
                                    ? "text-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {icon}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end md:gap-4">
                <div className="flex flex-col gap-2 flex-1 sm:flex-none">
                    <Label>{t("categories")}</Label>
                    <Select 
                        value={activeCategory} // Matches the ID from URL
                        onValueChange={onCategoryChange}
                    >
                        <SelectTrigger className="w-full sm:w-54">
                            <SelectValue placeholder={t("allCategories")} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{t("allCategories")}</SelectItem>
                            {categories.map((cat: any) => (
                                <SelectItem key={cat._id} value={cat._id}>
                                    {cat.name[locale]}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-2 flex-1 sm:flex-none">
                    <Label>{t("brand")}</Label>
                    <Select defaultValue="all">
                        <SelectTrigger className="w-full sm:w-54">
                            <SelectValue placeholder={t("all")} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{t("all")}</SelectItem>
                            <SelectItem value="brand1">{t("brandA")}</SelectItem>
                            <SelectItem value="brand2">{t("brandB")}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}