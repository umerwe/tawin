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

export default function StaffDetailDialog({
  staff,
  open,
  onClose,
}: {
  staff: any;
  open: boolean;
  onClose: () => void;
}) {
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("translation");

  if (!staff) return null;

  const isActive = staff.status.en === "Active";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-2xl p-0 overflow-hidden border border-gray-100 shadow-xl">
        {/* Header */}
        <DialogHeader className="px-5 pt-5">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=80&h=80&fit=crop&crop=face"
              alt={staff.name[locale]}
              className="h-12 w-12 rounded-full object-cover shrink-0 border border-gray-100"
            />
            <div className="min-w-0">
              <DialogTitle className="text-base font-bold text-gray-800 leading-snug">
                {staff.name[locale]}
              </DialogTitle>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs text-gray-400 truncate">{staff.email}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(staff.email)}
                  className="text-purple-500 hover:text-aqua transition-colors shrink-0"
                >
                  <Copy size={12} />
                </button>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="px-5 pb-5 space-y-4">
          {/* Employee Info */}
          <div>
            <p className="text-xs text-gray-400 mb-2">{t("employeeInfo")}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-3 border border-gray-100 rounded-lg px-3 py-2.5">
                <Phone size={15} className="text-gray-400 shrink-0" />
                <span className="text-sm text-gray-700 font-medium">{staff.phone}</span>
              </div>
              <div className="flex items-center gap-3 border border-gray-100 rounded-lg px-3 py-2.5">
                <MapPin size={15} className="text-gray-400 shrink-0" />
                <span className="text-sm text-gray-700 font-medium">
                  {staff.address?.[locale] ?? "123 Main St, NY"}
                </span>
              </div>
            </div>
          </div>

          {/* Activity */}
          <div>
            <p className="text-xs text-gray-400 mb-2">{t("activity")}</p>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="text-sm text-gray-600">{t("status")}:</span>
                <span className={cn("text-sm font-semibold", isActive ? "text-aqua" : "text-red-500")}>
                  {staff.status[locale]}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {t("accountRegistered")}:{" "}
                <span className="font-medium text-gray-700">
                  {staff.accountRegisteredAt ?? "15.01.2025"}
                </span>
              </p>
              <div className="flex items-center gap-1.5">
                <span className="text-sm text-gray-600">{t("permission")}:</span>
                <span className="text-sm font-medium text-gray-700">
                  {staff.role[locale]}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <Button
              variant="outline"
              className="border-red-200 bg-red-100 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-md h-10 font-medium"
            >
              {t("cancelAccount")}
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