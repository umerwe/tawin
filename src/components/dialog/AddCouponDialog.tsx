"use client";

import { useState } from "react";
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
import { SpinnerLoader } from "../common/SpinnerLoader";
import { useCreateCouponAdmin } from "@/hooks/useCoupon";
import { CouponFormData } from "@/services/coupon";

export default function AddCouponDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (val: boolean) => void;
}) {
  const t = useTranslations("translation");
  const { mutate, isPending } = useCreateCouponAdmin();

  const [formData, setFormData] = useState<CouponFormData>({
    code: "",
    type: "percentage",
    value: 0,
    minOrderAmount: 0,
    expiryDate: "",
    usageLimit: 0,
  });

  const handleSubmit = () => {
    const formattedData = {
      ...formData,
      expiryDate: formData.expiryDate
        ? new Date(formData.expiryDate).toISOString()
        : "",
    };

    mutate(formattedData, {
      onSuccess: () => {
        onOpenChange(false);
        // Reset form on success
        setFormData({
          code: "",
          type: "percentage",
          value: 0,
          minOrderAmount: 0,
          expiryDate: "",
          usageLimit: 0,
        });
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl w-[95vw] rounded-2xl overflow-hidden border border-gray-100 shadow-xl p-0">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#004d40]">
            {t("addNewCoupon")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label>{t("couponCode")}</Label>
              <Input
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="SAVE20"
              />
            </div>

            <div className="space-y-1.5">
              <Label>{t("couponType")}</Label>
              <Select
                value={formData.type}
                onValueChange={(val: "percentage" | "fixed") => setFormData({ ...formData, type: val })}
              >
                <SelectTrigger className="h-[52px] rounded-full bg-gray-50 border-transparent focus:ring-purple-100 focus:border-aqua">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">{t("percentage")}</SelectItem>
                  <SelectItem value="fixed">{t("fixedAmount")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label>{t("discountValue")}</Label>
              <Input
                type="number"
                value={formData.value || ""}
                onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                placeholder="20"
              />
            </div>
          </div>

          {/* Row 2: Min Order | Usage Limit | Expiry - Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label>{t("minOrderAmount")}</Label>
              <Input
                type="number"
                value={formData.minOrderAmount || ""}
                onChange={(e) => setFormData({ ...formData, minOrderAmount: Number(e.target.value) })}
                placeholder="100"
              />
            </div>

            <div className="space-y-1.5">
              <Label>{t("usageLimit")}</Label>
              <Input
                type="number"
                value={formData.usageLimit || ""}
                onChange={(e) => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
                placeholder="500"
              />
            </div>

            <div className="space-y-1.5">
              <Label>{t("expiryDate")}</Label>
              <Input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              />
            </div>
          </div>

          {/* Action Buttons - Stack on mobile */}
          <div className="flex flex-col-reverse md:flex-row items-center justify-end gap-3 pt-4">
            <Button
              variant="outline"
              size="sm"
              className="w-full md:w-28 border-gray-200 text-gray-600 hover:bg-gray-50 rounded-full h-10"
              onClick={() => onOpenChange(false)}
            >
              {t("cancel")}
            </Button>

            <Button
              variant="primary"
              size="sm"
              className="w-full md:w-40 rounded-full h-10"
              disabled={isPending}
              onClick={handleSubmit}
            >
              {isPending ? <SpinnerLoader /> : t("publishCoupon")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}