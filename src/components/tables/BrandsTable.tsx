"use client";

import { useState } from "react";
import { TableCell } from "@/components/ui/table";
import { DataTable } from "@/components/DataTable";
import { cn } from "@/lib/utils";
import { MessageSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import BrandDetailDialog from "../dialog/BrandDetailDialog";
import Image from "next/image";

const BrandsTable = ({ data, activeTab }: { data: any[]; activeTab: string }) => {
  const [page, setPage] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState<any | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const cols = ["brandCode", "brandName", "registrationDate", "brandLogo", "status", "process"];

  const filteredData = data.filter((item) => {
    const matchesTab = activeTab === "All Brands" || item.status.en === activeTab;
    return matchesTab;
  });

  const handleRowClick = (item: any) => {
    setSelectedBrand(item);
    setDialogOpen(true);
  };

  const row = (item: any, index: number, locale: "en" | "ar") => (
    <>
      <TableCell
        className="text-muted-foreground cursor-pointer"
        onClick={() => handleRowClick(item)}
      >
        {item.brandCode}
      </TableCell>
      <TableCell
        className="font-medium cursor-pointer"
        onClick={() => handleRowClick(item)}
      >
        {item.name}
      </TableCell>
      <TableCell
        className="cursor-pointer"
        onClick={() => handleRowClick(item)}
      >
        {item.registrationDate}
      </TableCell>
      <TableCell
        className="cursor-pointer"
        onClick={() => handleRowClick(item)}
      >
       <Image src={item.logo} alt={item.name} width={50} height={50} />
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
        pagination={{ total: 24, page, limit: 10, setPage }}
      />

      <BrandDetailDialog
        brand={selectedBrand}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
};

export default BrandsTable;