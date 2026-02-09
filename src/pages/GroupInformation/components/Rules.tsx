import Button from "@/components/base/Button/Index"
import CurrencyInput from "@/components/base/Input/CurrencyInput"
import DatePicker from "@/components/base/Input/DatePicker"
import type { Group } from "@/types/CurrentUser/Index"
import { useMemo } from "react"
import { useNavigate } from "react-router-dom"

type RulesProps = {
    secretDate: string
    giftAmount: number
    setUpdateGroup: (patch: Partial<Group>) => void
}

const Rules = ({ secretDate, giftAmount, setUpdateGroup }: RulesProps) => {
    const navigate = useNavigate()

    const todayYmd = useMemo(() => {
        const date = new Date()
        const day = String(date.getDate()).padStart(2, "0")
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const year = date.getFullYear()
        return `${year}-${month}-${day}`
    }, [])

    return (
        <div className="flex flex-col gap-2 lg:gap-20 h-full">
            <div className="flex flex-col gap-2 md:gap-4 border border-primary rounded-lg p-2 lg:p-6 bg-bg-card">
                <div className="font-bold text-h2">Regras do sorteio</div>
                <DatePicker
                    label="Data do amigo secreto:"
                    required
                    value={secretDate}
                    min={todayYmd}
                    onValueChange={(value) => {
                        setUpdateGroup({ secretDate: value })
                    }}
                />
                <CurrencyInput
                    label="Valor (opcional):"
                    value={giftAmount}
                    onNumberChange={(value) =>
                        setUpdateGroup({ giftAmount: value })
                    }
                />
            </div>
            <div className="flex flex-col gap-2">
                <Button className="w-full">Salvar Alterações</Button>
                <Button variant="outlined" onClick={() => navigate("/")}>
                    Cancelar
                </Button>
            </div>
        </div>
    )
}

export default Rules
