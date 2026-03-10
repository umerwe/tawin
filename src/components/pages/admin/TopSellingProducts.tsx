"use client";

import Image from "next/image";
import { ListFilter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { DataTable } from "@/components/DataTable";

const products = [
  { id: "1", name: "Wooden Door", code: "#FXZ-4567", orders: 104, status: "In Stock", price: "$999.00", img: "/door.png", color: "bg-emerald-500", textColor: "text-emerald-600" },
  { id: "2", name: "Nike Air Jordan", code: "#FXZ-4567", orders: 56, status: "Out of Stock", price: "$999.00", img: "/shoes.png", color: "bg-red-500", textColor: "text-red-600" },
  { id: "3", name: "Wooden Door", code: "#FXZ-4567", orders: 104, status: "In Stock", price: "$999.00", img: "/door.png", color: "bg-emerald-500", textColor: "text-emerald-600" },
  { id: "4", name: "Wooden Door", code: "#FXZ-4567", orders: 104, status: "In Stock", price: "$999.00", img: "/door.png", color: "bg-emerald-500", textColor: "text-emerald-600" },
];

const TopSellingProducts = () => {
  const cols = ["Product", "Total Orders", "Status", "Price"];

  const row = (product: typeof products[0]) => (
    <>
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 relative rounded bg-gray-100 overflow-hidden">
            <Image src={product.img} alt={product.name} fill className="object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">{product.name}</span>
            <span className="text-xs text-muted-foreground">Item: {product.code}</span>
          </div>
        </div>
      </TableCell>
      <TableCell>{product.orders}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className={`h-1.5 w-1.5 rounded-full ${product.color}`} />
          <span className={`${product.textColor}`}>
            {product.status}
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