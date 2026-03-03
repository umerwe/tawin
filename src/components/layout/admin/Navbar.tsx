"use client"

import { AiOutlineBell } from "react-icons/ai";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import SearchInput from '@/components/ui/searchInput';
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-50 sticky top-0 z-50">
      <div className="py-3 px-6 flex items-center justify-between">
       
        <div className="font-semibold text-lg space-x-2">
           <SidebarTrigger />
          <span>Dashboard</span>
        </div>

        <div className="flex items-center gap-4">
          <SearchInput placeholder="Search" />

          {/* Notification */}
          <div className="relative cursor-pointer">
            <AiOutlineBell size={24} className="text-gray-700" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
          </div>

          {/* Avatar */}
          <div className="cursor-pointer">
            <Avatar className="h-[38px] w-[38px] border border-gray-100">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>UF</AvatarFallback>
            </Avatar>
          </div>

        </div>
      </div>
    </nav>
  )
}