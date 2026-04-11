"use client";

import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultilingualInput } from "../form/MultilingualInput";
import { useCreateCategory, useUpdateCategory, useGetCategories } from "@/hooks/useCategories";
import { Category } from "@/types/category";
import { ImagePlus } from "lucide-react";
import MyImage from "../MyImage";

interface CategoryFormDialogProps {
  open: boolean;
  onClose: () => void;
  category?: Category | null;
}

const CategoryFormDialog = ({ open, onClose, category }: CategoryFormDialogProps) => {
  const t = useTranslations("translation");
  const locale = useLocale() as "en" | "ar";
  const isEdit = !!category;

  const { data: categoriesData } = useGetCategories();
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();

  const [previews, setPreviews] = useState<{ thumb: string | null; icon: string | null }>({
    thumb: null,
    icon: null,
  });

  const methods = useForm({
    defaultValues: {
      name: { en: "", ar: "" },
      description: { en: "", ar: "" },
      parentCategory: "none",
      type: "category",
    },
  });

  const { reset, handleSubmit, setValue, watch } = methods;
  const selectedType = watch("type");
  const currentParent = watch("parentCategory");

  useEffect(() => {
    if (open) {
      if (category) {
        reset({
          name: { en: category.name?.en || "", ar: category.name?.ar || "" },
          description: { en: category.description?.en || "", ar: category.description?.ar || "" },
          parentCategory: category.parentCategory || "none",
          type: category.type || "category",
        });
        setPreviews({ thumb: category.thumbnail || null, icon: category.icon || null });
      } else {
        reset({
          name: { en: "", ar: "" },
          description: { en: "", ar: "" },
          parentCategory: "none",
          type: "category",
        });
        setPreviews({ thumb: null, icon: null });
      }
    }
  }, [category, open, reset]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'thumb' | 'icon') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => ({ ...prev, [type]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: any) => {
    const data = new FormData();
    data.append("name[en]", values.name.en);
    data.append("name[ar]", values.name.ar);
    data.append("description[en]", values.description.en);
    data.append("description[ar]", values.description.ar);
    data.append("type", values.type);

    if (values.type === "subCategory" && values.parentCategory !== "none") {
      data.append("parentCategory", values.parentCategory);
    }

    const thumbFile = (document.getElementById("thumbnail-input") as HTMLInputElement)?.files?.[0];
    const iconFile = (document.getElementById("icon-input") as HTMLInputElement)?.files?.[0];

    if (thumbFile) data.append("thumbnail", thumbFile);
    if (iconFile) data.append("icon", iconFile);

    // Separate the calls so TypeScript knows exactly which types are being used
    if (isEdit && category?._id) {
      updateMutation.mutate(
        { id: category._id, formData: data },
        { onSuccess: () => onClose() }
      );
    } else {
      createMutation.mutate(
        data,
        { onSuccess: () => onClose() }
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-700">
            {isEdit ? t("editCategory") : t("addNewCategory")}
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-2">

            <div className="space-y-2">
              <Label>{t("type")}</Label>
              <Select
                value={selectedType}
                onValueChange={(v) => {
                  setValue("type", v);
                  if (v === "category") setValue("parentCategory", "none");
                }}
              >
                <SelectTrigger className="rounded-md h-10 border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="category">{t("category")}</SelectItem>
                  <SelectItem value="subCategory">{t("subCategory")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <MultilingualInput
              label={t("categoryName")}
              name="name"
              placeholderEn={t("placeholderNameEn")}
              placeholderAr={t("placeholderNameAr")}
            />

            <MultilingualInput
              label={t("description")}
              name="description"
              type="textarea"
              placeholderEn={t("placeholderDescEn")}
              placeholderAr={t("placeholderDescAr")}
            />

            {selectedType === "subCategory" && (
              <div className="space-y-2">
                <Label>{t("parentCategory")}</Label>
                <Select
                  value={currentParent}
                  onValueChange={(v) => setValue("parentCategory", v)}
                >
                  <SelectTrigger className="rounded-md h-10 border-gray-200">
                    <SelectValue placeholder={t("selectParent")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">{t("selectParentCategory")}</SelectItem>
                    {categoriesData?.data?.filter((cat: Category) => cat._id !== category?._id).map((cat: Category) => (
                      <SelectItem key={cat._id} value={cat._id}>
                        {cat.name[locale]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-6 pt-2">
              <div className="space-y-3">
                <Label>{t("thumbnail")}</Label>
                <div className="relative group flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl hover:border-aqua/50 transition-colors bg-gray-50/50 overflow-hidden">
                  {previews.thumb ? (
                    <MyImage
                      src={previews.thumb}
                      alt="Preview"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-gray-400">
                      <ImagePlus size={24} />
                      <span className="text-[10px] mt-1">{t("upload")}</span>
                    </div>
                  )}
                  <Input
                    id="thumbnail-input"
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'thumb')}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>{t("icon")}</Label>
                <div className="relative group flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl hover:border-aqua/50 transition-colors bg-gray-50/50 overflow-hidden">
                  {previews.icon ? (
                    <MyImage
                      src={previews.icon}
                      alt="Preview"
                      width={48}
                      height={48}
                      className="w-12 h-12 object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-gray-400">
                      <ImagePlus size={24} />
                      <span className="text-[10px] mt-1">{t("upload")}</span>
                    </div>
                  )}
                  <Input
                    id="icon-input"
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'icon')}
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="pt-6 border-t gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onClose}
                className="w-full rounded-full"
              >
                {t("cancel")}
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {createMutation.isPending || updateMutation.isPending
                  ? t("saving")
                  : (isEdit ? t("update") : t("create"))
                }
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryFormDialog;