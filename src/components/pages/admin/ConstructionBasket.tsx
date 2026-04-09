"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FilterSection from "@/components/FilterSection";
import ConstructionBasketTable from "@/components/tables/ConstructionBasketTable";
import { useAdminBasketRequests } from "@/hooks/useBasket";

const ConstructionBasket = () => {
    const [activeTab, setActiveTab] = useState("All Applications");
    const { data, isLoading } = useAdminBasketRequests();

    const constructionBasketData = data?.data || [];

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
                    <ConstructionBasketTable activeTab={activeTab} data={constructionBasketData} isLoading={isLoading}  />
                </CardContent>
            </Card>
        </div>
    );
};

export default ConstructionBasket;
