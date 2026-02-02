import { useState } from "react"
import Description from "./components/Description"

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

    return (
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-background-default py-6 px-8 md:px-20 rounded-lg md:rounded-none lg:border-t border-t-border shadow-2xs min-h-[calc(100vh-20.2rem)]">
            <Description
                groupName={groupName}
                groupDescription={groupDescription}
                secretDate={secretDate}
                giftAmount={giftAmount}
            />
            <div>dsadas</div>
        </main>
    )
}

export default Home
