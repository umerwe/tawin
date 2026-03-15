"use client";

import { useRef, useState } from "react";
import { ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocale, useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AddBrandDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (val: boolean) => void;
}) {
  const t = useTranslations("translation");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleClose = () => {
    setPreviewUrl(null);
    setFileName(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-sm rounded-2xl p-0 overflow-hidden border border-gray-100 shadow-xl">
        {/* Header */}
        <DialogHeader className="px-5 pt-5">
          <DialogTitle className="text-xl font-bold text-[#004d40]">
            {t("addBrand")}
          </DialogTitle>
        </DialogHeader>

        <div className="px-5 pb-5 space-y-4">
          {/* Brand Name */}
          <div className="space-y-1.5">
            <Label className="text-sm text-gray-500">{t("brandName")}</Label>
            <Input className="border border-gray-200 bg-white rounded-md h-10 text-gray-700 focus-visible:ring-aqua/40" />
          </div>

          {/* Website */}
          <div className="space-y-1.5">
            <Label className="text-sm text-gray-500">{t("website")}</Label>
            <Input className="border border-gray-200 bg-white rounded-md h-10 text-gray-700 focus-visible:ring-aqua/40" />
          </div>

          {/* Image Upload */}
          <div className="space-y-1.5">
            <Label className="text-sm text-gray-500">{t("image")}</Label>
            <div className="border border-gray-200 rounded-md px-3 py-2 flex items-center gap-3">
              {previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={previewUrl}
                  alt="preview"
                  className="h-8 w-8 rounded object-cover shrink-0"
                />
              ) : (
                <ImageIcon size={18} className="text-gray-400 shrink-0" />
              )}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-sm text-gray-600 hover:text-aqua transition-colors font-medium"
              >
                {fileName ?? t("browse")}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-3 pt-1">
            <Button
              variant="outline"
              size="sm"
              className="w-32 border-gray-200 text-gray-600 hover:bg-gray-50 rounded-md h-10"
              onClick={handleClose}
            >
              {t("cancel")}
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="w-32 bg-aqua hover:bg-aqua/90 text-white rounded-md h-10 font-medium"
            >
              {t("add")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}