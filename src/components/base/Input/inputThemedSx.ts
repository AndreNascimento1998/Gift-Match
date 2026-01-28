import type { Theme } from "@mui/material/styles"
import { alpha } from "@mui/material/styles"
import type { SystemStyleObject } from "@mui/system"

const baseSx: SystemStyleObject<Theme> = {
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
    const base = theme.palette.text.primary
    return alpha(base, theme.palette.mode === "dark" ? 0.35 : 0.22)
}

export const inputThemedSx = (theme: Theme): SystemStyleObject<Theme> => {
    const hoverBorder = resolveHoverBorderColor(theme)
    return {
        ...baseSx,
        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: hoverBorder,
        },
    }
}
