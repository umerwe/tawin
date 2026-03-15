"use client";

import { User, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function AddUserDialog({
    open,
    onOpenChange,
}: {
    open: boolean;
    onOpenChange: (val: boolean) => void;
}) {
    const t = useTranslations("translation");

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-sm rounded-2xl p-0 overflow-hidden border border-gray-100 shadow-xl">
                <DialogHeader className="px-5 pt-5">
                    <DialogTitle className="text-xl font-bold text-[#004d40]">
                        {t("addUser")}
                    </DialogTitle>
                </DialogHeader>

                <div className="px-5 pb-5 space-y-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                        <Label>{t("fullName")}</Label>
                        <div className="relative">
                            <User
                                size={16}
                                className="absolute top-1/2 -translate-y-1/2 text-gray-500 inset-s-3.5"
                            />
                            <Input
                                placeholder="John Doe"
                                className="border border-gray-200 bg-white text-gray-600 rounded-md ps-9 focus-visible:ring-aqua/40"
                            />
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                        <Label>{t("phoneNumber")}</Label>
                        <div className="relative">
                            <Phone
                                size={16}
                                className="absolute top-1/2 -translate-y-1/2 text-gray-500 inset-s-3.5"
                            />
                            <Input
                                placeholder="+1234567890"
                                className="border border-gray-200 bg-white text-gray-600 rounded-md ps-9 focus-visible:ring-aqua/40"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                        <Label>{t("email")}</Label>
                        <div className="relative">
                            <Mail
                                size={16}
                                className="absolute top-1/2 -translate-y-1/2 text-gray-500 inset-s-3.5"
                            />
                            <Input
                                placeholder="user@example.com"
                                className="border border-gray-200 bg-white text-gray-600 rounded-md ps-9 focus-visible:ring-aqua/40"
                            />
                        </div>
                    </div>

                    {/* Address */}
                    <div className="space-y-1.5">
                        <Label>{t("address")}</Label>
                        <div className="relative">
                            <MapPin
                                size={16}
                                className="absolute top-1/2 -translate-y-1/2 text-gray-500 inset-s-3.5"
                            />
                            <Input
                                placeholder="123 Main St, NY"
                                className="border border-gray-200 bg-white text-gray-600 rounded-md ps-9 focus-visible:ring-aqua/40"
                            />
                        </div>
                    </div>

                    {/* Status */}
                    {/* <div className="space-y-1.5">
                        <Label>{t("status")}</Label>
                        <Select defaultValue="Active">
                            <SelectTrigger className="border border-gray-200 bg-white text-gray-600 rounded-md h-10 focus:ring-aqua/40">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Active">{t("active")}</SelectItem>
                                <SelectItem value="Inactive">{t("inactive")}</SelectItem>
                                <SelectItem value="VIP">{t("vip")}</SelectItem>
                            </SelectContent>
                        </Select>
                    </div> */}

                    {/* Action Buttons */}
                    <div className="flex justify-center gap-3 pt-1">
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-32 border-gray-200 text-gray-600 hover:bg-gray-50 rounded-md"
                            onClick={() => onOpenChange(false)}
                        >
                            {t("cancel")}
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            className="w-32 rounded-md"
                        >
                            {t("addUser")}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}