import Input from "@/components/base/Input/Index"
import SearchIcon from "@/components/icons/SearchIcon"
import { GenerateRandomColor } from "@/helpers/GenerateRandomColor"
import type { Participant } from "@/types/Home/Index"
import { Avatar } from "@mui/material"
import InputAdornment from "@mui/material/InputAdornment"

type ListProps = {
    participants?: Participant[]
}

const List = ({ participants }: ListProps) => {
    return (
        <section className="flex flex-col gap-10 border border-border p-6 rounded-lg">
            <div>
                <div>
                    <span>Participantes</span>
                </div>
            </div>
            <div>
                <Input
                    label="Pesquisar participante"
                    endAdornment={
                        <InputAdornment position="end">
                            <SearchIcon color="var(--color-primary)" />
                        </InputAdornment>
                    }
                />
            </div>
            <div className="flex flex-col gap-8 max-h-[calc(100vh-20rem)] overflow-y-auto">
                {participants && participants.length > 0 ? (
                    participants.map((participant) => (
                        <div
                            className="flex items-center gap-8 h-22.5 border border-border py-4 px-6 rounded-lg hover:bg-third cursor-pointer"
                            key={participant.id}
                        >
                            <Avatar
                                sx={{
                                    width: 56,
                                    height: 56,
                                    bgcolor: GenerateRandomColor.generateColor(
                                        participant.name,
                                    ),
                                }}
                            >
                                {participant.name[0]}
                            </Avatar>
                            <div className="flex flex-col">
                                <span> {participant.name}</span>
                                <span>{participant.email}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>Não há participantes</div>
                )}
            </div>
        </section>
    )
}

export default List
