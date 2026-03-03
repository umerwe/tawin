import Container from "@/components/common/Container"
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
            <Container className="max-w-7xl mx-auto">
                {children}
            </Container>
            <Footer />
        </div>
    )
}