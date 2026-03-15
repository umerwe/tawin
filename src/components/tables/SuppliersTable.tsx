"use client";

import { useState } from "react";
import { TableCell } from "@/components/ui/table";
import { DataTable } from "@/components/DataTable";
import { cn } from "@/lib/utils";
import { MessageSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import SupplierDetailDialog from "../dialog/SupplierDetailDialog";

const suppliers = [
  {
    id: 1,
    code: "#CUST001",
    name: { en: "National Computer Company", ar: "الشركة الوطنية للحاسبات" },
    phone: "+1234567890",
    address: { en: "123 Main St, NY", ar: "١٢٣ الشارع الرئيسي، نيويورك" },
    taxNumber: "324323",
    email: "john.doe@example.com",
    revenue: "3,450.00",
    status: { en: "Active", ar: "نشط" },
    accountRegisteredAt: "15.01.2025",
    lastAccountActivity: "15.01.2025",
    salesSummary: {
      cancelled: 10,
      completed: 140,
      total: 150,
    },
  },
  {
    id: 2,
    code: "#CUST002",
    name: { en: "National Computer Company", ar: "الشركة الوطنية للحاسبات" },
    phone: "+1234567890",
    address: { en: "456 Park Ave, LA", ar: "٤٥٦ شارع بارك، لوس أنجلوس" },
    taxNumber: "987654",
    email: "jane.doe@example.com",
    revenue: "3,450.00",
    status: { en: "Closed", ar: "مغلق" },
    accountRegisteredAt: "20.02.2025",
    lastAccountActivity: "20.02.2025",
    salesSummary: {
      cancelled: 5,
      completed: 80,
      total: 85,
    },
  },
  {
    id: 3,
    code: "#CUST003",
    name: { en: "National Computer Company", ar: "الشركة الوطنية للحاسبات" },
    phone: "+1234567890",
    address: { en: "789 Broadway, Chicago", ar: "٧٨٩ برودواي، شيكاغو" },
    taxNumber: "112233",
    email: "supplier3@example.com",
    revenue: "3,450.00",
    status: { en: "Active", ar: "نشط" },
    accountRegisteredAt: "05.03.2025",
    lastAccountActivity: "05.03.2025",
    salesSummary: {
      cancelled: 2,
      completed: 60,
      total: 62,
    },
  },
];

const SuppliersTable = ({ activeTab }: { activeTab: string }) => {
  const [page, setPage] = useState(1);
  const [selectedSupplier, setSelectedSupplier] = useState<
    (typeof suppliers)[0] | null
  >(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const cols = [
    "supplierCode",
    "supplierName",
    "phone",
    "totalRevenues",
    "status",
    "process",
  ];

  const filteredData = suppliers.filter((item) => {
    const matchesTab =
      activeTab === "All Suppliers" || item.status.en === activeTab;
    return matchesTab;
  });

  const handleRowClick = (item: (typeof suppliers)[0]) => {
    setSelectedSupplier(item);
    setDialogOpen(true);
  };

  const row = (item: (typeof suppliers)[0], index: number, locale: "en" | "ar") => (
    <>
      <TableCell
        className="cursor-pointer"
        onClick={() => handleRowClick(item)}
      >
        {item.code}
      </TableCell>
      <TableCell
        className="cursor-pointer"
        onClick={() => handleRowClick(item)}
      >
        {item.name[locale]}
      </TableCell>
      <TableCell
        className="cursor-pointer"
        onClick={() => handleRowClick(item)}
      >
        {item.phone}
      </TableCell>
      <TableCell
        className="cursor-pointer"
        onClick={() => handleRowClick(item)}
      >
        {item.revenue}
      </TableCell>
      <TableCell
        className="cursor-pointer"
        onClick={() => handleRowClick(item)}
      >
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              item.status.en === "Active" ? "bg-aqua" : "bg-red-500"
            )}
          />
          <span
            className={cn(
              "text-xs font-medium capitalize",
              item.status.en === "Active" ? "text-aqua" : "text-red-600"
            )}
          >
            {item.status[locale]}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-aqua transition-colors"
          >
            <MessageSquare size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </TableCell>
    </>
  );

  return (
    <>
      <DataTable
        data={filteredData}
        cols={cols}
        row={row}
        headerClassName="bg-aqua/5 border-none"
        pagination={{ total: 240, page, limit: 10, setPage }}
      />

      <SupplierDetailDialog
        supplier={selectedSupplier}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
};

export default SuppliersTable;