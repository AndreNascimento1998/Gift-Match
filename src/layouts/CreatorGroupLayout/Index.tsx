import Footer from "@/pages/Footer/Index"
import CreatorGroup from "@/pages/Header/HeaderCreatorGroup"
import { useGlobalStore } from "@/stores/useGlobalStore"
import { Toaster } from "sonner"

type CreatorGroupLayoutProps = {
    children: React.ReactNode
}

const CreatorGroupLayout = ({ children }: CreatorGroupLayoutProps) => {
    const theme = useGlobalStore((state) => state.theme)
    return (
        <main className="flex flex-col gap-6 md:gap-0 px-2 pt-2 pb-2 md:pb-0 md:pt-0 md:px-0">
            <CreatorGroup />
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

export default CreatorGroupLayout
