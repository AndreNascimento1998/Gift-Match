import HeaderVisitor from "@/pages/HeaderVisitor/Index"

type CreatorGroupLayoutProps = {
    children: React.ReactNode
}

const CreatorGroupLayout = ({ children }: CreatorGroupLayoutProps) => {
    return (
        <main className="flex flex-col gap-6 md:gap-0 pt-1 px-2 md:px-0">
            <HeaderVisitor />
            {children}
        </main>
    )
}

export default CreatorGroupLayout
