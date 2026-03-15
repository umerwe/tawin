"use client"

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useTranslations, useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Login, LoginSchema } from "@/validations/auth";
import { useRouter } from "next/navigation";

// Admin credentials
const ADMIN_EMAIL = "admin@yopmail.com";
const ADMIN_PASSWORD = "admin123";

const AdminLoginForm = () => {
    const t = useTranslations("translation");
    const router = useRouter();
    const locale = useLocale();

    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [authError, setAuthError] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Login>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            identifier: "",
            password: "",
        },
    });

    const identifierValue = watch("identifier");

    const onSubmit = (data: Login) => {
        if (data.identifier !== ADMIN_EMAIL || data.password !== ADMIN_PASSWORD) {
            setAuthError(t("invalidCredentials"));
            return;
        }
        const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
        localStorage.setItem("token", token);
        router.push(`/${locale}/admin`);
    };

    return (
        <section className="flex w-full flex-col items-center justify-center px-8 lg:w-1/2 xl:px-24">
            <div className="w-full max-w-sm space-y-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-medium tracking-tight text-foreground">
                        {t("adminSignin")}
                    </h1>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        id="identifier"
                        type="text"
                        placeholder={t("loginIdentifierPlaceholder")}
                        variant="auth"
                        error={!!errors.identifier}
                        errorMessage={errors.identifier?.message}
                        {...register("identifier")}
                    />

                    {/* Password */}
                    <div className="relative">
                        <Input
                            id="password"
                            variant="auth"
                            type={showPassword ? "text" : "password"}
                            placeholder={t("password")}
                            error={!!errors.password}
                            errorMessage={errors.password?.message}
                            {...register("password")}
                        />
                        <Button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute ltr:right-0 rtl:left-0 top-[22px] -translate-y-1/2 text-muted-foreground z-10 border-0"
                            aria-label="Toggle password visibility"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </Button>
                    </div>

                    {/* Auth Error */}
                    {authError && (
                        <p className="text-xs text-red-500 -mt-3">{authError}</p>
                    )}

                    <Button type="submit" variant="primary">
                        {t("signin")}
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default AdminLoginForm;