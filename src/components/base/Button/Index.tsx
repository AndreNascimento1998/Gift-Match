import * as React from "react"
import MuiButton, {
    type ButtonProps as MuiButtonProps,
} from "@mui/material/Button"
import type { SxProps, Theme } from "@mui/material/styles"
import { alpha, darken } from "@mui/material/styles"

export type ButtonProps = MuiButtonProps

const isPaletteColor = (
    value: MuiButtonProps["color"],
): value is "primary" | "secondary" =>
    value === "primary" || value === "secondary"

const baseSx: SxProps<Theme> = {
    textTransform: "none",
    fontWeight: 600,
    borderRadius: 2,
    boxShadow: "none",
    "&:hover": {
        boxShadow: "none",
    },
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            color = "primary",
            variant = "contained",
            disableElevation = true,
            sx,
            ...props
        },
        ref,
    ) => {
        const paletteColor = isPaletteColor(color) ? color : undefined

        const themedSx: SxProps<Theme> = (theme) => {
            if (!paletteColor) return baseSx

            const main = theme.palette[paletteColor].main
            const contrastText = theme.palette[paletteColor].contrastText

            if (variant === "contained") {
                return {
                    ...baseSx,
                    backgroundColor: main,
                    color: contrastText,
                    "&:hover": {
                        backgroundColor: darken(main, 0.12),
                    },
                    "&:active": {
                        backgroundColor: darken(main, 0.18),
                    },
                }
            }

            if (variant === "outlined") {
                return {
                    ...baseSx,
                    borderColor: alpha(main, 0.55),
                    color: main,
                    "&:hover": {
                        borderColor: alpha(main, 0.85),
                        backgroundColor: alpha(main, 0.08),
                    },
                    "&:active": {
                        backgroundColor: alpha(main, 0.12),
                    },
                }
            }

            // variant === "text"
            return {
                ...baseSx,
                color: main,
                "&:hover": {
                    backgroundColor: alpha(main, 0.08),
                },
                "&:active": {
                    backgroundColor: alpha(main, 0.12),
                },
            }
        }

        const mergedSx = Array.isArray(sx) ? [themedSx, ...sx] : [themedSx, sx]

        return (
            <MuiButton
                ref={ref}
                color={color}
                variant={variant}
                disableElevation={disableElevation}
                sx={mergedSx}
                {...props}
            />
        )
    },
)

Button.displayName = "Button"

export default Button
