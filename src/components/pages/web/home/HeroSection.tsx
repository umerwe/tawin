"use client"

import Image from "@/components/MyImage"
import { useSettings } from "@/hooks/useSettings";
import { useLocale } from "next-intl";

const HeroSkeleton = () => (
    <section className="relative h-[400px] md:h-[600px] w-full overflow-hidden bg-gray-200 animate-pulse">
        <div className="absolute inset-0 bg-gray-300/60" />
        <div className="absolute inset-0 flex items-center px-4 md:px-12">
            <div className="max-w-xl w-full space-y-4">
                <div className="h-8 md:h-10 w-3/4 rounded-md bg-gray-400/50" />
                <div className="h-8 md:h-10 w-1/2 rounded-md bg-gray-400/50" />
            </div>
        </div>
    </section>
)

const HeroSection = () => {
    const locale = useLocale();

    const { data, isLoading } = useSettings();
    const settings = data?.header?.home

    if (isLoading) {
        return <HeroSkeleton />
    }

    return (
        <section className="relative h-[400px] md:h-[600px] w-full overflow-hidden">
            <Image
                src={settings?.image}
                alt="HeroSection"
                fill
                className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="absolute inset-0 flex items-center px-4 md:px-12">
                <div className="max-w-xl">
                    <h1 className="text-2xl md:text-4xl font-semibold text-white leading-tight mb-6">
                        {settings?.text?.[locale]}
                    </h1>
                </div>
            </div>
        </section>
    )
}

export default HeroSection