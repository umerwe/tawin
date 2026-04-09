"use client";

import { useState } from "react";
import { Plus, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FilterSection from "@/components/FilterSection";
import LowStockTable from "@/components/tables/LowStockTable";
import MiniCard from "@/components/card/MiniCard";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";

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

export const lowStockData = [
  {
    id: 1, no: 1,
    name: { en: "Solid Wood Door", ar: "باب خشب صلب" },
    img: "https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?q=80&w=400&auto=format",
    category: { en: "Doors", ar: "أبواب" },
    quantity: 15,
    supplier: { en: "Al-Saqr Doors Co.", ar: "شركة الصقر للأبواب" },
    status: { en: "Active", ar: "نشط" },
    description: "High-quality solid wood door with premium finish, ideal for residential and commercial use.",
    price: "349.99", reducedPrice: "299.99",
    expirationDate: "01-01-2026", productionDate: "01-01-2025",
    warehouseAvailability: "available", stockQuantity: "15",
    unlimited: false, featured: false,
    thumbnails: ["https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?q=80&w=400&auto=format"],
    subcategory: "accessories", selectedColors: [0, 2],
  },
  {
    id: 2, no: 2,
    name: { en: "Industrial Paint Mixer", ar: "خلاط طلاء صناعي" },
    img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=400&auto=format",
    category: { en: "Paints", ar: "أصباغ" },
    quantity: 8,
    supplier: { en: "Gulf Paint Supplies", ar: "مستلزمات الخليج للطلاء" },
    status: { en: "Active", ar: "نشط" },
    description: "Professional-grade industrial paint mixer for large-scale painting projects.",
    price: "199.99", reducedPrice: "",
    expirationDate: "", productionDate: "05-01-2025",
    warehouseAvailability: "available", stockQuantity: "8",
    unlimited: false, featured: true,
    thumbnails: ["https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=400&auto=format"],
    subcategory: "accessories", selectedColors: [1, 3],
  },
  {
    id: 3, no: 3,
    name: { en: "Solar Panel 400W", ar: "لوح شمسي ٤٠٠ واط" },
    img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=400&auto=format",
    category: { en: "Solar Energy", ar: "الطاقة الشمسية" },
    quantity: 5,
    supplier: { en: "SolarTech Arabia", ar: "سولار تك العربية" },
    status: { en: "Active", ar: "نشط" },
    description: "400W monocrystalline solar panel with high efficiency and weather resistance.",
    price: "499.99", reducedPrice: "449.99",
    expirationDate: "", productionDate: "10-01-2025",
    warehouseAvailability: "available", stockQuantity: "5",
    unlimited: false, featured: false,
    thumbnails: ["https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=400&auto=format"],
    subcategory: "accessories", selectedColors: [2],
  },
  {
    id: 4, no: 4,
    name: { en: "Fire Extinguisher 5kg", ar: "طفاية حريق ٥ كجم" },
    img: "https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?q=80&w=400&auto=format",
    category: { en: "Fire Systems", ar: "أنظمة حريق" },
    quantity: 12,
    supplier: { en: "Safety First Co.", ar: "شركة السلامة أولاً" },
    status: { en: "Active", ar: "نشط" },
    description: "5kg dry powder fire extinguisher suitable for class A, B and C fires.",
    price: "89.99", reducedPrice: "69.99",
    expirationDate: "12-01-2030", productionDate: "12-01-2025",
    warehouseAvailability: "available", stockQuantity: "12",
    unlimited: false, featured: false,
    thumbnails: ["https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?q=80&w=400&auto=format"],
    subcategory: "accessories", selectedColors: [0, 4],
  },
  {
    id: 5, no: 5,
    name: { en: "CCTV Outdoor Camera", ar: "كاميرا مراقبة خارجية" },
    img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=400&auto=format",
    category: { en: "Cameras", ar: "كاميرات" },
    quantity: 7,
    supplier: { en: "Vision Tech", ar: "فيجن تك" },
    status: { en: "Active", ar: "نشط" },
    description: "4MP outdoor CCTV camera with night vision and IP66 weatherproofing.",
    price: "129.99", reducedPrice: "",
    expirationDate: "", productionDate: "15-01-2025",
    warehouseAvailability: "available", stockQuantity: "7",
    unlimited: false, featured: true,
    thumbnails: ["https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=400&auto=format"],
    subcategory: "accessories", selectedColors: [2, 4],
  },
  {
    id: 6, no: 6,
    name: { en: "Steel Hinge Set", ar: "طقم مفصلات فولاذية" },
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=400&auto=format",
    category: { en: "Building Materials", ar: "مواد بناء" },
    quantity: 10,
    supplier: { en: "MetalWorks Gulf", ar: "ميتال وركس الخليج" },
    status: { en: "Active", ar: "نشط" },
    description: "Heavy-duty stainless steel hinge set, corrosion-resistant for doors and cabinets.",
    price: "24.99", reducedPrice: "",
    expirationDate: "", productionDate: "18-01-2025",
    warehouseAvailability: "available", stockQuantity: "10",
    unlimited: false, featured: false,
    thumbnails: ["https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=400&auto=format"],
    subcategory: "accessories", selectedColors: [2, 4],
  },
  {
    id: 7, no: 7,
    name: { en: "Electrical Conduit 20mm", ar: "أنبوب كهربائي ٢٠ ملم" },
    img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=400&auto=format",
    category: { en: "Electrical", ar: "كهربائيات" },
    quantity: 6,
    supplier: { en: "ElecPro Supplies", ar: "إيليك برو للمستلزمات" },
    status: { en: "Active", ar: "نشط" },
    description: "20mm PVC electrical conduit for safe and organized wiring installations.",
    price: "14.99", reducedPrice: "",
    expirationDate: "", productionDate: "20-01-2025",
    warehouseAvailability: "available", stockQuantity: "6",
    unlimited: false, featured: false,
    thumbnails: ["https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=400&auto=format"],
    subcategory: "accessories", selectedColors: [3],
  },
  {
    id: 8, no: 8,
    name: { en: "Floor Cleaning Machine", ar: "ماكينة تنظيف أرضيات" },
    img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400&auto=format",
    category: { en: "Cleaning Machines", ar: "مكائن تنظيف" },
    quantity: 4,
    supplier: { en: "CleanPro Arabia", ar: "كلين برو العربية" },
    status: { en: "Active", ar: "نشط" },
    description: "Commercial floor cleaning machine with rotating brushes and water tank.",
    price: "899.99", reducedPrice: "799.99",
    expirationDate: "", productionDate: "22-01-2025",
    warehouseAvailability: "available", stockQuantity: "4",
    unlimited: false, featured: false,
    thumbnails: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=400&auto=format"],
    subcategory: "accessories", selectedColors: [1, 2],
  },
  {
    id: 9, no: 9,
    name: { en: "LED Floodlight 100W", ar: "كشاف ليد ١٠٠ واط" },
    img: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=400&auto=format",
    category: { en: "Electrical", ar: "كهربائيات" },
    quantity: 9,
    supplier: { en: "LightZone Co.", ar: "شركة لايت زون" },
    status: { en: "Active", ar: "نشط" },
    description: "100W LED floodlight with 8000 lumen output, IP65 rated for outdoor use.",
    price: "59.99", reducedPrice: "44.99",
    expirationDate: "", productionDate: "22-01-2025",
    warehouseAvailability: "available", stockQuantity: "9",
    unlimited: false, featured: false,
    thumbnails: ["https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=400&auto=format"],
    subcategory: "accessories", selectedColors: [1, 2],
  },
  {
    id: 10, no: 10,
    name: { en: "Concrete Vibrator", ar: "هزاز خرسانة" },
    img: "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?q=80&w=400&auto=format",
    category: { en: "Building Materials", ar: "مواد بناء" },
    quantity: 3,
    supplier: { en: "BuildRight Tools", ar: "بيلد رايت للأدوات" },
    status: { en: "Active", ar: "نشط" },
    description: "Electric concrete vibrator for compacting and settling concrete during construction.",
    price: "279.99", reducedPrice: "249.99",
    expirationDate: "", productionDate: "20-01-2025",
    warehouseAvailability: "available", stockQuantity: "3",
    unlimited: false, featured: false,
    thumbnails: ["https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?q=80&w=400&auto=format"],
    subcategory: "accessories", selectedColors: [3],
  },
];

const LowStock = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("All Products");
    const t = useTranslations("translation");
    const locale = useLocale() as "en" | "ar";

    return (
        <div className="space-y-6 p-1">
            <div className="flex items-center justify-end gap-3">
                <Button variant="outline" size="sm" className="w-32">
                    <MoreVertical className="h-4 w-4 mr-2" /> {t('more')}
                </Button>
                <Button
                    onClick={() => router.push("/admin/products/add")}
                    variant="primary" className="w-44" size="sm">
                    <Plus className="h-4 w-4 mr-2" /> {t('addProduct')}
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
                        data={lowStockData}
                        type="lowStock"
                    />
                </CardHeader>
                <CardContent>
                    <LowStockTable activeTab={activeTab} data={lowStockData} />
                </CardContent>
            </Card>
        </div>
    );
};

export default LowStock;