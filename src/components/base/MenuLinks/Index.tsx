import ChatIcon from "@/components/icons/ChatIcon"
import DepententIcons from "@/components/icons/DependentIcons"
import GiftWhiteIcon from "@/components/icons/GiftWhiteIcon"
import ParticipantIcon from "@/components/icons/ParticipantIcon"
import { useLocation, useNavigate } from "react-router-dom"
import Dropdown from "../Dropdown/Index"
import ConfigurationIcon from "@/components/icons/ConfigurationIcon"

type MenuLinksProps = {
    options: Array<{
        label: string
        route: string
        value: "home" | "about" | "contact" | "chat"
    }>
    optionsDropdown: Array<{
        value: string
        label: string
    }>
    labelDropdown: string
    className?: string
    forceWhite?: boolean
}

const MenuLinks = ({
    options,
    optionsDropdown,
    labelDropdown,
    className,
    forceWhite = false,
}: React.PropsWithChildren<MenuLinksProps>) => {
    const navigate = useNavigate()
    const location = useLocation()
    const iconsMenu = {
        home: <ParticipantIcon />,
        about: <DepententIcons />,
        contact: <GiftWhiteIcon />,
        chat: <ChatIcon />,
    }

    const containerClassName = [
        "flex gap-6 items-center",
        forceWhite ? "text-white" : "",
        className ?? "",
    ]
        .filter(Boolean)
        .join(" ")

    return (
        <div className={containerClassName}>
            {options.map((options) => (
                <div
                    key={options.route}
                    className={`cursor-pointer ${location.pathname === options.route ? "font-bold" : ""} font-semibold`}
                    onClick={() => navigate(options.route)}
                >
                    <div className="flex gap-2 items-center mt-1">
                        <span>{iconsMenu[options.value]}</span>
                        <span>{options.label}</span>
                    </div>
                    <div
                        className={`${location.pathname === options.route ? "border-b-2 border-current" : "border-b-2 border-transparent"} mt-1 animate-fade-in`}
                    />
                </div>
            ))}
            <div className="flex items-center gap-1">
                <ConfigurationIcon />
                <Dropdown
                    label={labelDropdown}
                    items={optionsDropdown}
                    variant="text"
                    forceWhite={forceWhite}
                    onSelect={(value) => {
                        console.log("dropdown select", value)
                    }}
                />
            </div>
        </div>
    )
}

export default MenuLinks
