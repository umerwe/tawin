"use client"

import Link from "next/link"
import { Instagram, Facebook, Youtube } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useTranslations } from "next-intl"

interface FooterProps {
    isHome?: boolean;
}

export default function Footer({ isHome = true }: FooterProps) {
    const t = useTranslations("translation");

    if (isHome) {
        return (
            <footer className="bg-white text-[#2D3E50] py-6">
                <div>
                    <div className="flex flex-col md:flex-row md:justify-between items-start gap-12 mb-16 mx-auto max-w-7xl px-8">
                        {/* 1. Brand Section */}
                        <div className="space-y-4 md:w-1/3">
                            <h2 className="text-base font-bold text-[#2D3E50]">
                                {t("brandName")}
                            </h2>
                            <p className="text-[13px] text-gray-500 max-w-xs leading-relaxed">
                                {t("footerMotto")}
                            </p>
                            <div className="flex items-center gap-4 pt-2">
                                <Link href="#" className="text-[#00C1C1] hover:opacity-80 transition-opacity">
                                    <Youtube size={20} />
                                </Link>
                                <Link href="#" className="text-[#00C1C1] hover:opacity-80 transition-opacity">
                                    <Facebook size={20} />
                                </Link>
                                <Link href="#" className="text-[#00C1C1] hover:opacity-80 transition-opacity">
                                    <Instagram size={20} />
                                </Link>
                            </div>
                        </div>

                        {/* Right Side Container: Address & Pages with Small Gap */}
                        <div className="flex flex-row gap-20 md:gap-32">
                            {/* 2. Address Section */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-sm text-[#2D3E50]">
                                    {t("addressTitle")}
                                </h3>
                                <ul className="space-y-2 text-[13px] text-gray-500">
                                    <li>{t("city")}</li>
                                    <li>{t("district")}</li>
                                    <li>{t("country")}</li>
                                    <li className="pt-2">
                                        <a href="mailto:info@ta3awin.com" className="text-[#2D3E50] underline underline-offset-4 font-medium">
                                            info@ta3awin.com
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* 3. Pages Section */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-sm text-[#2D3E50]">
                                    {t("pagesTitle")}
                                </h3>
                                <ul className="space-y-3 text-[13px] text-gray-500">
                                    <li>
                                        <Link href="/" className="hover:text-[#00C1C1] transition-colors">
                                            {t("home")}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/shop" className="hover:text-[#00C1C1] transition-colors">
                                            {t("shop")}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/contact" className="hover:text-[#00C1C1] transition-colors">
                                            {t("contact")}
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <Separator className="my-6 bg-gray-200" />

                    <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-[11px] text-gray-400 mx-auto max-w-7xl px-8">
                        <p className="text-gray-800">
                            {t("copyrightText")}
                        </p>
                        <span className="hidden md:block h-3 w-px bg-gray-300" />
                        <div className="flex items-center gap-4">
                            <Link href="#" className="hover:underline transition-all">
                                {t("privacyPolicy")}
                            </Link>
                            <Link href="#" className="hover:underline transition-all">
                                {t("termsAndConditions")}
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }

    return (
        <footer className="bg-[#1a1a1a] text-white">
            <div className="mx-auto max-w-7xl px-8 py-10">
                <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-white">
                            {t("brandName")}
                        </span>
                        <div className="h-5 w-px bg-white/30" />
                    </div>
                    <nav className="flex flex-wrap items-center gap-6 md:gap-8">
                        <Link href="/" className="text-sm font-medium text-white transition-colors hover:text-white/80">
                            {t("home")}
                        </Link>
                        <Link href="/contact" className="text-sm text-white/60 transition-colors hover:text-white">
                            {t("contact")}
                        </Link>
                        <Link href="/shop" className="text-sm text-white/60 transition-colors hover:text-white">
                            {t("shop")}
                        </Link>
                    </nav>
                </div>
            </div>
            <Separator className="bg-white/10" />
            <div className="mx-auto max-w-7xl px-8 py-6">
                <div className="flex flex-col-reverse items-start justify-between gap-8 sm:flex-row sm:items-center">
                    <p className="text-xs text-white/50">
                        {t("copyrightText")}
                    </p>
                    <div className="flex items-center gap-6">
                        <Instagram className="h-4 w-4" />
                        <Facebook className="h-4 w-4" />
                        <Youtube className="h-4 w-4" />
                    </div>
                </div>
            </div>
        </footer>
    )
}