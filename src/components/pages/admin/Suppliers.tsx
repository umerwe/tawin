"use client";

import { useState, useMemo } from "react";
import WeeklyReportChart from "@/components/charts/WeeklyReportChart";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FilterSection from "@/components/FilterSection";
import SuppliersTable from "@/components/tables/SuppliersTable";
import StatsCard from "@/components/card/StatsCard";
import { useGetSuppliers, useDeleteSupplier } from "@/hooks/useSupplier";
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
        title: { en: "Total suppliers", ar: "إجمالي الموردين" },
        value: "11,040",
        trend: "+14.4%",
        isUp: true,
        footerLabel: { en: "Last 7 days", ar: "آخر 7 أيام" }
    },
    {
        title: { en: "New suppliers", ar: "موردون جدد" },
        value: "240",
        trend: "+14.4%",
        isUp: true,
        footerLabel: { en: "Last 7 days", ar: "آخر 7 أيام" }
    },
    {
        title: { en: "Efficiency", ar: "الكفاءة" },
        value: "98.2%",
        trend: "+14.4%",
        isUp: true,
        footerLabel: { en: "Last 7 days", ar: "آخر 7 أيام" }
    },
];

const tableStats = [
    { label: { en: "Active suppliers", ar: "الموردون النشطون" }, value: "25k", active: true },
    { label: { en: "New suppliers", ar: "موردون جدد" }, value: "5.6k" },
    { label: { en: "Top 10 Suppliers Sales", ar: "مبيعات أفضل 10 موردين" }, value: "250k" },
    { label: { en: "Conversion rate", ar: "معدل التحويل" }, value: "5.5%" },
];

const Suppliers = () => {
    const [activeTab, setActiveTab] = useState("All Suppliers");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [isReversed, setIsReversed] = useState(false);

    const debouncedSearch = useDebounce(search, 500);

    const queryParams = useMemo(() => ({
        page,
        limit: 10,
        search: debouncedSearch,
        isActive: activeTab === "All Suppliers" ? undefined : activeTab === "Active",
    }), [page, debouncedSearch, activeTab]);

    const { data, isLoading, refetch, isFetching } = useGetSuppliers(queryParams);
    const { mutate: deleteSupplier, isPending: isDeleting } = useDeleteSupplier();

    const rawSuppliers = data?.data || [];
    const pagination = data?.meta || {};

    const displayedData = useMemo(() => {
        let filtered = [...rawSuppliers];
        if (isReversed) filtered.reverse();
        return filtered;
    }, [rawSuppliers, isReversed]);

    const handleDelete = (id: string, closeDialog: () => void) => {
        deleteSupplier(id, {
            onSuccess: () => {
                closeDialog();
            }
        });
    };

    return (
        <div className="space-y-6 p-1">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <WeeklyReportChart data={tableStats} title="supplierStatistics" chartData={mockGraphData} />
                </div>
                <div className="lg:col-span-1 flex flex-col gap-4">
                    {stats.map((stat, i) => (
                        <StatsCard key={i} data={stat} />
                    ))}
                </div>
            </div>

            <Card className="border shadow-none overflow-hidden">
                <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6">
                    <FilterSection
                        type="supplier"
                        activeTab={activeTab}
                        setActiveTab={(tab) => {
                            setActiveTab(tab);
                            setPage(1);
                        }}
                        data={rawSuppliers}
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
                    <SuppliersTable 
                        data={displayedData} 
                        isLoading={isLoading || isFetching}
                        pagination={pagination}
                        page={page}
                        setPage={setPage}
                        onDelete={handleDelete}
                        isDeleting={isDeleting}
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default Suppliers;