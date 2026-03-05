"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import OrderSummary from "./OrderSummary"
import { useTranslations } from "next-intl"
// --- REDUX IMPORTS ---
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"

const Step2 = () => {
    const t = useTranslations("translation");
    const router = useRouter()
    const searchParams = useSearchParams()

    // Get live cart data from Redux
    const cartItems = useSelector((state: RootState) => state.cart.items)

    const [paymentMethod, setPaymentMethod] = useState<"card" | "cash">("card")

    // Dynamic calculation based on Redux items
    const subtotal = cartItems.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0)
    const discount = 25.00

    const setStep = (step: string) => {
        const params = new URLSearchParams(searchParams)
        params.set("step", step)
        router.push(`?${params.toString()}`)
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-8">
                <div className="border border-gray-200 rounded-md p-6 space-y-6">
                    <h2 className="text-xl font-semibold">{t("personalInformation")}</h2>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>{t("fullName")}</Label>
                            <Input
                                placeholder={t("fullNamePlaceholder")}
                                className="border-gray-300 rounded-md h-[50px]"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>{t("phoneNumber")}</Label>
                            <Input
                                placeholder="+964 000 0000"
                                className="border-gray-300 rounded-md h-[50px]"
                            />
                        </div>
                    </div>
                </div>

                <div className="border border-gray-200 rounded-md p-6 space-y-6">
                    <h2 className="text-xl font-semibold">{t("address")}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>{t("neighborhood")}</Label>
                            <Input
                                placeholder={t("neighborhood")}
                                className="border-gray-300 rounded-md h-[50px]"
                            />
                        </div>
                        <div className="space-y-2 relative">
                            <Label>{t("governorate")}</Label>
                            <Input
                                placeholder={t("baghdad")}
                                className="border-gray-300 rounded-md h-[50px]"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>{t("nearestLandmark")}</Label>
                            <Input
                                placeholder={t("landmark")}
                                className="border-gray-300 rounded-md h-[50px]"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>{t("alley")}</Label>
                            <Input
                                placeholder={t("alley")}
                                className="border-gray-300 rounded-md h-[50px]"
                            />
                        </div>
                    </div>
                </div>

                <div className="border border-gray-200 rounded-md p-6 space-y-6">
                    <h2 className="text-xl font-semibold">{t("paymentMethod")}</h2>
                    <div className="space-y-3">
                        <div
                            onClick={() => setPaymentMethod("card")}
                            className={`flex items-center justify-between p-4 rounded-md border cursor-pointer transition-all ${paymentMethod === "card" ? "bg-aqua/10 border-aqua" : "border-gray-200"}`}
                        >
                            <span className="text-sm font-medium text-gray-400">{t("cardPayment")}</span>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "card" ? "border-aqua" : "border-gray-300"}`}>
                                {paymentMethod === "card" && <div className="w-2.5 h-2.5 rounded-md bg-aqua" />}
                            </div>
                        </div>

                        <div
                            onClick={() => setPaymentMethod("cash")}
                            className={`flex items-center justify-between p-4 rounded-md border cursor-pointer transition-all ${paymentMethod === "cash" ? "bg-aqua/10 border-aqua" : "border-gray-200"}`}
                        >
                            <span className="text-sm font-medium text-gray-400">{t("cashOnDelivery")}</span>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "cash" ? "border-aqua" : "border-gray-300"}`}>
                                {paymentMethod === "cash" && <div className="w-2.5 h-2.5 rounded-md bg-aqua" />}
                            </div>
                        </div>
                    </div>

                    {paymentMethod === "card" && (
                        <div className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label>{t("cardNumber")}</Label>
                                <Input
                                    placeholder="1234 1234 1234 1234"
                                    className="border-gray-300 rounded-md h-[50px]"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>{t("expirationDate")}</Label>
                                    <Input
                                        placeholder="MM/YY"
                                        className="border-gray-300 rounded-md h-[50px]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>{t("cvc")}</Label>
                                    <Input
                                        placeholder={t("cvcPlaceholder")}
                                        className="border-gray-300 rounded-md h-[50px]"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <Button
                    onClick={() => setStep("3")}
                    variant="primary"
                >
                    {t("confirmOrder")}
                </Button>
            </div>

            <OrderSummary
                cartItems={cartItems}
                discount={discount}
            />
        </div>
    )
}

export default Step2