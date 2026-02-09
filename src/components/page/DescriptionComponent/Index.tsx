import CalendarIcon from "@/components/icons/CalendarIcon"
import DescriptionIcon from "@/components/icons/DescriptionIcon"
import MoneyIcon from "@/components/icons/MoneyIcon"
import { FormatDate } from "@/helpers/FormatDate"
import { FormatMoney } from "@/helpers/FormatMoney"

type DescriptionComponentProps = {
    groupDescription: string
    secretDate: string
    giftAmount: number
}

const DescriptionComponent = ({
    groupDescription,
    secretDate,
    giftAmount,
}: DescriptionComponentProps) => {
    return (
        <>
            <div>
                <div className="flex items-center gap-2 animate-fade-in">
                    <DescriptionIcon />
                    <span>Descrição:</span>
                </div>
                <div className="text-muted text-h3 line-clamp-2 w-full animate-fade-in">
                    {groupDescription}
                </div>
            </div>
            <div>
                <div className="flex items-center gap-2 animate-fade-in">
                    <CalendarIcon /> <span>Data do amigo secreto:</span>
                </div>
                <div className="text-muted animate-fade-in">
                    {FormatDate.toBrazilianFormat(secretDate)}
                </div>
            </div>
            <div>
                <div className="flex items-center gap-2 animate-fade-in">
                    <MoneyIcon /> <span>Valor do presente:</span>
                </div>
                <div className="text-muted animate-fade-in">
                    {FormatMoney.toBrazilianFormat(giftAmount)}
                </div>
            </div>
        </>
    )
}

export default DescriptionComponent
