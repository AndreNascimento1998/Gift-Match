import ChatIcon from "@/components/icons/ChatIcon"
import DepententIcons from "@/components/icons/DependentIcons"
import GiftWhiteIcon from "@/components/icons/GiftWhiteIcon"
import ParticipantIcon from "@/components/icons/ParticipantIcon"
import { useLocation, useNavigate } from "react-router-dom"
import Dropdown from "../Dropdown/Index"

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
}

const MenuLinks = ({
    options,
    optionsDropdown,
    labelDropdown,
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
        <div className="flex gap-6 items-center">
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
            <Dropdown
                label={labelDropdown}
                items={optionsDropdown}
                variant="outlined"
                onSelect={(value) => {
                    console.log("dropdown select", value)
                }}
            />
        </div>
    )
}

export default MenuLinks
