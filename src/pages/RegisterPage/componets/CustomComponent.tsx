import Button from "@/components/base/Button/Index"
import StepCount from "@/components/base/StepCount/Index"

type FirstStepProps = {
    currentStep: number
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
    section?: React.ReactNode
    footer?: React.ReactNode
    title: string
    subtitle: string
    buttonText: string
}

const FirstStep = ({
    currentStep,
    setCurrentStep,
    section,
    footer,
    title,
    subtitle,
    buttonText,
}: FirstStepProps) => {
    return (
        <main className="flex flex-col gap-9 lg:h-[calc(100vh-9rem)]">
            <section>
                <h1 className="text-h2">{title}</h1>
                <h2 className="text-secondary-text">{subtitle}</h2>
            </section>
            <StepCount
                steps={3}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
            />
            <section className="flex flex-col gap-6 w-80">
                {section}
                <Button onClick={() => setCurrentStep(currentStep + 1)}>
                    {buttonText}
                </Button>
            </section>
            {footer}
        </main>
    )
}

export default FirstStep
