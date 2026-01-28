import Button from "@/components/base/Button/Index"
import StepCount from "@/components/base/StepCount/Index"

type FirstStepProps = {
    currentStep: number
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
    section?: React.ReactNode
    buttonSection?: React.ReactNode
    footer?: React.ReactNode
    title: string
    subtitle: string
    buttonText: string
    /** Retorne false para bloquear o avanço do step */
    onBeforeNextStep?: () => boolean | Promise<boolean>
}

const FirstStep = ({
    currentStep,
    setCurrentStep,
    section,
    buttonSection,
    footer,
    title,
    subtitle,
    buttonText,
    onBeforeNextStep,
}: FirstStepProps) => {
    const handleNextStep = async () => {
        const canProceed = (await onBeforeNextStep?.()) ?? true
        if (!canProceed) return
        setCurrentStep(currentStep + 1)
    }

    return (
        <main className="flex flex-col gap-9 lg:min-h-[calc(100vh-9rem)]">
            <section>
                <h1 className="text-h2 font-bold">{title}</h1>
                <h2 className="text-secondary-text font-semibold">
                    {subtitle}
                </h2>
            </section>
            <section className="flex flex-col gap-6 w-80">
                <div className="flex justify-center py-3">
                    <StepCount
                        steps={3}
                        currentStep={currentStep}
                        setCurrentStep={setCurrentStep}
                    />
                </div>
                {section}
                {buttonSection ? (
                    buttonSection
                ) : (
                    <Button onClick={handleNextStep}>{buttonText}</Button>
                )}
                {footer}
            </section>
        </main>
    )
}

export default FirstStep
