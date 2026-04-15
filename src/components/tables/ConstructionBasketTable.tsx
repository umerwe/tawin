"use client";

import { useState } from "react";
import { TableCell } from "@/components/ui/table";
import { DataTable } from "@/components/DataTable";
import { cn } from "@/lib/utils";
import { MessageSquare, Trash2, CheckCircle, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ConstructionBasketDetailDialog from "../dialog/ConstructionBasketDetailDialog";
import { useTranslations } from "next-intl";
import getStatusColor from "@/utils/getStatusColor";

export const StatusDropdown = ({ item, t, getStatusColor }: any) => {
  const [currentStatus, setCurrentStatus] = useState(item.constructionBasket.status);

  return (
    <Select
      value={currentStatus}
      onValueChange={(val) => setCurrentStatus(val)}
    >
      <SelectTrigger
        className={cn(
          "h-8 w-[140px] px-2 border rounded-md transition-all outline-none focus:ring-0 font-semibold text-xs",
          getStatusColor(currentStatus)
        )}
      >
        <div className="flex items-center gap-2">
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pending" className="cursor-pointer">
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-yellow-500" />
            <span>{t('pending')}</span>
          </div>
        </SelectItem>
        <SelectItem value="approved" className="cursor-pointer">
          <div className="flex items-center gap-2">
            <CheckCircle size={14} className="text-green-500" />
            <span>{t('approved')}</span>
          </div>
        </SelectItem>
        <SelectItem value="rejected" className="cursor-pointer">
          <div className="flex items-center gap-2">
            <XCircle size={14} className="text-red-500" />
            <span>{t('rejected')}</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

const ConstructionBasketTable = ({ data, activeTab, isLoading, meta, setPage }: { data: any[]; activeTab: string; isLoading?: boolean; meta?: any; setPage: (page: number) => void }) => {
  const t = useTranslations("translation");
  const [selectedBasket, setSelectedBasket] = useState<any | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const cols = ["basketCode", "fullName", "phoneNumber", "occupation", "propertyType", "status", "process"];

  const filteredData = data?.filter((item) => {
    const matchesTab = activeTab === "All Applications" || item.constructionBasket.status === activeTab;
    return matchesTab;
  });

  const handleRowClick = (item: any) => {
    setSelectedBasket(item);
    setDialogOpen(true);
  };

  const row = (item: any, index: number) => (
    <>
      <TableCell
        className="text-muted-foreground cursor-pointer"
        onClick={() => handleRowClick(item)}
      >
        #{item._id.slice(-6)}
      </TableCell>
      <TableCell
        className="font-medium cursor-pointer capitalize"
        onClick={() => handleRowClick(item)}
      >
        {item.constructionBasket.fullRegistrationName}
      </TableCell>
      <TableCell
        className="cursor-pointer text-sm"
        onClick={() => handleRowClick(item)}
      >
        <span dir="ltr">{item.constructionBasket.phoneNumber}</span>
      </TableCell>
      <TableCell
        className="cursor-pointer capitalize"
        onClick={() => handleRowClick(item)}
      >
        {item.constructionBasket.occupation}
      </TableCell>
      <TableCell
        className="cursor-pointer capitalize"
        onClick={() => handleRowClick(item)}
      >
        <span className="text-sm font-medium">
          {item.constructionBasket.propertyType}
        </span>
      </TableCell>

      <TableCell onClick={(e) => e.stopPropagation()}>
        <StatusDropdown
          item={item}
          t={t}
          getStatusColor={getStatusColor}
        />
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
        isLoading={isLoading}
        pagination={{
          total: meta?.totalDocs || 0,
          page: meta?.page || 1,
          limit: meta?.limit || 10,
          setPage
        }}
      />

      <ConstructionBasketDetailDialog
        basket={selectedBasket}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
};

export default ConstructionBasketTable;