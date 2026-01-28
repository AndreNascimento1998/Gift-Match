import Button from "@/components/base/Button/Index"
import CustomComponent from "./CustomComponent"

type SuccessStepProps = {
    currentStep: number
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
    sectionStep: boolean
}

const SuccessStep = ({
    currentStep,
    setCurrentStep,
    sectionStep,
}: SuccessStepProps) => {
    return (
        <main>
            <CustomComponent
                title="Grupo criado com sucesso!"
                subtitle="Agora é só compartilhar o link com quem vai participar do amigo secreto."
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                sectionStep={sectionStep}
                section={
                    <div className="flex flex-col gap-8">
                        <div>clipboard</div>
                        <span className="text-secondary text-h2 font-semibold">
                            🔒 Apenas quem tiver o link pode entrar no grupo.
                        </span>
                    </div>
                }
                buttonSection={
                    <Button onClick={() => console.log("mandar pra dashboard")}>
                        Ver meu grupo
                    </Button>
                }
                footer={
                    <div className="font-bold text-h2 text-primary">
                        Você poderá adicionar participantes, definir regras e
                        realizar o sorteio no painel.
                    </div>
                }
            />
        </main>
    )
}

export default SuccessStep
