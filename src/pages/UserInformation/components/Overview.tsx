import Card from "@/components/base/Cards/Index"
import ArrowRightIcon from "@/components/icons/ArrowRightIcon"
import ChatMessageIcon from "@/components/icons/ChatMessageIcon"
import GiftIcon from "@/components/icons/GiftIcon"
import InfoCircleIcon from "@/components/icons/InfoCircleIcon"
import MessageIcon from "@/components/icons/MessageIcon"
import { GenerateRandomColor } from "@/helpers/GenerateRandomColor"
import type { User } from "@/types/CurrentUser/Index"
import { Avatar } from "@mui/material"

type OverviewProps = {
    user: User
    informationMySecretFriend: boolean
}

const CardInformation = ({
    user,
    informationMySecretFriend,
}: OverviewProps) => {
    return (
        <>
            <div className="flex flex-col gap-2">
                {informationMySecretFriend && (
                    <span className="text-h2 lg:text-h1 font-bold text-primary">
                        Meu amigo secreto
                    </span>
                )}
                {!informationMySecretFriend && (
                    <span className="text-h2 lg:text-h1 font-bold text-primary">
                        Perfil do Participante
                    </span>
                )}
                <div className="w-full border border-dashed border-primary" />
            </div>
            <Card>
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
                    <div className="flex flex-col overflow-hidden">
                        <span className="font-bold text-ellipsis truncate">
                            {user.name}
                        </span>
                        <span className="text-ellipsis truncate">
                            {user.email}
                        </span>
                    </div>
                </div>
                {informationMySecretFriend && (
                    <div className="flex gap-2 items-center italic border border-border rounded-lg p-2">
                        <MessageIcon />
                        {/*TODO: Colocar aqui um recado para o participante quando tiver */}
                        <span className="text-muted">
                            Este participante ainda não tem nenhum recado.
                        </span>
                    </div>
                )}
            </Card>
        </>
    )
}

const CardGift = ({ chosenGift }: { chosenGift?: string }) => {
    return (
        <Card>
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
        </Card>
    )
}

const ChatMySecretFriend = () => {
    return (
        <div className="flex gap-2 justify-between items-center border border-border rounded-lg bg-bg-card animate-fade-in p-2 md:p-4">
            <div className="flex gap-2">
                <ChatMessageIcon />
                <div className="flex flex-col gap-2 justify-center">
                    <span className="font-bold">Conversar</span>
                    <span className="text-[14px] text-muted">
                        Amigo secreto
                    </span>
                </div>
            </div>
            <ArrowRightIcon />
        </div>
    )
}

const Overview = ({ user, informationMySecretFriend }: OverviewProps) => {
    return (
        <div className="flex flex-col gap-2 md:gap-10">
            <CardInformation
                user={user}
                informationMySecretFriend={informationMySecretFriend}
            />
            <CardGift chosenGift={user.chosenGift} />
            {informationMySecretFriend && <ChatMySecretFriend />}
        </div>
    )
}

export default Overview
