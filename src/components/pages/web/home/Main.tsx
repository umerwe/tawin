"use client"

import CategorySection from "@/components/pages/web/home/CategorySection"
import PromotionSection from "@/components/pages/web/home/PromotionSection"
import HeroSection from "./HeroSection"
import BestSellerSection from "./BestSellerSection"

export default function Home() {
    return (
        <div className="w-full space-y-10">
            <HeroSection />

            <BestSellerSection />

            <CategorySection />

            <PromotionSection />
        </div>
    )
}