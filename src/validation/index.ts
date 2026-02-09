export type Primitive = string | number | null | undefined

export const requiredText = "Campo obrigatório"

export const isEmpty = (value: Primitive) => {
    if (value == null) return true
    return value.toString().trim().length === 0
}

export const getTodayYmd = () => {
    const date = new Date()
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()
    return `${year}-${month}-${day}`
}

/**
 * Compara YYYY-MM-DD lexicograficamente (funciona por ser big-endian).
 */
export const isYmdBefore = (value: string, minYmd: string) => value < minYmd

export const validateYmdMin = (
    value: Primitive,
    minYmd: string,
    message = "A data precisa ser hoje ou maior",
) => {
    if (value == null) return undefined
    const text = String(value).trim()
    if (text.length === 0) return undefined
    if (isYmdBefore(text, minYmd)) return message
    return undefined
}

export type RequiredFields = Record<string, boolean>

export const validateRequiredFields = (fields: Record<string, Primitive>) => {
    const next: RequiredFields = Object.fromEntries(
        Object.entries(fields).map(([key, value]) => [key, isEmpty(value)]),
    )
    const anyInvalid = Object.values(next).some(Boolean)
    return { valid: !anyInvalid, requiredFields: next }
}
