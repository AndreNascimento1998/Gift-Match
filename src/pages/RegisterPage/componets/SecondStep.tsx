import DatePicker from "@/components/base/Input/DatePicker"
import CurrencyInput from "@/components/base/Input/CurrencyInput"
import CustomComponent from "./CustomComponent"
import { useMemo, useState } from "react"

type SecondStepProps = {
    currentStep: number
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
    secretDate: string
    setSecretDate: React.Dispatch<React.SetStateAction<string>>
    giftAmount: number | null
    setGiftAmount: React.Dispatch<React.SetStateAction<number | null>>
    sectionStep: boolean
}

const SecondStep = ({
    currentStep,
    setCurrentStep,
    secretDate,
    setSecretDate,
    giftAmount,
    setGiftAmount,
    sectionStep,
}: SecondStepProps) => {
    const [dateErrorText, setDateErrorText] = useState<string | null>(null)

    const todayYmd = useMemo(() => {
        const date = new Date()
        const day = String(date.getDate()).padStart(2, "0")
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const year = date.getFullYear()
        return `${year}-${month}-${day}`
    }, [])

    const validate = () => {
        const trimmed = secretDate.trim()
        if (!trimmed) {
            setDateErrorText("Campo obrigatório")
            return false
        }

        if (trimmed < todayYmd) {
            setDateErrorText("A data deve ser a partir de hoje")
            return false
        }

        setDateErrorText(null)
        return true
    }

    return (
        <div>
            <CustomComponent
                title="Defina os detalhes do grupo:"
                subtitle="Essas informações ajudam todos a entenderem as regras do jogo."
                buttonText="Próxima etapa"
                sectionStep={sectionStep}
                onBeforeNextStep={validate}
                section={
                    <div className="flex flex-col gap-4">
                        <DatePicker
                            label="Data do amigo secreto:"
                            required
                            value={secretDate}
                            min={todayYmd}
                            onValueChange={(value) => {
                                setSecretDate(value)
                                if (value.trim()) setDateErrorText(null)
                            }}
                            error={Boolean(dateErrorText)}
                            helperText={dateErrorText ?? undefined}
                        />
                        <CurrencyInput
                            label="Valor (opcional):"
                            value={giftAmount}
                            onNumberChange={setGiftAmount}
                        />
                    </div>
                }
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
            />
        </div>
    )
}

export default SecondStep
