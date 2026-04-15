import AuthGuard from "@/components/auth/AuthGuard"
import Footer from "@/components/layout/web/Footer"
import Navbar from "@/components/layout/web/Navbar"

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col min-h-screen w-full">
            <Navbar />
            <main className="flex-1">
                <AuthGuard>
                    {children}
                </AuthGuard>
            </main>
            <Footer />
        </div>
    )
}