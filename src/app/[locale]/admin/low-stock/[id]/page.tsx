"use client";

import { useParams, useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ProductForm from "@/components/form/ProductForm";
import ProductImageForm from "@/components/form/ProductImageForm";
import { lowStockData } from "@/components/pages/admin/LowStock";

const EditLowStockPage = () => {
    const router = useRouter();
    const { id } = useParams();
    const t = useTranslations("translation");
    const locale = useLocale() as "en" | "ar";

    const item = lowStockData.find((p) => String(p.id) === String(id));

    if (!item) {
        return (
            <div className="p-6 text-gray-500 text-sm">
                {t("productNotFound")}
            </div>
        );
    }

    const productFormData = {
        name: item.name[locale],
        description: item.description,
        price: item.price,
        reducedPrice: item.reducedPrice,
        expirationDate: item.expirationDate,
        productionDate: item.productionDate,
        warehouseAvailability: item.warehouseAvailability,
        stockQuantity: item.stockQuantity,
        unlimited: item.unlimited,
        featured: item.featured,
    };

    const productImageData = {
        mainImage: item.img,
        thumbnails: item.thumbnails,
        category: item.category.en.toLowerCase().replace(" ", "-"),
        subcategory: item.subcategory,
        selectedColors: item.selectedColors,
    };

    return (
        <div className="space-y-6 p-1 mb-10">
            <div className="flex items-center justify-end gap-3">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12"
                    onClick={() => router.push("/admin/products/add")}
                >
                    <Plus size={24} />
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 items-start">
                {/* <ProductForm product={productFormData} />
                <ProductImageForm product={productImageData} /> */}
            </div>
        </div>
    );
};

export default EditLowStockPage;