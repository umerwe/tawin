"use client";

import { useLocale, useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import MyImage from "../MyImage";
import { Category } from "@/types/category";

interface CategoryDetailDialogProps {
  category: Category | null;
  open: boolean;
  onClose: () => void;
}

const CategoryDetailDialog = ({ category, open, onClose }: CategoryDetailDialogProps) => {
  const t = useTranslations("translation");
  const locale = useLocale() as "en" | "ar";

  if (!category) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>
            {t("categoryDetails")}
          </DialogTitle>
        </DialogHeader>

        {/* Icon Section - Simple centered view */}
        <div className="flex flex-col items-center py-6">
          <div className="w-24 h-24 rounded-full bg-slate-50 overflow-hidden border flex items-center justify-center p-2">
            <MyImage
              src={category.icon}
              alt="category icon"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
        </div>

        {/* Data Section */}
        <div className="space-y-6">
          <div className="space-y-1">
            <Label>
              {t("categoryName")}
            </Label>
            <p className="text-sm font-semibold text-slate-700" dir={locale === "ar" ? "rtl" : "ltr"}>
              {category.name[locale]}
            </p>
          </div>

          <div className="space-y-1">
            <Label>
              {t("description")}
            </Label>
            <p className="text-sm text-slate-600 leading-relaxed" dir={locale === "ar" ? "rtl" : "ltr"}>
              {category.description[locale]}
            </p>
          </div>

          {category.thumbnail && (
            <div className="space-y-2">
              <Label>
                {t("thumbnail")}
              </Label>
              <div className="w-full h-44 rounded-xl bg-slate-100 border overflow-hidden relative">
                <MyImage
                  src={category.thumbnail}
                  alt="category thumbnail"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryDetailDialog;