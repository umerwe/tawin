import React from 'react';
import { MoreVertical, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

const StatsCard: React.FC<CardProps> = ({
  title, subtitle, value, change, changeLabel, changeType, footerValue, footerLabel
}) => {
  return (
    <Card className="relative">
      <div className="absolute right-4 top-6 text-gray-400 hover:text-gray-600">
        <MoreVertical size={22} />
      </div>

      <CardHeader className='mb-1'>
        <CardTitle className="text-black text-lg font-semibold">{title}</CardTitle>
        <CardDescription className="text-gray-400 text-xs">{subtitle}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-2">
          <div className="text-3xl font-semibold text-black">{value}</div>
          <div className={cn(
            "flex items-center gap-1 text-sm font-medium",
            changeType === 'increase' ? "text-aqua" : "text-red"
          )}>
            {changeType === 'increase' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
            <span>{change}</span>
            <span className="text-black ml-1 font-normal">{changeLabel}</span>
          </div>
        </div>
        <div className="text-xs text-gray-400 font-medium mt-1">
          {footerLabel} <span className="ml-1 text-purple font-bold">{footerValue}</span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button>
          Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StatsCard;