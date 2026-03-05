import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { SidebarProvider } from "../ui/sidebar";
import ReduxProvider from "./ReduxProvider";

const Providers = async ({ children }: { children: React.ReactNode }) => {
  const messages = await getMessages();
  return (
    <ReduxProvider>
      <NextIntlClientProvider messages={messages}>
        <SidebarProvider>
          {children}
        </SidebarProvider>
      </NextIntlClientProvider>
    </ReduxProvider>
  );
};

export default Providers;