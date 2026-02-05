import ArrowRightIcon from "@/components/icons/ArrowRightIcon"
import { GenerateRandomColor } from "@/helpers/GenerateRandomColor"
import { Avatar } from "@mui/material"

type CardShowParticipantProps = {
    secretFriend: {
        id: string
        name: string
        email: string
    }
}

const CardShowParticipant = ({ secretFriend }: CardShowParticipantProps) => {
    return (
        <div className="flex justify-between items-center gap-2 h-22.5 border border-border py-4 px-6 rounded-lg hover:bg-primary-hover cursor-pointer animate-fade-in">
            <div className="flex items-center gap-8 truncate pr-5 text-ellipsis">
                <Avatar
                    sx={{
                        width: 56,
                        height: 56,
                        bgcolor: GenerateRandomColor.generateColor(
                            secretFriend.name,
                        ),
                    }}
                >
                    {secretFriend.name[0]}
                    {secretFriend.name[1]}
                </Avatar>
                <div className="flex flex-col truncate">
                    <span className="truncate">{secretFriend.name}</span>
                    <span className="truncate">{secretFriend.email}</span>
                </div>
            </div>
            <ArrowRightIcon className="hidden md:block" />
        </div>
    )
}

export default CardShowParticipant
