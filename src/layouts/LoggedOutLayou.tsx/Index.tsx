import HeaderLoggedOut from "@/pages/HeaderLoggedOut/Index"

type LoggedOutLayoutProps = {
    children: React.ReactNode
}

const LoggedOutLayout = ({ children }: LoggedOutLayoutProps) => {
    return (
        <>
            <HeaderLoggedOut />
            {children}
        </>
    )
}

export default LoggedOutLayout
