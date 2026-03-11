"use client";

import { useState } from "react";
import Image from "next/image";
import { TableCell } from "@/components/ui/table";
import { DataTable } from "@/components/DataTable";
import { Trash2, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductTableProps {
    activeTab: string;
    data: any[];
}

const ProductTable = ({ activeTab, data }: ProductTableProps) => {
    const [page, setPage] = useState(1);
    const cols = ["Number", "Product", "Date Created", "Sort", "Operations"];

    // Filtering logic matching the tabs in FilterSection
    const filteredData = data.filter((item) => {
        if (activeTab === "All Products") return true;
        return item.status === activeTab;
    });

    const row = (item: any) => (
        <>
            <TableCell className="text-muted-foreground">{item.number}</TableCell>
            <TableCell>
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 relative border rounded bg-gray-50 overflow-hidden">
                        <Image 
                            src={item.img} 
                            alt={item.name} 
                            fill 
                            className="object-contain p-1" 
                        />
                    </div>
                    <span className="font-medium text-sm">{item.name}</span>
                </div>
            </TableCell>
            <TableCell className="text-sm">{item.date}</TableCell>
            <TableCell className="text-sm font-medium">{item.sort}</TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-aqua">
                        <Edit3 size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-500">
                        <Trash2 size={16} />
                    </Button>
                </div>
            </TableCell>
        </>
    );

    return (
        <DataTable
            data={filteredData}
            cols={cols}
            row={row}
            headerClassName="bg-aqua/5 border-none"
            pagination={{ 
                total: filteredData.length, 
                page, 
                limit: 10, 
                setPage 
            }}
        />
    );
};

export default ProductTable;