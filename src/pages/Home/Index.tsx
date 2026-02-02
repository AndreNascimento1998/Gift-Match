import { useMemo, useState } from "react"
import Description from "./components/Description"
import List from "./components/List"
import type { Participant } from "@/types/Home/Index"

function Home() {
    // const [email, setEmail] = useState("andre.ncardoso@hotmail.com")
    const [giftAmount] = useState<number>(50)
    const [groupDescription] = useState(
        "Por favor, levar presente caro o mais caro possível playstation, xbox series ou pczão aquele bem caro mesmo, agradeço encarecidamente, o possível esforço de levar o que tem de mais caro!",
    )
    const [groupName] = useState("Amigo Secreto da Firma")
    // const [name, setName] = useState("André Cardoso")
    // const [participation, setParticipation] = useState("")
    const [secretDate] = useState("2026-02-12")
    const participationMock: Participant[] = [
        {
            id: "1",
            name: "André Cardoso",
            email: "andre@dfas.com",
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
    const [filtered, setFiltered] = useState("")

    const participantsFiltered = useMemo(() => {
        return participationMock.filter((participant) =>
            participant.name
                .toLowerCase()
                .includes(filtered.toLocaleLowerCase()),
        )
    }, [filtered, participationMock])

    return (
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start bg-background-default py-6 px-8 md:px-20 rounded-lg md:rounded-none lg:border-t border-t-border shadow-2xs min-h-[calc(100vh-21.8rem)]">
            <Description
                groupName={groupName}
                groupDescription={groupDescription}
                secretDate={secretDate}
                giftAmount={giftAmount}
            />
            <List
                participants={participantsFiltered}
                filtered={filtered}
                setFiltered={setFiltered}
            />
        </main>
    )
}

export default Home
