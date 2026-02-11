import Button from "@/components/base/Button/Index"
import BaseModal from "@/components/base/Modal/Index"
import WarningModalIcon from "@/components/icons/WarningModalIcon"
import { useMemo } from "react"

type ModalRemoveItemProps = {
    title: string
    showModal: boolean
    setShowModal: (value: boolean) => void
    description?: string
    footer?: React.ReactNode
    steps?: "default" | "success" | "error" | "process"
    handleClickConfirm?: () => void
}

const BUTTON_TEXT = {
    default: "Remover",
    process: "Removendo...",
    success: "Removido",
    error: "Erro ao remover",
}

const DESCRIPTION_TEXT = {
    default: "Tem certeza que deseja remover esse participante?",
    process: "Estamos removendo o participante, aguarde um momento...",
    success: "Participante removido com sucesso!",
    error: "Falha ao remover o participante. Tente novamente.",
}

const ModalRemoveItem = ({
    title,
    showModal,
    setShowModal,
    steps = "default",
    handleClickConfirm,
}: ModalRemoveItemProps) => {
    const buttonText = useMemo(() => {
        return BUTTON_TEXT[steps]
    }, [steps])

    const descriptionText = useMemo(() => {
        return DESCRIPTION_TEXT[steps]
    }, [steps])

    return (
        <BaseModal
            open={showModal}
            onClose={() => setShowModal(false)}
            title={title}
            footer={
                <div className="flex flex-col gap-2 w-full">
                    <Button
                        onClick={handleClickConfirm}
                        loading={steps === "process"}
                    >
                        {buttonText}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => setShowModal(false)}
                    >
                        Cancelar
                    </Button>
                </div>
            }
        >
            <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col items-center gap-1">
                    <WarningModalIcon />
                    <div className="font-bold text-primary text-h2">
                        Atenção!
                    </div>
                    <div className="font-bold">{descriptionText}</div>
                </div>
            </div>
        </BaseModal>
    )
}

export default ModalRemoveItem
