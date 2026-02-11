import EyeHiddenIcon from "@/components/icons/EyeHiddenIcon"
import EyeIcon from "@/components/icons/EyeIcon"
import { GenerateRandomColor } from "@/helpers/GenerateRandomColor"
import type { User } from "@/types/CurrentUser/Index"
import { Avatar } from "@mui/material"

type CardShowParticipantProps = {
    secretFriend: User
    showSecretName: boolean
    setShowSecretName: React.Dispatch<React.SetStateAction<boolean>>
}

const CardShowParticipant = ({
    secretFriend,
    showSecretName,
    setShowSecretName,
}: CardShowParticipantProps) => {
    const handleClick = (event: React.MouseEvent, value: boolean) => {
        event?.stopPropagation()
        setShowSecretName(value)
        localStorage.setItem("showSecretName", value.toString())
    }

    const handleClickHidden = (event: React.MouseEvent, value: boolean) => {
        event?.stopPropagation()
        setShowSecretName(value)
        localStorage.setItem("showSecretName", value.toString())
    }

    return (
        <div
            className={`flex justify-between items-center gap-2 h-22.5 border border-border py-2 px-4 md:py-4 md:px-6 rounded-lg animate-fade-in ${showSecretName ? "cursor-pointer" : ""}`}
        >
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
                <EyeIcon onClick={(event) => handleClick(event, false)} />
            )}
            {!showSecretName && (
                <EyeHiddenIcon
                    onClick={(event) => handleClickHidden(event, true)}
                />
            )}
        </div>
    )
}

export default CardShowParticipant
