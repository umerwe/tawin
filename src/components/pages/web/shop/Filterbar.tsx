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
import { useTranslations } from "next-intl"

interface FilterBarProps {
    viewMode: string
    onViewModeChange: (mode: string) => void
}

export function FilterBar({ viewMode, onViewModeChange }: FilterBarProps) {
    const t = useTranslations("translation");

    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Left Side: View Modes & Sort */}
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
                            aria-label={mode}
                        >
                            {icon}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col gap-2 min-w-[120px]">
                    <Select>
                        <SelectTrigger className="border-none bg-background text-foreground shadow-none focus:ring-0">
                            <SelectValue placeholder={t("filterBy")} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{t("allCategories")}</SelectItem>
                            <SelectItem value="interior">{t("interiorDoors")}</SelectItem>
                            <SelectItem value="exterior">{t("exteriorDoors")}</SelectItem>
                            <SelectItem value="garage">{t("garageDoors")}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Right Side: Filters */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end md:gap-4">
                <div className="flex flex-col gap-2 flex-1 sm:flex-none">
                    <Label>
                        {t("categories")}
                    </Label>
                    <Select>
                        <SelectTrigger className="w-full sm:w-54">
                            <SelectValue placeholder={t("allCategories")} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">{t("allCategories")}</SelectItem>
                            <SelectItem value="interior">{t("interiorDoors")}</SelectItem>
                            <SelectItem value="exterior">{t("exteriorDoors")}</SelectItem>
                            <SelectItem value="garage">{t("garageDoors")}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Brand */}
                <div className="flex flex-col gap-2 flex-1 sm:flex-none">
                    <Label>
                        {t("brand")}
                    </Label>
                    <Select>
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