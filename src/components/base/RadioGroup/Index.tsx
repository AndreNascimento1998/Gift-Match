import * as React from "react"
import FormControl, { type FormControlProps } from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormHelperText from "@mui/material/FormHelperText"
import FormLabel from "@mui/material/FormLabel"
import MuiRadio from "@mui/material/Radio"
import MuiRadioGroup from "@mui/material/RadioGroup"

export type RadioOption<T extends string = string> = {
    label: React.ReactNode
    value: T
    disabled?: boolean
}

export type RadioGroupValue<T extends string = string> = T | "" | null

export type RadioGroupProps<T extends string = string> = Omit<
    FormControlProps,
    "onChange" | "defaultValue"
> & {
    label?: React.ReactNode

    options: Array<RadioOption<T>>

    /** Valor controlado */
    value?: RadioGroupValue<T>

    /** Valor inicial (uncontrolled) */
    defaultValue?: RadioGroupValue<T>

    /** Dispara ao mudar; entrega somente o valor */
    onValueChange?: (
        value: T | "",
        event: React.ChangeEvent<HTMLInputElement>,
    ) => void

    /** Callback original do MUI RadioGroup */
    onChange?: (
        event: React.ChangeEvent<HTMLInputElement>,
        value: string,
    ) => void

    name?: string
    row?: boolean

    helperText?: React.ReactNode

    /** Se `required` e vazio após interação, mostra erro */
    required?: boolean
    requiredErrorText?: React.ReactNode

    /** Força erro externamente */
    error?: boolean
}

const normalize = <T extends string>(value: RadioGroupValue<T> | undefined) => {
    if (value === undefined) return undefined
    if (value == null) return "" as const
    return value
}

function RadioGroup<T extends string = string>({
    label,
    options,
    value,
    defaultValue,
    onValueChange,
    onChange,
    name,
    row,
    helperText,
    required,
    requiredErrorText = "Campo obrigatório",
    error,
    disabled,
    ...formControlProps
}: RadioGroupProps<T>) {
    const isControlled = value !== undefined

    const [touched, setTouched] = React.useState(false)
    const [internalValue, setInternalValue] = React.useState<T | "">(() => {
        const normalized = normalize(defaultValue)
        return (normalized ?? "") as T | ""
    })

    const currentValue = (
        isControlled ? (normalize(value) ?? "") : internalValue
    ) as T | ""

    const requiredError = Boolean(required) && touched && currentValue === ""
    const computedError = Boolean(error) || requiredError
    const computedHelperText =
        helperText ?? (requiredError ? requiredErrorText : undefined)

    return (
        <FormControl
            {...formControlProps}
            disabled={disabled}
            error={computedError}
        >
            {label != null && (
                <FormLabel component="legend" required={required}>
                    {label}
                </FormLabel>
            )}

            <MuiRadioGroup
                name={name}
                row={row}
                value={currentValue}
                onBlur={() => setTouched(true)}
                onChange={(event, next) => {
                    setTouched(true)
                    onChange?.(event, next)

                    const nextValue = (next ?? "") as T | ""
                    if (!isControlled) setInternalValue(nextValue)
                    onValueChange?.(nextValue, event)
                }}
            >
                {options.map((opt) => (
                    <FormControlLabel
                        key={opt.value}
                        value={opt.value}
                        control={<MuiRadio />}
                        label={opt.label}
                        disabled={disabled || opt.disabled}
                    />
                ))}
            </MuiRadioGroup>

            {computedHelperText != null && (
                <FormHelperText>{computedHelperText}</FormHelperText>
            )}
        </FormControl>
    )
}

export default RadioGroup
