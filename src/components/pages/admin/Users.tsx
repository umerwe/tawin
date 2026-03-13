"use client";

import { useState } from "react";
import WeeklyReportChart from "@/components/charts/WeeklyReportChart";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UserTable from "@/components/tables/UserTable";
import FilterSection from "@/components/FilterSection";
import StatsCard from "@/components/card/StatsCard";

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
  const [activeTab, setActiveTab] = useState("All Users");

  return (
    <div className="space-y-6 p-1">
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
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6">
          <FilterSection
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            data={[]}
            type="user"
          />
        </CardHeader>
        <CardContent>
          <UserTable activeTab={activeTab} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;