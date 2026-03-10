"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import StatsCard from "@/components/card/StatsCard";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ordersData, statusConfig, orderStats } from "@/constants/orderManagement";
import { ChevronDown, Trash2, Eye, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { TableCell } from "@/components/ui/table";

interface Order {
  id: number;
  orderId: string;
  date: string;
  source: string;
  status: string;
  total: number;
  customer: string;
  quantity: number;
}

const OrderManagement = () => {
  const t = useTranslations("translation");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredOrders = useMemo(() => {
    return ordersData.filter((order) => {
      const matchesSearch =
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === "all" ||
        order.status.toLowerCase() === filterStatus.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, filterStatus]);

  const getStatusStyles = (status: string) => {
    const statusLower = status.toLowerCase().replace(/\s+/g, "");
    const mapping: Record<string, keyof typeof statusConfig> = {
      delivered: "delivered",
      processing: "processing",
      intransit: "inTransit",
      notdelivered: "notDelivered",
    };
    const key = mapping[statusLower] || "delivered";
    return statusConfig[key];
  };

  const columns = ["Order ID", "Date", "Source", "Status", "Customer", "Quantity", "Total", "Actions"];

  const rows = (order: Order) => (
    <>
      <TableCell className="font-medium text-sm">{order.orderId}</TableCell>
      <TableCell className="text-sm">{order.date}</TableCell>
      <TableCell className="text-sm">{order.source}</TableCell>
      <TableCell>
        {(() => {
          const styles = getStatusStyles(order.status);
          return (
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${styles.bgColor} ${styles.color}`}>
              {order.status}
            </span>
          );
        })()}
      </TableCell>
      <TableCell className="text-sm">{order.customer}</TableCell>
      <TableCell className="text-sm text-center">{order.quantity}</TableCell>
      <TableCell className="text-sm font-semibold">${order.total.toFixed(2)}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Eye size={16} className="text-gray-600" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Trash2 size={16} className="text-red-600" />
          </Button>
        </div>
      </TableCell>
    </>
  );

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {orderStats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order List</h2>

          {/* Search and Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="flex-1 w-full">
              <Input
                placeholder="Search by Order ID or Customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 whitespace-nowrap">
                  <Filter size={16} />
                  Filter: {filterStatus === "all" ? "All" : filterStatus}
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setFilterStatus("all")}>
                  All Orders
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilterStatus("delivered")}>
                  <span className="w-2 h-2 rounded-full bg-green-600 mr-2" />
                  Delivered
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("processing")}>
                  <span className="w-2 h-2 rounded-full bg-yellow-600 mr-2" />
                  Processing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("inTransit")}>
                  <span className="w-2 h-2 rounded-full bg-blue-600 mr-2" />
                  In Transit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterStatus("notDelivered")}>
                  <span className="w-2 h-2 rounded-full bg-red-600 mr-2" />
                  Not Delivered
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Table */}
        <DataTable<Order>
          data={filteredOrders}
          cols={columns}
          row={rows}
          tableClassName="w-full"
          headerClassName="bg-gray-50 border-b"
          rowClassName="border-b hover:bg-gray-50 transition-colors"
          bodyClassName="bg-white"
        />
      </div>
    </div>
  );
};

export default OrderManagement;
