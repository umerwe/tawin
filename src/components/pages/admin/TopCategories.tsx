import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SearchInput from "@/components/ui/searchInput";
import Image from "@/components/MyImage";

const categories = [
 {
    name: "Doors",
    id: "#FXZ-4567",
    price: "$999.00",
    // NEW: Robust, high-availability door link
    img: "https://images.unsplash.com/photo-1515516089376-88db1e26e9c0?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Lamps",
    id: "#FXZ-4567",
    price: "$72.40",
    img: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Electrical",
    id: "#FXZ-4567",
    price: "$72.40",
    img: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Measuring Tools",
    id: "#FXZ-4567",
    price: "$72.40",
    // NEW: High-availability professional tools
    img: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?q=80&w=400&auto=format&fit=crop"
  },
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
              <div className="relative h-10 w-10 shrink-0 rounded-md overflow-hidden">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  sizes="40px"
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