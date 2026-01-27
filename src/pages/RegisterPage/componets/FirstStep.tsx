import Button from "@/components/base/Button/Index"
import Input from "@/components/base/Input/Index"
import { useState } from "react"

const FirstStep = () => {
    const [teste, setTeste] = useState("")

    return (
        <main className="flex flex-col gap-9 lg:h-[calc(100vh-9rem)]">
            <section>
                <h1 className="text-h2"> Amigo secreto online</h1>
                <h2 className="text-secondary-text">
                    Crie seu grupo em poucos passos e convide quem quiser.{" "}
                </h2>
            </section>
            <div>components</div>
            <section className="flex flex-col gap-6 w-80">
                <Input
                    label="Nome do grupo:"
                    value={teste}
                    onValueChange={setTeste}
                />
                <Input
                    label="Descrição (opcional):"
                    textArea
                    textAreaRows={4}
                    value={teste}
                    onValueChange={setTeste}
                />
                <Button onClick={() => console.log("cliqeu")}>
                    Criar grupo
                </Button>
            </section>
            <span>
                Já tem um grupo? <span>Clique aqui!</span>
            </span>
        </main>
    )
}

export default FirstStep
