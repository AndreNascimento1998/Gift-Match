import Input from "@/components/base/Input/Index"
import RadioGroup from "@/components/base/RadioGroup/Index"
import CustomComponent from "./CustomComponent"
import useValidations from "@/hooks/useValidation"

type LastStepProps = {
    currentStep: number
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
    name: string
    setName: React.Dispatch<React.SetStateAction<string>>
    email: string
    setEmail: React.Dispatch<React.SetStateAction<string>>
    participation: "participing" | "noParticiping" | ""
    setParticipation: React.Dispatch<
        React.SetStateAction<"participing" | "noParticiping" | "">
    >
    sectionStep: boolean
}

const LastStep = ({
    currentStep,
    setCurrentStep,
    name,
    setName,
    email,
    setEmail,
    participation,
    setParticipation,
    sectionStep,
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
                sectionStep={sectionStep}
                onBeforeNextStep={() =>
                    validateRequiredFields({ participation, name, email })
                }
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
                        <RadioGroup<"participing" | "noParticiping">
                            label="Você vai participar?"
                            required
                            value={participation}
                            onValueChange={(value) => {
                                setParticipation(value)
                            }}
                            options={[
                                {
                                    label: "Sim, vou participar",
                                    value: "participing",
                                },
                                {
                                    label: "Não, apenas administrar",
                                    value: "noParticiping",
                                },
                            ]}
                            error={Boolean(requiredFields.participation)}
                            helperText={
                                requiredFields.participation
                                    ? requiredText
                                    : undefined
                            }
                        />
                    </>
                }
            />
        </div>
    )
}

export default LastStep
