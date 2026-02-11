import { useCurrentUser } from "@/stores/useCurrentUser"
import EditInformations from "./components/EditInformations"
import Rules from "./components/Rules"
import type { Group } from "@/types/CurrentUser/Index"
import { useMemo, useState } from "react"
import { toast } from "sonner"
import useValidations from "@/hooks/useValidation"
import {
    getTodayYmd,
    requiredText as requiredTextGlobal,
    validateYmdMin,
} from "@/validation"
import Seo from "@/seo/Seo"
import { useNavigate } from "react-router-dom"

const GroupInformation = () => {
    const navigate = useNavigate()
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
            updateGroup({
                title: draft.title,
                description: draft.description,
                secretDate: draft.secretDate,
                giftAmount: draft.giftAmount,
            })
            navigate("/")
        } catch (error) {
            console.error("Erro ao salvar informações do grupo:", error)
            toast.error("Ocorreu um erro ao salvar as informações do grupo.")
        }
    }

    return (
        <form
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-20 items-start bg-background-default py-6 px-2 md:px-20 rounded-lg md:rounded-none lg:border-t border-t-border shadow-2xs min-h-[calc(100dvh-21.8rem)]"
            onSubmit={(event) => {
                event.preventDefault()
                handleSave()
            }}
            noValidate
        >
            <Seo
                title="Group Information"
                description="View and manage your group information, including group details, secret friend rules, and gift preferences. Update your group's profile, set the secret friend date, and customize your group's settings to enhance your experience on our platform."
            />
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
                secretDateError={secretDateError}
                secretDateHelperText={secretDateHelperText}
            />
        </form>
    )
}

export default GroupInformation
