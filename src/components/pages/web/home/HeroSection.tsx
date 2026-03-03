"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

const HeroSection = () => {
    const t = useTranslations("translation");

    return (
        <section className="relative h-[600px] w-full overflow-hidden">
            <Image
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600"
                alt="HeroSection" fill className="object-cover brightness-50" priority
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-4xl font-semibold text-white max-w-4xl leading-tight">
                    {t("heroTitle")}{" "}
                    <span className="text-aqua underline">{t("heroTitleHighlight")}</span>
                </h1>
                <p className="mt-4 text-base text-gray-200 max-w-xl">
                    {t("heroDescription")}
                </p>
                <Link href="/construction-basket" className="mt-8">
                    <Button
                        variant="primary"
                        size="sm"
                    >
                        {t("heroButton")} →
                    </Button>
                </Link>
            </div>
        </section>
    )
}

export default HeroSection