import Footer from "@/pages/Footer/Index"
import HeaderDefault from "@/pages/Header/HeaderDefault"
import { useGlobalStore } from "@/stores/useGlobalStore"
import { Toaster } from "sonner"

type DefaultLayoutProps = {
    children: React.ReactNode
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    const theme = useGlobalStore((state) => state.theme)

    return (
        <main className="flex flex-col gap-6 md:gap-0 px-2 pt-2 pb-2 md:pb-0 md:pt-0 md:px-0 ">
            <HeaderDefault />
            {children}
            <Footer />
            <Toaster
                duration={6000}
                theme={theme}
                richColors
                position="top-right"
            />
        </main>
    )
}

export default DefaultLayout
