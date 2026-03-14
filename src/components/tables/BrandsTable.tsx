"use client";

import { useState } from "react";
import { TableCell } from "@/components/ui/table";
import { DataTable } from "@/components/DataTable";
import { cn } from "@/lib/utils";
import { MessageSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const BrandsTable = ({ data, activeTab }: { data: any[], activeTab: string }) => {
    const [page, setPage] = useState(1);
    
    // Columns: brandCode, brandName, registrationDate, brandLogo, status, process
    const cols = ["brandCode", "brandName", "registrationDate", "brandLogo", "status", "process"];

    const filteredData = data.filter(item => {
        const matchesTab = activeTab === "All Brands" || item.status.en === activeTab;
        return matchesTab;
    });

    const row = (item: any, index: number, locale: "en" | "ar") => (
        <>
            <TableCell className="text-muted-foreground">{item.brandCode}</TableCell>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>{item.registrationDate}</TableCell>
            <TableCell>
                <div className="h-8 w-12 relative border rounded bg-gray-50/50 flex items-center justify-center overflow-hidden">
                    {/* Placeholder for brand logo */}
                    <div className="w-4 h-4 bg-gray-400 rounded-sm" /> 
                </div>
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                    <span className={cn("h-1.5 w-1.5 rounded-full",
                        item.status.en === "Active" ? "bg-aqua" : "bg-red-500")}
                    />
                    <span className={cn("text-xs font-medium",
                        item.status.en === "Active" ? "text-aqua" : "text-red-600")}
                    >
                        {item.status[locale]}
                    </span>
                </div>
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-aqua">
                        <MessageSquare size={16} />
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
            pagination={{ total: 24, page, limit: 10, setPage }}
        />
    );
};

export default BrandsTable;