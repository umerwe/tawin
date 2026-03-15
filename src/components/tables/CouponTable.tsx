"use client";

import { useState } from "react";
import { TableCell } from "@/components/ui/table";
import { DataTable } from "@/components/DataTable";
import { cn } from "@/lib/utils";
import { MessageSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import CouponDetailDialog from "@/components/dialog/CouponDetailDialog";

const coupons = [
  {
    id: 1,
    code: "89ED10",
    startDate: "01-01-2025",
    endDate: "01-01-2025",
    discount: "%10",
    status: { en: "Active", ar: "فعال" },
    usageCount: 13,
    userName: "John Doe",
  },
  {
    id: 2,
    code: "89ED10",
    startDate: "01-01-2025",
    endDate: "01-01-2025",
    discount: "%10",
    status: { en: "Active", ar: "فعال" },
    usageCount: 8,
    userName: "Sara Ali",
  },
  {
    id: 3,
    code: "89ED10",
    startDate: "01-01-2025",
    endDate: "01-01-2025",
    discount: "%10",
    status: { en: "Cancelled", ar: "ملغى" },
    usageCount: 0,
    userName: "Omar Khalid",
  },
  {
    id: 4,
    code: "89ED10",
    startDate: "01-01-2025",
    endDate: "01-01-2025",
    discount: "%10",
    status: { en: "Active", ar: "فعال" },
    usageCount: 22,
    userName: "Nour Mahmoud",
  },
  {
    id: 5,
    code: "89ED10",
    startDate: "01-01-2025",
    endDate: "01-01-2025",
    discount: "%10",
    status: { en: "Active", ar: "فعال" },
    usageCount: 5,
    userName: "Lina Hassan",
  },
  {
    id: 6,
    code: "89ED10",
    startDate: "01-01-2025",
    endDate: "01-01-2025",
    discount: "%10",
    status: { en: "Active", ar: "فعال" },
    usageCount: 17,
    userName: "Yusuf Karim",
  },
  {
    id: 7,
    code: "89ED10",
    startDate: "01-01-2025",
    endDate: "01-01-2025",
    discount: "%10",
    status: { en: "Active", ar: "فعال" },
    usageCount: 3,
    userName: "Ahmed Shaker",
  },
  {
    id: 8,
    code: "89ED10",
    startDate: "01-01-2025",
    endDate: "01-01-2025",
    discount: "%10",
    status: { en: "Active", ar: "فعال" },
    usageCount: 9,
    userName: "Sara Ali",
  },
  {
    id: 9,
    code: "89ED10",
    startDate: "01-01-2025",
    endDate: "01-01-2025",
    discount: "%10",
    status: { en: "Active", ar: "فعال" },
    usageCount: 11,
    userName: "Omar Khalid",
  },
  {
    id: 10,
    code: "89ED10",
    startDate: "01-01-2025",
    endDate: "01-01-2025",
    discount: "%10",
    status: { en: "Active", ar: "فعال" },
    usageCount: 6,
    userName: "Nour Mahmoud",
  },
];

export { coupons };

const CouponsTable = ({ activeTab }: { activeTab: string }) => {
  const [page, setPage] = useState(1);
  const [selectedCoupon, setSelectedCoupon] = useState<(typeof coupons)[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const locale = useLocale() as "en" | "ar";

  const cols = ["couponCode", "startDate", "endDate", "discountRate", "status", "actions"];

  const filteredData = coupons.filter((item) => {
    if (activeTab === "All Coupons") return true;
    if (activeTab === "Active") return item.status.en === "Active";
    if (activeTab === "Used") return item.usageCount > 0;
    if (activeTab === "Cancelled") return item.status.en === "Cancelled";
    return true;
  });

  const handleRowClick = (item: (typeof coupons)[0]) => {
    setSelectedCoupon(item);
    setDialogOpen(true);
  };

  const row = (item: (typeof coupons)[0], index: number, locale: "en" | "ar") => (
    <>
      <TableCell className="cursor-pointer font-medium" onClick={() => handleRowClick(item)}>
        {item.code}
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        {item.startDate}
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        {item.endDate}
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        {item.discount}
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
            className="h-8 w-8 text-gray-400 hover:text-blue-500 transition-colors"
            onClick={() => handleRowClick(item)}
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
      <CouponDetailDialog
        coupon={selectedCoupon}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
};

export default CouponsTable;