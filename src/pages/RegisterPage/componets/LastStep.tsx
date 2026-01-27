import CustomComponent from "./CustomComponent"

type LastStepProps = {
    currentStep: number
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

const LastStep = ({ currentStep, setCurrentStep }: LastStepProps) => {
    return (
        <div>
            <CustomComponent
                title="Última etapa:"
                subtitle="Esses dados serão usados para criar o grupo e enviar os convites."
                buttonText="Finalizar grupo"
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
            />
        </div>
    )
}

export default LastStep
