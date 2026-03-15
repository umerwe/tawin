"use client";

import { Save, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AddCouponDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (val: boolean) => void;
}) {
  const t = useTranslations("translation");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl rounded-2xl p-0 overflow-hidden border border-gray-100 shadow-xl">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-xl font-bold text-[#004d40]">
            {t("addNewCoupon")}
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-5">
          {/* Row 1: Code | Type | Max Discount */}
          <div className="grid grid-cols-3 gap-4">
            {/* Coupon Code */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                {t("couponCode")}
              </Label>
              <Input
                placeholder="89ED10"
                className="border border-gray-200 bg-gray-50 rounded-md h-10 text-gray-700 focus-visible:ring-aqua/40"
              />
            </div>

            {/* Coupon Type */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                {t("couponType")}
              </Label>
              <Select defaultValue="percentage">
                <SelectTrigger className="border border-gray-200 bg-gray-50 rounded-md h-10 text-gray-700 focus:ring-aqua/40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">{t("percentage")}</SelectItem>
                  <SelectItem value="fixed">{t("fixedAmount")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Max Discount */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium text-gray-700">
                {t("maxDiscount")}
              </Label>
              <Input
                placeholder="##"
                className="border border-gray-200 bg-gray-50 rounded-md h-10 text-gray-700 focus-visible:ring-aqua/40"
              />
            </div>
          </div>

          {/* Row 2: Validity label + Start Date + End Date */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-gray-700">
              {t("validity")}
            </Label>
            <div className="grid grid-cols-2 gap-4">
              {/* Start Date */}
              <div className="relative">
                <Input
                  type="date"
                  className="border border-gray-200 bg-gray-50 rounded-md h-10 text-gray-500 focus-visible:ring-aqua/40 pe-10"
                  placeholder={t("startDate")}
                />
                <Calendar
                  size={16}
                  className="absolute top-1/2 -translate-y-1/2 end-3 text-gray-400 pointer-events-none"
                />
              </div>

              {/* End Date */}
              <div className="relative">
                <Input
                  type="date"
                  className="border border-gray-200 bg-gray-50 rounded-md h-10 text-gray-500 focus-visible:ring-aqua/40 pe-10"
                  placeholder={t("endDate")}
                />
                <Calendar
                  size={16}
                  className="absolute top-1/2 -translate-y-1/2 end-3 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-1">
            <Button
              variant="outline"
              size="sm"
              className="w-28 border-gray-200 text-gray-600 hover:bg-gray-50"
              onClick={() => onOpenChange(false)}
            >
              <Save size={15} className="me-1.5" />
              {t("cancel")}
            </Button>

             <Button
              variant="primary"
              size="sm"
              className="w-36"
            >
              {t("publishCoupon")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}