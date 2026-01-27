import Button from "@/components/base/Button/Index"

const FirstStep = () => {
    return (
        <main className="flex flex-col gap-9 lg:h-[calc(100vh-9rem)]">
            <h1> Amigo secreto online</h1>
            <h2>Crie seu grupo em poucos passos e convide quem quiser. </h2>
            <div>components</div>
            <section className="flex flex-col gap-6 w-80">
                <div>Input</div>
                <div>Input</div>
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
