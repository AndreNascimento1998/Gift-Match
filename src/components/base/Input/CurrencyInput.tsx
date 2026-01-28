import * as React from "react"

import Input, { type InputProps } from "@/components/base/Input/Index"

export type CurrencyInputValue = number | string | null

export type CurrencyInputProps = Omit<
    InputProps,
    "value" | "defaultValue" | "onChange" | "onValueChange" | "type" | "ref"
> & {
    /**
     * Valor em reais.
     * - number: valor em reais (ex.: 100.5)
     * - string: texto (aceita "100,50", "R$ 100,50", etc.)
     */
    value?: CurrencyInputValue

    /** Valor inicial (uncontrolled). Mesmas regras de `value`. */
    defaultValue?: CurrencyInputValue

    /** Se true (default), mostra o símbolo (R$) */
    showSymbol?: boolean

    /** Callback de conveniência: valor formatado (ex.: "R$ 100,00" ou "100,00") */
    onValueChange?: (formatted: string) => void

    /** Callback de conveniência: valor numérico em reais (ex.: 100.5) */
    onNumberChange?: (value: number | null) => void

    /** Callback de conveniência: valor em centavos (ex.: 10050) */
    onCentsChange?: (cents: number | null) => void
}

const digitsOnly = (text: string) => text.replace(/\D/g, "")

const toCentsFromNumber = (value: number) => {
    if (!Number.isFinite(value)) return null
    return Math.round(value * 100)
}

const toCentsFromText = (text: string) => {
    const digits = digitsOnly(text)
    if (!digits) return null
    return Number(digits)
}

const formatFromCents = (cents: number, showSymbol: boolean) => {
    const amount = cents / 100

    if (showSymbol) {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount)
    }

    return new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount)
}

const resolveInitialFormatted = (
    value: CurrencyInputValue | undefined,
    showSymbol: boolean,
) => {
    if (value === undefined) return undefined
    if (value == null || value === "") return ""

    if (typeof value === "number") {
        const cents = toCentsFromNumber(value)
        return cents == null ? "" : formatFromCents(cents, showSymbol)
    }

    const cents = toCentsFromText(value)
    return cents == null ? "" : formatFromCents(cents, showSymbol)
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
    function CurrencyInput(
        {
            value,
            defaultValue,
            showSymbol = true,
            onValueChange,
            onNumberChange,
            onCentsChange,
            inputProps,
            ...props
        },
        ref,
    ) {
        const isControlled = value !== undefined

        const [internal, setInternal] = React.useState<string>(() => {
            return resolveInitialFormatted(defaultValue, showSymbol) ?? ""
        })

        React.useEffect(() => {
            if (!isControlled) return
            setInternal(resolveInitialFormatted(value, showSymbol) ?? "")
        }, [isControlled, showSymbol, value])

        const handleFormatted = (formatted: string) => {
            const cents = toCentsFromText(formatted)
            const numberValue = cents == null ? null : cents / 100

            onValueChange?.(formatted)
            onCentsChange?.(cents)
            onNumberChange?.(numberValue)
        }

        return (
            <Input
                {...props}
                ref={ref}
                value={internal}
                onChange={(event) => {
                    const raw = event.target.value

                    // se limpar tudo, mantém vazio
                    const digits = digitsOnly(raw)
                    if (!digits) {
                        if (!isControlled) setInternal("")
                        handleFormatted("")
                        return
                    }

                    const cents = Number(digits)
                    const formatted = formatFromCents(cents, showSymbol)

                    if (!isControlled) setInternal(formatted)
                    handleFormatted(formatted)
                }}
                slotProps={{
                    ...props.slotProps,
                    htmlInput: {
                        ...props.slotProps?.htmlInput,
                        ...inputProps,
                        inputMode: "numeric",
                    },
                }}
            />
        )
    },
)

export default CurrencyInput
