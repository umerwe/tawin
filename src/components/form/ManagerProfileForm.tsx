"use client";

import Image from "@/components/MyImage";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

const ManagerProfileForm = () => {
    const t = useTranslations("translation");

    return (
        <Card className="lg:col-span-2 border shadow-none">
            <CardHeader className="flex flex-row items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800">{t("editProfile")}</h2>
                <Button variant="outline" size="sm" className="text-gray-400 px-6">
                    {t("edit")}
                </Button>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Profile Image Section */}
                <div className="flex items-center gap-4">
                    <div className="h-20 w-20 relative rounded-full overflow-hidden border-2 border-aqua/20">
                        <Image
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
                            alt="Profile Avatar"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="primary" size="sm" className="w-auto px-6">
                            {t("uploadImage")}
                        </Button>
                        <Button variant="outline" size="sm" className="text-gray-400">
                            {t("remove")}
                        </Button>
                    </div>
                </div>

                {/* Main Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-2">
                        <Label>{t("firstName")}</Label>
                        <Input placeholder={t("ahmed")} className="rounded-md" />
                    </div>
                    <div className="space-y-2">
                        <Label>{t("lastName")}</Label>
                        <Input placeholder={t("complete")} className="rounded-md" />
                    </div>
                    <div className="space-y-2">
                        <Label>{t("phone")}</Label>
                        <div className="relative">
                            <Input placeholder="(406) 555-0120" className="pl-14 rounded-md" />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r pr-2 border-gray-200">
                                <span className="text-base">🇮🇶</span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>{t("password")}</Label>
                        <div className="relative">
                            <Input type="password" placeholder="**********" className="rounded-md" />
                            <EyeOff className="absolute rtl:left-4 ltr:right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer" />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>{t("email")}</Label>
                    <Input placeholder="wade.warren@example.com" className="rounded-md" />
                </div>

                <div className="space-y-2">
                    <Label>{t("role")}</Label>
                    <Input placeholder={t("manager")} className="rounded-md" />
                </div>
            </CardContent>
        </Card>
    )
}

export default ManagerProfileForm;