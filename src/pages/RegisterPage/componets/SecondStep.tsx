import DatePicker from "@/components/base/Input/DatePicker"
import CustomComponent from "./CustomComponent"
import { useMemo, useState } from "react"

type SecondStepProps = {
    currentStep: number
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
    secretDate: string
    setSecretDate: React.Dispatch<React.SetStateAction<string>>
}

const SecondStep = ({
    currentStep,
    setCurrentStep,
    secretDate,
    setSecretDate,
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

        // Como é YYYY-MM-DD, comparação lexicográfica funciona
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
                onBeforeNextStep={validate}
                section={
                    <div>
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
                    </div>
                }
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
            />
        </div>
    )
}

export default SecondStep
