import EyeHiddenIcon from "@/components/icons/EyeHiddenIcon"
import EyeIcon from "@/components/icons/EyeIcon"
import { GenerateRandomColor } from "@/helpers/GenerateRandomColor"
import type { Participant } from "@/types/Home/Index"
import { Avatar } from "@mui/material"
import { useState } from "react"

type CardShowParticipantProps = {
    secretFriend: Participant
}

const CardShowParticipant = ({ secretFriend }: CardShowParticipantProps) => {
    const [showSecretName, setShowSecretName] = useState(false)

    return (
        <div className="flex justify-between items-center gap-2 h-22.5 border border-border py-2 px-4 md:py-4 md:px-6 rounded-lg animate-fade-in ">
            <div className="flex items-center gap-8 truncate pr-5 text-ellipsis">
                <div className="hidden md:block">
                    <Avatar
                        sx={{
                            width: 56,
                            height: 56,
                            bgcolor: GenerateRandomColor.generateColor(
                                showSecretName ? secretFriend.name : "medtlo",
                            ),
                        }}
                    >
                        {showSecretName ? secretFriend.name[0] : "*"}
                        {showSecretName
                            ? (secretFriend.name.split(" ")[1]?.[0] ?? "")
                            : "*"}
                    </Avatar>
                </div>
                {showSecretName && (
                    <div className="flex flex-col truncate">
                        <span className="truncate text-primary font-bold animate-fade-in">
                            {secretFriend.name}
                        </span>
                        <span className="truncate animate-fade-in">
                            Sorteio realizado
                        </span>
                    </div>
                )}

                {!showSecretName && (
                    <div className="flex flex-col truncate">
                        <span className="truncate animate-fade-in">
                            ***********
                        </span>
                        <span className="truncate animate-fade-in">
                            Não deixa ninguém ver, em!
                        </span>
                    </div>
                )}
            </div>
            {showSecretName && (
                <EyeIcon onClick={() => setShowSecretName(false)} />
            )}
            {!showSecretName && (
                <EyeHiddenIcon onClick={() => setShowSecretName(true)} />
            )}
        </div>
    )
}

export default CardShowParticipant
