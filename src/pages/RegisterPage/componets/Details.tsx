import bannerDesktop from "@/assets/images/DetailsImages/banner.png"
import GiftCardIcon from "@/components/icons/GiftCardIcon"
import PeopleIcon from "@/components/icons/PeopleIcon"
import PhoneIcon from "@/components/icons/PhoneIcon"
import PadlockIcon from "../../../components/icons/PadlockIcon"
import type { JSX } from "node_modules/@emotion/react/dist/declarations/src/jsx-dev-runtime"

const Details = () => {
    const cardsItems: { text: string; icon: JSX.Element }[] = [
        {
            text: "Sorteio secreto e seguro",
            icon: <GiftCardIcon />,
        },
        {
            text: "Convidados acessam pelo link",
            icon: <PeopleIcon />,
        },
        {
            text: "Funciona no celular e no computador",
            icon: <PhoneIcon />,
        },
        {
            text: "Cada participante vê apenas quem tirou",
            icon: <PadlockIcon />,
        },
    ]

    return (
        <div className="flex flex-col">
            <div className="w-full flex justify-center">
                <img
                    src={bannerDesktop}
                    alt="Banner"
                    className="hidden md:block w-[574px]"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cardsItems.map((item) => (
                    <div
                        key={item.text}
                        className="flex items-center border border-border rounded-lg px-4 py-2 gap-2 bg-bg-card"
                    >
                        {item.icon}
                        {item.text}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Details
