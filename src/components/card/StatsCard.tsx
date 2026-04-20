"use client";

import { MoreVertical, ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useLocale } from 'next-intl';

interface StatCardProps {
  data: any;
  isHome?: boolean;
  isTrendingAllowed?: boolean;
}

const StatsCard = ({ data, isHome = false, isTrendingAllowed = false }: StatCardProps) => {
  const locale = useLocale() as "en" | "ar";

  const title = data.title[locale];
  const value = data.value;
  const trend = data.trend || data.change;
  const isUp = data.isUp ?? (data.changeType === 'increase');
  const subtitle = data.subtitle?.[locale] || data.footerLabel?.[locale];

  if (isHome) {
    return (
      <Card className="relative border shadow-sm text-start">
        <div className="absolute ltr:right-4 rtl:left-4 top-6 text-gray-400 hover:text-gray-600">
          <MoreVertical size={20} />
        </div>

        <CardHeader className='mb-1'>
          <CardTitle className="text-black text-lg font-bold">{title}</CardTitle>
          <CardDescription className="text-gray-400 text-xs">{subtitle}</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex items-center gap-2">
            <div className="text-3xl font-semibold text-black">{value}</div>
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium",
              isUp ? "text-aqua" : "text-red-500"
            )}>
              {/* Use scale-x-[-1] for icons in RTL if they should be mirrored */}
              <div className={cn(locale === 'ar' && "rtl:scale-x-[-1]")}>
                {isUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
              </div>
              <span>{trend}</span>
              {data.changeLabel && (
                <span className="text-black mx-1 font-normal">{data.changeLabel[locale]}</span>
              )}
            </div>
          </div>
          {data.footerLabel && (
            <div className="text-xs text-gray-400 font-medium mt-1">
              {data.footerLabel[locale]}
              <span className="mx-1 text-purple font-bold">{data.footerValue}</span>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button variant="default" size="xs">Details</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="border shadow-none">
      <CardContent>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-black">{title}</h3>
          <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold">{value}</span>
            {
              isTrendingAllowed && (
                <span className={cn(
                  "text-xs font-medium flex items-center gap-1",
                  isUp ? "text-aqua" : "text-red-500"
                )}>
                  <div className={cn(locale === 'ar' && "rtl:scale-x-[-1]")}>
                    {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  </div>
                  {trend}
                </span>
              )
            }
          </div>

          {/* <span className="text-sm text-muted-foreground whitespace-nowrap pt-3">
            {subtitle}
          </span> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;