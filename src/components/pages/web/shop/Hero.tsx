"use client"

import Image from 'next/image'
import { useTranslations } from "next-intl"

const Hero = () => {
    const t = useTranslations("shop");

    return (
        <section className="relative h-[600px] overflow-hidden">
            <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=85"
                alt="Interior doors hero"
                fill
                priority
                className="object-cover"
                sizes="100vw"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* ── Content ── */}
            <div className="relative z-10 flex h-full items-center justify-center">
                <div className="space-y-4 text-center">
                    <p className="text-sm text-white/70">
                        {t("breadcrumb")}
                    </p>
                    <h1 className="text-5xl font-semibold text-white">
                        {t("heroTitle")}
                    </h1>
                    <p className="text-white/70">
                        {t("heroSubtitle")}
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Hero