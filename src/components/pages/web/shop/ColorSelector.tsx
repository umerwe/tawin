"use client"

import { DEFAULT_COLORS } from "@/constants/colors"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Color } from "@/types/product"
import { useTranslations } from "next-intl"

export default function ColorSelector({ colors = DEFAULT_COLORS }: { colors?: Color[] }) {
  const t = useTranslations("translation");
  const [selected, setSelected] = useState(colors[colors.length - 1].name)
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{t("selectColor")}</span>
        <span className="text-sm font-medium text-foreground">{selected}</span>
      </div>
      <div className="flex items-center gap-2">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => setSelected(color.name)}
            aria-label={color.name}
            className={cn(
              "relative h-14 w-12 overflow-hidden rounded-md border-2 transition-all",
              selected === color.name
                ? "border-foreground"
                : "border-transparent hover:border-border"
            )}
          >
            <div className="h-full w-full" style={{ backgroundColor: color.value }} />
            <span className="absolute bottom-0 inset-x-0 text-center text-[8px] text-white/80 pb-0.5 bg-black/20">
              {t("black")}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}