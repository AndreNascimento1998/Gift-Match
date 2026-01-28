import Input from "@/components/base/Input/Index"
import CustomComponent from "./CustomComponent"
import useValidations from "@/hooks/useValidation"

type LastStepProps = {
    currentStep: number
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
    email: string
    setEmail: React.Dispatch<React.SetStateAction<string>>
}

const LastStep = ({
    currentStep,
    setCurrentStep,
    name,
    setName,
    email,
    setEmail,
}: LastStepProps) => {
    const { requiredFields, validateRequiredFields, requiredText } =
        useValidations()

    return (
        <div>
            <CustomComponent
                title="Última etapa:"
                subtitle="Esses dados serão usados para criar o grupo e enviar os convites."
                buttonText="Finalizar grupo"
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                onBeforeNextStep={() => validateRequiredFields({ name, email })}
                section={
                    <>
                        <Input
                            label="Qual seu nome?"
                            required
                            value={name}
                            onValueChange={(value) => {
                                setName(value)
                            }}
                            error={Boolean(requiredFields.name)}
                            helperText={
                                requiredFields.name ? requiredText : undefined
                            }
                        />
                        <Input
                            label="Qual seu e-mail?"
                            required
                            value={email}
                            onValueChange={(value) => {
                                setEmail(value)
                            }}
                            error={Boolean(requiredFields.email)}
                            helperText={
                                requiredFields.email ? requiredText : undefined
                            }
                        />
                    </>
                }
            />
        </div>
    )
}

export default LastStep
