"use client";

import { TableCell } from "@/components/ui/table";
import { DataTable } from "@/components/DataTable";
import { MessageSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ReviewDetailDialog from "@/components/dialog/ReviewDetailDialog";
import { useLocale } from "next-intl";

const ReviewsTable = ({
  data,
  isLoading,
  meta,
  setPage,
  page,
  ratingFilter,
}: {
  data: any[];
  isLoading: boolean;
  meta: any;
  setPage: (p: number) => void;
  page: number;
  ratingFilter: number | null;
}) => {
  const locale = useLocale() as "en" | "ar";
  const [selectedReview, setSelectedReview] = useState<any | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const cols = ["productCode", "product", "userName", "rating", "date", "actions"];

  const filteredData = (data || []).filter((item) => {
    if (ratingFilter !== null) return item.rating === ratingFilter;
    return true;
  });

  const handleRowClick = (item: any) => {
    setSelectedReview(item);
    setDialogOpen(true);
  };

  const row = (item: any) => (
    <>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        #{item._id?.slice(-6) || "N/A"}
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        {item.product
          ? <span className="text-sm text-gray-700">{item.product.title?.[locale] || item.product.title?.en}</span>
          : <span className="text-sm text-gray-400">—</span>
        }
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        {item.user?.firstName} {item.user?.lastName}
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        {item.rating}
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        {item.comment}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-blue-500 transition-colors"
            onClick={() => handleRowClick(item)}
          >
            <MessageSquare size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-red-500 transition-colors"
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
        isLoading={isLoading}
        headerClassName="bg-aqua/5 border-none"
        pagination={{
          total: meta?.total || 0,
          page: page,
          limit: meta?.limit || 10,
          setPage,
        }}
      />
      <ReviewDetailDialog
        review={selectedReview}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
};

export default ReviewsTable;