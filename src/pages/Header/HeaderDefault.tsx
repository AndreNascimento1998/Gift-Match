import { Avatar } from "@mui/material"
import useHeader from "./hooks/useHeader"
import MenuLinks from "@/components/base/MenuLinks/Index"

type HeaderDefaultProps = {
    menuOptions?: Array<{
        label: string
        route: string
        value: "home" | "about" | "contact" | "chat"
    }>
}

const HeaderDefault = () => {
    const header = useHeader()
    const { toggleTheme } = header

    const menuOptions: HeaderDefaultProps["menuOptions"] = [
        { label: "Participantes", route: "/", value: "home" },
        { label: "Dependentes", route: "/about", value: "about" },
        { label: "Presentes", route: "/contact", value: "contact" },
        { label: "Conversas", route: "/contacte", value: "chat" },
    ]

    const optionsDropdown = [
        { value: "working", label: "Como funciona" },
        { value: "rules", label: "Regras" },
        { value: "support", label: "Suporte" },
    ]

    return (
        <header className="flex justify-between items-center py-4 px-8 md:px-20 rounded-lg lg:rounded-none text-white bg-secondary">
            <Avatar
                sx={{
                    bgcolor: "third.main",
                    cursor: "pointer",
                }}
                onClick={toggleTheme}
            >
                A
            </Avatar>
            <div>
                <MenuLinks
                    options={menuOptions}
                    optionsDropdown={optionsDropdown}
                    labelDropdown="Configurações"
                    forceWhite
                />
            </div>
        </header>
    )
}

export default HeaderDefault
