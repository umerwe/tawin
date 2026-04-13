"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import CountdownTimer from "./CountdownTimer"
import ColorSelector from "./ColorSelector"
import QuantitySelector from "./QuantitySelector"
import StarRating from "@/components/StarRating"
import { useLocale, useTranslations } from "next-intl"
import { Product } from "@/types/product"
import { useAddToCart, useCart } from "@/hooks/useCart"
import { useToggleFavorite, useFavorites } from "@/hooks/useFavorite"
import { cn } from "@/lib/utils"

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("translation");

  const {
    _id,
    title,
    description,
    price,
    originalPrice,
    measurements = "",
    colors = [],
    sizes = [],
    weights = [],
  } = product;

  // API Hooks
  const { data: cartData } = useCart();
  const { mutate: addToCartApi, isPending: isAdding } = useAddToCart();
  const { data: favData } = useFavorites();
  const { mutate: toggleFavApi, isPending: isTogglingFav } = useToggleFavorite();

  // --- FIXED: Local states to track user selection ---
  const [selectedColor, setSelectedColor] = useState(colors[0] || "");
  const [selectedSize, setSelectedSize] = useState(sizes[0] || "");
  const [quantity, setQuantity] = useState(1);

  const isInCart = cartData?.data?.items?.some((item: any) => item.productId === _id);
  const isWished = favData?.data?.some((fav: any) => fav.product?._id === _id);

  const colorObjects = colors.map((colorName) => ({
    name: colorName,
    value: colorName.toLowerCase() === "black" ? "#000000" : colorName
  }));

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCartApi({
        productId: _id,
        quantity: quantity, // Uses the current state value
        attributes: {
          color: selectedColor, // Uses the current selected color
          size: selectedSize,
          weight: weights[0] || undefined
        }
      });
    }
  };

  const handleToggleFavorite = () => {
    toggleFavApi(_id);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <StarRating rating={product.reviewCount} />
        <span className="text-sm text-muted-foreground">{product.reviewCount} {t("reviews")}</span>
      </div>

      <h1 className="text-2xl font-semibold text-foreground">{title[locale]}</h1>
      <p className="text-sm text-muted-foreground leading-relaxed">{description?.[locale]}</p>

      <Separator />

      <div className="flex items-center gap-3">
        <span className="text-2xl font-semibold text-foreground">${price.toFixed(2)}</span>
        {originalPrice && originalPrice > price && (
          <span className="text-base text-muted-foreground line-through">${originalPrice.toFixed(2)}</span>
        )}
      </div>

      <Separator />

      {/* <div className="flex flex-col gap-3">
        <span className="text-xs text-muted-foreground">{t("offerEndsIn")}</span>
        <CountdownTimer />
      </div>

      <Separator /> */}

      {
        measurements && (
          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted-foreground">{t("measurements")}</span>
            <span className="text-sm text-foreground">{measurements}</span>
          </div>
        )
      }

      {/* --- FIXED: Passing selectedColor and setter --- */}
      <ColorSelector
        colors={colorObjects}
        selectedColor={selectedColor}
        onColorChange={setSelectedColor}
      />

      <div className="flex items-center gap-3">
        {/* --- FIXED: Passing quantity and setter --- */}
        <QuantitySelector
          quantity={quantity}
          setQuantity={setQuantity}
        />

        <Button
          variant="outline"
          className="flex-1"
          onClick={handleToggleFavorite}
          disabled={isTogglingFav}
        >
          <Heart className={cn("h-4 w-4 ltr:mr-2 rtl:ml-2", isWished && "fill-red text-red")} />
          {isWished ? t("inFavorites") : t("favorites")}
        </Button>
      </div>

      <Button
        variant={isInCart ? "secondary" : "primary"}
        className="mb-2"
        onClick={handleAddToCart}
        disabled={isInCart || isAdding}
      >
        {isAdding ? t("adding") : isInCart ? t("alreadyInCart") : t("addToCart")}
      </Button>

      <Separator />
    </div>
  )
}