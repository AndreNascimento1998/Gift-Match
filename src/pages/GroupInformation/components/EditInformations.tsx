import Input from "@/components/base/Input/Index"
import EditIcon from "@/components/icons/EditIcon"
import InfoCircleIcon from "@/components/icons/InfoCircleIcon"
import type { Group } from "@/types/CurrentUser/Index"

type EditInformationsProps = {
    groupTitle: string
    groupDescription: string
    setUpdateGroup: (patch: Partial<Group>) => void
    titleError?: boolean
    titleHelperText?: string
}

const EditInformations = ({
    groupTitle,
    groupDescription,
    setUpdateGroup,
    titleError,
    titleHelperText,
}: EditInformationsProps) => {
    return (
        <div className="flex flex-col gap-4 md:gap-10">
            <div className="flex flex-col gap-1 md:gap-2 animation-translateX">
                <div className="flex items-center gap-2">
                    <EditIcon width={24} height={24} />
                    <h1 className="text-h2 lg:text-h1 font-bold text-primary">
                        Editar informações
                    </h1>
                </div>
                <div className="border border-dashed border-primary w-full" />
                <div className="font-bold">{groupTitle}</div>
            </div>
            <div className="flex flex-col gap-2 md:gap-4 bg-bg-card border border-border p-2 lg:p-6 rounded-lg animation-translateX">
                <div className="flex gap-2 items-center">
                    <InfoCircleIcon />
                    <span>Informações básicas</span>
                </div>
                <Input
                    label="Nome do grupo"
                    required
                    placeholder="Natal da família"
                    value={groupTitle}
                    onValueChange={(value) => setUpdateGroup({ title: value })}
                    error={Boolean(titleError)}
                    helperText={titleHelperText}
                />
                <Input
                    label="Descrição do grupo"
                    textArea
                    minRows={3}
                    value={groupDescription}
                    onValueChange={(value) =>
                        setUpdateGroup({ description: value })
                    }
                    placeholder="Descrição do grupo"
                />
            </div>
        </div>
    )
}

export default EditInformations
