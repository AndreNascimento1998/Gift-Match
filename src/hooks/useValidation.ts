import { useState } from "react"

const useValidations = (value: string | number) => {
    const [required, setRequired] = useState(false)
    const requiredText = "Campo obrigatório"

    const validateRequired = () => {
        const valueValidate = value.toString()

        const isValid = valueValidate.trim().length > 0
        setRequired(!isValid)
        return isValid
    }

    return {
        required,
        requiredText,
        setRequired,
        validateRequired,
    }
}

export default useValidations
