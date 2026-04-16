"use client";

import { useState } from "react";
import Image from "@/components/MyImage";
import { TableCell } from "@/components/ui/table";
import { DataTable } from "@/components/DataTable";
import { Trash2, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ConfirmDialog from "../dialog/ConfirmDialog";
import { useDeleteProduct } from "@/hooks/useProducts";

export const productsData = [
  {
    id: 1,
    number: 1,
    name: { en: "Solid Wood Door", ar: "باب خشب صلب" },
    img: "https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?q=80&w=400&auto=format&fit=crop",
    date: "01-01-2025",
    sort: 25,
    status: { en: "All Products", ar: "جميع المنتجات" },
    // ProductForm fields
    description: "High-quality solid wood door with premium finish, ideal for residential and commercial use.",
    price: "349.99",
    reducedPrice: "299.99",
    expirationDate: "01-01-2026",
    productionDate: "01-01-2025",
    warehouseAvailability: "available",
    stockQuantity: "80",
    unlimited: false,
    featured: false,
    // ProductImageForm fields
    thumbnails: [
      "https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400&auto=format&fit=crop",
    ],
    category: "home",
    subcategory: "accessories",
    selectedColors: [0, 2],
  },
  {
    id: 2,
    number: 2,
    name: { en: "Industrial Paint Mixer", ar: "خلاط طلاء صناعي" },
    img: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=400&auto=format&fit=crop",
    date: "05-01-2025",
    sort: 10,
    status: { en: "Featured Products", ar: "منتجات مميزة" },
    description: "Professional-grade industrial paint mixer for large-scale painting projects.",
    price: "199.99",
    reducedPrice: "",
    expirationDate: "",
    productionDate: "05-01-2025",
    warehouseAvailability: "available",
    stockQuantity: "40",
    unlimited: false,
    featured: true,
    thumbnails: [
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=400&auto=format&fit=crop",
    ],
    category: "electronics",
    subcategory: "accessories",
    selectedColors: [1, 3],
  },
  {
    id: 3,
    number: 3,
    name: { en: "Solar Panel 400W", ar: "لوح شمسي ٤٠٠ واط" },
    img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=400&auto=format&fit=crop",
    date: "10-01-2025",
    sort: 50,
    status: { en: "Out of Stock", ar: "نفذت الكمية" },
    description: "400W monocrystalline solar panel with high efficiency and weather resistance.",
    price: "499.99",
    reducedPrice: "449.99",
    expirationDate: "",
    productionDate: "10-01-2025",
    warehouseAvailability: "out-of-stock",
    stockQuantity: "0",
    unlimited: false,
    featured: false,
    thumbnails: [
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=400&auto=format&fit=crop",
    ],
    category: "electronics",
    subcategory: "accessories",
    selectedColors: [2],
  },
  {
    id: 4,
    number: 4,
    name: { en: "Fire Extinguisher 5kg", ar: "طفاية حريق ٥ كجم" },
    img: "https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?q=80&w=400&auto=format&fit=crop",
    date: "12-01-2025",
    sort: 15,
    status: { en: "Reduced", ar: "مخفض" },
    description: "5kg dry powder fire extinguisher suitable for class A, B and C fires.",
    price: "89.99",
    reducedPrice: "69.99",
    expirationDate: "12-01-2030",
    productionDate: "12-01-2025",
    warehouseAvailability: "available",
    stockQuantity: "120",
    unlimited: false,
    featured: false,
    thumbnails: [
      "https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?q=80&w=400&auto=format&fit=crop",
    ],
    category: "home",
    subcategory: "accessories",
    selectedColors: [0, 4],
  },
  {
    id: 5,
    number: 5,
    name: { en: "CCTV Outdoor Camera", ar: "كاميرا مراقبة خارجية" },
    img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=400&auto=format&fit=crop",
    date: "15-01-2025",
    sort: 30,
    status: { en: "Featured Products", ar: "منتجات مميزة" },
    description: "4MP outdoor CCTV camera with night vision, motion detection, and IP66 weatherproofing.",
    price: "129.99",
    reducedPrice: "",
    expirationDate: "",
    productionDate: "15-01-2025",
    warehouseAvailability: "available",
    stockQuantity: "60",
    unlimited: false,
    featured: true,
    thumbnails: [
      "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=400&auto=format&fit=crop",
    ],
    category: "electronics",
    subcategory: "accessories",
    selectedColors: [2, 4],
  },
  {
    id: 6,
    number: 6,
    name: { en: "Steel Hinge Set", ar: "طقم مفصلات فولاذية" },
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=400&auto=format&fit=crop",
    date: "18-01-2025",
    sort: 100,
    status: { en: "All Products", ar: "جميع المنتجات" },
    description: "Heavy-duty stainless steel hinge set, corrosion-resistant and suitable for doors and cabinets.",
    price: "24.99",
    reducedPrice: "",
    expirationDate: "",
    productionDate: "18-01-2025",
    warehouseAvailability: "available",
    stockQuantity: "500",
    unlimited: true,
    featured: false,
    thumbnails: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=400&auto=format&fit=crop",
    ],
    category: "home",
    subcategory: "accessories",
    selectedColors: [2, 4],
  },
  {
    id: 7,
    number: 7,
    name: { en: "Concrete Vibrator", ar: "هزاز خرسانة" },
    img: "https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?q=80&w=400&auto=format&fit=crop",
    date: "20-01-2025",
    sort: 5,
    status: { en: "Out of Stock", ar: "نفذت الكمية" },
    description: "Electric concrete vibrator for compacting and settling concrete during construction.",
    price: "279.99",
    reducedPrice: "249.99",
    expirationDate: "",
    productionDate: "20-01-2025",
    warehouseAvailability: "out-of-stock",
    stockQuantity: "0",
    unlimited: false,
    featured: false,
    thumbnails: [
      "https://images.unsplash.com/photo-1628151015968-3a4429e9ef04?q=80&w=400&auto=format&fit=crop",
    ],
    category: "electronics",
    subcategory: "accessories",
    selectedColors: [3],
  },
  {
    id: 8,
    number: 8,
    name: { en: "LED Floodlight 100W", ar: "كشاف ليد ١٠٠ واط" },
    img: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=400&auto=format&fit=crop",
    date: "22-01-2025",
    sort: 45,
    status: { en: "Reduced", ar: "مخفض" },
    description: "100W LED floodlight with 8000 lumen output, IP65 rated for outdoor use.",
    price: "59.99",
    reducedPrice: "44.99",
    expirationDate: "",
    productionDate: "22-01-2025",
    warehouseAvailability: "available",
    stockQuantity: "200",
    unlimited: false,
    featured: false,
    thumbnails: [
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=400&auto=format&fit=crop",
    ],
    category: "electronics",
    subcategory: "accessories",
    selectedColors: [1, 2],
  },
];

