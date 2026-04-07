"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { useTranslations } from "next-intl"

export default function ColorSelector({ colors = [] }: { colors?: { name: string; value: string }[] }) {
  const t = useTranslations("translation");
  const [selected, setSelected] = useState(colors[0]?.name || "")

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{t("selectColor")}</span>
      </div>
      <div className="flex items-center gap-2">
        {colors.map((color, i) => (
          <button
            key={i}
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
            <span className="absolute bottom-0 inset-x-0 text-center text-[8px] leading-tight text-white font-medium bg-black/40 backdrop-blur-[1px] uppercase truncate px-0.5">
              {color.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}