"use client";

import { useState } from "react";
import { TableCell } from "@/components/ui/table";
import { DataTable } from "@/components/DataTable";
import { cn } from "@/lib/utils";
import { MessageSquare, Trash2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import UserDetailDialog from "@/components/dialog/UserDetailDialog";
import ConfirmDialog from "@/components/dialog/ConfirmDialog";
import { useTranslations } from "next-intl";
import { useVerifyUser } from "@/hooks/useAuth";

interface UserTableProps {
  data: any[];
  pagination: any;
  isLoading?: boolean;
  page: number;
  setPage: (page: number) => void;
  onDelete?: (id: string, callback: () => void) => void;
  isDeleting?: boolean;
}

const getStatusColor = (isVerified: boolean) => {
  return isVerified
    ? "bg-green-50 text-green border-green-200"
    : "bg-red-50 text-red-600 border-red-200";
};

export const StatusDropdown = ({ item, t, getStatusColor }: any) => {
  const [currentStatus, setCurrentStatus] = useState<boolean>(item.isVerified);
  const { mutate: verifyUser } = useVerifyUser();

  const handleChange = (val: string) => {
    const newStatus = val === "verified";
    verifyUser(item._id);
    setCurrentStatus(newStatus);
  };

  return (
    <Select
      value={currentStatus ? "verified" : "unverified"}
      onValueChange={handleChange}
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
        <SelectItem value="verified" className="cursor-pointer">
          <div className="flex items-center gap-2">
            <CheckCircle size={14} className="text-green-500" />
            <span>{t("translation.verified")}</span>
          </div>
        </SelectItem>
        <SelectItem value="unverified" className="cursor-pointer">
          <div className="flex items-center gap-2">
            <XCircle size={14} className="text-red-500" />
            <span>{t("translation.unverified")}</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

const UserTable = ({
  data,
  pagination,
  isLoading,
  page,
  setPage,
  onDelete,
  isDeleting,
}: UserTableProps) => {
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const t = useTranslations();
  const tConfirm = useTranslations("confirm");

  const cols = ["userCode", "name", "email", "username", "verified", "actions"];

  const handleRowClick = (item: any) => {
    setSelectedUser(item);
    setDialogOpen(true);
  };

  const row = (item: any, index: number) => (
    <>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        #{item._id?.slice(-6) || `USR${index + 1}`}
      </TableCell>
      <TableCell className="cursor-pointer capitalize" onClick={() => handleRowClick(item)}>
        {item.firstName} {item.lastName}
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        {item.email}
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        {item.username}
      </TableCell>
      <TableCell>
        <StatusDropdown item={item} t={t} getStatusColor={getStatusColor} />
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
          <div onClick={(e) => e.stopPropagation()}>
            <ConfirmDialog
              title={tConfirm("delete.title", { value: t("translation.user") })}
              description={tConfirm("delete.description", { value: t("translation.user") })}
              variant="destructive"
              loading={isDeleting}
              onConfirm={(closeDialog) => {
                if (onDelete) {
                  onDelete(item._id, closeDialog);
                } else {
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
        </div>
      </TableCell>
    </>
  );

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

      <UserDetailDialog
        user={selectedUser}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
};

export default UserTable;