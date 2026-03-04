"use client"

import Image from "next/image"
import { useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import StarRating from "../StarRating"
import { useLocale, useTranslations } from "next-intl"

export function ProductCard({
    image,
    title,
    price,
    originalPrice,
    isNew = false,
    discount,
    isListView = false,
}: ProductCardProps) {
    const locale = useLocale();
    const t = useTranslations("translation");
    
    const [wished, setWished] = useState(false)
    const hasBadge = isNew || !!discount

    return (
        <Card className="group relative overflow-hidden rounded-xl border-0 shadow-none">
            <CardContent className="p-0">
                <div className="relative aspect-square w-full overflow-hidden" style={{ height: isListView ? "280px" : "300px" }}>
                    <Image
                        src={image}
                        alt={locale === "en" ? title.en : title.ar}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {hasBadge && (
                        <div className="absolute left-3 top-3 z-10 flex flex-col gap-1">
                            {isNew && (
                                <Badge className="w-fit rounded-md bg-background px-2 py-0.5 text-[11px] font-medium text-foreground shadow-sm hover:bg-background">
                                    {t("new")}
                                </Badge>
                            )}
                            {discount && (
                                <Badge className="w-fit rounded-md bg-aqua px-2 py-0.5 text-[11px] font-semibold text-white hover:bg-aqua">
                                    -{discount}%
                                </Badge>
                            )}
                        </div>
                    )}

                    <Button
                        size="icon"
                        variant="outline"
                        onClick={() => setWished((w) => !w)}
                        className="absolute right-3 top-3 z-10 h-8 w-8 rounded-full border-border bg-background/90 shadow-sm hover:bg-background"
                        aria-label="Toggle wishlist"
                    >
                        <Heart
                            className={cn(
                                "h-4 w-4 transition-colors",
                                wished ? "fill-red text-red" : "text-muted-foreground"
                            )}
                        />
                    </Button>

                    <div className="absolute inset-x-3 bottom-3 z-10 translate-y-3 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                        <Button variant="primary" size="sm">
                            {t("addToCart")}
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col items-start gap-1 bg-background pt-4">
                    <StarRating />
                    <span className="line-clamp-1 text-sm font-medium text-foreground">
                      {locale === "en" ? title.en : title.ar}
                    </span>
                    <div className="mt-0.5 flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">
                            ${price.toFixed(2)}
                        </span>
                        {originalPrice && (
                            <span className="text-xs text-muted-foreground line-through">
                                ${originalPrice.toFixed(2)}
                            </span>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}