import AuthGuard from "@/components/auth/AuthGuard";
import Container from "@/components/common/Container";
import Navbar from "@/components/layout/admin/Navbar";
import Sidebar from "@/components/layout/admin/Sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard"
};

export default function WebLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <AuthGuard requireAdmin={true}>
                <Sidebar />
                <SidebarInset className="min-h-screen">
                    <Navbar />
                    <Container variant="admin">
                        {children}
                    </Container>
                </SidebarInset>
            </AuthGuard>
        </SidebarProvider>
    );
}
