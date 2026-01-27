import Input from "@/components/base/Input/Index"
import CustomComponent from "./CustomComponent"

type FirstStepProps = {
    currentStep: number
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

const FirstStep = ({ currentStep, setCurrentStep }: FirstStepProps) => {
    return (
        <main className="flex flex-col gap-9 lg:h-[calc(100vh-9rem)]">
            <CustomComponent
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                section={
                    <>
                        <Input label="Nome do grupo:" />
                        <Input
                            label="Descrição (opcional):"
                            textArea
                            textAreaRows={4}
                        />
                    </>
                }
                footer={
                    <>
                        <span>
                            Já tem um grupo? <span>Clique aqui!</span>
                        </span>
                    </>
                }
            />
        </main>
    )
}

export default FirstStep
