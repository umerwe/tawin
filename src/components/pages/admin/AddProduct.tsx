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

                <div className="lg:col-span-3 space-y-6">
                    <Card className="border shadow-none h-full">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold text-gray-700">{t("uploadProductImage")}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label>{t("productImage")}</Label>

                                <div className="relative aspect-video w-full rounded-2xl border border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
                                    <Image
                                        src="/iphone.webp"
                                        alt="Product"
                                        fill
                                        className="object-contain p-10"
                                    />
                                    <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                                        <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm gap-2 rounded-lg">
                                            <ImageIcon size={14} /> {t("browse")}
                                        </Button>
                                        <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm gap-2 rounded-lg">
                                            {t("replace")} <RotateCcw size={14} />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Thumbnails */}
                            <div className="grid grid-cols-3 gap-4">
                                {[1, 2].map((i) => (
                                    <div key={i} className="relative aspect-auto border rounded-xl overflow-hidden">
                                        <Image
                                            src="/iphone2.webp"
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

                            {/* Bottom Fields of Right Card */}
                            <div className="space-y-4 pt-2">
                                <div className="space-y-2">
                                    <Label>{t("productCategory")}</Label>
                                    <Select>
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
                                    <Select>
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
                                        {["bg-aqua/50", "bg-red-100", "bg-slate-200", "bg-amber-100", "bg-zinc-800"].map((color, i) => (
                                            <div key={i} className={cn("h-10 w-10 rounded-md cursor-pointer border hover:ring-2 ring-aqua/20 transition-all flex items-center justify-center", color)}>
                                                {i === 0 && <Check size={12} className="text-aqua" />}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;