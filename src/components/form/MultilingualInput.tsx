"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

interface MultilingualInputProps {
  label: string;
  name: string; // "name" or "description"
  type?: "input" | "textarea";
  placeholderEn?: string;
  placeholderAr?: string;
}

export const MultilingualInput = ({
  label,
  name,
  type = "input",
  placeholderEn = "",
  placeholderAr = "",
}: MultilingualInputProps) => {
  const { register } = useFormContext();
  const [lang, setLang] = useState<"en" | "ar">("en");

  const LangButton = ({ l }: { l: "en" | "ar" }) => (
    <button
      type="button"
      onClick={() => setLang(l)}
      className={cn(
        "px-2 py-0.5 text-xs rounded font-semibold transition-colors",
        lang === l ? "bg-aqua text-white" : "bg-gray-100 text-gray-400 hover:bg-gray-200"
      )}
    >
      {l.toUpperCase()}
    </button>
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-gray-700 font-medium">{label}</Label>
        <div className="flex gap-1">
          <LangButton l="en" />
          <LangButton l="ar" />
        </div>
      </div>

      <div className={lang === "en" ? "block" : "hidden"}>
        {type === "input" ? (
          <Input {...register(`${name}.en`)} placeholder={placeholderEn} className="rounded-md" />
        ) : (
          <textarea
            {...register(`${name}.en`)}
            placeholder={placeholderEn}
            className="w-full min-h-[100px] p-3 rounded-md bg-gray-50 border border-gray-200 focus:border-aqua outline-none text-sm resize-none"
          />
        )}
      </div>

      <div className={lang === "ar" ? "block" : "hidden"}>
        {type === "input" ? (
          <Input {...register(`${name}.ar`)} placeholder={placeholderAr} dir="rtl" className="rounded-md text-right" />
        ) : (
          <textarea
            {...register(`${name}.ar`)}
            placeholder={placeholderAr}
            dir="rtl"
            className="w-full min-h-[100px] p-3 rounded-md bg-gray-50 border border-gray-200 focus:border-aqua outline-none text-sm resize-none text-right"
          />
        )}
      </div>
    </div>
  );
};