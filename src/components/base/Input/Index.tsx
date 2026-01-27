import * as React from "react"
import TextField, { type TextFieldProps } from "@mui/material/TextField"
import type { SxProps, Theme } from "@mui/material/styles"
import { alpha } from "@mui/material/styles"

export type InputProps = Omit<TextFieldProps, "onChange" | "onKeyDown"> & {
    onChange?: TextFieldProps["onChange"]
    onKeyDown?: TextFieldProps["onKeyDown"]

    /** Atalho para virar textarea (equivale a multiline=true) */
    textArea?: boolean

    /** Quantidade de linhas quando textArea=true (ex.: 2 ou 3) */
    textAreaRows?: number

    /** Callback de conveniência: já entrega somente o valor (string) */
    onValueChange?: (
        value: string,
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void

    /** Callback de conveniência: dispara ao pressionar Enter */
    onEnter?: (event: React.KeyboardEvent<HTMLInputElement>) => void

    /** Callback de conveniência: dispara ao pressionar Escape */
    onEscape?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

const baseSx: SxProps<Theme> = {
    "& .MuiInputLabel-root": {
        color: "text.secondary",
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: "primary.main",
    },

    "& .MuiOutlinedInput-root": {
        borderRadius: 2,
        backgroundColor: "background.paper",

        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "divider",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "primary.main",
            borderWidth: 2,
        },
        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: "error.main",
        },
        "&.Mui-disabled": {
            opacity: 0.75,
        },
    },

    "& .MuiFormHelperText-root": {
        marginLeft: 0,
    },
}

const resolveHoverBorderColor = (theme: Theme) => {
    // usa divider/text para um hover consistente no light/dark
    const base =
        theme.palette.mode === "dark"
            ? theme.palette.text.primary
            : theme.palette.text.primary
    return alpha(base, theme.palette.mode === "dark" ? 0.35 : 0.22)
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
        const themedSx: SxProps<Theme> = (theme) => {
            const hoverBorder = resolveHoverBorderColor(theme)
            return {
                ...baseSx,
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                    {
                        borderColor: hoverBorder,
                    },
            }
        }

        const mergedSx = Array.isArray(sx) ? [themedSx, ...sx] : [themedSx, sx]

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

        // Regras:
        // - se `rows` estiver definido, NÃO use minRows/maxRows (MUI dá warning)
        // - `textAreaRows` é um atalho para um textarea com altura fixa
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
