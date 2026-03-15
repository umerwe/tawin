"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, Plus } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export const FinancialCard = () => {
  const t = useTranslations("translation");
  const locale = useLocale() as "en" | "ar";

  // Example data that might come from props or API
  const cardData = {
    holder: { en: "Noman Manzoor", ar: "نعمان منظور" }
  };

  return (
    <Card className="border shadow-none h-full">
      <CardContent>
        {/* Header: Title Left, Menu Right */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400 font-medium">{t("paymentMethod")}</span>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600">
            <MoreVertical size={20} />
          </Button>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* LEFT COLUMN: Card + Add Button */}


          {/* RIGHT COLUMN: Info + Deactivate Button */}
          <div className="flex flex-col justify-between">
            <div className="space-y-1">
              <p className="text-aqua text-xs font-bold uppercase tracking-wide">{t("statusActive")}</p>
              <h4 className="text-2xl font-bold text-gray-900 leading-tight">{t("revenue")}: 1,250</h4>
              <p className="text-sm font-medium text-gray-400">50,000 {t("returns")}</p>
              <button className="text-purple-500 text-sm font-bold hover:underline mt-3 block">
                {t("viewDetails")}
              </button>
            </div>

            {/* The Deactivate button is now pushed to the bottom to match the Add button level */}
            <div className="mt-14">
              <Button
                variant="destructive"
                size="sm"
                className="w-full md:w-fit px-8 rounded-xl bg-red-50 text-red-500 border-none hover:bg-red-100 h-11 transition-colors"
              >
                {t("deactivate")}
              </Button>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
};