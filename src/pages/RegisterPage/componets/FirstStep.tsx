import Input from "@/components/base/Input/Index"
import CustomComponent from "./CustomComponent"
import useValidations from "@/hooks/useValidation"

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
    const { required, validateRequired, requiredText } =
        useValidations(groupName)

    return (
        <main>
            <CustomComponent
                title="Amigo secreto online "
                subtitle="Crie seu grupo em poucos passos e convide quem quiser. "
                buttonText="Criar grupo"
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                onBeforeNextStep={() => validateRequired()}
                section={
                    <>
                        <Input
                            label="Nome do grupo:"
                            required
                            value={groupName}
                            onValueChange={(value) => {
                                setGroupName(value)
                            }}
                            error={required}
                            helperText={required ? requiredText : undefined}
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
                    <div className="flex justify-center">
                        <span>
                            Já tem um grupo?{" "}
                            <span className="text-primary cursor-pointer">
                                Clique aqui!
                            </span>
                        </span>
                    </div>
                }
            />
        </main>
    )
}

export default FirstStep
