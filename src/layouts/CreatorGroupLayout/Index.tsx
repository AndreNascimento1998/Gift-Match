import Footer from "@/pages/Footer/Index"
import CreatorGroup from "@/pages/HeaderCreatorGroup/Index"

type CreatorGroupLayoutProps = {
    children: React.ReactNode
}

const CreatorGroupLayout = ({ children }: CreatorGroupLayoutProps) => {
    return (
        <main className="flex flex-col gap-6 md:gap-0 px-2 pt-2 pb-2 md:pb-0 md:pt-0 md:px-0">
            <CreatorGroup />
            {children}
            <Footer />
        </main>
    )
}

export default CreatorGroupLayout
