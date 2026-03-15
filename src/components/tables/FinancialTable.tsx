"use client";

import { useState } from "react";
import { TableCell } from "@/components/ui/table";
import { DataTable } from "@/components/DataTable";
import { cn } from "@/lib/utils";
import FinancialDetailDialog from "../dialog/FinancialDetailDialog";

const FinancialTable = ({ data, activeTab }: { data: any[]; activeTab: string }) => {
  const cols = ["userCode", "name", "date", "total", "paymentMethod", "status", "transactions"];

  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleViewDetails = (item: any) => {
    setSelectedTransaction(item);
    setDialogOpen(true);
  };

  const row = (item: any, index: number, locale: "en" | "ar") => (
    <>
      <TableCell>{item.userCode}</TableCell>
      <TableCell>{item.name[locale]}</TableCell>
      <TableCell>{item.date}</TableCell>
      <TableCell>{item.total}</TableCell>
      <TableCell>{item.method[locale]}</TableCell>
      <TableCell>
        <span
          className={cn(
            "text-xs font-bold",
            item.status.en === "Completed"
              ? "text-aqua"
              : item.status.en === "Cancelled"
                ? "text-red-500"
                : "text-amber-500"
          )}
        >
          {item.status[locale]}
        </span>
      </TableCell>
      <TableCell>
        <button
          className="text-purple-500 font-semibold text-sm hover:underline"
          onClick={() => handleViewDetails(item)}
        >
          View Details
        </button>
      </TableCell>
    </>
  );

  return (
    <>
      <DataTable
        data={data}
        cols={cols}
        row={row}
        headerClassName="bg-aqua/5 border-none"
        pagination={{ total: 240, page: 1, limit: 10, setPage: () => { } }}
      />

      <FinancialDetailDialog
        transaction={selectedTransaction}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
};

export default FinancialTable;