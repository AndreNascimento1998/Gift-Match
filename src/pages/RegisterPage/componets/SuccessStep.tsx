import Button from "@/components/base/Button/Index"
import CustomComponent from "./CustomComponent"
import InputClipBoard from "@/components/base/Input/InputClipBoard"
import { useNavigate } from "react-router-dom"

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
    const navigate = useNavigate()

    const handleCopyText = (text: string) => {
        console.log("Texto copiado:", text)
    }

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
                        <div>
                            <InputClipBoard
                                handleCopy={handleCopyText}
                                value="amigosecreto.com/groups/cmkvgvadsddfg/dsaasaasll.."
                            />
                        </div>
                        <span className="text-secondary-text text-h2 font-semibold">
                            🔒 Apenas quem tiver o link pode entrar no grupo.
                        </span>
                    </div>
                }
                buttonSection={
                    <Button onClick={() => navigate("/")}>Ver meu grupo</Button>
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
