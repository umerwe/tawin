"use client";

import { cn } from "@/lib/utils";
import { Copy, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function UserDetailDialog({
  user,
  open,
  onClose,
}: {
  user: any;
  open: boolean;
  onClose: () => void;
}) {
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("translation");

  if (!user) return null;

  const isActive = user.status.en === "Active";
  const isVip = user.status.en === "VIP";

  const statusColor = isActive
    ? "text-aqua"
    : isVip
    ? "text-amber-500"
    : "text-red-500";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-2xl p-0 overflow-hidden border border-gray-100 shadow-xl">
        {/* Header */}
        <DialogHeader className="px-5 pt-5 relative">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <img
              src={`https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=80&h=80&fit=crop&crop=face`}
              alt={user.name[locale]}
              className="h-12 w-12 rounded-full object-cover shrink-0 border border-gray-100"
            />
            <div className="min-w-0">
              <DialogTitle className="text-base font-bold text-gray-800 leading-snug">
                {user.name[locale]}
              </DialogTitle>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs text-gray-400 truncate">{user.email}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(user.email)}
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
              {/* Phone */}
              <div className="flex items-center gap-3 border border-gray-100 rounded-lg px-3 py-2.5">
                <Phone size={15} className="text-gray-400 shrink-0" />
                <span className="text-sm text-gray-700 font-medium">{user.phone}</span>
              </div>

              {/* Address */}
              <div className="flex items-center gap-3 border border-gray-100 rounded-lg px-3 py-2.5">
                <MapPin size={15} className="text-gray-400 shrink-0" />
                <span className="text-sm text-gray-700 font-medium">
                  {user.address?.[locale] ?? "123 Main St, NY"}
                </span>
              </div>
            </div>
          </div>

          {/* Activity Section */}
          <div>
            <p className="text-xs text-gray-400 mb-2">{t("activity")}</p>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="text-sm text-gray-600">{t("status")}:</span>
                <span className={cn("text-sm font-semibold", statusColor)}>
                  {user.status[locale]}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {t("accountRegistered")}:{" "}
                <span className="font-medium text-gray-700">
                  {user.accountRegisteredAt ?? "15.01.2025"}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                {t("lastActivity")}:{" "}
                <span className="font-medium text-gray-700">
                  {user.lastAccountActivity ?? "15.01.2025"}
                </span>
              </p>
            </div>
          </div>

          {/* Orders Summary Section */}
          <div>
            <p className="text-xs text-gray-400 mb-2">{t("ordersSummary")}</p>
            <div className="grid grid-cols-3 gap-2 text-center">
              {/* Cancelled */}
              <div className="border border-gray-100 rounded-xl py-2.5 px-1">
                <p className="text-lg font-bold text-gray-800">
                  {user.ordersSummary?.cancelled ?? 10}
                </p>
                <p className="text-xs text-red-500 font-medium mt-0.5">
                  {t("cancelled")}
                </p>
              </div>
              {/* Completed */}
              <div className="border border-gray-100 rounded-xl py-2.5 px-1">
                <p className="text-lg font-bold text-gray-800">
                  {user.ordersSummary?.completed ?? 140}
                </p>
                <p className="text-xs text-aqua font-medium mt-0.5">
                  {t("completed")}
                </p>
              </div>
              {/* Total */}
              <div className="border border-gray-100 rounded-xl py-2.5 px-1">
                <p className="text-lg font-bold text-gray-800">
                  {user.ordersSummary?.total ?? 150}
                </p>
                <p className="text-xs text-aqua font-medium mt-0.5">
                  {t("totalOrders")}
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