"use client";

import { useState, useEffect } from "react"; // Added useEffect to sync state
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Home, Calendar, CheckCircle, XCircle, Clock } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { StatusDropdown } from "../tables/ConstructionBasketTable";
import getStatusColor from "@/utils/getStatusColor";

interface ConstructionBasketDetailDialogProps {
  basket: any;
  open: boolean;
  onClose: () => void;
}

const ConstructionBasketDetailDialog = ({ basket, open, onClose }: ConstructionBasketDetailDialogProps) => {
  const t = useTranslations("translation");
  const locale = useLocale() as "en" | "ar";

  // Track status locally so the color and icon change when you select a new one
  const [currentStatus, setCurrentStatus] = useState<string>(basket?.status?.en || "pending");

  // Sync state if the basket prop changes
  useEffect(() => {
    if (basket?.status?.en) {
      setCurrentStatus(basket.status.en);
    }
  }, [basket]);

  if (!basket) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="text-green-500" size={18} />;
      case "rejected":
        return <XCircle className="text-red-500" size={18} />;
      default:
        return <Clock className="text-yellow-500" size={18} />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {getStatusIcon(currentStatus)}
            {t('constructionBasketDetails')} - {basket.basketCode}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* Personal Info Card */}
          <Card className="border shadow-none">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-700 flex items-center gap-2">
                <User size={18} />
                {t('personalInformation')}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-400">{t('fullName')}</label>
                <p className="font-semibold text-gray-900">{basket.fullRegistrationName[locale]}</p>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-400">{t('phoneNumber')}</label>
                <p className="font-semibold text-gray-900" dir="ltr">{basket.phoneNumber}</p>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-400">{t('occupation')}</label>
                <p className="font-semibold text-gray-900">{basket.occupation[locale]}</p>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-400">{t('monthlyIncome')}</label>
                <p className="font-semibold text-gray-900">
                  {basket.monthlyIncome.toLocaleString()}
                  <span className="text-xs text-gray-400 ms-1 font-normal">IQD</span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Property Info Card */}
          <Card className="border shadow-none">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-700 flex items-center gap-2">
                <Home size={18} />
                {t('propertyInformation')}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-400">{t('propertyType')}</label>
                <p className="font-semibold text-gray-900">{basket.propertyType[locale]}</p>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-400">{t('propertyArea')}</label>
                <p className="font-semibold text-gray-900">
                  {basket.propertyArea}
                  <span className="text-xs text-gray-400 ms-1 font-normal">m²</span>
                </p>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-400">{t('country')}</label>
                <p className="font-semibold text-gray-900">{basket.country[locale]}</p>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-400">{t('registrationDate')}</label>
                <p className="font-semibold text-gray-900 flex items-center gap-2">
                  <Calendar size={16} className="text-gray-400" />
                  {basket.registrationDate}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Application Status Card */}
          <Card className="border shadow-none bg-gray-50/30">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-700">{t('applicationStatus')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="w-full sm:w-auto">
                  <StatusDropdown
                    item={basket}
                    t={t}
                    getStatusColor={getStatusColor}
                  />
                </div>

                <div className="text-sm text-gray-500 flex gap-4">
                  <span>{t('applied')}: <span className="text-gray-900 font-medium">{basket.isApplied ? t('yes') : t('no')}</span></span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConstructionBasketDetailDialog;