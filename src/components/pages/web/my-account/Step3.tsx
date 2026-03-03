import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useTranslations } from "next-intl";

export default function OrderHistory() {
  const t = useTranslations("translation");
  const orders = [
    { id: "#3456_768", date: "October 17, 2023", status: t("received"), price: "$1234.00" },
    { id: "#3456_980", date: "October 11, 2023", status: t("received"), price: "$345.00" },
  ]
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h2 className="text-lg font-semibold text-gray-900">{t("orderHistory")}</h2>
      <div className="border border-gray-100 rounded-2xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead>{t("orderCode")}</TableHead>
              <TableHead>{t("date")}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead className="text-right">{t("price")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="text-sm font-medium">{order.id}</TableCell>
                <TableCell className="text-sm text-gray-500">{order.date}</TableCell>
                <TableCell className="text-sm">{order.status}</TableCell>
                <TableCell className="text-right text-sm font-semibold">{order.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}