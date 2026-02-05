import { useMemo, useState } from "react"
import Description from "./components/Description"
import List from "./components/List"
import type { Participant } from "@/types/Home/Index"
import RaffleModal from "./components/RaffleModal"
import CardRevelation from "./components/CardRevelation"

const participationMock: Participant[] = [
    {
        id: "1",
        name: "André Cardoso",
        email: "sanfrancisconigthfillalrigth@yahoooutlookhotmail.com",
    },
    {
        id: "2",
        name: "Maria Silva",
        email: "maria@dsa.com",
    },
    {
        id: "3",
        name: "João Souza",
        email: "joao@hasad.com",
    },
    {
        id: "4",
        name: "Ana Pereira",
        email: "ana@sadas.com",
    },
    {
        id: "5",
        name: "Carlos Oliveira",
        email: "carlos@dsad.com",
    },
    {
        id: "6",
        name: "Mariana Costa",
        email: "dasdas@com",
    },
]

const Home = () => {
    // const [email, setEmail] = useState("andre.ncardoso@hotmail.com")
    const [giftAmount] = useState<number>(50)
    const [groupDescription] = useState(
        "Por favor, levar presente caro o mais caro possível playstation, xbox series ou pczão aquele bem caro mesmo, agradeço encarecidamente, o possível esforço de levar o que tem de mais caro!",
    )
    const [groupName] = useState("Amigo Secreto da Firma")
    // const [name, setName] = useState("André Cardoso")
    // const [participation, setParticipation] = useState("")
    const [secretDate] = useState("2026-02-12")
    const [filtered, setFiltered] = useState("")

    const participantsFiltered = useMemo(() => {
        return participationMock.filter((participant) =>
            participant.name
                .toLowerCase()
                .includes(filtered.toLocaleLowerCase()),
        )
    }, [filtered])
    const [showModal, setShowModal] = useState(false)
    const [showParticipation, setShowParticipation] = useState(false)
    const [secretFriend] = useState<Participant>({
        id: "1",
        name: "André Cardoso",
        email: "andre.ncardoso@hotmail.com",
    })

    return (
        <>
            <main className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start bg-background-default py-6 px-8 md:px-20 rounded-lg md:rounded-none lg:border-t border-t-border shadow-2xs min-h-[calc(100vh-21.8rem)]">
                <div className="flex flex-col gap-10">
                    <Description
                        groupName={groupName}
                        groupDescription={groupDescription}
                        secretDate={secretDate}
                        giftAmount={giftAmount}
                    />
                    {showParticipation && (
                        <CardRevelation secretFriend={secretFriend} />
                    )}
                </div>
                <List
                    participants={participantsFiltered}
                    filtered={filtered}
                    setFiltered={setFiltered}
                    setShowModal={setShowModal}
                />
            </main>

            <RaffleModal
                showModal={showModal}
                setShowModal={setShowModal}
                participations={participationMock}
                showParticipation={showParticipation}
                setShowParticipation={setShowParticipation}
            />
        </>
    )
}

export default Home
