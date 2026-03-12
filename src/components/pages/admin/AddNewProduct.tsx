import { PlusCircle, CirclePlus, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "@/components/MyImage";

const categories = ["Construction Materials", "Construction Materials", "Construction Materials"];
const newProducts = [
  { 
    name: "Smart Fitness Tracker", 
    price: "$39.99", 
    img: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    name: "Smart Fitness Tracker", 
    price: "$39.99", 
    img: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    name: "Smart Fitness Tracker", 
    price: "$39.99", 
    // NEW WORKING IMAGE: Modern Smartwatch
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop" 
  },
];
const AddNewProduct = () => {
  return (
    <Card className="h-full border shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle>Add New Product</CardTitle>
        <Button variant="ghost" size="sm" className="text-purple-500 p-0 hover:bg-transparent gap-1">
          <PlusCircle className="h-4 w-4" /> Add New
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Categories Section */}
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground font-medium">Categories</p>
          {categories.map((cat, i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg group cursor-pointer hover:border-blue-200">
              <div className="h-8 w-8 relative bg-gray-50 rounded">
                <Image src="https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?q=80&w=800&auto=format&fit=crop" alt="cat" fill className="p-1 opacity-70" />
              </div>
              <span className="text-sm font-medium flex-1 px-3">{cat}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-600" />
            </div>
          ))}
          <p className="text-center text-xs text-purple-500 cursor-pointer hover:underline pt-1">Show More</p>
        </div>

        {/* Quick Add Products Section */}
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground font-medium">Products</p>
          {newProducts.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-10 w-10 relative bg-gray-100 rounded overflow-hidden">
                <Image src={item.img} alt="thumb" fill className="object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-semibold leading-none">{item.name}</p>
                <p className="text-xs text-aqua font-bold mt-1">{item.price}</p>
              </div>
              <Button
                variant="primary"
                size="xs"
                className="w-20"
              >
                Add
                <CirclePlus className="h-3 w-3" />
              </Button>
            </div>
          ))}
          <p className="text-center text-xs text-purple-500 cursor-pointer hover:underline pt-1">Show More</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddNewProduct;