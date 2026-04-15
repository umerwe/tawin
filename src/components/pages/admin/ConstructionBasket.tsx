"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FilterSection from "@/components/FilterSection";
import ConstructionBasketTable from "@/components/tables/ConstructionBasketTable";
import { useAdminBasketRequests } from "@/hooks/useBasket";

const ConstructionBasket = () => {
    const { data, isLoading } = useAdminBasketRequests();

    const [activeTab, setActiveTab] = useState("All Applications");
    const [page, setPage] = useState(1);

    const constructionBasketData = data?.data?.data || [];
    const meta = data?.data?.meta || {};

    return (
        <div className="space-y-6 p-1">

            <Card className="border shadow-none overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-6">
                    <FilterSection
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        data={constructionBasketData}
                        type="constructionBasket"
                    />
                </CardHeader>
                <CardContent>
                    <ConstructionBasketTable  activeTab={activeTab} data={constructionBasketData} meta={meta} isLoading={isLoading} setPage={setPage}  />
                </CardContent>
            </Card>
        </div>
    );
};

export default ConstructionBasket;
