"use client"

import { AiOutlineBell } from "react-icons/ai";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import SearchInput from '@/components/ui/searchInput';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("translation");

  return (
    <nav className="w-full bg-white border-b border-gray-50 sticky top-0 z-50 mb-2">
      <div className="py-1 px-4 md:px-6 flex items-center justify-between gap-2">

        {/* Left Side: Sidebar & Title */}
        <div className="font-semibold text-lg flex items-center gap-1 shrink-0">
          <SidebarTrigger />
          <span >{t("dashboard")}</span>
        </div>

        {/* Right Side Container */}
        <div className="flex items-center gap-3 md:gap-4 ml-auto">
          
          {/* SearchInput: Hidden on mobile/small screens, shows on large */}
          <div className="hidden lg:block">
            <SearchInput placeholder={t("search")} className="w-[320px]" />
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <LanguageSwitcher />

            {/* Notification */}
            <div className="relative cursor-pointer shrink-0">
              <AiOutlineBell size={24} className="text-gray-700" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </div>

            {/* Avatar */}
            <div className="cursor-pointer shrink-0">
              <Avatar className="h-[38px] w-[38px] border border-gray-100">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>UF</AvatarFallback>
              </Avatar>
            </div>
          </div>

        </div>
      </div>
    </nav>
  )
}