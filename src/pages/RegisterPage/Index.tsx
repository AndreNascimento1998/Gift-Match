import { useState } from "react"
import Details from "./componets/Details"
import FirstStep from "./componets/FirstStep"
import LastStep from "./componets/LastStep"
import SecondStep from "./componets/SecondStep"

const RegisterPage = () => {
    const [groupName, setGroupName] = useState("")
    const [groupDescription, setGroupDescription] = useState("")
    const [secretDate, setSecretDate] = useState("")
    const [giftAmount, setGiftAmount] = useState<number | null>(null)
    const [currentStep, setCurrentStep] = useState(0)

    return (
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-background-default py-6 px-8 md:px-20 rounded-lg md:rounded-none lg:border-t border-t-border shadow-2xs">
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
                    secretDate={secretDate}
                    setSecretDate={setSecretDate}
                    giftAmount={giftAmount}
                    setGiftAmount={setGiftAmount}
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
