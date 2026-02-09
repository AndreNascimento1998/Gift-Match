import Bars from "@/components/base/Bars/Index"
import Button from "@/components/base/Button/Index"
import ArrowDownIcon from "@/components/icons/ArrowDownIcon"
import CalendarIcon from "@/components/icons/CalendarIcon"
import DescriptionIcon from "@/components/icons/DescriptionIcon"
import EditIcon from "@/components/icons/EditIcon"
import InfoCircleIcon from "@/components/icons/InfoCircleIcon"
import MoneyIcon from "@/components/icons/MoneyIcon"
import { FormatDate } from "@/helpers/FormatDate"
import { FormatMoney } from "@/helpers/FormatMoney"
import { useState } from "react"

type DescriptionProps = {
    groupName: string
    groupDescription: string
    secretDate: string
    giftAmount: number
}

const Description = ({
    groupName,
    groupDescription,
    secretDate,
    giftAmount,
}: DescriptionProps) => {
    const [showInfo, setShowInfo] = useState(false)

    return (
        <section className="flex flex-col gap-4 md:gap-10 border border-border p-4 bg-bg-card lg:p-6 rounded-lg">
            <div className="flex flex-col gap-4">
                <h1 className="text-h2 lg:text-h1 text-primary font-bold ">
                    {groupName}
                </h1>
                <div className="border border-dashed border-primary" />
            </div>
            <Bars max={10} current={1} />
            <article className="flex flex-col gap-4 font-semibold">
                <div className="flex items-center gap-2">
                    <InfoCircleIcon />
                    <div
                        onClick={() => setShowInfo(!showInfo)}
                        className="flex justify-between items-center w-full"
                    >
                        <span>Informações do grupo</span>
                        <ArrowDownIcon
                            className={`${showInfo ? "rotate-180" : ""} transition-transform`}
                        />
                    </div>
                </div>
                <div
                    className={`flex-col gap-4 font-semibold md:flex ${showInfo ? "flex" : "hidden"}`}
                >
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
                </div>
            </article>
            <div
                className={`md:flex justify-center ${showInfo ? "flex" : "hidden"}`}
            >
                <Button
                    className="w-full md:w-[80%] animate-fade-in"
                    variant="outlined"
                >
                    <div className="flex items-center gap-2">
                        <EditIcon /> <span>Editar informações</span>{" "}
                    </div>
                </Button>
            </div>
        </section>
    )
}

export default Description
