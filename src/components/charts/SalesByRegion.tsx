"use client";

import { MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useTranslations, useLocale } from "next-intl";

const regionData = [
  { name: { en: "Baghdad", ar: "بغداد" }, value: "30k", percentage: 25.8, trend: "up" },
  { name: { en: "Basra", ar: "البصرة" }, value: "30k", percentage: 15.8, trend: "down" },
  { name: { en: "Babil", ar: "بابل" }, value: "30k", percentage: 25.8, trend: "up" },
];

const SalesByRegion = () => {
  const t = useTranslations("translation");
  const locale = useLocale() as "en" | "ar";

  return (
    <Card className="w-full border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-sm font-medium text-purple-500">
            {t("activeUsersLastHour")}
          </CardTitle>
          <div className="text-2xl font-bold">21.5K</div>
        </div>
        <MoreVertical className="h-4 w-4 text-muted-foreground cursor-pointer" />
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">{t("usersPerMinute")}</p>
          <div className="flex items-end gap-1 h-12">
            {[40, 70, 45, 90, 65, 30, 80, 50, 60].map((h, i) => (
              <div key={i} className="bg-aqua w-full rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        <div className="flex justify-between text-sm font-semibold">
          <span>{t("salesByRegion")}</span>
          <span>{t("sales")}</span>
        </div>

        <div className="space-y-4">
          {regionData.map((region, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <div className="flex flex-col">
                  <span className="font-bold">{region.value}</span>
                  <span className="text-muted-foreground">{region.name[locale]}</span>
                </div>
                <span className={region.trend === "up" ? "text-aqua" : "text-red-500"}>
                  {region.trend === "up" ? "▲" : "▼"} {region.percentage}%
                </span>
              </div>
              <Progress value={region.percentage} className="h-2 bg-blue-100" />
            </div>
          ))}
        </div>

        <Button className="w-full">
          {t("viewDetails")}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SalesByRegion;