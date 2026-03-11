"use client";

import React, { useState } from "react";
import { TableCell } from "@/components/ui/table";
import { DataTable } from "@/components/DataTable";
import { cn } from "@/lib/utils";
import { MessageSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const users = [
    { id: 1, userCode: "#CUST001", name: "Ahmed Shaker", phone: "+1234567890", orders: 25, spending: "3,450.00", status: "Active" },
    { id: 2, userCode: "#CUST002", name: "Ahmed Shaker", phone: "+1234567890", orders: 12, spending: "1,200.00", status: "Inactive" },
    { id: 3, userCode: "#CUST003", name: "Ahmed Shaker", phone: "+1234567890", orders: 45, spending: "8,900.00", status: "VIP" },
    // ... more data
];

const UserTable = ({ searchQuery, activeTab }: { searchQuery: string, activeTab: string }) => {
    const [page, setPage] = useState(1);
    const cols = ["User Code", "Name", "Phone", "Order Count", "Total Spending", "Status", "Actions"];

    const filteredData = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.userCode.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTab = activeTab === "All Users" || user.status === activeTab;
        return matchesSearch && matchesTab;
    });

    const row = (item: typeof users[0]) => (
        <>
            <TableCell>{item.userCode}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.phone}</TableCell>
            <TableCell>{item.orders}</TableCell>
            <TableCell>{item.spending}</TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                    <span className={cn("h-1.5 w-1.5 rounded-full",
                        item.status === "Active" ? "bg-aqua" : item.status === "VIP" ? "bg-amber-500" : "bg-red-500")}
                    />
                    <span className={cn("text-xs font-medium",
                        item.status === "Active" ? "text-aqua" : item.status === "VIP" ? "text-amber-600" : "text-red-600")}
                    >
                        {item.status}
                    </span>
                </div>
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-blue-500"><MessageSquare size={16} /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-500"><Trash2 size={16} /></Button>
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
            pagination={{ total: 240, page, limit: 10, setPage }}
        />
    );
};

export default UserTable;