"use client";

import { useState, useMemo } from "react";
import OrderTable from "@/components/tables/OrderTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FilterSection from "@/components/FilterSection";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/card/StatsCard";
import { useTranslations } from "next-intl";
import { useDeleteOrder, useGetOrders } from "@/hooks/useOrder";
import { useDebounce } from "@/hooks/useDebounce";
import { toast } from "sonner";

const stats = [
    {
        title: { en: "Total Orders", ar: "إجمالي الطلبات" },
        value: "1,240",
        trend: "+14.4%",
        isUp: true,
        footerLabel: { en: "Last 7 days", ar: "آخر 7 أيام" }
    },
    {
        title: { en: "New Orders", ar: "طلبات جديدة" },
        value: "240",
        trend: "+20%",
        isUp: true,
        footerLabel: { en: "Last 7 days", ar: "آخر 7 أيام" }
    },
    {
        title: { en: "Completed Orders", ar: "طلبات مكتملة" },
        value: "960",
        trend: "+85%",
        isUp: true,
        footerLabel: { en: "Last 7 days", ar: "آخر 7 أيام" }
    },
    {
        title: { en: "Cancelled Orders", ar: "طلبات ملغاة" },
        value: "87",
        trend: "-5%",
        isUp: false,
        footerLabel: { en: "Last 7 days", ar: "آخر 7 أيام" }
    },
];

const Orders = () => {
    const t = useTranslations("translation");

    // Table States
    const [activeTab, setActiveTab] = useState("All Orders");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [isReversed, setIsReversed] = useState(false);

    // Debounce search to prevent excessive API calls
    const debouncedSearch = useDebounce(search, 500);

    // Fetch Orders with Query Params
    const queryParams = useMemo(() => ({
        status: activeTab === "All Orders" ? undefined : activeTab.toLowerCase(),
        page,
        search: debouncedSearch,
    }), [activeTab, page, debouncedSearch]);

    const { data, isLoading, refetch, isFetching } = useGetOrders(queryParams);
    
    const rawOrders = data?.data || [];
    const pagination = data?.meta || {};

    const displayedOrders = useMemo(() => {
        if (!rawOrders) return [];
        return isReversed ? [...rawOrders].reverse() : rawOrders;
    }, [rawOrders, isReversed]);

    // Delete Mutation
    const { mutate: deleteOrder, isPending: isDeleting } = useDeleteOrder();

    const handleDelete = (id: string, closeDialog: () => void) => {
        deleteOrder(id, {
            onSuccess: () => {
                toast.success(t("orderDeletedSuccess"));
                closeDialog();
                refetch();
            },
            onError: (error: any) => {
                toast.error(error?.message || "Failed to delete order");
            }
        });
    };

    return (
        <div className="space-y-6 p-1">
            {/* Top Action Bar */}
            {/* <div className="flex items-center justify-end gap-3">
                <Button
                    variant="outline"
                    size="sm"
                    className="w-32"
                >
                    <MoreVertical className="h-4 w-4 mr-2" /> {t("more")}
                </Button>
            </div> */}

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <StatsCard key={i} data={stat} />
                ))}
            </div>

            {/* Orders Table Card */}
            <Card className="border shadow-none overflow-hidden">
                <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <FilterSection
                        type="order"
                        activeTab={activeTab}
                        setActiveTab={(tab) => {
                            setActiveTab(tab);
                            setPage(1);
                        }}
                        data={rawOrders}
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
                    <OrderTable
                        data={displayedOrders}
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

export default Orders;