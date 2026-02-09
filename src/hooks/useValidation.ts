import { useState } from "react"
import {
    isEmpty,
    type Primitive,
    requiredText,
    validateRequiredFields as validateRequiredFieldsUtil,
} from "@/validation"

type RequiredFields = Record<string, boolean>

const useValidations = () => {
    const [required, setRequired] = useState(false)
    const [requiredFields, setRequiredFields] = useState<RequiredFields>({})

    const validateRequired = (values: Primitive[]) => {
        const anyInvalid = values.some(isEmpty)
        setRequired(anyInvalid)
        return !anyInvalid
    }

    const validateRequiredFields = (fields: Record<string, Primitive>) => {
        const { valid, requiredFields: next } =
            validateRequiredFieldsUtil(fields)
        setRequiredFields(next)
        setRequired(!valid)
        return valid
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
