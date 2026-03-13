"use client";

import { useState } from "react";
import { TableCell } from "@/components/ui/table";
import { DataTable } from "@/components/DataTable";
import { cn } from "@/lib/utils";
import { MessageSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const suppliers = [
  { 
    id: 1, 
    code: "#CUST001", 
    name: { en: "National Computer Company", ar: "شركة الكمبيوتر الوطنية" }, 
    phone: "+1234567890", 
    revenue: "3,450.00", 
    status: { en: "Active", ar: "نشط" } 
  },
  { 
    id: 2, 
    code: "#CUST001", 
    name: { en: "National Computer Company", ar: "شركة الكمبيوتر الوطنية" }, 
    phone: "+1234567890", 
    revenue: "3,450.00", 
    status: { en: "Closed", ar: "مغلق" } 
  },
  { 
    id: 3, 
    code: "#CUST001", 
    name: { en: "National Computer Company", ar: "شركة الكمبيوتر الوطنية" }, 
    phone: "+1234567890", 
    revenue: "3,450.00", 
    status: { en: "Active", ar: "نشط" } 
  },
];

const SuppliersTable = ({ activeTab }: { activeTab: string }) => {
  const [page, setPage] = useState(1);
  
  const cols = ["supplierCode", "supplierName", "phone", "totalRevenues", "status", "process"];

  // Filter Logic matching against English status for the tab logic
  const filteredData = suppliers.filter((item) => {
    const matchesTab = activeTab === "All Suppliers" || item.status.en === activeTab;
    return matchesTab;
  });

  // Updated row function signature to accept index and locale from DataTable
  const row = (item: any, index: number, locale: "en" | "ar") => (
    <>
      <TableCell>{item.code}</TableCell>
      <TableCell>{item.name[locale]}</TableCell>
      <TableCell>{item.phone}</TableCell>
      <TableCell>{item.revenue}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className={cn("h-1.5 w-1.5 rounded-full", 
            item.status.en === "Active" ? "bg-aqua" : "bg-red-500")} 
          />
          <span className={cn("text-xs font-medium capitalize", 
            item.status.en === "Active" ? "text-aqua" : "text-red-600")}
          >
            {item.status[locale]}
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