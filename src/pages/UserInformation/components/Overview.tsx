import GiftIcon from "@/components/icons/GiftIcon"
import InfoCircleIcon from "@/components/icons/InfoCircleIcon"
import MessageIcon from "@/components/icons/MessageIcon"
import { GenerateRandomColor } from "@/helpers/GenerateRandomColor"
import type { User } from "@/types/CurrentUser/Index"
import { Avatar } from "@mui/material"

type OverviewProps = {
    user: User
}

const CardInformation = ({ user }: OverviewProps) => {
    return (
        <>
            <div className="flex flex-col gap-2">
                <span className="text-h2 lg:text-h1 font-bold text-primary">
                    Meu amigo secreto
                </span>
                <div className="w-full border border-dashed border-primary" />
            </div>
            <div className="flex flex-col gap-4 border border-border rounded-lg animate-fade-in p-4">
                <div className="flex items-center gap-4 ">
                    <Avatar
                        sx={{
                            width: 56,
                            height: 56,
                            bgcolor: GenerateRandomColor.generateColor(
                                user.name || "medtlo",
                            ),
                        }}
                    >
                        {user.name ? user.name[0] : "*"}
                        {user.name ? (user.name.split(" ")[1]?.[0] ?? "") : "*"}
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-bold">{user.name}</span>
                        <span>{user.email}</span>
                    </div>
                </div>
                <div className="flex gap-2 items-center italic border border-border rounded-lg p-2">
                    <MessageIcon />
                    {/*TODO: Colocar aqui um recado para o participante quando tiver */}
                    <span className="text-muted">
                        Este participante ainda não tem nenhum recado.
                    </span>
                </div>
            </div>
        </>
    )
}

const CardGift = ({ chosenGift }: { chosenGift?: string }) => {
    return (
        <div className="flex flex-col gap-4 border border-border rounded-lg animate-fade-in p-4">
            <div className="flex gap-2 items-center">
                <GiftIcon color="var(--color-primary)" />
                <span>Presentes escolhidos</span>
            </div>
            <div className="w-full border border-primary" />
            <div className="flex gap-2 border items-center border-primary rounded-lg p-2">
                <InfoCircleIcon color="var(--color-primary)" />
                {chosenGift ? (
                    <span>{chosenGift}</span>
                ) : (
                    <span className="text-muted">
                        Este participante ainda não escolheu um presente.
                    </span>
                )}
            </div>
        </div>
    )
}

const Overview = ({ user }: OverviewProps) => {
    return (
        <div className="flex flex-col gap-2 md:gap-10">
            <CardInformation user={user} />
            <CardGift chosenGift={user.chosenGift} />
        </div>
    )
}

export default Overview
