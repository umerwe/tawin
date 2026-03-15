"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Calendar,
    Wand2,
    Edit3,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";

interface ProductFormProps {
    product?: {
        name?: string;
        description?: string;
        price?: string;
        reducedPrice?: string;
        expirationDate?: string;
        productionDate?: string;
        warehouseAvailability?: string;
        stockQuantity?: string;
        unlimited?: boolean;
        featured?: boolean;
    };
}

const ProductForm = ({ product }: ProductFormProps) => {
    const t = useTranslations("translation");
    const isEdit = !!product;

    return (
        <div className="lg:col-span-3">
            <Card className="border shadow-none h-full">
                <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-700">
                        {t("productInformation")}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Product Name */}
                    <div className="space-y-2">
                        <Label>{t("productName")}</Label>
                        <Input
                            placeholder={t("productNamePlaceholder")}
                            defaultValue={isEdit ? (product.name ?? "") : ""}
                            className="rounded-md"
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label>{t("productDescription")}</Label>
                        <div className="relative">
                            <textarea
                                className="w-full min-h-[140px] p-4 rounded-md bg-gray-50 border border-transparent focus:border-aqua outline-none text-sm text-gray-600 transition-all resize-none"
                                placeholder={t("describeProduct")}
                                defaultValue={isEdit ? (product.description ?? "") : ""}
                            />
                            <div className="absolute bottom-4 left-4 flex gap-3 text-gray-400">
                                <Edit3 size={18} className="cursor-pointer hover:text-aqua transition-colors" />
                                <Wand2 size={18} className="cursor-pointer hover:text-aqua transition-colors" />
                            </div>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="space-y-4 pt-2">
                        <h3 className="text-lg font-bold text-gray-700">{t("pricing")}</h3>
                        <div className="space-y-2">
                            <Label>{t("productPrice")}</Label>
                            <div className="relative">
                                <Input
                                    placeholder={t("pricePlaceholder")}
                                    defaultValue={isEdit ? (product.price ?? "") : ""}
                                    className="pl-14 font-bold rounded-md"
                                />
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 pr-2 border-r border-gray-200">
                                    <span className="text-base">🇺🇸</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>{t("reducedPriceOptional")}</Label>
                            <div className="flex gap-4">
                                <Input
                                    placeholder={t("reducedPricePlaceholder")}
                                    defaultValue={isEdit ? (product.reducedPrice ?? "") : ""}
                                    className="flex-1 rounded-md"
                                />
                                <div className="h-[52px] px-6 bg-emerald-50 rounded-md flex items-center justify-center text-aqua font-bold border border-aqua/50">
                                    $99
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>{t("expirationDate")}</Label>
                            <div className="relative">
                                <Input
                                    placeholder={t("expirationDatePlaceholder")}
                                    defaultValue={isEdit ? (product.expirationDate ?? "") : ""}
                                    className="pl-12 rounded-md"
                                />
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-aqua text-[10px] font-bold uppercase tracking-tighter">
                                    {t("day")}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>{t("productionDate")}</Label>
                            <div className="relative">
                                <Input
                                    placeholder={t("productionDatePlaceholder")}
                                    defaultValue={isEdit ? (product.productionDate ?? "") : ""}
                                    className="pl-12 rounded-md"
                                />
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    {/* Stock */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>{t("warehouseAvailability")}</Label>
                            <Select defaultValue={isEdit ? (product.warehouseAvailability ?? "") : ""}>
                                <SelectTrigger className="rounded-md">
                                    <SelectValue placeholder={t("selectAvailability")} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="available">{t("available")}</SelectItem>
                                    <SelectItem value="out-of-stock">{t("outOfStock")}</SelectItem>
                                    <SelectItem value="pre-order">{t("preOrder")}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>{t("stockQuantity")}</Label>
                            <Input
                                placeholder={t("stockQuantityPlaceholder")}
                                defaultValue={isEdit ? (product.stockQuantity ?? "") : ""}
                                className="rounded-md"
                            />
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col gap-4 pt-2">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-400">{t("unlimited")}</span>
                            <Switch
                                className="data-[state=checked]:bg-aqua"
                                defaultChecked={isEdit ? (product.unlimited ?? false) : false}
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <Checkbox
                                className="data-[state=checked]:bg-aqua border-gray-200 h-5 w-5 rounded"
                                defaultChecked={isEdit ? (product.featured ?? false) : false}
                            />
                            <span className="text-sm font-medium text-gray-400">{t("featuredProducts")}</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                        <Button variant="outline" className="w-44 rounded-md">
                            {t("saveToBlog")}
                        </Button>
                        <Button variant="primary" className="w-44 rounded-md">
                            {t("shareProduct")}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProductForm;