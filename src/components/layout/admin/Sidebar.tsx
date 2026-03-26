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
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { sidebarMenu } from "@/constants/sidebar";
import ConfirmDialog from "@/components/dialog/ConfirmDialog";

export default function Sidebar({ className }: { className?: string }) {
  const t = useTranslations("translation");
  const t2 = useTranslations("confirm");

  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const { openMobile, setOpenMobile, isMobile } = useSidebar();

  const dir = getDirection(locale);

  const isMenuActive = (path: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    if (pathWithoutLocale === path) return true;
    if (path !== "/admin" && pathWithoutLocale.startsWith(path + "/")) return true;
    return false;
  };

  useEffect(() => {
    if (isMobile && openMobile) {
      setOpenMobile(false);
    }
  }, [pathname]);

  const handleConfirm = () => {
   router.push("/auth/admin")
  };

  // UPDATED: Sections partitioning
  // 1-7: items 0 to 6
  const mainMenu = sidebarMenu.slice(0, 8); 
  // 8-11: items 7 to 11
  const productsMenu = sidebarMenu.slice(8, 12); 
  // 12+: items 12 onwards
  const adminMenu = sidebarMenu.slice(12); 

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="px-2 py-2 text-sm font-semibold text-gray-400 group-data-[collapsible=icon]:hidden">
      {t(title)}
    </div>
  );

  const renderMenuItems = (items: typeof sidebarMenu) => (
    <SidebarMenu className="flex flex-col gap-1">
      {items.map(({ icon: Icon, path, title }: any) => {
        const active = isMenuActive(path);
        return (
          <SidebarMenuItem key={path}>
            <SidebarMenuButton
              asChild
              isActive={active}
              tooltip={t(`${title}`)}
              onClick={() => isMobile && setOpenMobile(false)}
            >
              <Link href={path}>
                <Icon
                  size={16}
                  strokeWidth={active ? 2.5 : 2}
                  className={cn(active ? "fill-white text-white" : "fill-none")}
                />
                <span className="text-sm font-medium">{t(`${title}`)}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );

  return (
    <SidebarComponent className={cn("border-r border-gray-200", className)} collapsible="icon" dir={dir}>
      <SidebarHeader className="bg-white px-[24px] group-data-[collapsible=icon]:px-2 py-4 h-auto">
        <div className="font-medium text-sm text-gray-900 group-data-[collapsible=icon]:text-center">
          <span className="group-data-[collapsible=icon]:hidden">{t('constructionManagement')}</span>
          <span className="hidden group-data-[collapsible=icon]:inline">{t("cm")}</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-white px-4 no-scrollbar group-data-[collapsible=icon]:overflow-y-auto group-data-[collapsible=icon]:px-2">
        
        <div className="mb-2">
          <SectionHeader title="mainMenu" />
          {renderMenuItems(mainMenu)}
        </div>

        <div className="mb-2">
          <SectionHeader title="products" />
          {renderMenuItems(productsMenu)}
        </div>

        <div className="mb-2">
          <SectionHeader title="administrator" />
          {renderMenuItems(adminMenu)}
        </div>

      </SidebarContent>

      <SidebarFooter>
        <ConfirmDialog
          title={t("logout")}
          description={t2("logout.description")}
          onConfirm={handleConfirm}
          variant="destructive"
          confirmText={t("confirm")}
          asChild
        >
          <SidebarMenuButton className="bg-red-500 hover:bg-red-600 hover:text-white text-white transition-colors">
            <Power size={16} /> <span>{t("logout")}</span>
          </SidebarMenuButton>
        </ConfirmDialog>
      </SidebarFooter>
    </SidebarComponent>
  );
}