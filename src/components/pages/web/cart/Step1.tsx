"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"\
import { Input } from "@/components/ui/input"
import { Minus, Plus, X, Ticket } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cartData } from "@/constants/cart"
import PaymentSummary from "./PaymentSummary"
import Image from "next/image"
import { useTranslations } from "next-intl"

const Step1 = () => {
    const t = useTranslations("translation");
    const router = useRouter()
    const searchParams = useSearchParams()

    const [cartItems, setCartItems] = useState(cartData)

    const updateQty = (id: number, delta: number) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
            )
        )
    }

    const removeItem = (id: number) => {
        setCartItems(prev => prev.filter(item => item.id !== id))
    }

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
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
                        {cartItems.map((item) => (
                            <TableRow key={item.id} className="border-b border-gray-50 hover:bg-transparent">
                                <TableCell className="py-8">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden shrink-0">
                                            <Image src={item.image} alt={item.name} width={80} height={80} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="text-sm font-semibold">{item.name}</h3>
                                            <p className="text-xs text-gray-400">{t("color")}: Black</p>
                                            <button onClick={() => removeItem(item.id)} className="flex items-center text-[10px] text-gray-400 mt-2 hover:text-red-500 transition-colors">
                                                {t("remove")} <X className="w-3 h-3 ml-1" />
                                            </button>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-lg font-medium text-left">${item.price.toFixed(2)}</TableCell>
                                <TableCell className="text-lg font-semibold text-left">${(item.price * item.qty).toFixed(2)}</TableCell>
                                <TableCell>
                                    <div className="flex items-center border border-gray-200 rounded-md w-24">
                                        <button onClick={() => updateQty(item.id, -1)} className="p-2 hover:bg-gray-50 transition-colors"><Minus className="w-3 h-3" /></button>
                                        <span className="flex-1 text-center text-sm font-medium">{item.qty}</span>
                                        <button onClick={() => updateQty(item.id, 1)} className="p-2 hover:bg-gray-50 transition-colors"><Plus className="w-3 h-3" /></button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
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