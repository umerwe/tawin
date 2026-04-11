"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";

interface ProductFormProps {
  isEdit?: boolean;
}

const ProductForm = ({ isEdit = false }: any) => {
  const t = useTranslations("translation");
  const { register, control } = useFormContext();
  const [titleLang, setTitleLang] = useState<"en" | "ar">("en");
  const [descLang, setDescLang] = useState<"en" | "ar">("en");

  const LangToggle = ({
    lang, setLang,
  }: { lang: "en" | "ar"; setLang: (l: "en" | "ar") => void }) => (
    <div className="flex gap-1 ml-auto">
      {(["en", "ar"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          className={`px-2 py-0.5 text-xs rounded font-semibold transition-colors ${
            lang === l
              ? "bg-aqua text-white"
              : "bg-gray-100 text-gray-400 hover:bg-gray-200"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );

  return (
    <div className="lg:col-span-3">
      <Card className="border shadow-none h-full">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-700">
            {isEdit ? t("editProduct") : t("productInformation")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Title EN / AR - ALWAYS VISIBLE */}
          <div className="space-y-2">
            <div className="flex items-center">
              <Label>{t("productName")}</Label>
              <LangToggle lang={titleLang} setLang={setTitleLang} />
            </div>
            <div className={titleLang === "en" ? "block" : "hidden"}>
              <Input
                {...register("title.en")}
                placeholder="Product name in English"
                className="rounded-md"
              />
            </div>
            <div className={titleLang === "ar" ? "block" : "hidden"}>
              <Input
                {...register("title.ar")}
                placeholder="اسم المنتج بالعربية"
                className="rounded-md text-right"
                dir="rtl"
              />
            </div>
          </div>

          {/* Description EN / AR - ALWAYS VISIBLE */}
          <div className="space-y-2">
            <div className="flex items-center">
              <Label>{t("productDescription")}</Label>
              <LangToggle lang={descLang} setLang={setDescLang} />
            </div>
            <div className="relative">
              <div className={descLang === "en" ? "block" : "hidden"}>
                <textarea
                  {...register("description.en")}
                  className="w-full min-h-[140px] p-4 pb-10 rounded-md bg-gray-50 border border-transparent focus:border-aqua outline-none text-sm text-gray-600 transition-all resize-none"
                  placeholder="Describe your product in English…"
                />
              </div>
              <div className={descLang === "ar" ? "block" : "hidden"}>
                <textarea
                  {...register("description.ar")}
                  className="w-full min-h-[140px] p-4 pb-10 rounded-md bg-gray-50 border border-transparent focus:border-aqua outline-none text-sm text-gray-600 transition-all resize-none text-right"
                  placeholder="اوصف منتجك بالعربية…"
                  dir="rtl"
                />
              </div>
            </div>
          </div>

          {/* Pricing - HIDDEN ON EDIT */}
          {!isEdit && (
            <div className="space-y-4 pt-2">
              <h3 className="text-lg font-bold text-gray-700">{t("pricing")}</h3>
              <div className="space-y-2">
                <Label>{t("productPrice")}</Label>
                <div className="relative">
                  <Input
                    {...register("price", { valueAsNumber: true })}
                    type="number"
                    placeholder="0.00"
                    className="pl-14 font-bold rounded-md"
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pr-2 border-r border-gray-200">
                    <span className="text-base">🇺🇸</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stock & New Arrival - HIDDEN ON EDIT */}
          {!isEdit && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Is New Arrival</Label>
                <Controller
                  control={control}
                  name="isNewArrival"
                  render={({ field }) => (
                    <Select
                      value={field.value === true ? "true" : field.value === false ? "false" : ""}
                      onValueChange={(v) => field.onChange(v === "true")}
                    >
                      <SelectTrigger className="rounded-md">
                        <SelectValue placeholder="Select…" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label>Remaining Pieces</Label>
                <Input
                  {...register("remainingPieces", { valueAsNumber: true })}
                  type="number"
                  placeholder="0"
                  className="rounded-md"
                />
              </div>
            </div>
          )}

          {/* Sizes - ALWAYS VISIBLE */}
          <div className="space-y-2">
            <Label>Sizes</Label>
            <Controller
              control={control}
              name="sizes"
              render={({ field }) => {
                const all = ["XS", "S", "M", "L", "XL", "XXL"] as const;
                const selected: string[] = field.value ?? [];
                const toggle = (s: string) =>
                  field.onChange(
                    selected.includes(s)
                      ? selected.filter((x) => x !== s)
                      : [...selected, s]
                  );
                return (
                  <div className="flex flex-wrap gap-2">
                    {all.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggle(s)}
                        className={`px-3 py-1.5 text-sm rounded-md border font-medium transition-colors ${
                          selected.includes(s)
                            ? "bg-aqua text-white border-aqua"
                            : "bg-white text-gray-500 border-gray-200 hover:border-aqua/50"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                );
              }}
            />
          </div>

          {/* Weight - HIDDEN ON EDIT */}
          {!isEdit && (
            <div className="space-y-2">
              <Label>Weight</Label>
              <div className="flex gap-3">
                <Controller
                  control={control}
                  name="weights.0.unit"
                  render={({ field }) => (
                    <Select value={field.value ?? ""} onValueChange={field.onChange}>
                      <SelectTrigger className="w-28 rounded-md">
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {["g", "kg", "mg", "l", "ml"].map((u) => (
                          <SelectItem key={u} value={u}>{u}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <Input
                  {...register("weights.0.value")}
                  placeholder="e.g. 500"
                  className="flex-1 rounded-md"
                />
              </div>
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
};

export default ProductForm;