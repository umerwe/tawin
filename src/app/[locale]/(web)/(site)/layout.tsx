import Footer from "@/components/layout/web/Footer"
import Navbar from "@/components/layout/web/Navbar"

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="w-full">
            <Navbar />
            
                {children}
         
            <Footer />
        </div>
    )
}