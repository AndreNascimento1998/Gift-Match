import Bars from "@/components/base/Bars/Index"
import Button from "@/components/base/Button/Index"
import CalendarIcon from "@/components/icons/CalendarIcon"
import DescriptionIcon from "@/components/icons/DescriptionIcon"
import EditIcon from "@/components/icons/EditIcon"
import InfoCircleIcon from "@/components/icons/InfoCircleIcon"
import MoneyIcon from "@/components/icons/MoneyIcon"

const Description = () => {
    return (
        <section className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
                <h1 className="text-h1 text-primary font-bold">
                    Amigo secreto - Família
                </h1>
                <div className="border border-dashed border-primary" />
            </div>
            <Bars max={10} current={1} />
            <article className="flex flex-col gap-4 font-semibold">
                <div className="flex items-center gap-2">
                    <InfoCircleIcon />
                    <span>Informações do grupo</span>
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <DescriptionIcon />
                        <span>Descrição:</span>
                    </div>
                    <div className="text-muted">Não pode faltar!</div>
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <CalendarIcon /> <span>Data do amigo secreto:</span>
                    </div>
                    <div className="text-muted">25/12/2026</div>
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <MoneyIcon /> <span>Valor do presente:</span>
                    </div>
                    <div className="text-muted">R$ 100,00</div>
                </div>
            </article>
            <div className="flex justify-center">
                <Button className="w-full md:w-[80%]" variant="outlined">
                    <div className="flex items-center gap-2">
                        <EditIcon /> <span>Editar informações</span>{" "}
                    </div>
                </Button>
            </div>
        </section>
    )
}

export default Description
