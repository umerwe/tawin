"use client";

import Image from "@/components/MyImage";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocale } from "next-intl";

interface MiniCardProps {
  data: any;
  isLoading?: boolean;
}

const MiniCard = ({ data, isLoading }: any) => {
  const locale = useLocale() as "en" | "ar";

  if (isLoading) {
    return (
      <Card className="border shadow-none bg-white">
        <CardContent
          className="flex items-center justify-between"
          dir={locale === "ar" ? "rtl" : "ltr"}
        >
          <Skeleton className="h-4 w-20 rounded" />
          <Skeleton className="h-14 w-14 rounded-lg" />
        </CardContent>
      </Card>
    );
  }

  return (
    data?.map((item: any) => (
      <Card key={item._id} className="border shadow-none hover:border-aqua transition-colors cursor-pointer bg-white">
        <CardContent
          className="flex items-center justify-between"
          dir={locale === "ar" ? "rtl" : "ltr"}
        >
          <span className="text-sm font-semibold text-gray-700">{item.name[locale]}</span>
          <div className="h-14 w-14 relative overflow-hidden rounded-lg">
            <Image src={item.thumbnail} alt={item.name[locale]} fill className="object-contain" />
          </div>
        </CardContent>
      </Card>
    ))
  )
};
export default MiniCard;