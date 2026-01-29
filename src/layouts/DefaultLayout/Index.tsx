import Footer from "@/pages/Footer/Index"
import HeaderDefault from "@/pages/Header/HeaderDefault"

type DefaultLayoutProps = {
    children: React.ReactNode
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    return (
        <main className="flex flex-col gap-6 md:gap-0 px-2 pt-2 pb-2 md:pb-0 md:pt-0 md:px-0">
            <HeaderDefault />
            {children}
            <Footer />
        </main>
    )
}

export default DefaultLayout
