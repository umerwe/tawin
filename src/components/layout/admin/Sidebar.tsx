"use client";

import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import getDirection from "@/utils/getDirection";
import { Power } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { sidebarMenu } from "@/constants/sidebar";
import ConfirmDialog from "@/components/dialog/ConfirmDialog";

export default function Sidebar({ className }: { className?: string }) {
  const t = useTranslations("translation");
  const t2 = useTranslations("confirm");
  
  const pathname = usePathname();
  const locale = useLocale();
  const { openMobile, setOpenMobile, isMobile } = useSidebar();

  const dir = getDirection(locale);

  // Logic to determine if a menu item is active
  const isMenuActive = (path: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    if (path === "/") {
      return pathWithoutLocale === "/";
    }
    return pathWithoutLocale.startsWith(path);
  };

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile && openMobile) {
      setOpenMobile(false);
    }
  }, [pathname]);

  const handleConfirm = () => {
    // markLogout();
    // localStorage.removeItem("token");
    // localStorage.removeItem("permissions");
    // router.replace("/auth/login");
  };

  return (
    <SidebarComponent
      className={cn("border-r border-gray-200", className)}
      collapsible="icon"
      dir={dir}
    >
      {/* Header Section */}
      <SidebarHeader className="bg-white px-[24px] group-data-[collapsible=icon]:px-2 py-4 h-auto">
        <div className="font-medium text-sm text-gray-900 group-data-[collapsible=icon]:text-center">
          <span className="group-data-[collapsible=icon]:hidden">{t('constructionManagement')}</span>
          <span className="hidden group-data-[collapsible=icon]:inline">{t("cm")}</span>
        </div>
      </SidebarHeader>

      {/* Navigation Content */}
      <SidebarContent className="bg-white px-4 no-scrollbar group-data-[collapsible=icon]:overflow-y-auto group-data-[collapsible=icon]:px-2">
        <SidebarMenu className="flex flex-col gap-1">
          {sidebarMenu.map(({ icon: Icon, path, title }: any) => {
            const active = isMenuActive(path);
            return (
              <SidebarMenuItem key={path}>
                <SidebarMenuButton
                  asChild
                  isActive={active}
                  tooltip={t(`${title}`)}
                  onClick={() => {
                    if (isMobile && openMobile) {
                      setOpenMobile(false);
                    }
                  }}
                >
                  <Link
                    href={path}
                  >
                    <Icon
                      size={16}
                      strokeWidth={active ? 2.5 : 2}
                      className={cn(active ? "fill-white text-white" : "fill-none")}
                    />
                    <span className="text-sm font-medium">
                      {t(`${title}`)}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* Footer Section with User Profile and Logout */}
      <SidebarFooter>
        <ConfirmDialog
          title={t("logout")}
          description={t2("logout.description")}
          onConfirm={() => handleConfirm()}
          variant="destructive"
          confirmText={t("confirm")}
          asChild
        >
          {/* <div className="flex items-center gap-3">
            <Avatar className="h-[40px] w-[41px] border border-gray-100">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>UF</AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <p className="font-semibold text-base text-gray-900 truncate">ahmad</p>
              <p className="text-sm text-gray-500 -mt-1 truncate">ahmad@gmail.com</p>
            </div>
          </div> */}
          <SidebarMenuButton className="bg-red-500 hover:bg-red-600 hover:text-white text-white transition-colors">
            <Power size={16} /> <span>{t("logout")}</span>
          </SidebarMenuButton>
        </ConfirmDialog>
      </SidebarFooter>
    </SidebarComponent>
  );
}