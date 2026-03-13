"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeOff, HelpCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

const ManagerChangePasswordForm = () => {
    const t = useTranslations("translation");

    return (
        <Card className="border shadow-none h-fit">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-bold">{t("changePassword")}</CardTitle>
                <div className="flex items-center gap-1 text-purple-500 cursor-pointer">
                    <HelpCircle size={16} />
                    <span className="text-xs font-medium">{t("help")}</span>
                </div>
            </CardHeader>
            <CardContent className="space-y-5">
                <div className="space-y-2">
                    <Label>{t("currentPassword")}</Label>
                    <div className="relative">
                        <input 
                            type="password" 
                            placeholder={t("enterPassword")} 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                        />
                        <EyeOff className="absolute rtl:left-4 ltr:right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer" />
                    </div>
                    <div className="flex justify-end">
                        <button className="text-xs text-purple-600 hover:underline">
                            {t("forgotPassword")}
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>{t("newPassword")}</Label>
                    <div className="relative">
                        <Input type="password" placeholder={t("enterPassword")} className="rounded-md" />
                        <EyeOff className="absolute rtl:left-4 ltr:right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer" />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>{t("reEnterPassword")}</Label>
                    <div className="relative">
                        <Input type="password" placeholder={t("enterPassword")} className="rounded-md" />
                        <EyeOff className="absolute rtl:left-4 ltr:right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer" />
                    </div>
                </div>

                <Button variant="primary" className="mt-3 rounded-md">
                    {t("saveChanges")}
                </Button>
            </CardContent>
        </Card>
    )
}

export default ManagerChangePasswordForm;