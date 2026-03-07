"use client";

import { ReactNode } from "react";
import Image from "../MyImage";
import Link from "next/link";

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

                <Link
                    href="/"
                    className="relative z-10">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={300}
                        height={300}
                    />
                </Link>

            </section>
        </div>
    );
}