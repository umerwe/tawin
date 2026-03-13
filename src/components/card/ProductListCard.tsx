"use client";

import Image from "@/components/MyImage";
import { Card, CardContent } from "@/components/ui/card";
import { useLocale } from "next-intl";

interface ProductListCardProps {
  title: string;
  image: string;
}

export const ProductListCard = ({ title, image }: ProductListCardProps) => {
  const locale = useLocale() as "en" | "ar";

  return (
    <Card className="border shadow-none hover:border-aqua transition-colors cursor-pointer bg-white">
      <CardContent 
        className="flex items-center justify-between" 
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
        <span className="text-sm font-semibold text-gray-700">{title}</span>
        <div className="h-14 w-14 relative overflow-hidden rounded-lg">
          <Image src={image} alt={title} fill className="object-contain" />
        </div>
      </CardContent>
    </Card>
  );
};