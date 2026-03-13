"use client";

import Image from "next/image";
import { ListFilter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { DataTable } from "@/components/DataTable";

const products = [
  {
    id: "1",
    name: { en: "Wooden Door", ar: "باب خشبي" },
    code: "#FXZ-4567",
    orders: 104,
    status: { en: "In Stock", ar: "متوفر" },
    price: "$999.00",
    img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800&auto=format&fit=crop",
    color: "bg-aqua",
    textColor: "text-aqua"
  },
  {
    id: "2",
    name: { en: "Nike Air Jordan", ar: "نايكي إير جوردان" },
    code: "#FXZ-4567",
    orders: 56,
    status: { en: "Out of Stock", ar: "غير متوفر" },
    price: "$999.00",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
    color: "bg-red-500",
    textColor: "text-red-600"
  },
  {
    id: "3",
    name: { en: "Wooden Door", ar: "باب خشبي" },
    code: "#FXZ-4567",
    orders: 104,
    status: { en: "In Stock", ar: "متوفر" },
    price: "$999.00",
    img: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=800&auto=format&fit=crop",
    color: "bg-aqua",
    textColor: "text-aqua"
  },
  {
    id: "4",
    name: { en: "Wooden Door", ar: "باب خشبي" },
    code: "#FXZ-4567",
    orders: 104,
    status: { en: "In Stock", ar: "متوفر" },
    price: "$999.00",
    img: "https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?q=80&w=800&auto=format&fit=crop",
    color: "bg-aqua",
    textColor: "text-aqua"
  },
];

const TopSellingProducts = () => {
  const cols = ["product", "totalOrders", "status", "price"];

  // Updated row function to accept locale from DataTable
  const row = (product: typeof products[0], index: number, locale: "en" | "ar") => (
    <>
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 relative rounded bg-gray-100 overflow-hidden">
            {/* Added proper alt translation */}
            <Image src={product.img} alt={product.name[locale]} fill className="object-cover" />
          </div>
          <div className="flex flex-col">
            {/* Displaying name based on locale */}
            <span className="font-semibold text-sm">{product.name[locale]}</span>
            <span className="text-xs text-muted-foreground">Item: {product.code}</span>
          </div>
        </div>
      </TableCell>
      <TableCell>{product.orders}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className={`h-1.5 w-1.5 rounded-full ${product.color}`} />
          <span className={`${product.textColor}`}>
            {/* Displaying status based on locale */}
            {product.status[locale]}
          </span>
        </div>
      </TableCell>
      <TableCell>{product.price}</TableCell>
    </>
  );

  return (
    <Card className="h-full border shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Top Selling Products</CardTitle>
        <Button variant="primary" size="sm" className="w-24">
          <ListFilter className="h-4 w-4" /> Filter
        </Button>
      </CardHeader>

      <CardContent>
        <div className="overflow-hidden">
          <DataTable
            cols={cols}
            data={products}
            row={row}
            headerClassName="bg-aqua/5 border-none"
            showPagination={false}
          />
        </div>

        <div className="flex justify-end mt-4">
          <Button variant="default" size="xs">
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopSellingProducts;