"use client";

import { ListFilter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { DataTable } from "@/components/DataTable";
import { useTranslations } from "next-intl";

const transfers = [
  { id: "1", user: "#6545", date: "01 Oct | 11:29 am", status: { en: "Paid", ar: "مدفوع" }, amount: "$64", color: "bg-aqua" },
  { id: "2", user: "#5412", date: "01 Oct | 11:29 am", status: { en: "Pending", ar: "قيد الانتظار" }, amount: "$557", color: "bg-yellow-500" },
  { id: "3", user: "#6545", date: "01 Oct | 11:29 am", status: { en: "Paid", ar: "مدفوع" }, amount: "$64", color: "bg-aqua" },
  { id: "4", user: "#6545", date: "01 Oct | 11:29 am", status: { en: "Paid", ar: "مدفوع" }, amount: "$64", color: "bg-aqua" },
  { id: "5", user: "#6545", date: "01 Oct | 11:29 am", status: { en: "Paid", ar: "مدفوع" }, amount: "$64", color: "bg-aqua" },
];

const FinancialTransfers = () => {
  const t = useTranslations("translation");
  const cols = ["no", "userCode", "orderDate", "status", "total"];

  const row = (item: typeof transfers[0], index: number, locale: "en" | "ar") => (
    <>
      <TableCell>{item.id}.</TableCell>
      <TableCell>{item.user}</TableCell>
      <TableCell>{item.date}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${item.color}`} />
          <span>{item.status[locale]}</span>
        </div>
      </TableCell>
      <TableCell>{item.amount}</TableCell>
    </>
  );

  return (
    <Card className="h-full border shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>
          {t("financialTransfers")}
        </CardTitle>
        <Button
          variant="primary"
          size="sm"
          className="w-24"
        >
          <ListFilter className="h-4 w-4" /> {t("filter")}
        </Button>
      </CardHeader>

      <CardContent>
        <div className="overflow-hidden">
          <DataTable
            cols={cols}
            data={transfers}
            row={row}
            headerClassName="bg-aqua/5 border-none"
            showPagination={false}
          />
        </div>

        <div className="flex justify-end mt-4">
          <Button
            variant="default"
            size="xs"
          >
            {t("details")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialTransfers;