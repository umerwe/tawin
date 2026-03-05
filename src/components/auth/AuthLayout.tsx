"use client";

import { Building } from "lucide-react";
import { ReactNode } from "react";
import Image from "../MyImage";

export default function AuthLayout({ FormComponent }: { FormComponent: ReactNode }) {
    return (
        <div className="flex min-h-screen w-full bg-background">

            {FormComponent}

            <section className="relative hidden lg:flex lg:w-1/2 items-center justify-center overflow-hidden">
                <Image
                    src="/auth-bg.png"
                    alt="Construction site"
                    fill
                    priority
                    className="object-cover object-[center_45%]"
                />

                <div className="absolute inset-0 bg-navy/70" />

                <div className="absolute z-10 flex h-64 w-64 items-center justify-center rounded-full border border-white/20 bg-gray-50/50 backdrop-blur-sm">
                    <Building className="w-28 h-28 text-gray-700" />
                </div>

            </section>
        </div>
    );
}