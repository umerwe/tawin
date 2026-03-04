"use client"

import Image from 'next/image'
import { useLocale, useTranslations } from "next-intl"
import { categories } from "@/constants/products"
import Breadcrumb from '@/components/ui/breadcrumb';

interface HeroProps {
    activeCategory: string | null;
}

const Hero = ({ activeCategory }: HeroProps) => {
    const locale = useLocale();
    const t = useTranslations("shop");

    const categoryData: any = categories.find(cat => cat.title.en.toLowerCase() === activeCategory?.toLowerCase());

    const title = categoryData?.title[locale] || t("heroTitleDefault");
    const subTitle = categoryData?.subtitle[locale] || t("heroTitleDefault");
    const backgroundImage = categoryData?.image || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=85";

    return (
        <section className="relative h-[400px] md:h-[600px] overflow-hidden">
            <Image
                src={backgroundImage}
                alt={title}
                fill
                priority
                className="object-cover"
                sizes="100vw"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60" />

            <div className="relative z-10 flex h-full items-center justify-center">
                <div className="flex flex-col items-center space-y-4 text-center px-4">
                    <Breadcrumb
                        variant='white'
                        items={[
                            { title: t("home"), href: "/" },
                            { title: title },
                        ]}
                    />
                    <h1 className="text-5xl font-semibold text-white">
                        {title}
                    </h1>
                    <p className=" text-white/70 max-w-2xl mx-auto">
                        {subTitle}
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Hero