"use client";

import { useState } from "react";
import Image from "next/image";
import { TableCell } from "@/components/ui/table";
import { DataTable } from "@/components/DataTable";
import { cn } from "@/lib/utils";

interface OrderTableProps {
    activeTab: string;
    data: any[];
}

const OrderTable = ({ activeTab, data }: OrderTableProps) => {
    const [page, setPage] = useState(1);

    // Filter Logic
    const filteredData = data.filter((order: typeof data[0]) => {
        const matchesTab = activeTab === "All Orders" || order.status === activeTab;

        return matchesTab;
    });

    const cols = ["no", "order id", "product", "date", "price", "payment", "status"];

    const row = (item: typeof data[0]) => (
        <>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.orderId}</TableCell>
            <TableCell>
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 relative rounded-full overflow-hidden bg-slate-100 border">
                        <Image src={item.img} alt="product" fill className="object-cover" />
                    </div>
                    <span className="text-sm font-medium line-clamp-1">{item.product}</span>
                </div>
            </TableCell>
            <TableCell>{item.date}</TableCell>
            <TableCell>${item.price}</TableCell>
            <TableCell>
                <div className="flex items-center gap-2 text-sm">
                    <span className={cn("h-2 w-2 rounded-full", item.payment === "Paid" ? "bg-emerald-500" : "bg-red-500")} />
                    <span>{item.payment}</span>
                </div>
            </TableCell>
            <TableCell>
                <div className={cn("flex items-center gap-2 font-medium text-xs px-2 py-1 rounded-full w-fit", item.color, "bg-opacity-10")}>
                    <span>{item.status}</span>
                </div>
            </TableCell>
        </>
    );

    return (
        <div className="w-full">
            <DataTable
                data={filteredData}
                cols={cols}
                row={row}
                headerClassName="bg-aqua/5 border-none"
                pagination={{
                    total: filteredData.length,
                    page: page,
                    limit: 10,
                    setPage: (p) => setPage(p),
                }}
            />
        </div>
    );
};

export default OrderTable;