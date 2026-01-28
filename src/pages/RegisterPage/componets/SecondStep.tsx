import DatePicker from "@/components/base/Input/DatePicker"
import CustomComponent from "./CustomComponent"

type SecondStepProps = {
    currentStep: number
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

const SecondStep = ({ currentStep, setCurrentStep }: SecondStepProps) => {
    const dateParsed = () => {
        const date = new Date()
        const day = String(date.getDate()).padStart(2, "0")
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const year = date.getFullYear()
        return `${year}-${month}-${day}`
    }

    return (
        <div>
            <CustomComponent
                title="Defina os detalhes do grupo:"
                subtitle="Essas informações ajudam todos a entenderem as regras do jogo."
                buttonText="Próxima etapa"
                section={
                    <div>
                        <DatePicker
                            label="Data do amigo secreto:"
                            min={dateParsed()}
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
