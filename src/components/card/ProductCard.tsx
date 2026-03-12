"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import StarRating from "../StarRating"
import { useLocale, useTranslations } from "next-intl"
import Image from "@/components/MyImage"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "@/store/cartSlice"
import { RootState } from "@/store/store"
import { LoginDialog } from "../dialog/LoginDialog"

export function ProductCard({
    id,
    image,
    title,
    price,
    originalPrice,
    isNew = false,
    discount,
}: ProductCardProps) {
    const locale = useLocale();
    const router = useRouter();
    const t = useTranslations("translation");
    const dispatch = useDispatch();

    const [wished, setWished] = useState(false)
    const [loginOpen, setLoginOpen] = useState(false)
    const hasBadge = isNew || !!discount

    const isInCart = useSelector((state: RootState) =>
        state.cart.items.some((item: any) => item.id === id)
    );

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        const token = localStorage.getItem("token")
        if (!token) {
            setLoginOpen(true)
            return
        }
        if (!isInCart) {
            dispatch(addToCart({ id, image, title, price }));
        }
    };

    return (
        <>
            <Card className="relative overflow-hidden rounded-xl border-0 shadow-none">
                <CardContent className="p-0">
                    <div
                        onClick={() => router.push(`/shop/${id}`)}
                        className="group relative aspect-square w-full overflow-hidden cursor-pointer">
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
                            onClick={(e) => {
                                e.stopPropagation();
                                setWished((w) => !w);
                            }}
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
                    </div>

                    <div className="flex flex-col items-start gap-1 bg-background pt-4">
                        <StarRating />

                        <Link href={`/shop/${id}`} className="line-clamp-1 text-sm font-medium text-foreground cursor-pointer">
                            {locale === "en" ? title.en : title.ar}
                        </Link>

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
                        <Button
                            variant={isInCart ? "secondary" : "primary"}
                            size="sm"
                            className="w-full mt-2"
                            onClick={handleAddToCart}
                            disabled={isInCart}
                        >
                            {isInCart ? t("alreadyInCart") : t("addToCart")}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
        </>
    )
}