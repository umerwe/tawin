"use client";

import Image from "@/components/MyImage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import SearchInput from "@/components/ui/searchInput";
import {
    Plus,
    RotateCcw,
    Image as ImageIcon,
    Check
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import ProductForm from "@/components/form/ProductForm";
import { useTranslations } from "next-intl";
import ProductImageForm from "@/components/form/ProductImageForm";

const AddProduct = () => {
    const t = useTranslations("translation");

    return (
        <div className="space-y-6 p-1 mb-10">
            <div className="flex items-center justify-end gap-3">
                <SearchInput
                    placeholder={t("searchProductPlaceholder")}
                    className="h-12 rounded-md bg-white border-gray-200 focus:bg-gray-50"
                    containerClassName="max-w-md"
                />

                <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12"
                >
                    <Plus size={24} />
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 items-start">
                <ProductForm />

                <ProductImageForm />
            </div>
        </div>
    );
};

export default AddProduct;