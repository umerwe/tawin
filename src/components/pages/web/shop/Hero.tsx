"use client"

import { useLocale, useTranslations } from "next-intl"
import { useGetCategoryById } from "@/hooks/useCategories"
import Breadcrumb from '@/components/ui/breadcrumb'
import Image from '@/components/MyImage'

interface HeroProps {
    activeCategory: string | null;
    isLoading?: boolean;
}

const HeroSkeleton = () => (
    <section className="relative h-[400px] md:h-[600px] w-full overflow-hidden bg-gray-200 animate-pulse">
        <div className="absolute inset-0 bg-gray-300/60" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="flex flex-col items-center space-y-4 w-full">
                {/* Breadcrumb Skeleton */}
                <div className="h-4 w-32 rounded-md bg-gray-400/50" />
                {/* Title Skeleton */}
                <div className="h-10 md:h-12 w-3/4 max-w-md rounded-md bg-gray-400/50" />
                {/* Subtitle Skeleton Lines */}
                <div className="h-4 w-full max-w-lg rounded-md bg-gray-400/50" />
                <div className="h-4 w-2/3 max-w-sm rounded-md bg-gray-400/50" />
            </div>
        </div>
    </section>
)

const Hero = ({ activeCategory, isLoading }: HeroProps) => {
    const locale = useLocale() as "en" | "ar";
    const t = useTranslations("shop");

    const { data: categoryData, isLoading: isCategoryLoading } = useGetCategoryById(activeCategory || "");

    if (isLoading || isCategoryLoading) {
        return <HeroSkeleton />
    }

    const title = categoryData?.name[locale] || t("heroTitleDefault");
    const subTitle = categoryData?.description[locale] || t("heroSubtitleDefault");
    const backgroundImage = categoryData?.thumbnail || "/shop.png";

    return (
        <section className="relative h-[400px] md:h-[600px] w-full overflow-hidden">
            <Image
                src={backgroundImage}
                alt={title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
            />

            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute inset-0 flex h-full items-center justify-center">
                <div className="flex flex-col items-center space-y-4 text-center px-4">
                    <Breadcrumb
                        variant="white"
                        items={[
                            { title: t("home"), href: "/home" },
                            { title: t("breadcrumbShop") },
                        ]}
                    />
                    <h1 className="text-2xl md:text-4xl font-semibold text-white leading-tight">
                        {title}
                    </h1>
                    <p className="text-base max-w-2xl mx-auto text-white/90">
                        {subTitle}
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Hero;