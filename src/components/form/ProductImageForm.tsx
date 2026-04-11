"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, RotateCcw, Image as ImageIcon, Check, X } from "lucide-react";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { useRef, useState, useEffect } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { ProductFormValues } from "../pages/admin/AddProduct";
import { useGetCategories } from "@/hooks/useCategories";
import { HexColorPicker } from "react-colorful";
import MyImage from "@/components/MyImage";

interface ProductImageFormProps {
  existingImages?: string[];
  isEdit?: boolean; // Prop to handle Edit mode
}

const ProductImageForm = ({ existingImages = [], isEdit = false }: any) => {
  const t = useTranslations("translation");
  const { control, watch, setValue } = useFormContext<ProductFormValues>();
  const mainInputRef = useRef<HTMLInputElement>(null);
  const thumbInputRef = useRef<HTMLInputElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  const [showPicker, setShowPicker] = useState(false);
  const [pendingColor, setPendingColor] = useState("#6366f1");

  const { data: categoriesData, isLoading: categoriesLoading } = useGetCategories();

  // We use imageFiles to store both Files and existing URL strings
  const mixedImages = watch("imageFiles") || [];
  const selectedColors: string[] = watch("colors") ?? [];

  // Important: On Edit, prime the form state with existing images if empty
  useEffect(() => {
    if (isEdit && existingImages.length > 0 && mixedImages.length === 0) {
      setValue("imageFiles", existingImages as any);
    }
  }, [existingImages, isEdit, setValue, mixedImages.length]);

  const categories = categoriesData?.data || [];

  const handleMainFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Replace index 0, keep others
    const remaining = mixedImages.slice(1);
    setValue("imageFiles", [file, ...remaining] as any);
  };

  const handleThumbFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    // Append new files to existing list
    setValue("imageFiles", [...mixedImages, ...files] as any);
  };

  const removeImage = (idx: number) => {
    const updated = [...mixedImages];
    updated.splice(idx, 1);
    setValue("imageFiles", updated as any);
  };

  const getPreview = (item: string | File) => {
    if (typeof item === "string") return item;
    return URL.createObjectURL(item);
  };

  const handleAddColor = () => {
    if (!selectedColors.includes(pendingColor)) {
      setValue("colors", [...selectedColors, pendingColor]);
    }
    setShowPicker(false);
  };

  return (
    <div className="lg:col-span-3 space-y-6">
      <Card className="border shadow-none h-full">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-700">
            {isEdit ? t("editProductImages") : t("uploadProductImage")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          <input ref={mainInputRef} type="file" accept="image/*" className="hidden" onChange={handleMainFile} />
          <input ref={thumbInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleThumbFiles} />

          {/* Main Image */}
          <div className="space-y-2">
            <Label>{t("productImage")}</Label>
            <div className="relative aspect-video w-full rounded-2xl border border-dashed border-gray-200 flex items-center justify-center overflow-hidden bg-gray-50/40">
              {mixedImages.length > 0 ? (
                <MyImage
                  src={getPreview(mixedImages[0])}
                  alt="Product"
                  width={400}
                  height={400}
                  className="object-contain p-10 w-full h-full"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-300">
                  <ImageIcon size={36} />
                  <span className="text-sm">{t("noImageUploaded")}</span>
                </div>
              )}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                <Button type="button" variant="outline" size="sm"
                  className="bg-white/90 backdrop-blur-sm gap-2 rounded-lg"
                  onClick={() => mainInputRef.current?.click()}>
                  <ImageIcon size={14} /> {t("browse")}
                </Button>
                <Button type="button" variant="outline" size="sm"
                  className="bg-white/90 backdrop-blur-sm gap-2 rounded-lg"
                  onClick={() => mainInputRef.current?.click()}>
                  {t("replace")} <RotateCcw size={14} />
                </Button>
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-3 gap-4">
            {mixedImages.slice(1).map((item, i) => (
              <div key={i} className="relative aspect-square border rounded-xl overflow-hidden">
                <img src={getPreview(item as any)} alt="Thumbnail" className="object-contain p-2 w-full h-full" />
                <button type="button"
                  className="absolute top-1 right-1 bg-white/80 rounded-full p-1 shadow-sm hover:bg-red-500 hover:text-white transition-colors"
                  onClick={() => removeImage(i + 1)}>
                  <X size={12} />
                </button>
                <div className="absolute bottom-1 left-1 text-[8px] px-1 bg-gray-100 rounded text-gray-400 font-bold uppercase">
                  {typeof item === "string" ? "Saved" : "New"}
                </div>
              </div>
            ))}
            <div
              className="aspect-square border border-dashed border-aqua/40 rounded-xl flex flex-col items-center justify-center text-aqua cursor-pointer hover:bg-aqua/5 transition-colors"
              onClick={() => thumbInputRef.current?.click()}>
              <Plus size={20} />
              <span className="text-sm mt-1">{t("addImage")}</span>
            </div>
          </div>

          {/* Category - HIDDEN ON EDIT */}
          {!isEdit && (
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label>{t("productCategory")}</Label>
                <Controller
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <Select value={field.value ?? ""} onValueChange={field.onChange} disabled={categoriesLoading}>
                      <SelectTrigger className="rounded-md">
                        <SelectValue placeholder={categoriesLoading ? "Loading..." : t("selectCategory")} />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category: any) => (
                          <SelectItem key={category._id} value={category._id}>
                            {category.name?.en || category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          )}

          {/* Colors - ALWAYS VISIBLE */}
          <div className="space-y-2 pt-2">
            <Label>{t("selectAvailableColors")}</Label>
            <div className="flex flex-wrap gap-2.5">
              {selectedColors.map((hex) => (
                <div
                  key={hex}
                  onClick={() => setValue("colors", selectedColors.filter(c => c !== hex))}
                  className="h-10 w-10 rounded-md cursor-pointer border hover:ring-2 ring-aqua/20 transition-all flex items-center justify-center"
                  style={{ backgroundColor: hex }}
                  title={hex}
                >
                  <Check size={12} className="text-white drop-shadow" />
                </div>
              ))}

              <div className="relative">
                <div
                  onClick={() => setShowPicker((prev) => !prev)}
                  className="h-10 w-10 rounded-md cursor-pointer border-2 border-dashed border-gray-200 hover:border-aqua hover:bg-aqua/5 transition-all flex items-center justify-center text-gray-400 hover:text-aqua"
                >
                  <Plus size={18} />
                </div>

                {showPicker && (
                  <div ref={pickerRef} className="absolute z-50 bottom-12 left-0 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 flex flex-col gap-3 w-[220px]">
                    <HexColorPicker color={pendingColor} onChange={setPendingColor} style={{ width: "100%", height: "160px" }} />
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-md border shadow-sm shrink-0" style={{ backgroundColor: pendingColor }} />
                      <span className="text-sm font-mono text-gray-500">{pendingColor}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button type="button" size="sm" className="flex-1" onClick={handleAddColor}>Add</Button>
                      <Button type="button" size="sm" variant="outline" className="flex-1" onClick={() => setShowPicker(false)}>Cancel</Button>
                    </div>
                  </div>
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