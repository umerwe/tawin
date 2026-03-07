"use client"

import { useLocale, useTranslations } from "next-intl"
import { foundations } from "@/constants/products"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

const Foundations = () => {
    const locale = useLocale() as "en" | "ar";
    const t = useTranslations("translation");

    return (
        <section className="py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Section Title */}
                <h2 className="md:text-3xl text-2xl font-semibold text-center mb-12 text-gray-800">
                    {t("foundationsTitle")}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
                    {foundations.map((item, index) => (
                        <Card
                            key={item.id}
                            className="flex flex-col border border-slate-100 shadow-sm rounded-3xl py-16 px-4 transition-all hover:shadow-lg"
                        >
                            <CardHeader className="flex flex-col items-center justify-center text-center p-0">
                                <div className="flex items-center justify-center">
                                    <Image
                                        src={`/image${index + 1}.png`}
                                        alt={item.title[locale]}
                                        width={58}
                                        height={58}
                                        className="object-contain"
                                    />
                                </div>

                                <CardTitle className="text-xl md:text-2xl font-semibold text-gray-800 mt-8">
                                    {item.title[locale]}
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="text-center flex-1 px-4 md:px-12">
                                <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                                    {item.description[locale]}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Foundations;