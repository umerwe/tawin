"use client";

import { TableCell } from "@/components/ui/table";
import { DataTable } from "@/components/DataTable";
import { cn } from "@/lib/utils";

const FinancialTable = ({ data, activeTab }: { data: any[], activeTab: string }) => {
  const cols = ["userCode", "name", "date", "total", "paymentMethod", "status", "transactions"];

  const row = (item: any, index: number, locale: "en" | "ar") => (
    <>
      <TableCell className="text-muted-foreground font-medium">{item.userCode}</TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell className="text-sm">{item.date}</TableCell>
      <TableCell className="font-bold">{item.total}</TableCell>
      <TableCell className="text-sm">{item.method[locale]}</TableCell>
      <TableCell>
        <span className={cn(
          "text-xs font-bold",
          item.status.en === "Completed" ? "text-aqua" : 
          item.status.en === "Cancelled" ? "text-red-500" : "text-amber-500"
        )}>
          {item.status[locale]}
        </span>
      </TableCell>
      <TableCell>
        <button className="text-purple-500 font-semibold text-sm hover:underline">
          View Details
        </button>
      </TableCell>
    </>
  );

  return (
    <DataTable
      data={data}
      cols={cols}
      row={row}
      headerClassName="bg-aqua/5 border-none"
      pagination={{ total: 240, page: 1, limit: 10, setPage: () => {} }}
    />
  );
};

export default FinancialTable;