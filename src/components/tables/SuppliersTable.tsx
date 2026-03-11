"use client";

import { useState } from "react";
import { TableCell } from "@/components/ui/table";
import { DataTable } from "@/components/DataTable";
import { cn } from "@/lib/utils";
import { MessageSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const suppliers = [
  { id: 1, code: "#CUST001", name: "National Computer Company", phone: "+1234567890", revenue: "3,450.00", status: "Active" },
  { id: 2, code: "#CUST001", name: "National Computer Company", phone: "+1234567890", revenue: "3,450.00", status: "Closed" },
  { id: 3, code: "#CUST001", name: "National Computer Company", phone: "+1234567890", revenue: "3,450.00", status: "Active" },
];

const SuppliersTable = ({ activeTab }: { activeTab: string }) => {
  const [page, setPage] = useState(1);
  const cols = ["Supplier code", "Supplier name", "Phone", "Total revenues", "Status", "Process"];

  // Note: Filtered data is prepared for future search integration here
  const filteredData = suppliers.filter((item) => {
    const matchesTab = activeTab === "All Suppliers" || item.status === activeTab;
    return matchesTab;
  });

  const row = (item: typeof suppliers[0]) => (
    <>
      <TableCell>{item.code}</TableCell>
      <TableCell className="font-medium">{item.name}</TableCell>
      <TableCell>{item.phone}</TableCell>
      <TableCell className="font-semibold">{item.revenue}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className={cn("h-1.5 w-1.5 rounded-full", 
            item.status === "Active" ? "bg-aqua" : "bg-red-500")} 
          />
          <span className={cn("text-xs font-medium capitalize", 
            item.status === "Active" ? "text-aqua" : "text-red-600")}
          >
            {item.status}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-aqua transition-colors">
            <MessageSquare size={16} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-500 transition-colors">
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
      pagination={{ total: 240, page, limit: 10, setPage }}
    />
  );
};

export default SuppliersTable;