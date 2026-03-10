import { MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const regionData = [
  { name: "Baghdad", value: "30k", percentage: 25.8, trend: "up" },
  { name: "Basra", value: "30k", percentage: 15.8, trend: "down" },
  { name: "Babil", value: "30k", percentage: 25.8, trend: "up" },
];

const SalesByRegion = () => {
  return (
    <Card className="w-full border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-sm font-medium text-purple-500">
            Active Users (Last Hour)
          </CardTitle>
          <div className="text-2xl font-bold">21.5K</div>
        </div>
        <MoreVertical className="h-4 w-4 text-muted-foreground cursor-pointer" />
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Users per minute placeholder (Simplified Bar logic) */}
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Users per minute</p>
          <div className="flex items-end gap-1 h-12">
            {[40, 70, 45, 90, 65, 30, 80, 50, 60].map((h, i) => (
              <div key={i} className="bg-aqua w-full rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        <div className="flex justify-between text-sm font-semibold">
          <span>Sales by Region</span>
          <span>Sales</span>
        </div>

        <div className="space-y-4">
          {regionData.map((region) => (
            <div key={region.name} className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <div className="flex flex-col">
                  <span className="font-bold">{region.value}</span>
                  <span className="text-muted-foreground">{region.name}</span>
                </div>
                <span className={region.trend === "up" ? "text-aqua" : "text-red-500"}>
                  {region.trend === "up" ? "▲" : "▼"} {region.percentage}%
                </span>
              </div>
              <Progress value={region.percentage} className="h-2 bg-blue-100" />
            </div>
          ))}
        </div>

        <Button 
        className="w-full"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default SalesByRegion;