import CustomComponent from "./CustomComponent"

type SecondStepProps = {
    currentStep: number
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

const SecondStep = ({ currentStep, setCurrentStep }: SecondStepProps) => {
    return (
        <div>
            <CustomComponent
                title="Defina os detalhes do grupo:"
                subtitle="Essas informações ajudam todos a entenderem as regras do jogo."
                buttonText="Próxima etapa"
                section={<div>Second Step Content</div>}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
            />
        </div>
    )
}

export default SecondStep
