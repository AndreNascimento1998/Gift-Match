import { useState } from "react"
import Input from "@/components/base/Input/Index"
import CustomComponent from "./CustomComponent"

type FirstStepProps = {
    currentStep: number
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
    groupName: string
    setGroupName: React.Dispatch<React.SetStateAction<string>>
    groupDescription: string
    setGroupDescription: React.Dispatch<React.SetStateAction<string>>
}

const FirstStep = ({
    currentStep,
    setCurrentStep,
    groupName,
    setGroupName,
    groupDescription,
    setGroupDescription,
}: FirstStepProps) => {
    const [groupNameError, setGroupNameError] = useState(false)

    const validate = () => {
        const isValid = groupName.trim().length > 0
        setGroupNameError(!isValid)
        return isValid
    }

    return (
        <main className="flex flex-col gap-9 lg:h-[calc(100vh-9rem)]">
            <CustomComponent
                title="Amigo secreto online "
                subtitle="Crie seu grupo em poucos passos e convide quem quiser. "
                buttonText="Criar grupo"
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                onBeforeNextStep={validate}
                section={
                    <>
                        <Input
                            label="Nome do grupo:"
                            required
                            value={groupName}
                            onValueChange={(value) => {
                                setGroupName(value)
                            }}
                            error={groupNameError}
                            helperText={
                                groupNameError ? "Campo obrigatório" : undefined
                            }
                        />
                        <Input
                            label="Descrição (opcional):"
                            textArea
                            textAreaRows={4}
                            value={groupDescription}
                            onValueChange={setGroupDescription}
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
