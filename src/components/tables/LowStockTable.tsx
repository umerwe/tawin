"use client";

import { useState } from "react";
import { TableCell } from "@/components/ui/table";
import { DataTable } from "@/components/DataTable";
import { Edit3, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

interface LowStockTableProps {
  data: any[];
  activeTab: string;
}

const LowStockTable = ({ data, activeTab }: LowStockTableProps) => {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const locale = useLocale();

  const cols = ["no", "product", "category", "amount", "supplierName", "operations"];

  const filteredData = data.filter((item) => {
    const matchesTab = activeTab === "All Products" || item.status.en === activeTab;
    return matchesTab;
  });

  const row = (item: any, index: number, locale: "en" | "ar") => (
    <>
      <TableCell>{item.no}</TableCell>
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 relative rounded border overflow-hidden bg-gray-50 shrink-0">
            <Image src={item.img} alt="product" fill className="object-cover" />
          </div>
          <span className="font-medium">{item.name[locale]}</span>
        </div>
      </TableCell>
      <TableCell>{item.category[locale]}</TableCell>
      <TableCell>{item.quantity}</TableCell>
      <TableCell>{item.supplier[locale]}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-red-500"
          >
            <Trash2 size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-aqua"
            onClick={() => router.push(`/${locale}/admin/low-stock/${item.id}`)}
          >
            <Edit3 size={16} />
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
      pagination={{ total: 24, page, limit: 10, setPage }}
    />
  );
};

export default LowStockTable;