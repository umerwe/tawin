"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Paperclip } from "lucide-react"
import { useTranslations } from "next-intl"

const ConstructionBasketForm = () => {
    const t = useTranslations("translation");
    const inputStyles = "border-gray-300 rounded-lg";
    const selectTriggerStyles = "w-full py-[25px] border-gray-300 bg-gray-50 rounded-lg";

    return (
        <div className="bg-white border border-gray-200 rounded-md p-8 shadow-sm space-y-10">
            <div className="border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800">{t("personalInformation")}</h2>
            </div>

            <form className="space-y-8">
                <div className="space-y-2">
                    <Label>{t("fullName")}</Label>
                    <Input placeholder={t("fullNamePlaceholder")} className={inputStyles} />
                </div>

                <div className="space-y-2">
                    <Label>{t("phoneNumber")}</Label>
                    <Input placeholder="+964 000 000 0000" className={inputStyles} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>{t("occupation")}</Label>
                        <Select>
                            <SelectTrigger className={selectTriggerStyles}>
                                <SelectValue placeholder={t("selectEmployer")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="private">{t("privateSector")}</SelectItem>
                                <SelectItem value="government">{t("government")}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>{t("monthlyIncome")}</Label>
                        <Input placeholder={t("incomePlaceholder")} className={inputStyles} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>{t("residenceCard")}</Label>
                        <div className="relative">
                            <Input placeholder={t("uploadResidence")} className={`${inputStyles} ltr:pl-10 rtl:pr-10 bg-gray-50 cursor-pointer`} readOnly />
                            <Paperclip className="absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>{t("unifiedCard")}</Label>
                        <div className="relative">
                            <Input placeholder={t("uploadUnified")} className={`${inputStyles} ltr:pl-10 rtl:pr-10 bg-gray-50 cursor-pointer`} readOnly />
                            <Paperclip className="absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>{t("propertyType")}</Label>
                        <Select>
                            <SelectTrigger className={selectTriggerStyles}>
                                <SelectValue placeholder={t("selectPropertyType")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="freehold">{t("freehold")}</SelectItem>
                                <SelectItem value="lease">{t("lease")}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>{t("propertyArea")}</Label>
                        <Input placeholder="e.g. 200" className={inputStyles} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label>{t("governorate")}</Label>
                        <Select>
                            <SelectTrigger className={selectTriggerStyles}>
                                <SelectValue placeholder={t("selectGovernorate")} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="baghdad">{t("baghdad")}</SelectItem>
                                <SelectItem value="erbil">{t("erbil")}</SelectItem>
                                <SelectItem value="basra">{t("basra")}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>{t("district")}</Label>
                        <Input placeholder={t("districtPlaceholder")} className={inputStyles} />
                    </div>
                    <div className="space-y-2">
                        <Label>{t("city")}</Label>
                        <Input placeholder={t("cityPlaceholder")} className={inputStyles} />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ConstructionBasketForm;