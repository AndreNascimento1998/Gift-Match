import HeaderVisitor from "@/pages/HeaderVisitor/Index"

type VisitorLayoutProps = {
    children: React.ReactNode
}

const VisitorLayout = ({ children }: VisitorLayoutProps) => {
    return (
        <main className="flex flex-col gap-8 md:gap-0 pt-1 px-2 md:px-0">
            <HeaderVisitor />
            {children}
        </main>
    )
}

export default VisitorLayout
