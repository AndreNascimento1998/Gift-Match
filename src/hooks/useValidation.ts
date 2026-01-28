import { useState } from "react"

type RequiredFields = Record<string, boolean>
type Primitive = string | number | null | undefined

const requiredText = "Campo obrigatório"

const isEmpty = (value: Primitive) => {
    if (value == null) return true
    return value.toString().trim().length === 0
}

const useValidations = () => {
    const [required, setRequired] = useState(false)
    const [requiredFields, setRequiredFields] = useState<RequiredFields>({})

    const validateRequired = (values: Primitive[]) => {
        const anyInvalid = values.some(isEmpty)
        setRequired(anyInvalid)
        return !anyInvalid
    }

    const validateRequiredFields = (fields: Record<string, Primitive>) => {
        const next: RequiredFields = Object.fromEntries(
            Object.entries(fields).map(([key, value]) => [key, isEmpty(value)]),
        )
        setRequiredFields(next)
        const anyInvalid = Object.values(next).some(Boolean)
        setRequired(anyInvalid)
        return !anyInvalid
    }

    return {
        required,
        requiredFields,
        requiredText,
        setRequired,
        setRequiredFields,
        validateRequired,
        validateRequiredFields,
    }
}

export default useValidations
