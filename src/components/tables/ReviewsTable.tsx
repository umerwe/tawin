"use client";

import { TableCell } from "@/components/ui/table";
import { DataTable } from "@/components/DataTable";
import { MessageSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ReviewDetailDialog from "@/components/dialog/ReviewDetailDialog";

const reviews = [
  {
    id: 1,
    productCode: "#CUST001",
    product: { en: "Solid Wood Door", ar: "باب خشبي صلب" },
    productImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=40&h=40&fit=crop",
    userName: { en: "Ahmed Shaker", ar: "احمد شاكر" },
    userEmail: "ahmed@example.com",
    userPhone: "+1234567890",
    userAddress: { en: "123 Main St, NY", ar: "١٢٣ الشارع الرئيسي، نيويورك" },
    rating: 5,
    date: "15.01.2025",
    comment: { en: "Excellent product! Beautifully crafted, durable, and well-finished.", ar: "منتج ممتاز! ذو تصميم جميل ومتين ومشطوب جيداً." },
  },
  {
    id: 2,
    productCode: "#CUST001",
    product: { en: "Solid Wood Door", ar: "باب خشبي صلب" },
    productImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=40&h=40&fit=crop",
    userName: { en: "Ahmed Shaker", ar: "احمد شاكر" },
    userEmail: "ahmed@example.com",
    userPhone: "+1234567890",
    userAddress: { en: "123 Main St, NY", ar: "١٢٣ الشارع الرئيسي، نيويورك" },
    rating: 5,
    date: "15.01.2025",
    comment: { en: "Very satisfied. Delivery was fast and packaging was perfect.", ar: "راضٍ جداً. كان التوصيل سريعاً والتغليف ممتازاً." },
  },
  {
    id: 3,
    productCode: "#CUST002",
    product: { en: "Solid Wood Door", ar: "باب خشبي صلب" },
    productImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=40&h=40&fit=crop",
    userName: { en: "Sara Ali", ar: "سارة علي" },
    userEmail: "sara@example.com",
    userPhone: "+9876543210",
    userAddress: { en: "456 Park Ave, LA", ar: "٤٥٦ شارع بارك، لوس أنجلوس" },
    rating: 4,
    date: "02.01.2025",
    comment: { en: "Good product, minor scratches on arrival but still happy.", ar: "منتج جيد، بعض الخدوش عند الوصول لكنني سعيدة." },
  },
  {
    id: 4,
    productCode: "#CUST003",
    product: { en: "Solid Wood Door", ar: "باب خشبي صلب" },
    productImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=40&h=40&fit=crop",
    userName: { en: "Omar Khalid", ar: "عمر خالد" },
    userEmail: "omar@example.com",
    userPhone: "+1122334455",
    userAddress: { en: "789 Broadway, Chicago", ar: "٧٨٩ برودواي، شيكاغو" },
    rating: 3,
    date: "03.01.2025",
    comment: { en: "Average quality. Expected better finishing for this price.", ar: "جودة متوسطة. كنت أتوقع تشطيباً أفضل لهذا السعر." },
  },
  {
    id: 5,
    productCode: "#CUST004",
    product: { en: "Solid Wood Door", ar: "باب خشبي صلب" },
    productImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=40&h=40&fit=crop",
    userName: { en: "Nour Mahmoud", ar: "نور محمود" },
    userEmail: "nour@example.com",
    userPhone: "+5566778899",
    userAddress: { en: "12 Oak Rd, Houston", ar: "١٢ طريق البلوط، هيوستن" },
    rating: 5,
    date: "04.01.2025",
    comment: { en: "Absolutely love this door! Great craftsmanship.", ar: "أحب هذا الباب كثيراً! صنعة رائعة." },
  },
  {
    id: 6,
    productCode: "#CUST005",
    product: { en: "Solid Wood Door", ar: "باب خشبي صلب" },
    productImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=40&h=40&fit=crop",
    userName: { en: "Lina Hassan", ar: "لينا حسن" },
    userEmail: "lina@example.com",
    userPhone: "+4433221100",
    userAddress: { en: "22 Elm St, Seattle", ar: "٢٢ شارع إيلم، سياتل" },
    rating: 2,
    date: "05.01.2025",
    comment: { en: "Not what I expected. Wood looks cheap and hinges are weak.", ar: "ليس ما توقعته. الخشب يبدو رخيصاً والمفصلات ضعيفة." },
  },
  {
    id: 7,
    productCode: "#CUST006",
    product: { en: "Solid Wood Door", ar: "باب خشبي صلب" },
    productImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=40&h=40&fit=crop",
    userName: { en: "Yusuf Karim", ar: "يوسف كريم" },
    userEmail: "yusuf@example.com",
    userPhone: "+9988776655",
    userAddress: { en: "5 Maple Ave, Boston", ar: "٥ شارع مابل، بوسطن" },
    rating: 4,
    date: "06.01.2025",
    comment: { en: "Nice door, installation was straightforward. Would buy again.", ar: "باب جميل، التركيب كان سهلاً. سأشتري مجدداً." },
  },
  {
    id: 8,
    productCode: "#CUST007",
    product: { en: "Solid Wood Door", ar: "باب خشبي صلب" },
    productImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=40&h=40&fit=crop",
    userName: { en: "Ahmed Shaker", ar: "احمد شاكر" },
    userEmail: "ahmed2@example.com",
    userPhone: "+1234567890",
    userAddress: { en: "123 Main St, NY", ar: "١٢٣ الشارع الرئيسي، نيويورك" },
    rating: 1,
    date: "07.01.2025",
    comment: { en: "Very disappointed. Door arrived damaged and support was unhelpful.", ar: "خيبة أمل. وصل الباب تالفاً ودعم العملاء لم يكن مفيداً." },
  },
  {
    id: 9,
    productCode: "#CUST008",
    product: { en: "Solid Wood Door", ar: "باب خشبي صلب" },
    productImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=40&h=40&fit=crop",
    userName: { en: "Sara Ali", ar: "سارة علي" },
    userEmail: "sara2@example.com",
    userPhone: "+9876543210",
    userAddress: { en: "456 Park Ave, LA", ar: "٤٥٦ شارع بارك، لوس أنجلوس" },
    rating: 5,
    date: "08.01.2025",
    comment: { en: "Perfect in every way. Sturdy, elegant, and exactly as described.", ar: "مثالي من كل النواحي. متين وأنيق وكما هو موصوف." },
  },
];
export { reviews };

const ReviewsTable = ({ ratingFilter }: { ratingFilter: number | null }) => {
  const [page, setPage] = useState(1);
  const [selectedReview, setSelectedReview] = useState<(typeof reviews)[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const cols = ["productCode", "product", "userName", "rating", "date", "actions"];

  const filteredData = reviews.filter((item) => {
    if (ratingFilter !== null) return item.rating === ratingFilter;
    return true;
  });

  const handleRowClick = (item: (typeof reviews)[0]) => {
    setSelectedReview(item);
    setDialogOpen(true);
  };

  const row = (item: (typeof reviews)[0], index: number, locale: "en" | "ar") => (
    <>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        {item.productCode}
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        <div className="flex items-center gap-2">
          <img
            src={item.productImage}
            alt={item.product[locale]}
            className="h-7 w-7 rounded object-cover shrink-0"
          />
          <span className="text-sm text-gray-700">{item.product[locale]}</span>
        </div>
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        {item.userName[locale]}
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        {item.rating}
      </TableCell>
      <TableCell className="cursor-pointer" onClick={() => handleRowClick(item)}>
        {item.date}
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
        headerClassName="bg-aqua/5 border-none"
        pagination={{ total: 240, page, limit: 10, setPage }}
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