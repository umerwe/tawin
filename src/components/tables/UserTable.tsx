"use client";

import { useState } from "react";
import { TableCell } from "@/components/ui/table";
import { DataTable } from "@/components/DataTable";
import { cn } from "@/lib/utils";
import { MessageSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserDetailDialog from "@/components/dialog/UserDetailDialog";


const UserTable = ({ data, activeTab, isLoading }: { data: any[]; activeTab: string; isLoading?: boolean }) => {
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const cols = ["userCode", "name", "email", "username", "country", "verified", "actions"];

  const filteredData = data.filter((user) => {
    const matchesTab = activeTab === "All Users" || 
      (activeTab === "Verified" && user.isVerified) || 
      (activeTab === "Not Verified" && !user.isVerified);
    return matchesTab;
  });

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
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        {item.country}
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              item.isVerified ? "bg-green" : "bg-red-500"
            )}
          />
          <span
            className={cn(
              "text-xs font-medium",
              item.isVerified ? "text-green" : "text-red-600"
            )}
          >
            {item.isVerified ? "Verified" : "Not Verified"}
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
        isLoading={isLoading}
        pagination={{ total: data.length, page, limit: 10, setPage }}
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