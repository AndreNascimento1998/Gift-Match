import CustomComponent from "./CustomComponent"

type SecondStepProps = {
    currentStep: number
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

const SecondStep = ({ currentStep, setCurrentStep }: SecondStepProps) => {
    return (
        <div>
            <CustomComponent
                section={<div>Second Step Content</div>}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
            />
        </div>
    )
}

export default SecondStep
