import HeaderVisitor from "@/pages/HeaderVisitor/Index"

type VisitorLayoutProps = {
    children: React.ReactNode
}

const VisitorLayout = ({ children }: VisitorLayoutProps) => {
    return (
        <main className="py-4 px-8">
            <HeaderVisitor />
            {children}
        </main>
    )
}

export default VisitorLayout
