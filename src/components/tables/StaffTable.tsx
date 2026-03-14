"use client";

import { useState } from "react";
import { TableCell } from "@/components/ui/table";
import { DataTable } from "@/components/DataTable";
import { cn } from "@/lib/utils";
import { MessageSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const staffUsers = [
    {
        id: 1,
        userCode: "#CUST001",
        name: { en: "Ahmed Shaker", ar: "أحمد شاكر" },
        phone: "+1234567890",
        role: { en: "Manager", ar: "مدير" },
        status: { en: "Active", ar: "نشط" }
    },
    {
        id: 2,
        userCode: "#CUST002",
        name: { en: "Ahmed Shaker", ar: "أحمد شاكر" },
        phone: "+1234567890",
        role: { en: "Uploader", ar: "موظف رفع" },
        status: { en: "Closed", ar: "مغلق" }
    },
];

const StaffTable = ({ activeTab }: { activeTab: string }) => {
    const [page, setPage] = useState(1);

    // Raw keys that match your json "table.columns.key"
    const cols = ["staffCode", "name", "phone", "permission", "status", "actions"];

    const filteredData = staffUsers.filter(user => {
        const matchesTab = activeTab === "All Accounts" || user.status.en === activeTab;
        return matchesTab;
    });

    // Matching your DataTable signature: (row, index, locale)
    const row = (item: any, index: number, locale: "en" | "ar") => (
        <>
            <TableCell className="text-muted-foreground">{item.userCode}</TableCell>
            <TableCell className="font-medium">{item.name[locale]}</TableCell>
            <TableCell>{item.phone}</TableCell>
            <TableCell>{item.role[locale]}</TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                    <span className={cn("h-1.5 w-1.5 rounded-full",
                        item.status.en === "Active" ? "bg-aqua" : "bg-red-500")}
                    />
                    <span className={cn("text-xs font-medium",
                        item.status.en === "Active" ? "text-aqua" : "text-red-600")}
                    >
                        {item.status[locale]}
                    </span>
                </div>
            </TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-aqua">
                        <MessageSquare size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-500">
                        <Trash2 size={16} />
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
            pagination={{ total: 1240, page, limit: 10, setPage }}
        />
    );
};

export default StaffTable;