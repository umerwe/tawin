"use client"

import { useLocale, useTranslations } from "next-intl"
import { categories } from "@/constants/products"
import Breadcrumb from '@/components/ui/breadcrumb';
import Image from '@/components/MyImage';

interface HeroProps {
    activeCategory: string | null;
}

const Hero = ({ activeCategory }: HeroProps) => {
    const locale = useLocale() as "en" | "ar";
    const t = useTranslations("shop");

    const categoryData: any = categories.find(cat => cat?.title?.en?.toLowerCase() === activeCategory?.toLowerCase());

    const title = categoryData?.title[locale] || t("heroTitleDefault");
    const subTitle = categoryData?.subtitle[locale] || t("heroSubtitleDefault");
    const backgroundImage = categoryData?.image || "/shop.png";

    return (
        <section className="relative h-[400px] md:h-[600px] overflow-hidden">
            <Image
                src={backgroundImage}
                alt={title}
                fill
                className="object-cover"
                sizes="100vw"
            />

            <div className="absolute inset-0 flex h-full items-center justify-center">
                <div className="flex flex-col items-center space-y-4 text-center px-4">
                    <Breadcrumb
                        items={[
                            { title: t("home"), href: "/" },
                            { title: t("breadcrumbShop") },
                        ]}
                    />
                    <h1 className="text-4xl font-semibold">
                        {title}
                    </h1>
                    <p className="text-base max-w-2xl mx-auto">
                        {subTitle}
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Hero