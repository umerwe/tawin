"use client";

import { useState } from "react";
import { TableCell } from "@/components/ui/table";
import { DataTable } from "@/components/DataTable";
import { cn } from "@/lib/utils";
import { MessageSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import StaffDetailDialog from "@/components/dialog/StaffDetailDialog";

const staffUsers = [
  {
    id: 1,
    userCode: "#CUST001",
    name: { en: "Ahmed Shaker", ar: "أحمد شاكر" },
    phone: "+1234567890",
    email: "ahmed.shaker@example.com",
    address: { en: "123 Main St, NY", ar: "١٢٣ الشارع الرئيسي، نيويورك" },
    role: { en: "Manager", ar: "مدير" },
    status: { en: "Active", ar: "نشط" },
    accountRegisteredAt: "15.01.2025",
  },
  {
    id: 2,
    userCode: "#CUST002",
    name: { en: "Sara Ali", ar: "سارة علي" },
    phone: "+9876543210",
    email: "sara.ali@example.com",
    address: { en: "456 Park Ave, LA", ar: "٤٥٦ شارع بارك، لوس أنجلوس" },
    role: { en: "Uploader", ar: "موظف رفع" },
    status: { en: "Closed", ar: "مغلق" },
    accountRegisteredAt: "20.02.2025",
  },
  {
    id: 3,
    userCode: "#CUST003",
    name: { en: "Omar Khalid", ar: "عمر خالد" },
    phone: "+1122334455",
    email: "omar.k@example.com",
    address: { en: "789 Broadway, Chicago", ar: "٧٨٩ برودواي، شيكاغو" },
    role: { en: "Manager", ar: "مدير" },
    status: { en: "Active", ar: "نشط" },
    accountRegisteredAt: "05.03.2025",
  },
  {
    id: 4,
    userCode: "#CUST004",
    name: { en: "Nour Mahmoud", ar: "نور محمود" },
    phone: "+5566778899",
    email: "nour.m@example.com",
    address: { en: "12 Oak Rd, Houston", ar: "١٢ طريق البلوط، هيوستن" },
    role: { en: "Uploader", ar: "موظف رفع" },
    status: { en: "Active", ar: "نشط" },
    accountRegisteredAt: "10.03.2025",
  },
  {
    id: 5,
    userCode: "#CUST005",
    name: { en: "Lina Hassan", ar: "لينا حسن" },
    phone: "+4433221100",
    email: "lina.h@example.com",
    address: { en: "22 Elm St, Seattle", ar: "٢٢ شارع إيلم، سياتل" },
    role: { en: "Manager", ar: "مدير" },
    status: { en: "Closed", ar: "مغلق" },
    accountRegisteredAt: "12.03.2025",
  },
  {
    id: 6,
    userCode: "#CUST006",
    name: { en: "Yusuf Karim", ar: "يوسف كريم" },
    phone: "+9988776655",
    email: "yusuf.k@example.com",
    address: { en: "5 Maple Ave, Boston", ar: "٥ شارع مابل، بوسطن" },
    role: { en: "Uploader", ar: "موظف رفع" },
    status: { en: "Active", ar: "نشط" },
    accountRegisteredAt: "15.03.2025",
  },
];

const StaffTable = ({ activeTab }: { activeTab: string }) => {
  const [page, setPage] = useState(1);
  const [selectedStaff, setSelectedStaff] = useState<(typeof staffUsers)[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const cols = ["staffCode", "name", "phone", "permission", "status", "actions"];

  const filteredData = staffUsers.filter((user) => {
    const matchesTab = activeTab === "All Accounts" || user.status.en === activeTab;
    return matchesTab;
  });

  const handleRowClick = (item: (typeof staffUsers)[0]) => {
    setSelectedStaff(item);
    setDialogOpen(true);
  };

  const row = (item: (typeof staffUsers)[0], index: number, locale: "en" | "ar") => (
    <>
      <TableCell
        className="text-muted-foreground cursor-pointer"
        onClick={() => handleRowClick(item)}
      >
        {item.userCode}
      </TableCell>
      <TableCell
        className="font-medium cursor-pointer"
        onClick={() => handleRowClick(item)}
      >
        {item.name[locale]}
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        {item.phone}
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        {item.role[locale]}
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              item.status.en === "Active" ? "bg-aqua" : "bg-red-500"
            )}
          />
          <span
            className={cn(
              "text-xs font-medium",
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
            className="h-8 w-8 text-gray-400 hover:text-aqua"
            onClick={() => handleRowClick(item)}
          >
            <MessageSquare size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-red-500"
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
        pagination={{ total: 1240, page, limit: 10, setPage }}
      />
      <StaffDetailDialog
        staff={selectedStaff}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
};

export default StaffTable;