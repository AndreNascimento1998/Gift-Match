import { useCurrentUser } from "@/stores/useCurrentUser"
import EditInformations from "./components/EditInformations"
import Rules from "./components/Rules"
import type { Group } from "@/types/CurrentUser/Index"
import { useMemo, useState } from "react"
import { Toaster, toast } from "sonner"
import useValidations from "@/hooks/useValidation"
import {
    getTodayYmd,
    requiredText as requiredTextGlobal,
    validateYmdMin,
} from "@/validation"
import { useGlobalStore } from "@/stores/useGlobalStore"

const GroupInformation = () => {
    const theme = useGlobalStore((state) => state.theme)
    const group = useCurrentUser((state) => state.group)
    const updateGroup = useCurrentUser((state) => state.updateGroup)

    const [draft, setDraft] = useState(() => ({
        title: group.title,
        description: group.description,
        secretDate: group.secretDate,
        giftAmount: group.giftAmount,
    }))

    const setUpdateGroup = (patch: Partial<Group>) => {
        setDraft((prev) => ({
            ...prev,
            ...patch,
        }))
    }

    const { requiredFields, validateRequiredFields, requiredText } =
        useValidations()

    const todayYmd = useMemo(() => getTodayYmd(), [])

    const secretDateMinErrorText = validateYmdMin(draft.secretDate, todayYmd)

    const titleError = Boolean(requiredFields.title)
    const titleHelperText = titleError
        ? (requiredText ?? requiredTextGlobal)
        : undefined

    const secretDateError =
        Boolean(requiredFields.secretDate) || Boolean(secretDateMinErrorText)
    const secretDateHelperText = requiredFields.secretDate
        ? (requiredText ?? requiredTextGlobal)
        : secretDateMinErrorText

    const handleSave = () => {
        const canProceed = validateRequiredFields({
            title: draft.title,
            secretDate: draft.secretDate,
        })
        if (!canProceed) return
        if (secretDateMinErrorText) return

        console.log("Saving with values:", draft)
        // TODO: Adicionar chamda para a API
        try {
            toast.success("Informações do grupo salvas com sucesso!")
        } catch (error) {
            console.error("Erro ao salvar informações do grupo:", error)
            toast.error("Ocorreu um erro ao salvar as informações do grupo.")
        }

        updateGroup({
            title: draft.title,
            description: draft.description,
            secretDate: draft.secretDate,
            giftAmount: draft.giftAmount,
        })
    }

    return (
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start bg-background-default py-6 px-2 md:px-20 rounded-lg md:rounded-none lg:border-t border-t-border shadow-2xs min-h-[calc(100vh-21.8rem)]">
            <EditInformations
                groupTitle={draft.title}
                groupDescription={draft.description}
                setUpdateGroup={setUpdateGroup}
                titleError={titleError}
                titleHelperText={titleHelperText}
            />
            <Rules
                secretDate={draft.secretDate}
                giftAmount={draft.giftAmount}
                setUpdateGroup={setUpdateGroup}
                onSave={handleSave}
                secretDateError={secretDateError}
                secretDateHelperText={secretDateHelperText}
            />
            <Toaster theme={theme} richColors position="top-right" />
        </main>
    )
}

export default GroupInformation
