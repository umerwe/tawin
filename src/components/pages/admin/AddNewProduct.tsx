"use client";

import { PlusCircle, CirclePlus, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "@/components/MyImage";
import { useTranslations, useLocale } from "next-intl";

const categories = [
    { en: "Construction Materials", ar: "مواد البناء" },
    { en: "Construction Materials", ar: "مواد البناء" },
    { en: "Construction Materials", ar: "مواد البناء" }
];

const newProducts = [
    { 
        name: { en: "Smart Fitness Tracker", ar: "جهاز تتبع اللياقة الذكي" }, 
        price: "$39.99", 
        img: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=800&auto=format&fit=crop" 
    },
    { 
        name: { en: "Smart Fitness Tracker", ar: "جهاز تتبع اللياقة الذكي" }, 
        price: "$39.99", 
        img: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=800&auto=format&fit=crop" 
    },
    { 
        name: { en: "Smart Fitness Tracker", ar: "جهاز تتبع اللياقة الذكي" }, 
        price: "$39.99", 
        img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop" 
    },
];

const AddNewProduct = () => {
    const t = useTranslations("translation");
    const locale = useLocale() as "en" | "ar";

    return (
        <Card className="h-full border shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle>{t("addProduct")}</CardTitle>
                <Button variant="ghost" size="sm" className="text-purple-500 p-0 hover:bg-transparent gap-1">
                    <PlusCircle className="h-4 w-4" /> {t("addNewCard")}
                </Button>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Categories Section */}
                <div className="space-y-3">
                    <p className="text-xs text-muted-foreground font-medium">{t("categories")}</p>
                    {categories.map((cat, i) => (
                        <div key={i} className="flex items-center justify-between p-3 border rounded-lg group cursor-pointer hover:border-blue-200">
                            <div className="h-8 w-8 relative bg-gray-50 rounded">
                                <Image src="https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?q=80&w=800&auto=format&fit=crop" alt="cat" fill className="p-1 opacity-70" />
                            </div>
                            <span className="text-sm font-medium flex-1 px-3">{cat[locale]}</span>
                            <ChevronRight className={`h-4 w-4 text-muted-foreground group-hover:text-blue-600 ${locale === 'ar' ? 'rotate-180' : ''}`} />
                        </div>
                    ))}
                    <p className="text-center text-xs text-purple-500 cursor-pointer hover:underline pt-1">{t("showMore")}</p>
                </div>

                {/* Quick Add Products Section */}
                <div className="space-y-3">
                    <p className="text-xs text-muted-foreground font-medium">{t("products")}</p>
                    {newProducts.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="h-10 w-10 relative bg-gray-100 rounded overflow-hidden">
                                <Image src={item.img} alt="thumb" fill className="object-cover" />
                            </div>
                            <div className="flex-1">
                                <p className="text-[13px] font-semibold leading-none">{item.name[locale]}</p>
                                <p className="text-xs text-aqua font-bold mt-1">{item.price}</p>
                            </div>
                            <Button
                                variant="primary"
                                size="xs"
                                className="w-20"
                            >
                                {t("apply")}
                                <CirclePlus className="h-3 w-3" />
                            </Button>
                        </div>
                    ))}
                    <p className="text-center text-xs text-purple-500 cursor-pointer hover:underline pt-1">{t("showMore")}</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default AddNewProduct;