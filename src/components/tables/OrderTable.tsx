"use client";

import { useState } from "react";
import Image from "@/components/MyImage";
import { TableCell } from "@/components/ui/table";
import { DataTable } from "@/components/DataTable";
import { cn } from "@/lib/utils";
import OrderDetailDialog from "@/components/dialog/OrderDetailDialog";
import ConfirmDialog from "@/components/dialog/ConfirmDialog"; // Assuming this is the path
import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface OrderTableProps {
  data: any[];
  pagination: any;
  isLoading?: boolean;
  page: number;
  setPage: (page: number) => void;
  onDelete?: (id: string, callback: () => void) => void;
  isDeleting?: boolean;
}

const OrderTable = ({ data, pagination, isLoading, page, setPage, onDelete, isDeleting }: OrderTableProps) => {
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const t = useTranslations();
  // Assuming you have a 'confirm' namespace for translations based on your snippet
  const tConfirm = useTranslations("confirm");

  // Removed "no" and added "action"
  const cols = ["orderId", "customer", "product", "date", "price", "payment", "status", "action"];

  const handleRowClick = (item: any) => {
    setSelectedOrder(item);
    setDialogOpen(true);
  };

  const row = (item: any, index: number, locale: "en" | "ar") => {
    const firstItem = item.items?.[0]?.product;
    const formattedDate = new Date(item.createdAt).toLocaleDateString();

    return (
      <>
        <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
          <span className="font-mono text-xs">#{item._id.slice(-6).toUpperCase()}</span>
        </TableCell>
        <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{item.user?.firstName} {item.user?.lastName}</span>
            <span className="text-xs text-muted-foreground">{item.phone}</span>
          </div>
        </TableCell>
        <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 relative overflow-hidden rounded shrink-0 bg-gray-100">
              <Image src={firstItem?.photo} alt={firstItem?.title[locale]} fill className="object-cover" />
            </div>
            <span className="text-sm font-medium line-clamp-1">
              {firstItem?.title[locale]}
            </span>
          </div>
        </TableCell>
        <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
          {formattedDate}
        </TableCell>
        <TableCell className="cursor-pointer font-semibold" onClick={() => handleRowClick(item)}>
          ${item.finalAmount}
        </TableCell>
        <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
          <div className="flex items-center gap-2 text-sm">
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                item.paymentMethod === "COD" ? "bg-orange-400" : "bg-aqua"
              )}
            />
            <span>{item.paymentMethod}</span>
          </div>
        </TableCell>
        <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
          <div
            className={cn(
              "flex items-center gap-2 font-medium text-xs px-2 py-1 rounded-full w-fit capitalize",
              item.status === "pending" ? "text-orange-600 bg-orange-100" : "text-green-600 bg-green-100"
            )}
          >
            <span>{item.status}</span>
          </div>
        </TableCell>
        {/* Action Column */}
        <TableCell>
          <div onClick={(e) => e.stopPropagation()}> {/* Prevent triggering row click */}
            <ConfirmDialog
              title={tConfirm("delete.title", { value: t("translation.order") })}
              description={tConfirm("delete.description", { value: t("translation.order") })}
              variant="destructive"
              loading={isDeleting}
              onConfirm={(closeDialog) => {
                if (onDelete) {
                  onDelete(item._id, closeDialog);
                } else {
                  // Fallback if no delete function passed
                  console.log("Delete ID:", item._id);
                  closeDialog();
                }
              }}
              asChild
            >
              <button
                className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-md hover:bg-red-50 cursor-pointer disabled:opacity-50"
                title={t("translation.delete")}
              >
                <Trash2 size={18} />
              </button>
            </ConfirmDialog>
          </div>
        </TableCell>
      </>
    );
  };

  return (
    <>
      <div className="w-full">
        <DataTable
          data={data}
          cols={cols}
          row={row}
          isLoading={isLoading}
          headerClassName="bg-aqua/5 border-none"
          pagination={{
            total: pagination?.total,
            page: page,
            limit: pagination?.limit,
            setPage,
          }}
        />
      </div>

      <OrderDetailDialog
        order={selectedOrder}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
};

export default OrderTable;