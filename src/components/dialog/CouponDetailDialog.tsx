"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function CouponDetailDialog({
  coupon,
  open,
  onClose,
  currencySymbol,
}: {
  coupon: any;
  open: boolean;
  onClose: () => void;
  currencySymbol: string;
}) {
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("translation");

  if (!coupon) return null;

  // Consistency with CouponsTable logic
  const isActive = coupon.isActive;

  const rows = [
    {
      label: t("status"),
      value: isActive ? t('active') : t('cancelled'),
      valueClass: isActive ? "text-aqua font-semibold" : "text-red-500 font-semibold"
    },
    { label: t("couponCode"), value: coupon.code },
    { label: t("type"), value: coupon.type || "-" },
    {
      label: t("discountRate"),
      value: coupon.type === "percentage" ? `${coupon.value}%` : `${currencySymbol}${coupon.value}`
    },
    { label: t("minOrder"), value: `${currencySymbol}${coupon.minOrderAmount || 0}` },
    {
      label: t("usageLimit"),
      value: `${coupon.usedCount || 0} / ${coupon.usageLimit || 0}`
    },
    {
      label: t("expiryDate"),
      value: coupon.expiryDate ? new Date(coupon.expiryDate).toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-GB') : '-'
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-2xl p-0 overflow-hidden border border-gray-100 shadow-xl">
        {/* Header */}
        <DialogHeader>
          <DialogTitle className="text-base font-bold text-gray-800">
            {t("couponDetails")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          {/* Detail Rows */}
          <div className="space-y-2">
            {rows.map(({ label, value, valueClass }) => (
              <div key={label} className="flex items-center gap-1.5">
                <span className="text-sm text-gray-500 shrink-0">{label}:</span>
                <span className={cn("text-sm font-medium text-gray-700 capitalize", valueClass)}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          {/* <div className="grid grid-cols-2 gap-3 pt-2">
            <Button
              variant="outline"
              className="border-red-200 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 rounded-md h-10 font-medium"
            >
              {t("cancelTransaction")}
            </Button>
            <Button
              variant="primary"
              className="bg-amber-50 border border-amber-400 hover:bg-amber-100 text-amber-500 rounded-md h-10 font-medium"
            >
              {t("suspendTemporarily")}
            </Button>
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}