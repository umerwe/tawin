import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SearchInput from "@/components/ui/searchInput";
import Image from "next/image";

const categories = [
  { name: "Doors", id: "#FXZ-4567", price: "$999.00", img: "/door.png" },
  { name: "Lamps", id: "#FXZ-4567", price: "$72.40", img: "/lamp.png" },
  { name: "Electrical", id: "#FXZ-4567", price: "$72.40", img: "/cable.png" },
  { name: "Measuring Tools", id: "#FXZ-4567", price: "$72.40", img: "/meter.png" },
];

const TopCategories = () => {
  return (
    <Card className="h-full border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Top Categories</CardTitle>
        <span className="text-xs text-purple-600 cursor-pointer">All Categories</span>
      </CardHeader>
      <CardContent className="space-y-2">
        <SearchInput placeholder="Search" />
        <div className="divide-y">
          {categories.map((item, i) => (
            <div key={i} className="flex items-center gap-4 py-3">
              {/* Fixed Image Container */}
              <div className="h-10 w-10 shrink-0 rounded-md bg-gray-100 overflow-hidden">
                <Image 
                  src={item.img} 
                  alt={item.name}
                  fill
                  className="object-cover" 
                />
              </div>
              
              <div className="flex flex-1 flex-col">
                <span className="text-sm font-semibold">{item.name}</span>
                <span className="text-xs text-muted-foreground">Item: {item.id}</span>
              </div>
              
              <span className="font-bold text-sm shrink-0">{item.price}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopCategories;