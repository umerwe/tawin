"use client";
import { cn } from "@/lib/utils";
import { Copy, Phone, MapPin, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function SupplierDetailDialog({
  supplier,
  open,
  onClose,
}: {
  supplier: any;
  open: boolean;
  onClose: () => void;
}) {
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("translation");
  const isRtl = locale === "ar";

  if (!supplier) return null;

  const isActive = supplier.status.en === "Active";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className={cn("max-w-sm rounded-2xl p-0 overflow-hidden border border-gray-100 shadow-xl")}
      >
        {/* Header */}
        <DialogHeader className="px-5 pt-5 relative">
          <DialogTitle className="text-base font-bold text-gray-800 leading-snug">
            {supplier.name[locale]}
          </DialogTitle>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gray-400">{supplier.email}</span>
            <button
              onClick={() => navigator.clipboard.writeText(supplier.email)}
              className="text-purple-500 hover:text-aqua transition-colors"
            >
              <Copy size={12} />
            </button>
          </div>
        </DialogHeader>

        <div className="px-5 pb-5 space-y-4">
          {/* Supplier Info Section */}
          <div>
            <p className="text-xs text-gray-400 mb-2">
              {t("supplierInfo")}
            </p>
            <div className="space-y-2">
              {/* Phone */}
              <div className="flex items-center gap-3 border border-gray-100 rounded-lg px-3 py-2.5">
                <Phone size={15} className="text-gray-400" />
                <span className="text-sm text-gray-700 font-medium">
                  {supplier.phone}
                </span>
              </div>

              {/* Address */}
              <div className="flex items-center gap-3 border border-gray-100 rounded-lg px-3 py-2.5">
                <MapPin size={15} className="text-gray-400" />
                <span className="text-sm text-gray-700 font-medium">
                  {supplier.address[locale]}
                </span>
              </div>

              {/* Tax Number */}
              <div className="flex items-center gap-3 border border-gray-100 rounded-lg px-3 py-2.5">
                <Hash size={15} className="text-gray-400" />
                <span className="text-sm text-gray-700 font-medium">
                  {supplier.taxNumber}
                </span>
              </div>
            </div>
          </div>

          {/* Activity Section */}
          <div>
            <p className="text-xs text-gray-400 mb-2">
              {t("activity")}
            </p>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="text-sm text-gray-600">{t("status")}:</span>
                <span
                  className={cn(
                    "text-sm font-semibold",
                    isActive ? "text-aqua" : "text-red-500"
                  )}
                >
                  {supplier.status[locale]}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {t("accountRegistered")}:{" "}
                <span className="font-medium text-gray-700">
                  {supplier.accountRegisteredAt}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                {t("lastActivity")}:{" "}
                <span className="font-medium text-gray-700">
                  {supplier.lastAccountActivity}
                </span>
              </p>
            </div>
          </div>

          {/* Sales Summary Section */}
          <div>
            <p className="text-xs text-gray-400 mb-2">
              {t("salesSummary")}
            </p>
            <div className="grid grid-cols-3 gap-2 text-center">
              {/* Total */}
              <div className="border border-gray-100 rounded-xl py-2.5 px-1">
                <p className="text-lg font-bold text-gray-800">
                  {supplier.salesSummary.total}
                </p>
                <p className="text-xs text-aqua font-medium mt-0.5">
                  {t("totalSales")}
                </p>
              </div>
              {/* Completed */}
              <div className="border border-gray-100 rounded-xl py-2.5 px-1">
                <p className="text-lg font-bold text-gray-800">
                  {supplier.salesSummary.completed}
                </p>
                <p className="text-xs text-aqua font-medium mt-0.5">
                  {t("completed")}
                </p>
              </div>
              {/* Cancelled */}
              <div className="border border-gray-100 rounded-xl py-2.5 px-1">
                <p className="text-lg font-bold text-gray-800">
                  {supplier.salesSummary.cancelled}
                </p>
                <p className="text-xs text-red-500 font-medium mt-0.5">
                  {t("cancelled")}
                </p>
              </div>
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
              className="bg-aqua/10 border border-aqua hover:bg-aqua/20 text-aqua rounded-md h-10 font-medium">
              {t("activate")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}