"use client"

import Link from "next/link"
import { Instagram, Facebook, Youtube } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useTranslations } from "next-intl"

export default function Footer() {
    const t = useTranslations("translation");

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
                    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                        <p className="text-xs text-white/50 sm:pr-3 sm:border-r border-white/20">
                            {t("copyright")} {t("brandName")}. {t("allRightsReserved")}
                        </p>
                        <div className="flex items-center gap-1">
                            <Link href="#" className="text-xs text-white/50 transition-colors hover:text-white">
                                {t("termsAndConditions")}
                            </Link>
                            <span className="text-xs text-white/30">•</span>
                            <Link href="#" className="text-xs text-white/50 transition-colors hover:text-white">
                                {t("privacyPolicy")}
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <Link
                                href="#"
                                aria-label="Instagram"
                                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/50 hover:text-white"
                            >
                                <Instagram className="h-4 w-4" />
                            </Link>
                            <Link
                                href="#"
                                aria-label="Facebook"
                                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/50 hover:text-white"
                            >
                                <Facebook className="h-4 w-4" />
                            </Link>
                            <Link
                                href="#"
                                aria-label="YouTube"
                                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/50 hover:text-white"
                            >
                                <Youtube className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}