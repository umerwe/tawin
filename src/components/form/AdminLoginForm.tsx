"use client"

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslations, useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Login, LoginSchema } from "@/validations/auth";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/useAuth";
import { SpinnerLoader } from "../common/SpinnerLoader";

const AdminLoginForm = () => {
    const t = useTranslations("translation");
    const router = useRouter();
    const locale = useLocale();
    const { mutate: login, isPending } = useLogin();

    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Login>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: Login) => {
        login(data, {
            onSuccess: () => {
                router.push(`/${locale}/admin`);
            }
        });
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
                        id="email"
                        type="email"
                        placeholder={t("loginPlaceholder")}
                        variant="auth"
                        error={!!errors.email}
                        errorMessage={errors.email?.message}
                        {...register("email")}
                        disabled={isPending}
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
                            disabled={isPending}
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

                    <Button
                        type="submit"
                        variant="primary"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <SpinnerLoader />
                        ) : (
                            t("signin")
                        )}
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default AdminLoginForm;