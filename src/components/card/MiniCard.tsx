"use client";

import Image from "@/components/MyImage";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocale, useTranslations } from "next-intl";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import CategoryFormDialog from "@/components/dialog/CategoryFormDialog";
import CategoryDetailDialog from "@/components/dialog/CategoryDetailDialog";
import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import { useDeleteCategory } from "@/hooks/useCategories";

const MiniCard = ({ data, isLoading }: { data: any[]; isLoading: boolean }) => {
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("translation");
  const tConfirm = useTranslations("confirm");

  const [editCategory, setEditCategory] = useState<any | null>(null);
  const [detailCategory, setDetailCategory] = useState<any | null>(null);

  const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="border shadow-none bg-white">
            <CardContent className="flex items-center justify-between" dir={locale === "ar" ? "rtl" : "ltr"}>
              <Skeleton className="h-4 w-20 rounded" />
              <Skeleton className="h-14 w-14 rounded-lg" />
            </CardContent>
          </Card>
        ))}
      </>
    );
  }

  return (
    <>
      {data?.map((item: any) => (
        <Card
          key={item._id}
          className="border shadow-none hover:border-aqua transition-colors bg-white group relative cursor-pointer"
          onClick={() => setDetailCategory(item)}
        >
          <CardContent
            className="flex items-center justify-between"
            dir={locale === "ar" ? "rtl" : "ltr"}
          >
            <span className="text-sm font-semibold text-gray-700 capitalize">
              {item.name[locale]}
            </span>
            <div className="h-14 w-14 relative overflow-hidden rounded-lg">
              <Image
                src={item.thumbnail}
                alt={item.name[locale]}
                fill
                className="object-contain"
              />
            </div>
          </CardContent>

          {/* Hover Action Buttons */}
          <div
            className="absolute top-2 right-2 hidden group-hover:flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-100 shadow-sm p-1"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setEditCategory(item)}
              className="text-slate-400 hover:text-aqua transition-colors p-1.5 rounded-md hover:bg-aqua/10 cursor-pointer"
              title={t("edit")}
            >
              <Pencil size={14} />
            </button>

            <ConfirmDialog
              title={tConfirm("delete.title", { value: t("category") })}
              description={tConfirm("delete.description", { value: t("category") })}
              variant="destructive"
              loading={isDeleting}
              onConfirm={(closeDialog) => {
                deleteCategory(item._id, {
                  onSuccess: () => closeDialog(),
                });
              }}
              asChild
            >
              <button
                className="text-slate-400 hover:text-red-500 transition-colors p-1.5 rounded-md hover:bg-red-50 cursor-pointer disabled:opacity-50"
                title={t("delete")}
              >
                <Trash2 size={14} />
              </button>
            </ConfirmDialog>
          </div>
        </Card>
      ))}

      <CategoryDetailDialog
        category={detailCategory}
        open={!!detailCategory}
        onClose={() => setDetailCategory(null)}
      />

      <CategoryFormDialog
        open={!!editCategory}
        onClose={() => setEditCategory(null)}
        category={editCategory}
      />
    </>
  );
};

export default MiniCard;