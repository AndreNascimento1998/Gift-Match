import * as React from "react"
import TextField, { type TextFieldProps } from "@mui/material/TextField"

import { inputThemedSx } from "@/components/base/Input/inputThemedSx"

export type InputProps = Omit<TextFieldProps, "onChange" | "onKeyDown"> & {
    onChange?: TextFieldProps["onChange"]
    onKeyDown?: TextFieldProps["onKeyDown"]
    textArea?: boolean
    textAreaRows?: number
    onValueChange?: (
        value: string,
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void
    onEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void
    onEscape?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            variant = "outlined",
            color = "primary",
            size = "small",
            fullWidth = true,
            multiline,
            rows,
            minRows,
            maxRows,
            textArea,
            textAreaRows,
            onChange,
            onKeyDown,
            onValueChange,
            onEnter,
            onEscape,
            sx,
            slotProps,
            ...props
        },
        ref,
    ) => {
        const mergedSx = Array.isArray(sx)
            ? [inputThemedSx, ...sx]
            : [inputThemedSx, sx]

        const handleChange: NonNullable<TextFieldProps["onChange"]> = (
            event,
        ) => {
            onChange?.(event)
            onValueChange?.(event.target.value, event)
        }

        const handleKeyDown: NonNullable<TextFieldProps["onKeyDown"]> = (
            event,
        ) => {
            onKeyDown?.(event)
            if (event.key === "Enter")
                onEnter?.(event as React.KeyboardEvent<HTMLInputElement>)
            if (event.key === "Escape")
                onEscape?.(event as React.KeyboardEvent<HTMLInputElement>)
        }

        const effectiveMultiline = textArea ? true : multiline

        const effectiveRows = textArea
            ? (textAreaRows ??
              rows ??
              (minRows == null && maxRows == null ? 3 : undefined))
            : rows

        const effectiveMinRows = effectiveRows == null ? minRows : undefined
        const effectiveMaxRows = effectiveRows == null ? maxRows : undefined

        return (
            <TextField
                {...props}
                inputRef={ref}
                variant={variant}
                color={color}
                size={size}
                fullWidth={fullWidth}
                multiline={effectiveMultiline}
                rows={effectiveRows}
                minRows={effectiveMinRows}
                maxRows={effectiveMaxRows}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                sx={mergedSx}
                slotProps={{
                    ...slotProps,
                    input: {
                        ...slotProps?.input,
                    },
                }}
            />
        )
    },
)

Input.displayName = "Input"

export default Input
