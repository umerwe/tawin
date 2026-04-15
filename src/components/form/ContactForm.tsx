"use client"

import { useState } from "react"
import Image from "@/components/MyImage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useTranslations } from "next-intl"
import { useSubmitContactForm } from "@/hooks/useContact"
import { SpinnerLoader } from "../common/SpinnerLoader"

const ContactForm = ({ isHome }: { isHome?: boolean }) => {
  const t = useTranslations("translation");
  const { mutate, isPending } = useSubmitContactForm();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="max-w-7xl mx-auto md:ltr:pl-6 md:rtl:pr-6 my-16 bg-white">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Contact Form */}
        <div className="w-full lg:w-1/2 space-y-6">
          {
            isHome &&
            <p className="text-center flex-1 mt-8 px-4 md:px-12 text-gray-800 text-lg font-semibold leading-relaxed">
              {t("contact")}
            </p>
          }

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>{t("fullName")}</Label>
              <Input
                placeholder={t("fullNamePlaceholder")}
                className="border-gray-200 bg-white rounded-lg h-12"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>{t("email")}</Label>
              <Input
                placeholder={t("emailPlaceholder")}
                type="email"
                className="border-gray-200 bg-white rounded-lg h-12"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>{t("message")}</Label>
              <Textarea
                placeholder={t("messagePlaceholder")}
                className="border-gray-200 bg-white rounded-xl min-h-[150px] resize-none"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                required
              />
            </div>
          </div>

          <Button
            variant="primary"
            className={isHome ? "w-full" : "w-40"}
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? <SpinnerLoader /> : t("send")}
          </Button>
        </div>

        <div className={`w-full lg:w-1/2 bg-gray-200 overflow-hidden relative ${isHome ? "h-[500px]" : "h-[415px]"}`}>
          {isHome ? (
            <Image
              src="/about-us.png"
              alt="Contact Background"
              fill
              className="object-cover"
              priority
            />
          ) : (
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13340.574676104443!2d44.4255!3d33.3152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x155781a71e84a287%3A0xc3f34567890!2sKarrada%2C%20Baghdad%2C%20Iraq!5e0!3m2!1sen!2s!4v1709400000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          )}
        </div>
      </div>
    </section>
  )
}

export default ContactForm