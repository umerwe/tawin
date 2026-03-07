"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Minus, Plus, X, Ticket, ShoppingCart } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import PaymentSummary from "./PaymentSummary"
import { useLocale, useTranslations } from "next-intl"
import Image from "@/components/MyImage"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { removeFromCart, updateQuantity } from "@/store/cartSlice"

const Step1 = () => {
    const locale = useLocale() as "en" | "ar";
    const t = useTranslations("translation");
    const router = useRouter()
    const searchParams = useSearchParams()

    const dispatch = useDispatch()
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

    const subtotal = cartItems.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0)
    const shipping = 0
    const total = subtotal + shipping

    const setStep = (step: string) => {
        const params = new URLSearchParams(searchParams)
        params.set("step", step)
        router.push(`?${params.toString()}`)
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-b">
                            <TableHead>{t("product")}</TableHead>
                            <TableHead>{t("originalPrice")}</TableHead>
                            <TableHead>{t("totalPrice")}</TableHead>
                            <TableHead>{t("quantity")}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {cartItems.length === 0 ? (
                            <TableRow className="hover:bg-transparent">
                                <TableCell colSpan={4} className="py-20 text-center">
                                    <div className="flex flex-col items-center gap-3 text-gray-400">
                                        <p className="text-sm font-medium">{t("emptyCart")}</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            cartItems.map((item: any) => (
                                <TableRow key={item.id} className="border-b border-gray-50 hover:bg-transparent">
                                    <TableCell className="py-8">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden shrink-0">
                                                <Image src={item.image} alt={locale === "en" ? item.title.en : item.title.ar} width={80} height={80} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-semibold">{locale === "en" ? item.title.en : item.title.ar}</h3>
                                                <p className="text-xs text-gray-400">{t("color")}: Black</p>
                                                <button onClick={() => removeItem(item.id)} className="flex items-center text-xs text-gray-400 mt-2 hover:text-red-500 transition-colors">
                                                    {t("remove")} <X className="w-3 h-3 ml-1" />
                                                </button>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>${item.price.toFixed(2)}</TableCell>
                                    <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center border border-gray-200 rounded-md w-24">
                                            <button onClick={() => updateQty(item.id, -1)} className="p-2 hover:bg-gray-50 transition-colors"><Minus className="w-3 h-3" /></button>
                                            <span className="flex-1 text-center text-sm font-medium">{item.quantity}</span>
                                            <button onClick={() => updateQty(item.id, 1)} className="p-2 hover:bg-gray-50 transition-colors"><Plus className="w-3 h-3" /></button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>

                <div className="mt-16 flex flex-col items-center text-center space-y-4">
                    <h4 className="font-semibold text-gray-900">{t("gotCoupon")}</h4>
                    <p className="text-sm text-gray-400">{t("couponDescription")}</p>
                    <div className="relative w-full max-w-md">
                        <Input
                            placeholder={t("couponPlaceholder")}
                            className="border-gray-200 rounded-lg w-full ltr:pr-20 rtl:pl-20"
                        />
                        <button
                            className="absolute top-1/2 -translate-y-1/2 flex items-center text-sm font-semibold text-gray-900 hover:text-aqua transition-colors ltr:right-4 rtl:left-4"
                        >
                            {t("apply")}
                            <Ticket className="w-4 h-4 ltr:ml-2 rtl:mr-2 text-gray-300" />
                        </button>
                    </div>
                </div>
            </div>

            <PaymentSummary
                subtotal={subtotal}
                total={total}
                setStep={setStep}
            />
        </div>
    )
}

export default Step1