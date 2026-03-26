"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FilterSection from "@/components/FilterSection";
import ConstructionBasketTable from "@/components/tables/ConstructionBasketTable";

const constructionBasketData = [
    {
        id: 1,
        basketCode: "#CB001",
        fullRegistrationName: { en: "Ahmed Shaker", ar: "أحمد شاكر" },
        phoneNumber: "+964 770 123 4567",
        monthlyIncome: 1500000,
        occupation: { en: "Civil Engineer", ar: "مهندس مدني" },
        propertyArea: "250",
        propertyType: { en: "Freehold", ar: "ملك صرف" },
        country: { en: "Iraq", ar: "العراق" },
        status: { en: "pending", ar: "قيد الانتظار" },
        isApplied: true,
        registrationDate: "01-01-2026"
    },
    {
        id: 2,
        basketCode: "#CB002",
        fullRegistrationName: { en: "Mohammed Ali", ar: "محمد علي" },
        phoneNumber: "+964 771 234 5678",
        monthlyIncome: 2000000,
        occupation: { en: "Architect", ar: "مهندس معماري" },
        propertyArea: "180",
        propertyType: { en: "Leasehold", ar: "إيجار" },
        country: { en: "Iraq", ar: "العراق" },
        status: { en: "approved", ar: "موافق عليه" },
        isApplied: true,
        registrationDate: "15-01-2026"
    },
    {
        id: 3,
        basketCode: "#CB003",
        fullRegistrationName: { en: "Fatima Hassan", ar: "فاطمة حسن" },
        phoneNumber: "+964 772 345 6789",
        monthlyIncome: 1200000,
        occupation: { en: "Project Manager", ar: "مدير مشروع" },
        propertyArea: "320",
        propertyType: { en: "Freehold", ar: "ملك صرف" },
        country: { en: "Iraq", ar: "العراق" },
        status: { en: "rejected", ar: "مرفوض" },
        isApplied: true,
        registrationDate: "02-02-2026"
    },
    {
        id: 4,
        basketCode: "#CB004",
        fullRegistrationName: { en: "Omar Khalid", ar: "عمر خالد" },
        phoneNumber: "+964 773 456 7890",
        monthlyIncome: 1800000,
        occupation: { en: "Construction Supervisor", ar: "مشرف بناء" },
        propertyArea: "150",
        propertyType: { en: "Leasehold", ar: "إيجار" },
        country: { en: "Iraq", ar: "العراق" },
        status: { en: "pending", ar: "قيد الانتظار" },
        isApplied: true,
        registrationDate: "10-02-2026"
    }
];

const ConstructionBasket = () => {
    const [activeTab, setActiveTab] = useState("All Applications");

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
                    <ConstructionBasketTable activeTab={activeTab} data={constructionBasketData} />
                </CardContent>
            </Card>
        </div>
    );
};

export default ConstructionBasket;
