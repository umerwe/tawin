"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { LoginDialog } from "@/components/dialog/LoginDialog"

const HeroSection = () => {
    const t = useTranslations("translation");
    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    function handleClick() {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        if (token) {
            router.push("/my-account?tab=construction")
            return
        }
        setIsDialogOpen(true)
    }

    return (
        <section className="relative h-[600px] w-full overflow-hidden">
            <Image
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600"
                alt="HeroSection" fill className="object-cover brightness-50" priority
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-4xl font-semibold text-white max-w-4xl leading-tight">
                    {t("heroTitle")}{" "}
                    <span className="text-aqua underline">{t("heroTitleHighlight")}</span>
                </h1>
                <p className="mt-4 text-base text-gray-200 max-w-xl">
                    {t("heroDescription")}
                </p>

                <Button
                    variant="primary"
                    className="w-74 mt-8"
                    onClick={handleClick}
                >
                    {t("heroButton")} →
                </Button>
            </div>

            <LoginDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
            />
        </section>
    )
}

export default HeroSection