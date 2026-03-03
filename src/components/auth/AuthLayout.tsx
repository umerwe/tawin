"use client";

import Image from "next/image";
import { Building } from "lucide-react";
import { ReactNode } from "react";

export default function AuthLayout({ FormComponent }: { FormComponent: ReactNode }) {
    return (
        <div className="flex min-h-screen w-full bg-background">

            {FormComponent}

            <section className="relative hidden lg:flex lg:w-1/2 items-center justify-center overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=85"
                    alt="Construction site"
                    fill
                    priority
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-navy/70" />

                <div className="relative z-10 flex h-64 w-64 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
                    <Building className="w-28 h-28 text-gray-400" />
                </div>

            </section>
        </div>
    );
}