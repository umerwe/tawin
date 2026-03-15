"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import Image from "@/components/MyImage";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function OrderDetailDialog({
  order,
  open,
  onClose,
}: {
  order: any;
  open: boolean;
  onClose: () => void;
}) {
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("translation");

  if (!order) return null;

  const isPaid = order.payment.en === "Paid";

  const rows = [
    { label: t("orderId"), value: order.orderId },
    { label: t("date"), value: order.date },
    { label: t("price"), value: `$${order.price}` },
    {
      label: t("payment"),
      value: order.payment[locale],
      valueClass: isPaid ? "text-aqua font-semibold" : "text-red-500 font-semibold",
    },
    {
      label: t("status"),
      value: order.status[locale],
      valueClass: cn("font-semibold", order.color),
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-2xl p-0 overflow-hidden border border-gray-100 shadow-xl">
        {/* Header */}
        <DialogHeader className="px-5 pt-5">
          <DialogTitle className="text-base font-bold text-gray-800">
            {t("orderDetails")}
          </DialogTitle>
        </DialogHeader>

        <div className="px-5 pb-5 space-y-4">
          {/* Product Preview */}
          <div className="flex items-center gap-3 border border-gray-100 rounded-lg px-3 py-2.5">
            <div className="h-10 w-10 relative overflow-hidden rounded-md shrink-0">
              <Image
                src={order.img}
                alt={order.product[locale]}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-800 line-clamp-1">
                {order.product[locale]}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">#{order.id}</p>
            </div>
          </div>

          {/* Detail Rows */}
          <div className="space-y-2">
            {rows.map(({ label, value, valueClass }) => (
              <div key={label} className="flex items-center gap-1.5">
                <span className="text-sm text-gray-500 shrink-0">{label}:</span>
                <span className={cn("text-sm font-medium text-gray-700", valueClass)}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <Button
              variant="outline"
              className="border-red-200 bg-red-100 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-md h-10 font-medium"
            >
              {t("cancelOrder")}
            </Button>
            <Button
              variant="primary"
              className="bg-aqua/10 border border-aqua hover:bg-aqua/20 text-aqua rounded-md h-10 font-medium"
            >
              {t("trackOrder")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}