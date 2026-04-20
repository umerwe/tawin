"use client";

import { useState } from "react";
import { TableCell } from "@/components/ui/table";
import { DataTable } from "@/components/DataTable";
import { cn } from "@/lib/utils";
import { MessageSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import CouponDetailDialog from "@/components/dialog/CouponDetailDialog";
import { useDeleteCouponAdmin } from "@/hooks/useCoupon";
import ConfirmDialog from "../dialog/ConfirmDialog";

const CouponsTable = ({ 
  data, 
  isLoading, 
  meta, 
  setPage,
}: { 
  data: any[]; 
  isLoading: boolean;
  meta: any;
  setPage: (p: number) => void;
  activeTab: string;
}) => {
  const t = useTranslations('translation');
  const tConfirm = useTranslations('confirm');
  const [selectedCoupon, setSelectedCoupon] = useState<any | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { mutate: deleteCoupon, isPending: isDeleting } = useDeleteCouponAdmin();

  const cols = ["couponCode", "type", "discountRate", "minOrder", "usageLimit", "expiryDate", "status", "actions"];

  const handleRowClick = (item: any) => {
    setSelectedCoupon(item);
    setDialogOpen(true);
  };

  const row = (item: any) => (
    <>
      <TableCell className="cursor-pointer font-medium" onClick={() => handleRowClick(item)}>
        {item.code}
      </TableCell>
      <TableCell className="cursor-pointer capitalize" onClick={() => handleRowClick(item)}>
        {item.type || "-"}
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        {item.type === "percentage" ? `${item.value}%` : `${item.value} QAR`}
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        {item.minOrderAmount || 0}
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        <span className="text-gray-500">{item.usedCount || 0}</span> / {item.usageLimit || 0}
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString('en-GB') : '-'}
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              item.isActive ? "bg-aqua" : "bg-red-500"
            )}
          />
          <span
            className={cn(
              "text-xs font-medium",
              item.isActive ? "text-aqua" : "text-red-600"
            )}
          >
            {item.isActive ? t('active') : t('cancelled')}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          {/* <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-blue-500 transition-colors"
            onClick={() => handleRowClick(item)}
          >
            <MessageSquare size={16} />
          </Button> */}
          
          <ConfirmDialog
            title={tConfirm("delete.title", { value: t("coupon") })}
            description={tConfirm("delete.description", { value: t("coupon") })}
            variant="destructive"
            loading={isDeleting}
            onConfirm={(closeDialog) => {
              deleteCoupon(item._id, {
                onSuccess: () => closeDialog(),
              });
            }}
            asChild
          >
            <button
              className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-md hover:bg-red-50 cursor-pointer disabled:opacity-50"
              title={t("delete")}
              disabled={isDeleting}
            >
              <Trash2 size={18} />
            </button>
          </ConfirmDialog>
        </div>
      </TableCell>
    </>
  );

  return (
    <>
      <DataTable
        data={data || []}
        cols={cols}
        row={row}
        isLoading={isLoading}
        headerClassName="bg-aqua/5 border-none"
        pagination={{ 
          total: meta?.totalDocs || 0, 
          page: meta?.page || 1, 
          limit: meta?.limit || 10, 
          setPage 
        }}
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