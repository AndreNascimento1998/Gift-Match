import * as React from "react"
import { type TextFieldProps } from "@mui/material/TextField"
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker"
import type { Dayjs } from "dayjs"
import dayjs from "dayjs"

import { inputThemedSx } from "@/components/base/Input/inputThemedSx"

export type DatePickerValue = string | Date | null

export type DatePickerProps = Omit<
    TextFieldProps,
    "value" | "defaultValue" | "onChange" | "type"
> & {
    /** Valor no formato YYYY-MM-DD ou Date; null limpa o campo */
    value?: DatePickerValue

    /** Valor inicial (uncontrolled) */
    defaultValue?: DatePickerValue

    /** Limite mínimo (YYYY-MM-DD ou Date) */
    min?: string | Date
    /** Limite máximo (YYYY-MM-DD ou Date) */
    max?: string | Date

    /** Callback de conveniência: entrega YYYY-MM-DD (event é opcional) */
    onValueChange?: (
        value: string,
        event?: React.ChangeEvent<HTMLInputElement>,
    ) => void

    /** Callback de conveniência: entrega Date local (event é opcional) */
    onDateChange?: (
        date: Date | null,
        event?: React.ChangeEvent<HTMLInputElement>,
    ) => void

    /** Formato exibido (MUI X) */
    format?: string

    label?: string
}

const pad2 = (n: number) => String(n).padStart(2, "0")

const toYmd = (date: Date) => {
    // componentes locais para evitar offset de timezone
    const y = date.getFullYear()
    const m = pad2(date.getMonth() + 1)
    const d = pad2(date.getDate())
    return `${y}-${m}-${d}`
}

const parseYmd = (value: string): Date | null => {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
    if (!match) return null
    const year = Number(match[1])
    const month = Number(match[2])
    const day = Number(match[3])
    if (
        !Number.isFinite(year) ||
        !Number.isFinite(month) ||
        !Number.isFinite(day)
    )
        return null
    const date = new Date(year, month - 1, day)
    if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
    )
        return null
    return date
}

const toDayjsValue = (value: DatePickerValue | undefined) => {
    if (value === undefined) return undefined
    if (value == null) return null
    if (typeof value === "string") {
        const parsed = parseYmd(value)
        return parsed ? dayjs(parsed) : null
    }
    return dayjs(value)
}

const toDayjsBoundary = (value: string | Date | undefined) => {
    if (value === undefined) return undefined
    if (typeof value === "string") {
        const parsed = parseYmd(value)
        return parsed ? dayjs(parsed) : undefined
    }
    return dayjs(value)
}

export default function DatePicker({
    value,
    defaultValue,
    min,
    max,
    onValueChange,
    onDateChange,
    format,
    sx,
    variant = "outlined",
    color = "primary",
    size = "small",
    fullWidth = true,
    label = "",
    InputLabelProps,
    ...props
}: DatePickerProps) {
    const mergedSx = Array.isArray(sx)
        ? [inputThemedSx, ...sx]
        : [inputThemedSx, sx]

    return (
        <MuiDatePicker
            label={label}
            value={toDayjsValue(value) as Dayjs | null | undefined}
            defaultValue={
                toDayjsValue(defaultValue) as Dayjs | null | undefined
            }
            minDate={toDayjsBoundary(min) as Dayjs | undefined}
            maxDate={toDayjsBoundary(max) as Dayjs | undefined}
            enableAccessibleFieldDOMStructure={false}
            format={format ?? "DD/MM/YYYY"}
            onChange={(next) => {
                const nextDate = next?.toDate() ?? null
                const ymd = nextDate ? toYmd(nextDate) : ""
                onValueChange?.(ymd)
                onDateChange?.(nextDate)
            }}
            slotProps={{
                textField: {
                    ...props,
                    variant,
                    color,
                    size,
                    fullWidth,
                    sx: mergedSx,
                    InputLabelProps: {
                        shrink: true,
                        ...InputLabelProps,
                    },
                },
            }}
        />
    )
}
