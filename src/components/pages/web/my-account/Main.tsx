"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Camera } from "lucide-react"
import Image from "next/image"
import AccountInfo from "./Step1"
import AddressBook from "./Step2"
import OrderHistory from "./Step3"
import FavoritesList from "./Step4"
import { useTranslations } from "next-intl"

export default function MyAccount() {
  const t = useTranslations("translation");
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentTab = searchParams.get("tab") || "account"

  const navItems = [
    { id: "account", label: t("account") },
    { id: "address", label: t("address") },
    { id: "orders", label: t("orders") },
    { id: "favorites", label: t("favorites") },
    { id: "logout", label: t("logout") },
  ]

  const setTab = (tab: string) => {
    if (tab === "logout") {
      router.push("/")
      return
    }

    const params = new URLSearchParams(searchParams)
    params.set("tab", tab)
    router.push(`?${params.toString()}`)
  }

  const renderContent = () => {
    switch (currentTab) {
      case "account": return <AccountInfo />
      case "address": return <AddressBook />
      case "orders": return <OrderHistory />
      case "favorites": return <FavoritesList />
      default: return <AccountInfo />
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 font-sans text-gray-800">
      <h1 className="text-3xl font-semibold text-center mb-16 text-gray-900 capitalize">
        {currentTab === "account" ? t("myAccount") : t(currentTab)}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-4">
          <div className="bg-[#F3F5F7] rounded-2xl p-8 flex flex-col items-center">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <Image 
                  src="/profile.jpg" 
                  alt="Profile" 
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-black text-white p-1.5 rounded-full border-2 border-white hover:bg-gray-800 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h3 className="font-semibold text-gray-900 mb-8">Maryam Ahmed</h3>

            <nav className="w-full space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setTab(item.id)}
                  className={`w-full text-left py-3 px-2 text-sm transition-all relative ${
                    currentTab === item.id 
                    ? "text-aqua font-semibold" 
                    : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                  {currentTab === item.id && (
                    <div className="absolute left-0 bottom-0 w-full h-0.5 bg-aqua" />
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-8">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}