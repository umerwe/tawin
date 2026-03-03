"use client"

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AuthHeader } from "../auth/AuthHeader";
import { useTranslations } from "next-intl";

const SignupForm = () => {
    const t = useTranslations("translation");
    const [showPassword, setShowPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);

    return (
        <section className="flex w-full flex-col items-center justify-center px-8 lg:w-1/2 xl:px-24">
            <div className="w-full max-w-sm space-y-10">
                <AuthHeader type="signup" />

                {/* Form */}
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <Input
                        id="firstName"
                        type="text"
                        placeholder={t("firstName")}
                        variant="auth" />

                    <Input
                        id="lastName"
                        type="text"
                        placeholder={t("lastName")}
                        variant="auth" />

                    <Input
                        id="username"
                        type="text"
                        placeholder={t("username")}
                        variant="auth" />

                    <Input
                        id="email"
                        type="email"
                        placeholder={t("emailLabel")}
                        variant="auth" />

                    <div className="relative">
                        <Input
                            id="password"
                            variant="auth"
                            type={showPassword ? "text" : "password"}
                            placeholder={t("password")}
                        />
                        <Button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute ltr:right-0 rtl:left-0 top-1/2 -translate-y-1/2 text-muted-foreground z-10 border-0"
                            aria-label="Toggle password visibility"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </Button>
                    </div>

                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="terms"
                            checked={agreeTerms}
                            onCheckedChange={(checked) => setAgreeTerms(!!checked)}
                        />
                        <Label
                            htmlFor="terms"
                            className="text-xs text-muted-foreground cursor-pointer"
                        >
                            {t("agreeTerms")}
                        </Label>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                    >
                        {t("registerAccount")}
                    </Button>

                </form>
            </div>
        </section>
    )
}

export default SignupForm