import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslations } from "next-intl";

export default function AccountInfo() {
  const t = useTranslations("translation");
  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      <section className="space-y-6">
        <h2 className="text-lg font-semibold text-gray-900">{t("accountInformation")}</h2>
        <div className="space-y-4">
          <div className="space-y-2"><Label>{t("firstName")}*</Label><Input placeholder={t("firstName")} className="border-gray-300 rounded-md h-[50px]" /></div>
          <div className="space-y-2"><Label>{t("lastName")}*</Label><Input placeholder={t("lastName")} className="border-gray-300 rounded-md h-[50px]" /></div>
          <div className="space-y-2">
            <Label>{t("username")}*</Label>
            <Input placeholder={t("username")} className="border-gray-300 rounded-md h-[50px]" />
            <p className="text-[10px] text-gray-400">{t("usernameNotice")}</p>
          </div>
          <div className="space-y-2"><Label>{t("emailLabel")}*</Label><Input placeholder={t("emailLabel")} type="email" className="border-gray-300 rounded-md h-[50px]" /></div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-lg font-semibold text-gray-900">{t("password")}</h2>
        <div className="space-y-4">
          <div className="space-y-2"><Label>{t("currentPassword")}</Label><Input type="password" placeholder={t("currentPassword")} className="border-gray-300 rounded-md h-[50px]" /></div>
          <div className="space-y-2"><Label>{t("newPassword")}</Label><Input type="password" placeholder={t("newPassword")} className="border-gray-300 rounded-md h-[50px]" /></div>
          <div className="space-y-2"><Label>{t("reEnterPassword")}</Label><Input type="password" placeholder={t("reEnterPassword")} className="border-gray-300 rounded-md h-[50px]" /></div>
        </div>
      </section>
      
      <Button variant="primary" className="w-42">{t("saveChanges")}</Button>
    </div>
  )
}