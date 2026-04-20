"use client";

import { useState } from "react";
import { TableCell } from "@/components/ui/table";
import { DataTable } from "@/components/DataTable";
import { cn } from "@/lib/utils";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FinancialDetailDialog from "../dialog/FinancialDetailDialog";
import ConfirmDialog from "../dialog/ConfirmDialog";
import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useUpdateFinancialTransferStatus } from "@/hooks/useFinancialTransfer";
import { useSettings } from "@/hooks/useSettings";

interface FinancialTableProps {
  data: any[];
  pagination: any;
  isLoading?: boolean;
  page: number;
  setPage: (page: number) => void;
  onDelete?: (id: string, callback: () => void) => void;
  isDeleting?: boolean;
}

const FinancialTable = ({ 
  data, 
  pagination, 
  isLoading, 
  page, 
  setPage, 
  onDelete, 
  isDeleting 
}: FinancialTableProps) => {
  const {data: settings} = useSettings();
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const tConfirm = useTranslations("confirm");
  const { mutate: updateTransferStatus } = useUpdateFinancialTransferStatus();

  const cols = ["transferId", "user", "amount", "status", "date"];

  const handleViewDetails = (item: any) => {
    setSelectedTransaction(item);
    setDialogOpen(true);
  };

  const TransferStatusDropdown = ({ item }: { item: any }) => {
    const [currentStatus, setCurrentStatus] = useState(item.status);

    const handleStatusChange = (newStatus: string) => {
      updateTransferStatus(
        { id: item._id, status: newStatus },
        {
          onSuccess: () => {
            setCurrentStatus(newStatus);
          },
        }
      );
    };

    const getStatusColor = (status: string) => {
      switch (status) {
        case "pending": return "text-orange-600 bg-orange-100 border-orange-200";
        case "processing": return "text-blue-600 bg-blue-100 border-blue-200";
        case "delivered": return "text-green-600 bg-green-100 border-green-200";
        case "cancelled": return "text-red-600 bg-red-100 border-red-200";
        default: return "text-gray-600 bg-gray-100 border-gray-200";
      }
    };

    return (
      <Select
        value={currentStatus}
        onValueChange={handleStatusChange}
      >
        <SelectTrigger
          className={cn(
            "h-8 w-[140px] px-2 border rounded-md transition-all outline-none focus:ring-0 font-semibold text-xs",
            getStatusColor(currentStatus)
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-2">
            <SelectValue />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pending" className="cursor-pointer">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-orange-500" />
              <span>Pending</span>
            </div>
          </SelectItem>
          <SelectItem value="processing" className="cursor-pointer">
            <div className="flex items-center gap-2">
              <CheckCircle size={14} className="text-blue-500" />
              <span>Processing</span>
            </div>
          </SelectItem>
          <SelectItem value="delivered" className="cursor-pointer">
            <div className="flex items-center gap-2">
              <CheckCircle size={14} className="text-green-500" />
              <span>Delivered</span>
            </div>
          </SelectItem>
          <SelectItem value="cancelled" className="cursor-pointer">
            <div className="flex items-center gap-2">
              <XCircle size={14} className="text-red-500" />
              <span>Cancelled</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    );
  };

  const row = (item: any, index: number, locale: "en" | "ar") => {
    const formattedDate = new Date(item.createdAt).toLocaleDateString();

    return (
      <>
        <TableCell className="cursor-pointer" onClick={() => handleViewDetails(item)}>
          <span className="font-mono text-xs">#{item._id.slice(-6).toUpperCase()}</span>
        </TableCell>
        <TableCell className="cursor-pointer" onClick={() => handleViewDetails(item)}>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{item.user?.email}</span>
            <span className="text-xs text-muted-foreground">ID: {item.user?._id?.slice(-6).toUpperCase()}</span>
          </div>
        </TableCell>
        <TableCell className="cursor-pointer font-semibold" onClick={() => handleViewDetails(item)}>
          {settings?.currencySymbol}{item.totalAmount}
        </TableCell>
        <TableCell className="capitalize" onClick={(e) => e.stopPropagation()}>
          {item.status}
          {/* <TransferStatusDropdown item={item} /> */}
        </TableCell>
        <TableCell className="cursor-pointer" onClick={() => handleViewDetails(item)}>
          {formattedDate}
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
            total: pagination?.totalDocs,
            page: page,
            limit: pagination?.limit,
            setPage,
          }}
        />
      </div>

      <FinancialDetailDialog
        transaction={selectedTransaction}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        currencySymbol={settings?.currencySymbol || "$"}
      />
    </>
  );
};

export default FinancialTable;