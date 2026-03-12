"use client"

import { Button } from "@/components/ui/button"
import StarRating from "@/components/StarRating"
import { Review } from "@/types/product"
import { useLocale, useTranslations } from "next-intl"
import Image from "@/components/MyImage"

interface ReviewHeaderProps {
  rating?: number
  reviewCount?: number
  productName?: string
}

export function ReviewHeader({
  reviewCount = 11,
  productName = "Wooden Door"
}: ReviewHeaderProps) {
  const t = useTranslations("translation");

  return (
    <div className="flex flex-col items-start space-y-1">
      <span className="text-sm text-gray-500">{t("customerExperience")}</span>
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <StarRating />
        <span className="text-sm font-bold text-gray-900">{reviewCount} {t("reviewsCount")}</span>
      </div>
      <span className="text-sm text-gray-500 font-medium">{productName}</span>
    </div>
  )
}

interface WriteReviewButtonProps {
  onClick?: () => void
}

export function WriteReviewButton({ onClick }: WriteReviewButtonProps) {
  const t = useTranslations("translation");

  return (
    <div className="w-full border border-gray-200 rounded-2xl p-8 flex items-center shadow-sm">
      <Button
        onClick={onClick}
        className="bg-black text-white px-10 hover:bg-gray-800 border-0 rounded-full"
        size="sm"
      >
        {t("writeReview")}
      </Button>
    </div>
  )
}

export function ReviewCard({ review }: { review: Review }) {
  const t = useTranslations("translation");
  const locale = useLocale() as "en" | "ar";
  
  const reviewerName = review.name[locale];
  const reviewerComment = review.comment[locale];

  return (
    <div className="flex flex-col items-start group">
      <div className="flex items-center space-x-4 mb-3">
        <Image
          src={review.avatar}
          alt={reviewerName}
          width={256}
          height={256}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-bold text-sm text-gray-900">{reviewerName}</h4>
          <StarRating />
        </div>
      </div>
      <p className="text-gray-600 text-[15px] leading-relaxed max-w-4xl">
        {reviewerComment}
      </p>
      <span className="text-xs text-gray-400 mt-2 font-medium italic">({t("doorImage")})</span>
    </div>
  )
}