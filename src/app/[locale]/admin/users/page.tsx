"use client";

import React, { useState } from "react";
import WeeklyReportChart from "@/components/charts/WeeklyReportChart";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UserTable from "@/components/tables/UserTable";
import { OrderStatCard } from "@/components/card/OrderStatsCard";
import FilterSection from "@/components/pages/admin/orders/FilterSection";

const stats = [
  { title: "Total Users", value: "11,040", trend: "+14.4%", isUp: true, time: "Last 7 days" },
  { title: "New Users", value: "240", trend: "+14.4%", isUp: true, time: "Last 7 days" },
  { title: "Visitors", value: "11,040", trend: "+14.4%", isUp: true, time: "Last 7 days" },
];

const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All Users");

  return (
    <div className="space-y-6 p-1" dir="ltr">
      {/* Top Section: Chart Left, Cards Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left: Large Chart (2/3 width) */}
        <div className="lg:col-span-2">
          <WeeklyReportChart />
        </div>

        {/* Right: Vertically stacked stat cards (1/3 width) */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          {stats.map((stat, i) => (
            <OrderStatCard key={i} {...stat} />
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
          <UserTable searchQuery={searchQuery} activeTab={activeTab} />
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersPage;