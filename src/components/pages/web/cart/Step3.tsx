"use client"

import { Button } from "@/components/ui/button"
import { orderDetails } from "@/constants/order"
import Image from "next/image"
import { useTranslations } from "next-intl"

const Step3 = () => {
    const t = useTranslations("translation");

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
            <div className="max-w-3xl w-full bg-white rounded-3xl shadow-sm p-8 md:p-16 border border-gray-100 flex flex-col items-center space-y-10">

                {/* Status Message */}
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        {t("orderProcessed")}
                    </h2>
                </div>

                {/* Product Thumbnails with Badges */}
                <div className="flex items-center justify-center space-x-6">
                    {orderDetails.items.map((item) => (
                        <div key={item.id} className="relative">
                            <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden border border-gray-50 shadow-sm">
                                <Image
                                    src={item.image}
                                    alt="ordered item"
                                    className="w-full h-full object-cover"
                                    width={80}
                                    height={96}
                                />
                            </div>
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                                {item.qty}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-full max-w-xs space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-400">{t("orderCode")}</span>
                        <span className="text-sm text-gray-900">{orderDetails.code}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-400">{t("date")}</span>
                        <span className="text-sm text-gray-900">{orderDetails.date}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-400">{t("total")}</span>
                        <span className="text-sm text-gray-900">{orderDetails.total}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-400">{t("paymentMethod")}</span>
                        <span className="text-sm text-gray-900">{orderDetails.paymentMethod}</span>
                    </div>
                </div>

                {/* Action Button */}
                <Button
                    variant="primary"
                    className="w-full max-w-[240px]"
                >
                    {t("orderHistory")}
                </Button>
            </div>
        </div>
    )
}

export default Step3