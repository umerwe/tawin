import { ListFilter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const products = [
    { id: "1", name: "Wooden Door", code: "#FXZ-4567", orders: 104, status: "In Stock", price: "$999.00", img: "/door.png", color: "text-emerald-500" },
    { id: "2", name: "Nike Air Jordan", code: "#FXZ-4567", orders: 56, status: "Out of Stock", price: "$999.00", img: "/shoes.png", color: "text-red-500" },
    { id: "3", name: "Wooden Door", code: "#FXZ-4567", orders: 104, status: "In Stock", price: "$999.00", img: "/door.png", color: "text-emerald-500" },
    { id: "4", name: "Wooden Door", code: "#FXZ-4567", orders: 104, status: "In Stock", price: "$999.00", img: "/door.png", color: "text-emerald-500" },
];

const TopSellingProducts = () => {
    return (
        <Card className="h-full border gap-3">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Top Selling Products</CardTitle>
                <Button
                    variant="primary"
                    size="sm"
                    className="w-24"
                >
                    <ListFilter className="h-4 w-4" /> Filter
                </Button>
            </CardHeader>

            <CardContent>
                <Table>
                    <TableHeader className="bg-aqua/5">
                        <TableRow className="hover:bg-transparent border-none">
                            <TableHead>Product</TableHead>
                            <TableHead>Total Orders</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product, i) => (
                            <TableRow key={i} className="border-none">
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 shrink-0 relative rounded bg-gray-100 overflow-hidden">
                                            <Image src={product.img} alt={product.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-sm">{product.name}</span>
                                            <span className="text-[10px] text-muted-foreground">Item: {product.code}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">{product.orders}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <span className={`h-1.5 w-1.5 rounded-full ${product.status === 'In Stock' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                                        <span className={`text-xs font-medium ${product.status === 'In Stock' ? 'text-emerald-600' : 'text-red-600'}`}>
                                            {product.status}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="font-bold">{product.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                
                <div className="flex justify-end">
                    <Button
                        variant="default"
                        size="xs"
                    >
                        Details
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default TopSellingProducts;