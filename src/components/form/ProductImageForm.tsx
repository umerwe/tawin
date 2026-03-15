"use client";

import Image from "@/components/MyImage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Plus,
    RotateCcw,
    Image as ImageIcon,
    Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";

interface ProductImageFormProps {
    product?: {
        mainImage?: string;
        thumbnails?: string[];
        category?: string;
        subcategory?: string;
        selectedColors?: number[];
    };
}

const ProductImageForm = ({ product }: ProductImageFormProps) => {
    const t = useTranslations("translation");
    const isEdit = !!product;

    const mainImage = isEdit ? (product.mainImage ?? null) : null;
    const thumbnails = isEdit ? (product.thumbnails ?? []) : [];
    const selectedColors = isEdit ? (product.selectedColors ?? []) : [];

    return (
        <div className="lg:col-span-3 space-y-6">
            <Card className="border shadow-none h-full">
                <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-700">
                        {t("uploadProductImage")}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Main Image */}
                    <div className="space-y-2">
                        <Label>{t("productImage")}</Label>
                        <div className="relative aspect-video w-full rounded-2xl border border-dashed border-gray-200 flex items-center justify-center overflow-hidden bg-gray-50/40">
                            {mainImage ? (
                                <Image
                                    src={mainImage}
                                    alt="Product"
                                    fill
                                    className="object-contain p-10"
                                />
                            ) : (
                                <div className="flex flex-col items-center gap-2 text-gray-300">
                                    <ImageIcon size={36} />
                                    <span className="text-sm">{t("noImageUploaded")}</span>
                                </div>
                            )}
                            <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-white/90 backdrop-blur-sm gap-2 rounded-lg"
                                >
                                    <ImageIcon size={14} /> {t("browse")}
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-white/90 backdrop-blur-sm gap-2 rounded-lg"
                                >
                                    {t("replace")} <RotateCcw size={14} />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Thumbnails */}
                    <div className="grid grid-cols-3 gap-4">
                        {thumbnails.map((src, i) => (
                            <div key={i} className="relative aspect-auto border rounded-xl overflow-hidden">
                                <Image
                                    src={src}
                                    alt="Thumbnail"
                                    fill
                                    className="object-contain p-2"
                                />
                                <button className="absolute top-1 right-1 bg-white/80 rounded-full p-1 shadow-sm">
                                    <Plus className="rotate-45 h-3 w-3 text-gray-400" />
                                </button>
                            </div>
                        ))}
                        <div className="aspect-square border border-dashed border-aqua/40 rounded-xl flex flex-col items-center justify-center text-aqua cursor-pointer hover:bg-aqua/5 transition-colors">
                            <Plus size={20} />
                            <span className="text-sm mt-1">{t("addImage")}</span>
                        </div>
                    </div>

                    {/* Bottom Fields */}
                    <div className="space-y-4 pt-2">
                        <div className="space-y-2">
                            <Label>{t("productCategory")}</Label>
                            <Select defaultValue={isEdit ? (product.category ?? "") : ""}>
                                <SelectTrigger className="rounded-md">
                                    <SelectValue placeholder={t("selectCategory")} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="electronics">{t("electronics")}</SelectItem>
                                    <SelectItem value="clothing">{t("clothing")}</SelectItem>
                                    <SelectItem value="home">{t("homeGarden")}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>{t("subcategories")}</Label>
                            <Select defaultValue={isEdit ? (product.subcategory ?? "") : ""}>
                                <SelectTrigger className="rounded-md">
                                    <SelectValue placeholder={t("selectSubcategory")} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="smartphones">{t("smartphones")}</SelectItem>
                                    <SelectItem value="laptops">{t("laptops")}</SelectItem>
                                    <SelectItem value="accessories">{t("accessories")}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>{t("selectAvailableColors")}</Label>
                            <div className="flex gap-2.5">
                                {["bg-aqua/50", "bg-red-100", "bg-slate-200", "bg-amber-100", "bg-zinc-800"].map(
                                    (color, i) => (
                                        <div
                                            key={i}
                                            className={cn(
                                                "h-10 w-10 rounded-md cursor-pointer border hover:ring-2 ring-aqua/20 transition-all flex items-center justify-center",
                                                color
                                            )}
                                        >
                                            {selectedColors.includes(i) && (
                                                <Check size={12} className="text-aqua" />
                                            )}
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProductImageForm;