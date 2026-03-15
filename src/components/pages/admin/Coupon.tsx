"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FilterSection from "@/components/FilterSection";
import CouponsTable, { coupons } from "@/components/tables/CouponTable";
import StatsCard from "@/components/card/StatsCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import AddCouponDialog from "@/components/dialog/AddCouponDialog";

const couponStats = [
  {
    title: { en: "Total Coupons", ar: "إجمالي الكوبونات" },
    value: "1,240",
    trend: "+14.4%",
    isUp: true,
    footerLabel: { en: "Last 7 days", ar: "آخر 7 أيام" },
  },
  {
    title: { en: "Used Coupons", ar: "الكوبونات المستخدمة" },
    value: "240",
    trend: "+20%",
    isUp: true,
    footerLabel: { en: "Last 7 days", ar: "آخر 7 أيام" },
  },
  {
    title: { en: "Unused Coupons", ar: "الكوبونات الغير مستخدمة" },
    value: "960",
    trend: "+85%",
    isUp: true,
    footerLabel: { en: "Last 7 days", ar: "آخر 7 أيام" },
  },
  {
    title: { en: "Expired Coupons", ar: "الكوبونات المنتهية" },
    value: "87",
    trend: "5%",
    isUp: false,
    footerLabel: { en: "Last 7 days", ar: "آخر 7 أيام" },
  },
];

const Coupons = () => {
  const t = useTranslations("translation");
  const [activeTab, setActiveTab] = useState("All Coupons");
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  return (
    <div className="space-y-6 p-1">
      {/* Add Coupon Button */}
      <div className="flex items-center justify-end gap-3">
        <Button
          variant="primary"
          className="w-32"
          size="sm"
          onClick={() => setAddDialogOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          {t("addCoupon")}
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {couponStats.map((stat, i) => (
          <StatsCard key={i} data={stat} />
        ))}
      </div>

      {/* Table Card */}
      <Card className="border shadow-none overflow-hidden">
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6">
          <FilterSection
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            data={coupons}
            type="coupon"
          />
        </CardHeader>
        <CardContent>
          <CouponsTable activeTab={activeTab} />
        </CardContent>
      </Card>

      {/* Add Coupon Dialog */}
      <AddCouponDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
      />
    </div>
  );
};

export default Coupons;