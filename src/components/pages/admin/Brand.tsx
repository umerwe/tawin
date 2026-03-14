"use client";

import { useState } from "react";
import { Plus, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FilterSection from "@/components/FilterSection";
import BrandsTable from "@/components/tables/BrandsTable";
import { ProductListCard } from "@/components/card/ProductListCard";
import { useTranslations, useLocale } from "next-intl";

const categories = [
    { title: { en: "Cleaning Machines", ar: "مكائن تنظيف" }, image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=200&auto=format" },
    { title: { en: "Fire Systems", ar: "أنظمة حريق" }, image: "https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?q=80&w=200&auto=format" },
    { title: { en: "Paints", ar: "أصباغ" }, image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=200&auto=format" },
    { title: { en: "Electrical", ar: "كهربائيات" }, image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=200&auto=format" },
    { title: { en: "Cameras", ar: "كاميرات" }, image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=200&auto=format" },
    { title: { en: "Doors", ar: "أبواب" }, image: "https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?q=80&w=200&auto=format" },
    { title: { en: "Building Materials", ar: "مواد بناء" }, image: "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?q=80&w=200&auto=format" },
    { title: { en: "Solar Energy", ar: "الطاقة الشمسية" }, image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=200&auto=format" },
];

const brandsData = [
    { id: 1, brandCode: "#C001", name: "Lenovo", registrationDate: "01-01-2025", logo: "/logos/lenovo.png", status: { en: "Active", ar: "نشط" } },
    { id: 2, brandCode: "#CUST001", name: "Apple", registrationDate: "01-01-2025", logo: "/logos/apple.png", status: { en: "Closed", ar: "مغلق" } },
    { id: 3, brandCode: "#CUST001", name: "Lava", registrationDate: "01-01-2025", logo: "/logos/lava.png", status: { en: "Closed", ar: "مغلق" } },
    { id: 4, brandCode: "#CUST001", name: "Nilkamal", registrationDate: "01-01-2025", logo: "/logos/nilkamal.png", status: { en: "Active", ar: "نشط" } },
    // ... duplicate as per image
];

const Brand = () => {
    const [activeTab, setActiveTab] = useState("All Brands");
    const t = useTranslations("translation");
    const locale = useLocale() as "en" | "ar";

    return (
        <div className="space-y-6 p-1">
            <div className="flex items-center justify-end gap-3">
                <Button variant="outline" size="sm" className="w-32">
                    <MoreVertical className="h-4 w-4 mr-2" /> {t('more')}
                </Button>
                <Button variant="primary" className="w-44" size="sm">
                    <Plus className="h-4 w-4 mr-2" /> {t('addBrand')}
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map((cat, i) => (
                    <ProductListCard key={i} image={cat.image} title={cat.title[locale]} />
                ))}
            </div>

            <Card className="border shadow-none overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-6">
                    <FilterSection
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        data={brandsData}
                        type="brand"
                    />
                </CardHeader>
                <CardContent>
                    <BrandsTable activeTab={activeTab} data={brandsData} />
                </CardContent>
            </Card>
        </div>
    );
};

export default Brand;