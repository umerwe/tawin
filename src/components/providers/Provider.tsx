import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { SidebarProvider } from "../ui/sidebar";

const Providers = async ({ children }: { children: React.ReactNode }) => {
  const messages = await getMessages();
  return (
    <div>
      <NextIntlClientProvider messages={messages}>
        <SidebarProvider>
          {children}
        </SidebarProvider>
      </NextIntlClientProvider>
    </div>
  );
};

export default Providers;