interface ProductTableProps {
  activeTab: string;
  data: any[];
  isLoading?: boolean;
  pagination?: {
    page: number;
    limit: number;
    totalDocs: number;
    totalPages: number;
  };
  page: number;
  setPage: (p: number) => void;
}


const ProductTable = ({ activeTab, data, isLoading, pagination, page, setPage }: ProductTableProps) => {
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();

  const router = useRouter();

  const cols = ["no", "product", "price", "dateCreated", "operations"];

  const filteredData = data.filter((item) => {
    if (activeTab === "All Products") return true;
    return item.status?.en === activeTab;
  });

  const row = (item: any, index: number, locale: "en" | "ar") => (
    <>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 relative overflow-hidden">
            <Image
              src={item?.photo || ""}
              alt={item.title[locale]}
              fill
              className="object-cover"
            />
          </div>
          <span className="font-medium text-sm capitalize">{item.title[locale]}</span>
        </div>
      </TableCell>
      <TableCell className="text-sm font-medium">${item.price}</TableCell>
      <TableCell className="text-sm">{new Date(item.createdAt?.$date || item.createdAt).toLocaleDateString()}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-aqua"
            onClick={() => router.push(`/${locale}/admin/product-list/${item.slug}`)}
          >
            <Edit3 size={16} />
          </Button>
          <ConfirmDialog
            title="Delete Product"
            description={`Are you sure you want to delete ${item.title[locale]}?`}
            variant="destructive"
            loading={isDeleting}
            onConfirm={(close) => {
              deleteProduct(item._id);
              close();
            }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-400 hover:text-red-500"
            >
              <Trash2 size={16} />
            </Button>
          </ConfirmDialog>
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
      isLoading={isLoading}
      pagination={{
        total: pagination?.totalDocs || 0,
        page: pagination?.page || 1,
        limit: pagination?.limit || 10,
        setPage
      }}
    />
  );
};

export default ProductTable;