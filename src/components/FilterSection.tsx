"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/ui/searchInput";
import {
  FileText,
  MoreHorizontal,
  ArrowUpDown,
  Filter,
  RefreshCcw,
  CirclePlus,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import AddSupplierDialog from "@/components/dialog/AddSupplierDialog";
import AddBrandDialog from "@/components/dialog/AddBrandDialog";
import AddUserDialog from "./dialog/AddUserDialog";

interface FilterSectionProps {
  activeTab: string;
  setActiveTab: (val: string) => void;
  data: any[];
  type?: "order" | "user" | "supplier" | "product" | "lowStock" | "brand" | "review" | "coupon";
  ratingFilter?: number | null;
  setRatingFilter?: (val: number | null) => void;
  reviewsTotal?: number;
}

const FilterSection = ({
  activeTab,
  setActiveTab,
  data,
  type = "order",
  ratingFilter,
  setRatingFilter,
  reviewsTotal = 0,
}: FilterSectionProps) => {
  const t = useTranslations("translation");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const getTabs = () => {
    if (type === "product") return [
      { id: "All Products", label: t("allProducts") },
      { id: "Featured Products", label: t("featuredProducts") },
      { id: "Reduced", label: t("reduced") },
      { id: "Out of Stock", label: t("outOfStock") },
    ];
    if (type === "coupon") return [
      { id: "All Coupons", label: t("allCoupons") },
      { id: "Active", label: t("active") },
      { id: "Used", label: t("used") },
      { id: "Cancelled", label: t("cancelled") },
    ];
    return [
      { id: "All Orders", label: t("allOrders") },
      { id: "Completed", label: t("completed") },
      { id: "Processing", label: t("processing") },
      { id: "Cancelled", label: t("cancelled") },
    ];
  };

  const tabs = getTabs();

  const actions = [
    { icon: <RefreshCcw className="h-4 w-4" />, color: "text-gray-500" },
    { icon: <Filter className="h-4 w-4" />, color: "text-gray-500" },
    { icon: <ArrowUpDown className="h-4 w-4" />, color: "text-gray-500" },
    { icon: <MoreHorizontal className="h-4 w-4" />, color: "text-gray-500" },
    { icon: <FileText className="h-4 w-4" />, color: "text-red-500" },
  ];

  const getTitle = () => {
    if (type === "user") return t("usersList");
    if (type === "supplier") return t("suppliersList");
    if (type === "brand") return t("brandsList");
    return "";
  };

  const isTitleType = type === "user" || type === "supplier" || type === "brand";
  const isTabType = type === "order" || type === "product" || type === "lowStock" || type === "coupon";
  const hasAddButton = !["order", "lowStock", "review", "coupon"].includes(type);

  const isAllTabId = (id: string) =>
    id === "All Orders" || id === "All Products" || id === "All Coupons";

  return (
    <>
      {/* Container: Stacks on mobile (flex-col), Rows on desktop (md:flex-row) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-4">
        
        {/* Left Side: Title or Tabs */}
        <div className="flex items-center overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {type === "review" ? (
            <div className="flex items-center gap-1 bg-emerald-50/40 p-1 rounded-lg border border-gray-100 flex-nowrap whitespace-nowrap">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setRatingFilter?.(null)}
                className={cn(
                  "h-8 px-3 text-xs font-medium transition-all",
                  ratingFilter === null
                    ? "bg-white shadow-sm text-gray-900 border border-gray-100 hover:bg-white"
                    : "text-muted-foreground hover:bg-aqua/10"
                )}
              >
                {t("allReviews")}
                <span className="ms-1 text-aqua font-bold">({reviewsTotal})</span>
              </Button>
              {[5, 4, 3, 2, 1].map((star) => (
                <Button
                  key={star}
                  variant="ghost"
                  size="sm"
                  onClick={() => setRatingFilter?.(star)}
                  className={cn(
                    "h-8 px-3 text-xs font-medium transition-all gap-1",
                    ratingFilter === star
                      ? "bg-white shadow-sm text-gray-900 border border-gray-100 hover:bg-white"
                      : "text-muted-foreground hover:bg-aqua/10"
                  )}
                >
                  <Star size={11} className="fill-black text-black" />
                  {t("rating")} {star}
                </Button>
              ))}
            </div>
          ) : isTabType ? (
            <div className="flex items-center gap-1 bg-emerald-50/40 p-1 rounded-lg border border-gray-100 flex-nowrap whitespace-nowrap">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "h-8 px-4 text-xs font-medium transition-all",
                    activeTab === tab.id
                      ? "bg-white shadow-sm text-gray-900 border border-gray-100 hover:bg-white"
                      : "text-muted-foreground hover:bg-aqua/10"
                  )}
                >
                  {tab.label}
                  {isAllTabId(tab.id) && (
                    <span className="ml-1 text-aqua font-bold">({data.length})</span>
                  )}
                </Button>
              ))}
            </div>
          ) : isTitleType ? (
            <h1 className="text-lg font-bold text-gray-800 whitespace-nowrap">{getTitle()}</h1>
          ) : null}
        </div>

        {/* Right Side: Search, Actions, and Add Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          
          <div className="flex items-center gap-2 w-full">
            {/* Search Input: Grows to fill space on mobile */}
            <SearchInput
              placeholder={`${t("search")}...`}
              className="flex-1 md:w-[240px] md:flex-none"
            />
            
            {/* Action Buttons: Grouped on mobile */}
            <div className="flex items-center gap-1 shrink-0">
              {actions.map((action, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="icon"
                  className={cn("h-9 w-9 border-gray-200 bg-white", action.color)}
                >
                  {action.icon}
                </Button>
              ))}
            </div>
          </div>

          {/* Add Button: Full width on tiny screens, w-40 on desktop */}
          {hasAddButton && (
            <Button
              variant="primary"
              size="sm"
              className="w-full sm:w-40 gap-2 shrink-0"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <span className="truncate">
                {type === "user"
                  ? t("addUser")
                  : type === "supplier"
                  ? t("addSupplier")
                  : t("addBrand")}
              </span>
              <CirclePlus className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>

      {/* Dialogs */}
      {type === "user" && <AddUserDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />}
      {type === "supplier" && <AddSupplierDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />}
      {type === "brand" && <AddBrandDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />}
    </>
  );
};

export default FilterSection;