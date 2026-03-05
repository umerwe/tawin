"use client"

import { useLocale } from "next-intl"
import { foundations } from "@/constants/products"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Gavel, Award, Settings, MapPin } from "lucide-react"

const IconMap = {
    Gavel: Gavel,
    Award: Award,
    Settings: Settings,
    MapPin: MapPin,
};

const Foundations = () => {
    const locale = useLocale() as "en" | "ar";

    return (
        <section className="py-24">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Section Title */}
                <h2 className="text-3xl font-semibold text-center mb-12 text-gray-800">
                    {locale === 'ar' ? "أسس عملنا" : "Our Business Foundations"}
                </h2>

                {/* Grid set to 2 columns for the "2 items in one row" flow */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
                    {foundations.map((item) => {
                        const IconComponent = IconMap[item.icon as keyof typeof IconMap];

                        return (
                            <Card
                                key={item.id}
                                className="flex flex-col border border-slate-100 shadow-sm rounded-3xl py-16 px-6 transition-all hover:shadow-lg"
                            >

                                <CardHeader className="flex flex-col items-center justify-center text-center p-0">
                                    <div className="text-aqua flex items-center justify-center">
                                        <IconComponent size={64} strokeWidth={1.2} />
                                    </div>

                                    <CardTitle className="text-2xl font-semibold text-gray-800 mt-8">
                                        {item.title[locale]}
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="text-center flex-1 px-4 md:px-12">
                                    <p className="text-slate-500 text-base leading-relaxed">
                                        {item.description[locale]}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}

export default Foundations;