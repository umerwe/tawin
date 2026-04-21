"use client";

import { useState, useMemo } from "react";
import WeeklyReportChart from "@/components/charts/WeeklyReportChart";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FilterSection from "@/components/FilterSection";
import ReviewsTable from "@/components/tables/ReviewsTable";
import StatsCard from "@/components/card/StatsCard";
import { useReviews } from "@/hooks/useReviews";
import { useDebounce } from "@/hooks/useDebounce";

const mockGraphData = [
  { label: "2026-04-01", customers: 40 },
  { label: "2026-04-02", customers: 30 },
  { label: "2026-04-03", customers: 65 },
  { label: "2026-04-04", customers: 45 },
  { label: "2026-04-05", customers: 90 },
  { label: "2026-04-06", customers: 55 },
  { label: "2026-04-07", customers: 80 },
];

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
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isReversed, setIsReversed] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const queryParams = useMemo(() => ({
    page,
    limit: 10,
    rating: ratingFilter ?? undefined,
    search: debouncedSearch || undefined,
  }), [page, ratingFilter, debouncedSearch]);

  const { data: reviewsResponse, isLoading, refetch, isFetching } = useReviews(queryParams);

  const rawData = reviewsResponse?.data || [];
  const meta = reviewsResponse?.meta;

  const reviewsData = useMemo(() => {
    return isReversed ? [...rawData].reverse() : rawData;
  }, [rawData, isReversed]);

  return (
    <div className="space-y-6 p-1">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WeeklyReportChart data={tableStats} title="customerReviewsStatistics" chartData={mockGraphData} />
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
            data={rawData}
            type="review"
            ratingFilter={ratingFilter}
            setRatingFilter={(val) => {
              setRatingFilter(val);
              setPage(1);
            }}
            reviewsTotal={meta?.total || 0}
            search={search}
            setSearch={(val) => {
              setSearch(val);
              setPage(1);
            }}
            isReversed={isReversed}
            setIsReversed={setIsReversed}
            onRefetch={refetch}
            isFetching={isFetching}
          />
        </CardHeader>
        <CardContent>
          <ReviewsTable
            data={reviewsData}
            isLoading={isLoading || isFetching}
            meta={meta}
            setPage={setPage}
            page={page}
            ratingFilter={ratingFilter}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Reviews;