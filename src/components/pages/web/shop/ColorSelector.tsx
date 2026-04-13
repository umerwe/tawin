"use client"

import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

interface ColorSelectorProps {
  colors?: { name: string; value: string }[];
  selectedColor: string; // From Parent
  onColorChange: (colorName: string) => void; // Setter from Parent
}

export default function ColorSelector({ colors = [], selectedColor, onColorChange }: ColorSelectorProps) {
  const t = useTranslations("translation");

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{t("selectColor")}</span>
      </div>
      <div className="flex items-center gap-2">
        {colors.map((color, i) => (
          <button
            key={i}
            type="button" // Prevent form submission
            onClick={() => onColorChange(color.name)} // Update parent state
            aria-label={color.name}
            className={cn(
              "relative h-14 w-12 overflow-hidden rounded-md border-2 transition-all",
              selectedColor === color.name
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