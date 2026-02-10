import { useState } from "react"
import { Avatar } from "@mui/material"
import useHeader from "./hooks/useHeader"
import MenuLinks from "@/components/base/MenuLinks/Index"
import ButtonHamburguerIcon from "@/components/icons/ButtonHamburguerIcon"
import DrawerMenu from "@/components/base/DrawerMenu/Index"
import ChatIcon from "@/components/icons/ChatIcon"
import DepententIcons from "@/components/icons/DependentIcons"
import GiftWhiteIcon from "@/components/icons/GiftWhiteIcon"
import ParticipantIcon from "@/components/icons/ParticipantIcon"
import ConfigurationIcon from "@/components/icons/ConfigurationIcon"

type HeaderDefaultProps = {
    menuOptions?: Array<{
        label: string
        route: string
        value: "home" | "dependents" | "contact" | "chat"
    }>
}

const HeaderDefault = () => {
    const header = useHeader()
    const { toggleTheme } = header

    const [drawerOpen, setDrawerOpen] = useState(false)

    const menuOptions: HeaderDefaultProps["menuOptions"] = [
        { label: "Participantes", route: "/", value: "home" },
        { label: "Dependentes", route: "/dependents", value: "dependents" },
        { label: "Presentes", route: "/contact", value: "contact" },
        { label: "Conversas", route: "/contacte", value: "chat" },
    ]

    const optionsDropdown = [
        { value: "myProfile", label: "Meu perfil" },
        { value: "helpCenter", label: "Ajuda" },
        { value: "privacyPolicy", label: "Políticas de privacidade" },
        { value: "termsOfUse", label: "Termos de uso" },
        { value: "logout", label: "Sair" },
    ]

    const iconsMenu = {
        home: <ParticipantIcon color="var(--color-primary)" />,
        dependents: <DepententIcons color="var(--color-primary)" />,
        contact: <GiftWhiteIcon color="var(--color-primary)" />,
        chat: <ChatIcon color="var(--color-primary)" />,
    }

    const drawerItems = [
        ...menuOptions.map((item) => ({
            label: item.label,
            route: item.route,
            icon: iconsMenu[item.value],
            key: item.value,
        })),
        {
            key: "settings",
            label: "Configurações",
            icon: <ConfigurationIcon color="var(--color-primary)" />,
            startExpanded: false,
            children: optionsDropdown.map((opt) => ({
                key: `settings:${opt.value}`,
                label: opt.label,
                onClick: () => {
                    console.log("dropdown select", opt.value)
                },
            })),
        },
    ]

    return (
        <header className="flex justify-between items-center py-4 px-8 md:px-20 rounded-lg lg:rounded-none text-white bg-secondary">
            <Avatar
                className="animation-translateBottom"
                sx={{
                    bgcolor: "third.main",
                    cursor: "pointer",
                }}
                onClick={toggleTheme}
            >
                A
            </Avatar>
            <div className="hidden lg:block animation-translateBottom">
                <MenuLinks
                    options={menuOptions}
                    optionsDropdown={optionsDropdown}
                    labelDropdown="Configurações"
                    forceWhite
                />
            </div>
            <article className="block lg:hidden">
                <button
                    type="button"
                    aria-label="Abrir menu"
                    className="p-2 rounded-md hover:bg-third"
                    onClick={() => setDrawerOpen(true)}
                >
                    <ButtonHamburguerIcon className="text-white" />
                </button>
            </article>

            <DrawerMenu
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                title="Navegação"
                items={drawerItems}
                anchor="right"
                profile={{
                    name: "João Silva",
                    email: "joaosilva@usuario.com",
                }}
            />
        </header>
    )
}

export default HeaderDefault
