"use client";

import { Phone, MapPin, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocale, useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";

export default function AddSupplierDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (val: boolean) => void;
}) {
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("translation");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#004d40]">
            {t("addSupplier")}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Phone */}
          <div className="space-y-2">
            <Label>{t("phoneNumber")}</Label>
            <div className="relative">
              <Phone
                size={20}
                className="absolute top-1/2 -translate-y-1/2 text-gray-800 inset-s-4"
              />
              <Input
                defaultValue="+1234567890"
                className="border border-gray-400 bg-white text-gray-500 rounded-md pl-12"
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label>{t("address")}</Label>
            <div className="relative">
              <MapPin
                size={20}
                className="absolute top-1/2 -translate-y-1/2 text-gray-800 inset-s-4"
              />
              <Input
                defaultValue="123 Main St, NY"
                className="border border-gray-400 bg-white text-gray-500 rounded-md pl-12"
              />
            </div>
          </div>

          {/* Tax Number */}
          <div className="space-y-2">
            <Label>{t("taxNumber")}</Label>
            <Input
              defaultValue="324323"
              className="border border-gray-400 bg-white text-gray-500 rounded-md"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-3 pt-2">
            <Button
              variant="outline"
              size='sm'
              className="w-32"
              onClick={() => onOpenChange(false)}
            >
              <Save size={20} />
              {t("cancel")}
            </Button>

            {/* Send/Add Button (Right) */}
            <Button
              variant="primary"
              size='sm'
              className="w-34"
            >
              {t("send")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}