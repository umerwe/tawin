"use client";

import { cn } from "@/lib/utils";
import { Copy, Phone, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ReviewDetailDialog({
  review,
  open,
  onClose,
}: {
  review: any;
  open: boolean;
  onClose: () => void;
}) {
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("translation");

  if (!review) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-2xl p-0 overflow-hidden border border-gray-100 shadow-xl">
        {/* Header */}
        <DialogHeader className="px-5 pt-5 relative">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=80&h=80&fit=crop&crop=face"
              alt={review.userName[locale]}
              className="h-12 w-12 rounded-full object-cover shrink-0 border border-gray-100"
            />
            <div className="min-w-0">
              <DialogTitle className="text-base font-bold text-gray-800 leading-snug">
                {review.userName[locale]}
              </DialogTitle>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs text-gray-400 truncate">
                  {review.userEmail}
                </span>
                <button
                  onClick={() => navigator.clipboard.writeText(review.userEmail)}
                  className="text-purple-500 hover:text-aqua transition-colors shrink-0"
                >
                  <Copy size={12} />
                </button>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="px-5 pb-5 space-y-4">
          {/* User Info Section */}
          <div>
            <p className="text-xs text-gray-400 mb-2">{t("userInfo")}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-3 border border-gray-100 rounded-lg px-3 py-2.5">
                <Phone size={15} className="text-gray-400 shrink-0" />
                <span className="text-sm text-gray-700 font-medium">
                  {review.userPhone ?? "+1234567890"}
                </span>
              </div>
              <div className="flex items-center gap-3 border border-gray-100 rounded-lg px-3 py-2.5">
                <MapPin size={15} className="text-gray-400 shrink-0" />
                <span className="text-sm text-gray-700 font-medium">
                  {review.userAddress?.[locale] ?? "123 Main St, NY"}
                </span>
              </div>
            </div>
          </div>

          {/* Review Details Section */}
          <div>
            <p className="text-xs text-gray-400 mb-2">{t("reviewDetails")}</p>
            <div className="space-y-2">
              {/* Rating */}
              <div className="flex items-center gap-1.5">
                <span className="text-sm text-gray-500 shrink-0">{t("rating")}:</span>
                <span className="text-sm font-semibold text-gray-700">{review.rating}</span>
                <div className="flex items-center gap-0.5 ms-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className={cn(
                        i < review.rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-200 fill-gray-200"
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Comment */}
              <div className="space-y-1">
                <span className="text-sm text-gray-500">{t("comment")}:</span>
                <p className="text-sm text-gray-700 leading-relaxed border border-gray-100 rounded-lg px-3 py-2.5">
                  {review.comment[locale]}
                </p>
              </div>

              {/* Publish Date */}
              <div className="flex items-center gap-1.5">
                <span className="text-sm text-gray-500 shrink-0">{t("publishDate")}:</span>
                <span className="text-sm font-medium text-gray-700">{review.date}</span>
              </div>
            </div>
          </div>

          {/* Delete Button */}
          <Button
            variant="outline"
            className="w-full border-red-200 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 rounded-md h-10 font-medium"
          >
            {t("deleteReview")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}