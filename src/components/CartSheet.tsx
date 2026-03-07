"use client"

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Minus, Plus, X } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { removeFromCart, updateQuantity } from "@/store/cartSlice"
import { useLocale, useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import Image from "@/components/MyImage"
import { Button } from "./ui/button"

interface CartSheetProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export default function CartSheet({ open, onOpenChange }: CartSheetProps) {
    const t = useTranslations("translation")
    const locale = useLocale() as "en" | "ar"
    const dispatch = useDispatch()
    const router = useRouter()

    const cartItems = useSelector((state: RootState) => state.cart.items)

    const updateQty = (id: number | string, delta: number) => {
        const item = cartItems.find((i: any) => i.id === id)
        if (item) {
            const newQty = Math.max(1, item.quantity + delta)
            dispatch(updateQuantity({ id, quantity: newQty }))
        }
    }

    const removeItem = (id: number | string) => {
        dispatch(removeFromCart(id))
    }

    const subtotal = cartItems.reduce(
        (acc: number, item: any) => acc + item.price * item.quantity,
        0
    )
    const total = subtotal

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="right"
                className="flex flex-col w-full sm:max-w-sm p-0 gap-0"
            >
                {/* Header */}
                <SheetHeader className="px-5 py-4 border-b border-gray-100">
                    <SheetTitle className="text-base font-semibold text-gray-900">
                        {t("cart") ?? "Cart"}
                    </SheetTitle>
                </SheetHeader>

                {/* Items */}
                <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
                    {cartItems.length === 0 ? (
                        <div className="flex items-center justify-center h-40 text-sm text-gray-400">
                            {t("emptyCart")}
                        </div>
                    ) : (
                        cartItems.map((item: any) => (
                            <div key={item.id} className="flex items-center gap-4 px-5 py-4">
                                {/* Image */}
                                <div className="w-[72px] h-[72px] rounded-md overflow-hidden bg-gray-100 shrink-0">
                                    <Image
                                        src={item.image}
                                        alt={locale === "en" ? item.title.en : item.title.ar}
                                        width={72}
                                        height={72}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0 space-y-0.5">
                                    <p className="text-sm font-semibold text-gray-900 truncate">
                                        {locale === "en" ? item.title.en : item.title.ar}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {t("color") ?? "Color"}: Black
                                    </p>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors mt-1"
                                    >
                                        {t("remove") ?? "Remove"} <X className="w-3 h-3" />
                                    </button>
                                </div>

                                {/* Right: price + qty */}
                                <div className="flex flex-col items-end gap-2 shrink-0">
                                    <span className="text-sm font-semibold text-gray-900">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </span>
                                    <div className="flex items-center border border-gray-200 rounded-md">
                                        <button
                                            onClick={() => updateQty(item.id, -1)}
                                            className="px-2 py-1.5 hover:bg-gray-50 transition-colors"
                                        >
                                            <Minus className="w-3 h-3" />
                                        </button>
                                        <span className="px-2 text-sm font-medium min-w-[24px] text-center">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQty(item.id, 1)}
                                            className="px-2 py-1.5 hover:bg-gray-50 transition-colors"
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer Summary */}
                <div className="border-t border-gray-100 px-5 pt-4 space-y-3">
                    {/* Subtotal */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{t("originalPrice") ?? "Original Price"}</span>
                        <span className="font-medium text-gray-900">
                            ${subtotal.toFixed(2)}
                        </span>
                    </div>

                    {/* Total */}
                    <div className="flex items-center justify-between text-sm font-semibold text-gray-900">
                        <span>{t("totalPrice") ?? "Total Price"}</span>
                        <span>${total.toFixed(2)}</span>
                    </div>

                    {/* Checkout Button */}
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                            onOpenChange(false)
                            router.push("/cart?step=2")
                        }}
                    >
                        {t("completePayment") ?? "Complete Payment"}
                    </Button>

                    {/* View Cart Link */}
                    <div className="text-center">
                        <Button
                            onClick={() => {
                                onOpenChange(false)
                                router.push("/cart")
                            }}
                            variant="outline"
                            className="text-sm text-gray-900 font-medium underline bg-transparent border-0 hover:bg-transparent underline-offset-2 hover:text-aqua transition-colors"
                        >
                            {t("viewCart") ?? "View Cart"}
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}