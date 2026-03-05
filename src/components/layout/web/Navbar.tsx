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
import { useRouter } from "next/navigation"
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function Navbar() {
  const t = useTranslations("translation");
  const router = useRouter();
  const pathname = usePathname();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const normalizedPath = "/" + pathname.split("/").filter(Boolean).slice(1).join("/");

  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const count = cartItems.length;

  useEffect(() => {
    const token = localStorage.getItem("token")
    setIsLoggedIn(!!token)
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.replace("/auth/signin");
  };

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

        <div className="flex flex-1 justify-end items-center gap-3 md:gap-4">
          <LanguageSwitcher />

          {
            isLoggedIn &&
            <Link
              href="/cart"
              className="flex items-center justify-center text-gray-600 hover:text-aqua transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5" />

              {count > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-aqua text-[10px] text-white">
                  {count}
                </span>
              )}
            </Link>
          }

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

          {/* Hamburger Toggle */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 text-gray-600 hover:text-aqua transition-colors"
            aria-label="Toggle Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
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
          <div className="absolute top-0 ltr:right-0 rtl:left-0 w-[280px] h-full bg-white shadow-2xl p-6 flex flex-col animate-in ltr:slide-in-from-right rtl:slide-in-from-left duration-300">
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
              {isLoggedIn ? (
                <Button
                  onClick={handleLogout}
                  variant="primary"
                >
                  {t("logout")}
                </Button>
              ) : (
                <Button
                  onClick={() => router.push("/auth/signin")}
                  variant="primary"
                >
                  {t("signin")}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}