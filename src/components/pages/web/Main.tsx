"use client"

import HeroSection from "./HeroSection"
import Foundations from "./Foundations"
import ContactSection from "./ContactSection"

export default function Main() {
    return (
        <div className="w-full space-y-10">
            <HeroSection />

            <Foundations />

            <ContactSection />
        </div>
    )
}