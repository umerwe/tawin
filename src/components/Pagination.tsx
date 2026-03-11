"use client";

import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import React from "react";

type PaginationProps = {
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
  changePage: (page: number) => void;
};

export function Pagination({ pagination, changePage }: PaginationProps) {
  const { total, page, limit } = pagination;
  const totalPages = Math.ceil(total / limit);

  // Helper to generate page numbers
  const getPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3, 4, 5, "...", totalPages);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-between w-full mt-4 bg-white p-2 rounded-lg">
      {/* Previous Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => changePage(Math.max(1, page - 1))}
        disabled={page === 1}
        className="gap-1 text-gray-500 font-medium"
      >
        <ChevronLeft className="h-4 w-4" />
        السابق
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {getPages().map((p, i) => (
          <React.Fragment key={i}>
            {p === "..." ? (
              <span className="px-2 text-muted-foreground">
                <MoreHorizontal className="h-4 w-4" />
              </span>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => changePage(Number(p))}
                className={cn(
                  "h-8 w-8 p-0 text-sm font-medium transition-colors",
                  page === p
                    ? "bg-emerald-100 text-emerald-600 hover:bg-emerald-200 hover:text-emerald-700"
                    : "text-gray-500 hover:bg-gray-100"
                )}
              >
                {p}
              </Button>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Next Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => changePage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="gap-1 text-gray-500 font-medium"
      >
        التالي
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}