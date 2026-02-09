import Button from "@/components/base/Button/Index"
import CurrencyInput from "@/components/base/Input/CurrencyInput"
import DatePicker from "@/components/base/Input/DatePicker"
import type { Group } from "@/types/CurrentUser/Index"
import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { getTodayYmd } from "@/validation"
import GiftIcon from "@/components/icons/GiftIcon"

type RulesProps = {
    secretDate: string
    giftAmount: number
    setUpdateGroup: (patch: Partial<Group>) => void
    onSave: () => void
    secretDateError?: boolean
    secretDateHelperText?: string
}

const Rules = ({
    secretDate,
    giftAmount,
    setUpdateGroup,
    onSave,
    secretDateError,
    secretDateHelperText,
}: RulesProps) => {
    const navigate = useNavigate()

    const todayYmd = useMemo(() => {
        return getTodayYmd()
    }, [])

    return (
        <div className="flex flex-col gap-2 lg:gap-20 h-full">
            <div className="flex flex-col gap-2 md:gap-4 border border-primary rounded-lg p-2 lg:p-6 bg-bg-card animation-translateXLeft">
                <div className="flex gap-2 items-center">
                    <GiftIcon />
                    <div className="text-h2">Regras do sorteio</div>
                </div>
                <DatePicker
                    label="Data do amigo secreto:"
                    required
                    value={secretDate}
                    min={todayYmd}
                    error={Boolean(secretDateError)}
                    helperText={secretDateHelperText}
                    onValueChange={(value) => {
                        setUpdateGroup({ secretDate: value })
                    }}
                />
                <CurrencyInput
                    label="Valor (opcional):"
                    value={giftAmount}
                    onNumberChange={(value) =>
                        setUpdateGroup({ giftAmount: value ?? 0 })
                    }
                />
            </div>
            <div className="flex flex-col gap-2 animation-translateXLeft animation-translateXLeft">
                <Button className="w-full" onClick={onSave}>
                    Salvar Alterações
                </Button>
                <Button variant="outlined" onClick={() => navigate("/")}>
                    Cancelar
                </Button>
            </div>
        </div>
    )
}

export default Rules
