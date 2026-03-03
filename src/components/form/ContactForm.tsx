"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useTranslations } from "next-intl"

const ContactForm = () => {
  const t = useTranslations("translation");

  return (
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Interactive Map Mockup */}
          <div className="w-full lg:w-1/2 h-[415px] bg-gray-200 rounded-3xl overflow-hidden relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13340.574676104443!2d44.4255!3d33.3152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x155781a71e84a287%3A0xc3f34567890!2sKarrada%2C%20Baghdad%2C%20Iraq!5e0!3m2!1sen!2s!4v1709400000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Contact Form */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>{t("fullName")}</Label>
                <Input placeholder={t("fullNamePlaceholder")} className="border-gray-200 bg-white rounded-lg h-12" />
              </div>
              <div className="space-y-2">
                <Label>{t("email")}</Label>
                <Input placeholder={t("emailPlaceholder")} type="email" className="border-gray-200 bg-white rounded-lg h-12" />
              </div>
              <div className="space-y-2">
                <Label>{t("message")}</Label>
                <Textarea placeholder={t("messagePlaceholder")} className="border-gray-200 rounded-xl min-h-[150px] resize-none" />
              </div>
            </div>
            <Button variant="primary" className="w-40">
              {t("send")}
            </Button>
          </div>
        </div>
      </section>
  )
}

export default ContactForm