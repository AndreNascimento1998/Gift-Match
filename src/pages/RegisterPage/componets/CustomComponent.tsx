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
    buttonText?: string
    sectionStep: boolean
    onBeforeNextStep?: () => boolean | Promise<boolean>
    onSubmit?: () => void | Promise<void>
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
    sectionStep,
    onBeforeNextStep,
    onSubmit,
}: FirstStepProps) => {
    const handleNextStep = async () => {
        const canProceed = (await onBeforeNextStep?.()) ?? true
        if (!canProceed) return
        setCurrentStep(currentStep + 1)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (onSubmit) {
            await onSubmit()
            return
        }
        await handleNextStep()
    }

    return (
        <main className="flex flex-col gap-9">
            <section className="animation-translateX">
                <h1 className="text-h1 font-bold">{title}</h1>
                <h2 className="text-secondary-text text-h2 font-semibold">
                    {subtitle}
                </h2>
            </section>
            <form
                className="flex flex-col gap-6 md:w-[70%]"
                onSubmit={handleSubmit}
                noValidate
            >
                {sectionStep && (
                    <div className="flex justify-center py-3">
                        <StepCount
                            steps={3}
                            currentStep={currentStep}
                            setCurrentStep={setCurrentStep}
                        />
                    </div>
                )}
                {section}
                {buttonSection ? (
                    buttonSection
                ) : (
                    <Button type="submit" className="animation-translateX">
                        {buttonText}
                    </Button>
                )}
                {footer}
            </form>
        </main>
    )
}

export default FirstStep
