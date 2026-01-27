import { useState } from "react"
import Details from "./componets/Details"
import FirstStep from "./componets/FirstStep"
import LastStep from "./componets/LastStep"
import SecondStep from "./componets/SecondStep"

const RegisterPage = () => {
    const [groupName, setGroupName] = useState("")
    const [groupDescription, setGroupDescription] = useState("")
    const [currentStep, setCurrentStep] = useState(0)

    return (
        <main className="grid grid-cols-2 gap-4 bg-background-default py-4 px-8 lg:border-t border-t-border shadow-2xs">
            {currentStep === 0 && (
                <FirstStep
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    groupName={groupName}
                    setGroupName={setGroupName}
                    groupDescription={groupDescription}
                    setGroupDescription={setGroupDescription}
                />
            )}
            {currentStep === 1 && (
                <SecondStep
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                />
            )}
            {currentStep === 2 && (
                <LastStep
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                />
            )}
            <Details />
        </main>
    )
}

export default RegisterPage
