"use client"

import ConstructionBasketForm from "@/components/form/ConstructionBasketForm"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

export default function ConstructionBasketRegistration() {
    const t = useTranslations("translation");

    return (
        <div className="max-w-4xl mx-auto py-16 px-4 font-sans text-gray-800">
            <h1 className="text-3xl font-semibold text-center mb-12 text-gray-900">
                {t("basketRegistrationTitle")}
            </h1>

            <ConstructionBasketForm />

            <div className="mt-8 flex justify-center">
                <Button
                    variant="primary"
                >
                    {t("completeRegistration")}
                </Button>
            </div>
        </div>
    )
}