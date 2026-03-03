"use client"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useTranslations } from "next-intl";
import Image from "next/image"

export default function FavoritesList() {
  const t = useTranslations("translation");
  const favorites = [
    { id: 1, name: "Wooden Door", color: "Black", price: 19.19, image: "https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?w=200" },
    { id: 2, name: "Wooden Door", color: "Black", price: 19.19, image: "https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?w=200" },
  ]
  return (
    <div className="space-y-6 text-left animate-in fade-in duration-300">
      <h2 className="text-xl font-semibold text-gray-900">{t("favorites")}</h2>
      <div className="border-t border-gray-100">
        {favorites.map((item) => (
          <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-6 border-b border-gray-50 group gap-4">
            <div className="flex items-center space-x-3 md:space-x-4 w-full sm:w-auto">
              <button className="text-gray-300 hover:text-red-500 transition-colors"><X className="w-5 h-5" /></button>
              <div className="w-16 h-20 md:w-20 md:h-20 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                <Image src={item.image} alt={item.name} width={80} height={80} className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-gray-900 uppercase tracking-tight">{item.name}</p>
                <p className="text-[10px] text-gray-400">{t("color")}: {item.color}</p>
              </div>
            </div>
            <div className="flex items-center justify-between sm:justify-end space-x-4 md:space-x-8 w-full sm:w-auto mt-2 sm:mt-0">
              <span className="text-sm font-semibold text-gray-900">${item.price.toFixed(2)}</span>
              <Button variant="primary" size="sm" className="rounded-lg h-9 md:h-10 px-4 md:px-6">{t("addToCart")}</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}