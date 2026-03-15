"use client";

import { useState } from "react";
import { TableCell } from "@/components/ui/table";
import { DataTable } from "@/components/DataTable";
import { cn } from "@/lib/utils";
import { MessageSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserDetailDialog from "@/components/dialog/UserDetailDialog";

const users = [
  {
    id: 1,
    userCode: "#CUST001",
    name: { en: "Ahmed Shaker", ar: "أحمد شاكر" },
    phone: "+1234567890",
    email: "john.doe@example.com",
    address: { en: "123 Main St, NY", ar: "١٢٣ الشارع الرئيسي، نيويورك" },
    orders: 25,
    spending: "3,450.00",
    status: { en: "Active", ar: "نشط" },
    accountRegisteredAt: "15.01.2025",
    lastAccountActivity: "15.01.2025",
    ordersSummary: { cancelled: 10, completed: 140, total: 150 },
  },
  {
    id: 2,
    userCode: "#CUST002",
    name: { en: "Sara Ali", ar: "سارة علي" },
    phone: "+9876543210",
    email: "sara.ali@example.com",
    address: { en: "456 Park Ave, LA", ar: "٤٥٦ شارع بارك، لوس أنجلوس" },
    orders: 12,
    spending: "1,200.00",
    status: { en: "Inactive", ar: "غير نشط" },
    accountRegisteredAt: "20.02.2025",
    lastAccountActivity: "20.02.2025",
    ordersSummary: { cancelled: 3, completed: 9, total: 12 },
  },
  {
    id: 3,
    userCode: "#CUST003",
    name: { en: "Omar Khalid", ar: "عمر خالد" },
    phone: "+1122334455",
    email: "omar.k@example.com",
    address: { en: "789 Broadway, Chicago", ar: "٧٨٩ برودواي، شيكاغو" },
    orders: 45,
    spending: "8,900.00",
    status: { en: "VIP", ar: "عميل مميز" },
    accountRegisteredAt: "05.03.2025",
    lastAccountActivity: "05.03.2025",
    ordersSummary: { cancelled: 2, completed: 43, total: 45 },
  },
  {
    id: 4,
    userCode: "#CUST004",
    name: { en: "Nour Mahmoud", ar: "نور محمود" },
    phone: "+5566778899",
    email: "nour.m@example.com",
    address: { en: "12 Oak Rd, Houston", ar: "١٢ طريق البلوط، هيوستن" },
    orders: 8,
    spending: "620.00",
    status: { en: "Active", ar: "نشط" },
    accountRegisteredAt: "10.03.2025",
    lastAccountActivity: "12.03.2025",
    ordersSummary: { cancelled: 1, completed: 7, total: 8 },
  },
];

const UserTable = ({ activeTab }: { activeTab: string }) => {
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const cols = ["userCode", "name", "phone", "orderCount", "totalSpending", "status", "actions"];

  const filteredData = users.filter((user) => {
    const matchesTab = activeTab === "All Users" || user.status.en === activeTab;
    return matchesTab;
  });

  const handleRowClick = (item: (typeof users)[0]) => {
    setSelectedUser(item);
    setDialogOpen(true);
  };

  const row = (item: (typeof users)[0], index: number, locale: "en" | "ar") => (
    <>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        {item.userCode}
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        {item.name[locale]}
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        {item.phone}
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        {item.orders}
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        {item.spending}
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              item.status.en === "Active"
                ? "bg-aqua"
                : item.status.en === "VIP"
                ? "bg-amber-500"
                : "bg-red-500"
            )}
          />
          <span
            className={cn(
              "text-xs font-medium",
              item.status.en === "Active"
                ? "text-aqua"
                : item.status.en === "VIP"
                ? "text-amber-600"
                : "text-red-600"
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
            className="h-8 w-8 text-gray-400 hover:text-blue-500"
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
        pagination={{ total: 240, page, limit: 10, setPage }}
      />

      <UserDetailDialog
        user={selectedUser}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
};

export default UserTable;