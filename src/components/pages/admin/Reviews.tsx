"use client";

import { useState } from "react";
import WeeklyReportChart from "@/components/charts/WeeklyReportChart";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FilterSection from "@/components/FilterSection";
import ReviewsTable, { reviews } from "@/components/tables/ReviewsTable";
import StatsCard from "@/components/card/StatsCard";

const stats = [
  {
    title: { en: "Total Reviews", ar: "إجمالي التقييمات" },
    value: "11,040",
    trend: "+14.4%",
    isUp: true,
    footerLabel: { en: "Last 7 days", ar: "آخر 7 أيام" },
  },
  {
    title: { en: "5-Star Reviews", ar: "التقييمات 5 نجمات" },
    value: "240",
    trend: "+14.4%",
    isUp: true,
    footerLabel: { en: "Last 7 days", ar: "آخر 7 أيام" },
  },
  {
    title: { en: "Total Users", ar: "عدد المستخدمين" },
    value: "11,040",
    trend: "+14.4%",
    isUp: true,
    footerLabel: { en: "Last 7 days", ar: "آخر 7 أيام" },
  },
];

const tableStats = [
  { label: { en: "Reviews", ar: "تقييم" }, value: "25k", active: true },
  { label: { en: "5-Star Reviews", ar: "تقييم 5 نجمات" }, value: "5.6k" },
  { label: { en: "Total Users", ar: "عدد المستخدمين" }, value: "250k" },
  { label: { en: "User Rate", ar: "نسبة المستخدمين" }, value: "5.5%" },
];

const Reviews = () => {
  const [activeTab, setActiveTab] = useState("All Orders");
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  return (
    <div className="space-y-6 p-1">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WeeklyReportChart data={tableStats} title="customerReviewsStatistics" />
        </div>
        <div className="lg:col-span-1 flex flex-col gap-4">
          {stats.map((stat, i) => (
            <StatsCard key={i} data={stat} />
          ))}
        </div>
      </div>

      <Card className="border shadow-none overflow-hidden">
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6">
          <FilterSection
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            data={[]}
            type="review"
            ratingFilter={ratingFilter}
            setRatingFilter={setRatingFilter}
            reviewsTotal={reviews.length}
          />
        </CardHeader>
        <CardContent>
          <ReviewsTable ratingFilter={ratingFilter} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Reviews;