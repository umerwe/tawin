"use client";

import { useState } from "react";
import { Plus, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FilterSection from "@/components/pages/admin/orders/FilterSection";
import ProductTable from "@/components/tables/ProductTable";
import { ProductListCard } from "@/components/card/ProductListCard";

const categories = [
    { 
        title: "Electrical", 
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=200&auto=format&fit=crop" 
    },
    { 
        title: "Paints", 
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=200&auto=format&fit=crop" 
    },
    { 
        title: "Fire Systems", 
        image: "https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?q=80&w=200&auto=format&fit=crop" 
    },
    { 
        title: "Cleaning Machines", 
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=200&auto=format&fit=crop" 
    },
    { 
        title: "Solar Energy", 
        image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=200&auto=format&fit=crop" 
    },
    { 
        title: "Building Materials", 
        image: "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?q=80&w=200&auto=format&fit=crop" 
    },
    { 
        title: "Doors", 
        image: "https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?q=80&w=200&auto=format&fit=crop" 
    },
    { 
        title: "Cameras", 
        image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=200&auto=format&fit=crop" 
    },
];

const productsData = [
    { 
        id: 1, 
        number: 1, 
        name: { en: "Solid Wood Door", ar: "باب خشب صلب" }, 
        img: "https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?q=80&w=400&auto=format&fit=crop", 
        date: "01-01-2025", 
        sort: 25, 
        status: { en: "All Products", ar: "جميع المنتجات" } 
    },
    { 
        id: 2, 
        number: 2, 
        name: { en: "Industrial Paint Mixer", ar: "خلاط طلاء صناعي" }, 
        img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=400&auto=format&fit=crop", 
        date: "05-01-2025", 
        sort: 10, 
        status: { en: "Featured Products", ar: "منتجات مميزة" } 
    },
    { 
        id: 3, 
        number: 3, 
        name: { en: "Solar Panel 400W", ar: "لوح شمسي ٤٠٠ واط" }, 
        img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=400&auto=format&fit=crop", 
        date: "10-01-2025", 
        sort: 50, 
        status: { en: "Out of Stock", ar: "نفذت الكمية" } 
    },
    { 
        id: 4, 
        number: 4, 
        name: { en: "Fire Extinguisher 5kg", ar: "طفاية حريق ٥ كجم" }, 
        img: "https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?q=80&w=400&auto=format&fit=crop", 
        date: "12-01-2025", 
        sort: 15, 
        status: { en: "Reduced", ar: "مخفض" } 
    },
    { 
        id: 5, 
        number: 5, 
        name: { en: "CCTV Outdoor Camera", ar: "كاميرا مراقبة خارجية" }, 
        img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=400&auto=format&fit=crop", 
        date: "15-01-2025", 
        sort: 30, 
        status: { en: "Featured Products", ar: "منتجات مميزة" } 
    },
    { 
        id: 6, 
        number: 6, 
        name: { en: "Steel Hinge Set", ar: "طقم مفصلات فولاذية" }, 
        img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=400&auto=format&fit=crop", 
        date: "18-01-2025", 
        sort: 100, 
        status: { en: "All Products", ar: "جميع المنتجات" } 
    },
    { 
        id: 7, 
        number: 7, 
        name: { en: "Concrete Vibrator", ar: "هزاز خرسانة" }, 
        img: "https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?q=80&w=400&auto=format&fit=crop", 
        date: "20-01-2025", 
        sort: 5, 
        status: { en: "Out of Stock", ar: "نفذت الكمية" } 
    },
    { 
        id: 8, 
        number: 8, 
        name: { en: "LED Floodlight 100W", ar: "كشاف ليد ١٠٠ واط" }, 
        img: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=400&auto=format&fit=crop", 
        date: "22-01-2025", 
        sort: 45, 
        status: { en: "Reduced", ar: "مخفض" } 
    },
];

const ProductListPage = () => {
    const [activeTab, setActiveTab] = useState("All Products");

    return (
        <div className="space-y-6 p-1" dir="ltr">
            {/* Action Buttons Top Right */}
            <div className="flex items-center justify-end gap-3">
                <Button variant="outline" size="sm" className="w-32">
                    <MoreVertical className="h-4 w-4 mr-2" /> More
                </Button>
                <Button variant="primary" className="w-32" size="sm">
                    <Plus className="h-4 w-4 mr-2" /> Add Product
                </Button>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map((cat, i) => (
                    <ProductListCard key={i} {...cat} />
                ))}
            </div>

            {/* Main Table Card */}
            <Card className="border shadow-none overflow-hidden">
                <CardHeader className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6">
                    <FilterSection
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        data={productsData}
                        type="product"
                    />
                </CardHeader>
                <CardContent>
                    <ProductTable 
                        activeTab={activeTab} 
                        data={productsData} 
                    />
                </CardContent>
            </Card>
        </div>
    );
};

export default ProductListPage;