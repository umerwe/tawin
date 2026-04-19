"use client";

import { useState, useMemo } from "react";
import WeeklyReportChart from "@/components/charts/WeeklyReportChart";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UserTable from "@/components/tables/UserTable";
import FilterSection from "@/components/FilterSection";
import StatsCard from "@/components/card/StatsCard";
import { useAdminUsers } from "@/hooks/useAuth";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useDebounce } from "@/hooks/useDebounce";
import { toast } from "sonner";

const stats = [
  {
    title: { en: "Total Users", ar: "إجمالي المستخدمين" },
    value: "11,040",
    trend: "+14.4%",
    isUp: true,
    footerLabel: { en: "Last 7 days", ar: "آخر 7 أيام" }
  },
  {
    title: { en: "New Users", ar: "مستخدمون جدد" },
    value: "240",
    trend: "+14.4%",
    isUp: true,
    footerLabel: { en: "Last 7 days", ar: "آخر 7 أيام" }
  },
  {
    title: { en: "Visitors", ar: "الزوار" },
    value: "11,040",
    trend: "+14.4%",
    isUp: true,
    footerLabel: { en: "Last 7 days", ar: "آخر 7 أيام" }
  },
];

const tableStats = [
  { label: { en: "Active customers", ar: "العملاء النشطون" }, value: "25k", active: true },
  { label: { en: "Repeat customers", ar: "العملاء المتكررون" }, value: "5.6k" },
  { label: { en: "Store visitors", ar: "زوار المتجر" }, value: "250k" },
  { label: { en: "Conversion rate", ar: "معدل التحويل" }, value: "5.5%" },
];

const Users = () => {
  const t = useTranslations("translation");

  // Table States
  const [activeTab, setActiveTab] = useState("All Users");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isReversed, setIsReversed] = useState(false);

  // Debounce search to prevent excessive API calls
  const debouncedSearch = useDebounce(search, 500);

  // Fetch Users with Query Params
  const queryParams = useMemo(() => ({
    status: activeTab === "All Users" ? undefined : activeTab.toLowerCase(),
    page,
    search: debouncedSearch,
  }), [activeTab, page, debouncedSearch]);

  const { data, isLoading, refetch, isFetching } = useAdminUsers(queryParams);
  
  const rawUsers = data?.data || [];
  const pagination = data?.meta || {};

  const displayedUsers = useMemo(() => {
    if (!rawUsers) return [];
    return isReversed ? [...rawUsers].reverse() : rawUsers;
  }, [rawUsers, isReversed]);

  return (
    <div className="space-y-6 p-1">
      {/* Top Action Bar */}
      <div className="flex items-center justify-end gap-3">
        <Button
          variant="outline"
          size="sm"
          className="w-32"
        >
          <MoreVertical className="h-4 w-4 mr-2" /> {t("more")}
        </Button>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WeeklyReportChart
            title="userStatistics"
            data={tableStats}
          />
        </div>

        <div className="lg:col-span-1 flex flex-col gap-4">
          {stats.map((stat, i) => (
            <StatsCard key={i} data={stat} />
          ))}
        </div>
      </div>

      {/* Main Users Table Card */}
      <Card className="border shadow-none overflow-hidden">
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <FilterSection
            type="user"
            activeTab={activeTab}
            setActiveTab={(tab) => {
              setActiveTab(tab);
              setPage(1);
            }}
            data={rawUsers}
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

        <CardContent className="p-0 sm:p-6">
          <UserTable
            data={displayedUsers}
            isLoading={isLoading || isFetching}
            pagination={pagination}
            page={page}
            setPage={setPage}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;