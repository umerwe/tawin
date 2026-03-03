"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ReviewHeader, WriteReviewButton, ReviewCard } from "./ReviewComponents"
import { Review } from "@/types/product"
import { useTranslations } from "next-intl"

const mockReviews: Review[] = [
  {
    id: 1,
    name: "Maryam Ahmed",
    rating: 5,
    date: "2 days ago",
    comment: "Excellent experience!",
    avatar: "/profile.jpg"
  }
]

export default function Reviews() {
  const t = useTranslations("translation");
  const [activeTab, setActiveTab] = useState("reviews")

  // Using translation keys for labels while keeping the map structure
  const tabs = [
    { key: "reviews", label: t("reviewsTab") },
    { key: "faqs", label: t("faqsTab") },
    { key: "product_info", label: t("productInfoTab") }
  ]

  return (
    <div className="text-gray-800 bg-white">
      <div className="flex justify-start space-x-12 border-b border-gray-200 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-2 text-sm font-medium transition-all ${activeTab === tab.key
              ? "border-b-2 border-black text-black"
              : "text-gray-400 hover:text-gray-600"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "reviews" && (
        <div className="space-y-8">
          <ReviewHeader />
          <WriteReviewButton />

          <div className="flex justify-between items-center pt-2">
            <Select>
              <SelectTrigger className="h-9 w-54 rounded-md border border-border bg-background text-sm text-foreground shadow-none focus:ring-0">
                <SelectValue placeholder={t("latest")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("allCategories")}</SelectItem>
                <SelectItem value="interior">{t("interiorDoors")}</SelectItem>
                <SelectItem value="exterior">{t("exteriorDoors")}</SelectItem>
                <SelectItem value="garage">{t("garageDoors")}</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-gray-400 font-medium">11 {t("comments")}</span>
          </div>

          <div className="space-y-10 pt-4">
            {mockReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
          
          <div className="flex items-center justify-center">
            <Button
              className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-10 rounded-full"
              size="sm"
            >
              {t("more")}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}