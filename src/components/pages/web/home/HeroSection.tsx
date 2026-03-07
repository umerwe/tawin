"use client"

import { useTranslations } from "next-intl"
import Image from "@/components/MyImage"

const HeroSection = () => {
    const t = useTranslations("translation");

    return (
        <section className="relative h-[400px] md:h-[600px] w-full overflow-hidden">
            <Image
                src="/contact-bg.jpg"
                alt="HeroSection"
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="absolute inset-0 flex items-center px-4 md:px-12">
                <div className="max-w-xl">
                    <h1 className="text-2xl md:text-4xl font-semibold text-white leading-tight mb-6">
                        {t("heroTitle")}
                    </h1>

                    <p className="text-sm md:text-base text-gray-200">
                        {t("heroDescription")}
                    </p>
                </div>
            </div>
        </section>
    )
}

export default HeroSection