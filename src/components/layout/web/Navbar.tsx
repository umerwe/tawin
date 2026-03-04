"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { navLinks } from "@/constants/navLinks"
import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import LanguageSwitcher from "../../LanguageSwitcher"
import { useTranslations } from "next-intl"
import { ShoppingCart } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

export default function Navbar() {
  const t = useTranslations("translation");
  const pathname = usePathname();

  const normalizedPath = "/" + pathname.split("/").filter(Boolean).slice(1).join("/");

  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
  }, [])

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="mx-auto h-14 flex max-w-7xl items-center px-2 sm:px-6">

        <div className="flex flex-1">
          <Link href="/" className="text-base font-semibold tracking-tight text-gray-900">
            {t("brandName")}
          </Link>
        </div>

        {/* Desktop Navigation (Hidden on Mobile) */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-all relative pb-1",
                normalizedPath === link.href
                  ? "text-aqua"
                  : "text-gray-500 hover:text-gray-900"
              )}
            >
              {t(`${link.label.toLowerCase()}`)}
              {normalizedPath === link.href && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-aqua" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 justify-end items-center gap-1 md:gap-4">
          <LanguageSwitcher />

          {
            isLoggedIn &&
            <Link
              href="/cart"
              className="hidden md:flex items-center justify-center text-gray-600 hover:text-aqua transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5" />
            </Link>
          }

          {/* Hamburger Toggle */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 text-gray-600 hover:text-aqua transition-colors"
            aria-label="Toggle Menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* If Logged In → Show Avatar */}
          {isLoggedIn ? (
            <Link href="/my-account">
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src="/avatar.jpg" alt="User Avatar" />
                <AvatarFallback>
                  <Skeleton className="h-full w-full rounded-full" />
                </AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Link
              href="/auth/signin"
              className="hidden md:block text-sm font-semibold text-gray-900 hover:text-aqua transition-colors"
            >
              {t("signin")}
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-100 md:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Content (Slides from Right) */}
          <div className="absolute top-0 right-0 w-[280px] h-full bg-white shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between mb-10">
              <span className="font-semibold text-lg">{t("menu")}</span>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:text-red-500 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium transition-colors py-2 border-b border-gray-50",
                    pathname === link.href ? "text-aqua" : "text-gray-600"
                  )}
                >
                  {t(`${link.label.toLowerCase()}`)}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-10">
              <Link href="/auth/signin" onClick={() => setIsOpen(false)}>
                <Button variant="primary" className="w-full">
                  {t("signin")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}