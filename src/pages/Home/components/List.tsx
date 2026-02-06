import Button from "@/components/base/Button/Index"
import Input from "@/components/base/Input/Index"
import ArrowRightIcon from "@/components/icons/ArrowRightIcon"
import ParticipantIcon from "@/components/icons/ParticipantIcon"
import PlusIcon from "@/components/icons/PlusIcon"
import SearchIcon from "@/components/icons/SearchIcon"
import { GenerateRandomColor } from "@/helpers/GenerateRandomColor"
import type { Participant } from "@/types/Home/Index"
import { Avatar } from "@mui/material"
import InputAdornment from "@mui/material/InputAdornment"

type ListProps = {
    participants?: Participant[]
    filtered: string
    setFiltered: React.Dispatch<React.SetStateAction<string>>
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const List = ({
    participants,
    filtered,
    setFiltered,
    setShowModal,
}: ListProps) => {
    return (
        <section className="flex flex-col gap-4 md:gap-10 lg:border border-border p-0 lg:p-6 rounded-lg">
            <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    <ParticipantIcon color="var(--color-primary)" />
                    <h2 className="text-h2 font-medium">Participantes</h2>
                </div>
                <span className="text-[14px]">4 de 6 confirmados</span>
            </div>
            <div>
                <Input
                    label="Pesquisar participante"
                    value={filtered}
                    onValueChange={(value) => {
                        setFiltered(value)
                    }}
                    endAdornment={
                        <InputAdornment position="end">
                            <SearchIcon color="var(--color-primary)" />
                        </InputAdornment>
                    }
                />
            </div>
            <div className="flex flex-col gap-8 max-h-[calc(100vh-20rem)] overflow-y-auto max-w-full overflow-x-hidden ">
                {participants && participants.length > 0 ? (
                    participants.map((participant) => (
                        <div
                            className="flex justify-between items-center gap-2 h-22.5 border border-border py-4 px-6 rounded-lg hover:bg-primary-hover cursor-pointer animate-fade-in"
                            key={participant.id}
                        >
                            <div className="flex items-center gap-8 truncate pr-5 text-ellipsis">
                                <Avatar
                                    sx={{
                                        width: 56,
                                        height: 56,
                                        bgcolor:
                                            GenerateRandomColor.generateColor(
                                                participant.name,
                                            ),
                                    }}
                                >
                                    {participant.name[0]}
                                </Avatar>
                                <div className="flex flex-col truncate">
                                    <span className="truncate">
                                        {participant.name}
                                    </span>
                                    <span className="truncate">
                                        {participant.email}
                                    </span>
                                </div>
                            </div>
                            <ArrowRightIcon className="hidden md:block" />
                        </div>
                    ))
                ) : (
                    <div className="flex justify-center">
                        Não conseguimos encontrar esses participantes
                    </div>
                )}
            </div>
            <section className="flex flex-col gap-8 w-full">
                <Button
                    className="w-full flex items-center gap-2"
                    variant="outlined"
                >
                    <PlusIcon />
                    <span>Adicionar participante</span>
                </Button>
                <Button onClick={() => setShowModal(true)} className="w-full">
                    Sortear
                </Button>
            </section>
        </section>
    )
}

export default List
