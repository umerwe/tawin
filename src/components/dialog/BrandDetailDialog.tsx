"use client";

import { cn } from "@/lib/utils";
import { Copy, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function BrandDetailDialog({
  brand,
  open,
  onClose,
}: {
  brand: any;
  open: boolean;
  onClose: () => void;
}) {
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("translation");

  if (!brand) return null;

  const isActive = brand.status.en === "Active";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-2xl p-0 overflow-hidden border border-gray-100 shadow-xl">
        {/* Header */}
        <DialogHeader className="px-5 pt-5">
          <div className="flex items-center gap-3">
            {/* Brand Logo — LEFT */}
            <div className="h-12 w-12 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center shrink-0 overflow-hidden">
              {brand.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-8 w-8 object-contain"
                />
              ) : (
                <span className="text-lg font-bold text-gray-400">
                  {brand.name.charAt(0)}
                </span>
              )}
            </div>

            {/* Name + Website — RIGHT of logo */}
            <div className="min-w-0">
              <DialogTitle className="text-base font-bold text-gray-800 leading-snug">
                {brand.name}
              </DialogTitle>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Globe size={11} className="text-gray-400 shrink-0" />
                <span className="text-xs text-gray-400 truncate">
                  {brand.website ?? `www.${brand.name.toLowerCase()}.com`}
                </span>
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      brand.website ?? `www.${brand.name.toLowerCase()}.com`
                    )
                  }
                  className="text-purple-500 hover:text-aqua transition-colors shrink-0"
                >
                  <Copy size={12} />
                </button>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="px-5 pb-5 space-y-3">
          {/* Detail Rows */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <span className="text-sm text-gray-500 shrink-0">{t("status")}:</span>
              <span className={cn("text-sm font-semibold", isActive ? "text-aqua" : "text-red-500")}>
                {brand.status[locale]}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm text-gray-500 shrink-0">{t("registrationDate")}:</span>
              <span className="text-sm font-medium text-gray-700">{brand.registrationDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm text-gray-500 shrink-0">{t("brandCode")}:</span>
              <span className="text-sm font-medium text-gray-700">{brand.brandCode}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <Button
              variant="outline"
              className="border-red-200 bg-red-100 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-md h-10 font-medium"
            >
              {t("block")}
            </Button>
            <Button
              variant="primary"
              className="bg-amber-50 border border-amber-400 hover:bg-amber-100 text-amber-500 rounded-md h-10 font-medium"
            >
              {t("suspendTemporarily")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}