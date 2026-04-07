"use client"

import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import CountdownTimer from "./CountdownTimer"
import ColorSelector from "./ColorSelector"
import QuantitySelector from "./QuantitySelector"
import StarRating from "@/components/StarRating"
import { useLocale, useTranslations } from "next-intl"
// --- REDUX IMPORTS ---
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "@/store/cartSlice"
import { RootState } from "@/store/store"
import { Product } from "@/types/product"

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("translation");
  const dispatch = useDispatch();

  const {
    _id,
    title,
    description,
    price,
    originalPrice,
    measurements = "",
    colors = [],
    image,
  } = product;

  // Convert colors array to objects with name and value
  const colorObjects = colors.map((colorName) => ({
    name: colorName,
    value: colorName.toLowerCase() === "black" ? "#000000" : colorName
  }));

  // Check if item is already in cart
  const isInCart = useSelector((state: RootState) =>
    state.cart.items.some((item: any) => item.id === _id)
  );

  const handleAddToCart = () => {
    if (!isInCart) {
      dispatch(addToCart({ 
        id: _id, 
        image: image || product.images?.[0],
        title, 
        price 
      }));
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Stars + Reviews */}
      <div className="flex items-center gap-2">
        <StarRating />
        <span className="text-sm text-muted-foreground">{product.reviewCount} {t("reviews")}</span>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-semibold text-foreground">{title[locale]}</h1>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed">{description?.[locale]}</p>

      <Separator />

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-2xl font-semibold text-foreground">
          ${price.toFixed(2)}
        </span>
        {originalPrice && originalPrice > price && (
          <span className="text-base text-muted-foreground line-through">
            ${originalPrice.toFixed(2)}
          </span>
        )}
      </div>

      <Separator />

      {/* Offer Countdown */}
      <div className="flex flex-col gap-3">
        <span className="text-xs text-muted-foreground">{t("offerEndsIn")}</span>
        <CountdownTimer />
      </div>

      <Separator />

      {/* Measurements */}
      <div className="flex flex-col gap-2">
        <span className="text-xs text-muted-foreground">{t("measurements")}</span>
        <span className="text-sm text-foreground">{measurements}</span>
      </div>

      {/* Color Selector */}
      <ColorSelector colors={colorObjects} />

      {/* Quantity + Action buttons */}
      <div className="flex items-center gap-3">
        {/* Quantity */}
        <QuantitySelector />

        {/* Favorites */}
        <Button
          variant="outline"
          className="flex-1"
        >
          <Heart className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
          {t("favorites")}
        </Button>
      </div>

      {/* Add to Cart */}
      <Button
        variant={isInCart ? "secondary" : "primary"}
        className="mb-2"
        onClick={handleAddToCart}
        disabled={isInCart}
      >
        {isInCart ? t("alreadyInCart") : t("addToCart")}
      </Button>

      <Separator />

    </div>
  )
}