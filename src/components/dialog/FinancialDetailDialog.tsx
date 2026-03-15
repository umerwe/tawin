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

export default function FinancialDetailDialog({
  transaction,
  open,
  onClose,
}: {
  transaction: any;
  open: boolean;
  onClose: () => void;
}) {
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("translation");

  if (!transaction) return null;

  const statusColorMap: Record<string, string> = {
    Completed: "text-aqua",
    Cancelled: "text-red-500",
    "In Progress": "text-amber-500",
  };

  const rows = [
    {
      label: t("status"),
      value: transaction.status[locale],
      valueClass: statusColorMap[transaction.status.en] ?? "text-gray-700",
    },
    { label: t("userCode"), value: transaction.name[locale] },
    { label: t("date"), value: transaction.date },
    { label: t("total"), value: transaction.total },
    { label: t("paymentMethod"), value: transaction.method[locale] },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-2xl p-0 overflow-hidden border border-gray-100 shadow-xl">
        {/* Header */}
        <DialogHeader className="px-5 pt-5">
          <DialogTitle className="text-base font-bold text-gray-800">
            {t("transactionDetails")}
          </DialogTitle>
        </DialogHeader>

        <div className="px-5 pb-5 space-y-3">
          {/* Detail Rows */}
          <div className="space-y-2">
            {rows.map(({ label, value, valueClass }) => (
              <div key={label} className="flex items-center gap-1.5">
                <span className="text-sm text-gray-500 shrink-0">{label}:</span>
                <span className={cn("text-sm font-medium", valueClass ?? "text-gray-700")}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2 max-w-sm mx-auto">
            <Button
              variant="outline"
              className="border-red-200 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 rounded-md h-10 font-medium"
            >
              {t("cancelTransaction")}
            </Button>
            <Button
              variant="primary"
              className="bg-amber-50 border border-amber-400 hover:bg-amber-400/20 text-amber-500 rounded-md h-10 font-medium"
            >
              {t("suspendTemporarily")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}