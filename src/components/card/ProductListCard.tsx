"use client";

import Image from "@/components/MyImage";
import { Card, CardContent } from "@/components/ui/card";

interface ProductListCardProps {
  title: string;
  image: string;
}

export const ProductListCard = ({ title, image }: ProductListCardProps) => {
  return (
    <Card className="border shadow-none hover:border-aqua transition-colors cursor-pointer bg-white">
      <CardContent className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700">{title}</span>
        <div className="h-14 w-14 relative overflow-hidden rounded-lg">
          <Image src={image} alt={title} fill className="object-contain" />
        </div>
      </CardContent>
    </Card>
  );
};