import Input from "@/components/base/Input/Index"
import EditIcon from "@/components/icons/EditIcon"
import InfoCircleIcon from "@/components/icons/InfoCircleIcon"

type EditInformationsProps = {
    groupTitle: string
}

const EditInformations = ({ groupTitle }: EditInformationsProps) => {
    return (
        <div className="flex flex-col gap-2 md:gap-10">
            <div className="flex flex-col gap-1 md:gap-2 ">
                <div className="flex items-center gap-2">
                    <EditIcon width={24} height={24} />
                    <h1 className="text-h2 lg:text-h1 font-bold text-primary">
                        Editar informações
                    </h1>
                </div>
                <div className="border border-dashed border-primary w-full" />
                <div className="font-bold">{groupTitle}</div>
            </div>
            <div className="flex flex-col gap-2 md:gap-4 bg-bg-card  p-4 lg:p-6 rounded-lg">
                <div className="flex gap-2 items-center">
                    <InfoCircleIcon />
                    <span>Informações básicas</span>
                </div>
                <Input
                    label="Nome do grupo"
                    defaultValue={groupTitle}
                    placeholder="Natal da família"
                />
                <Input
                    label="Descrição do grupo"
                    textArea
                    minRows={3}
                    placeholder="Uma breve descrição do grupo"
                />
            </div>
        </div>
    )
}

export default EditInformations
