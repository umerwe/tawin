"use client";

import { useState } from "react";
import Image from "@/components/MyImage";
import { TableCell } from "@/components/ui/table";
import { DataTable } from "@/components/DataTable";
import { cn } from "@/lib/utils";
import OrderDetailDialog from "@/components/dialog/OrderDetailDialog";

interface OrderTableProps {
  activeTab: string;
  data: any[];
}

const OrderTable = ({ activeTab, data }: OrderTableProps) => {
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredData = data.filter((order) => {
    const matchesTab = activeTab === "All Orders" || order.status.en === activeTab;
    return matchesTab;
  });

  const cols = ["no", "orderId", "product", "date", "price", "payment", "status"];

  const handleRowClick = (item: any) => {
    setSelectedOrder(item);
    setDialogOpen(true);
  };

  const row = (item: any, index: number, locale: "en" | "ar") => (
    <>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        {item.id}
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        {item.orderId}
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 relative overflow-hidden rounded shrink-0">
            <Image src={item.img} alt={item.product[locale]} fill className="object-cover" />
          </div>
          <span className="text-sm font-medium line-clamp-1">{item.product[locale]}</span>
        </div>
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        {item.date}
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        ${item.price}
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        <div className="flex items-center gap-2 text-sm">
          <span
            className={cn(
              "h-2 w-2 rounded-full",
              item.payment.en === "Paid" ? "bg-aqua" : "bg-red-500"
            )}
          />
          <span>{item.payment[locale]}</span>
        </div>
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        <div
          className={cn(
            "flex items-center gap-2 font-medium text-xs px-2 py-1 rounded-full w-fit",
            item.color,
            "bg-opacity-10"
          )}
        >
          <span>{item.status[locale]}</span>
        </div>
      </TableCell>
    </>
  );

  return (
    <>
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

      <OrderDetailDialog
        order={selectedOrder}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
};

export default OrderTable;