import HeaderVisitor from "@/pages/HeaderVisitor/Index"

type VisitorLayoutProps = {
    children: React.ReactNode
}

const VisitorLayout = ({ children }: VisitorLayoutProps) => {
    return (
        <>
            <HeaderVisitor />
            {children}
        </>
    )
}

export default VisitorLayout
