import ChatIcon from "@/components/icons/ChatIcon"
import DepententIcons from "@/components/icons/DependentIcons"
import GiftWhiteIcon from "@/components/icons/GiftWhiteIcon"
import ParticipantIcon from "@/components/icons/ParticipantIcon"
import { useLocation, useNavigate } from "react-router-dom"

type MenuLinksProps = {
    options: Array<{
        label: string
        route: string
        value: "home" | "about" | "contact" | "chat"
    }>
}

const MenuLinks = ({
    options,
    children,
}: React.PropsWithChildren<MenuLinksProps>) => {
    const navigate = useNavigate()
    const location = useLocation()
    const iconsMenu = {
        home: <ParticipantIcon />,
        about: <DepententIcons />,
        contact: <GiftWhiteIcon />,
        chat: <ChatIcon />,
    }

    return (
        <div className="flex gap-6">
            {options.map((options) => (
                <div
                    key={options.route}
                    className={`cursor-pointer ${location.pathname === options.route ? "font-bold" : ""} font-semibold`}
                    onClick={() => navigate(options.route)}
                >
                    <div className="flex gap-2 items-center">
                        <span>{iconsMenu[options.value]}</span>
                        <span>{options.label}</span>
                    </div>
                    <div
                        className={`${location.pathname === options.route ? "border border-white" : ""} animate-fade-in`}
                    />
                </div>
            ))}
            {children}
        </div>
    )
}

export default MenuLinks
