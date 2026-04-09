"use client";

import { useState } from "react";
import { Plus, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FilterSection from "@/components/FilterSection";
import BrandsTable from "@/components/tables/BrandsTable";
import MiniCard from "@/components/card/MiniCard";
import { useTranslations, useLocale } from "next-intl";
import AddBrandDialog from "@/components/dialog/AddBrandDialog";

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
    { id: 1, brandCode: "#C001", name: "Ta3win Construction", registrationDate: "01-01-2026", logo: "/iphone.webp", status: { en: "Active", ar: "نشط" } },
    { id: 2, brandCode: "#CUST001", name: "Steel Foundries", registrationDate: "15-01-2026", logo: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=200&h=200", status: { en: "Closed", ar: "مغلق" } },
    { id: 3, brandCode: "#CUST002", name: "Timber Masters", registrationDate: "02-02-2026", logo: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=200&h=200", status: { en: "Closed", ar: "مغلق" } },
    { id: 4, brandCode: "#CUST003", name: "Stone Craft", registrationDate: "10-02-2026", logo: "https://images.unsplash.com/photo-1523413555809-0fb1d4da238d?auto=format&fit=crop&q=80&w=200&h=200", status: { en: "Active", ar: "نشط" } }
];

const Brand = () => {
    const [activeTab, setActiveTab] = useState("All Brands");
    const t = useTranslations("translation");
    const locale = useLocale() as "en" | "ar";

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    return (
        <div className="space-y-6 p-1">
            <div className="flex items-center justify-end gap-3">
                <Button variant="outline" size="sm" className="w-32">
                    <MoreVertical className="h-4 w-4 mr-2" /> {t('more')}
                </Button>
                {/* Trigger open state here */}
                <Button
                    variant="primary"
                    className="w-44"
                    size="sm"
                    onClick={() => setIsAddDialogOpen(true)}
                >
                    <Plus className="h-4 w-4 mr-2" /> {t('addBrand')}
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map((cat, i) => (
                    <MiniCard key={i} image={cat.image} title={cat.title[locale]} />
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

            {/* The Add Dialog */}
            <AddBrandDialog
                open={isAddDialogOpen}
                onOpenChange={setIsAddDialogOpen}
            />
        </div>
    );
};

export default Brand;