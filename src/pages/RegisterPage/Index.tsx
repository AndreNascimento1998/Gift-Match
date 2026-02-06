import { useState } from "react"
import Details from "./componets/Details"
import FirstStep from "./componets/FirstStep"
import LastStep from "./componets/LastStep"
import SecondStep from "./componets/SecondStep"
import SuccessStep from "./componets/SuccessStep"
import Seo from "@/seo/Seo"

const RegisterPage = () => {
    const [groupName, setGroupName] = useState("")
    const [groupDescription, setGroupDescription] = useState("")
    const [secretDate, setSecretDate] = useState("")
    const [giftAmount, setGiftAmount] = useState<number | null>(null)
    const [currentStep, setCurrentStep] = useState(0)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [participation, setParticipation] = useState<
        "participing" | "noParticiping" | ""
    >("")

    const finishRegister = () => {
        console.log({
            groupName,
            groupDescription,
            secretDate,
            giftAmount,
            name,
            email,
            participation,
        })

        setCurrentStep(3)
    }

    return (
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-background-default py-6 px-8 md:px-20 rounded-lg md:rounded-none lg:border-t border-t-border shadow-2xs min-h-[calc(100vh-21.8rem)]">
            <Seo
                title="Criar grupo"
                description="Crie um grupo, defina regras e convide participantes para o amigo secreto."
            />
            {currentStep === 0 && (
                <FirstStep
                    sectionStep={true}
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
                    sectionStep={true}
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
                    sectionStep={true}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    participation={participation}
                    setParticipation={setParticipation}
                    finishRegister={finishRegister}
                />
            )}
            {currentStep === 3 && (
                <SuccessStep
                    sectionStep={false}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                />
            )}

            <Details />
        </main>
    )
}

export default RegisterPage
