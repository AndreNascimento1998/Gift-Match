import * as React from "react"
import Button, { type ButtonProps } from "@/components/base/Button/Index"
import Menu, { type MenuProps } from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import type { SxProps, Theme } from "@mui/material/styles"
import useDropdown from "./hooks/useDropdown"

export type DropdownItem<TValue extends string = string> = {
    value: TValue
    label: React.ReactNode
    icon?: React.ReactNode
    disabled?: boolean
    onClick?: () => void
}

type DropdownProps<TValue extends string = string> = {
    id?: string
    label?: React.ReactNode
    items?: Array<DropdownItem<TValue>>
    onSelect?: (value: TValue, item: DropdownItem<TValue>) => void
    forceWhite?: boolean
    buttonProps?: Omit<
        ButtonProps,
        "onClick" | "id" | "aria-controls" | "aria-haspopup" | "aria-expanded"
    >
    menuProps?: Omit<MenuProps, "anchorEl" | "open" | "onClose">
    variant: "text" | "outlined" | "contained"
}

const Dropdown = <TValue extends string = string>({
    id = "dropdown",
    label = "Opções",
    items = [],
    onSelect,
    forceWhite = false,
    variant = "contained",
    buttonProps,
    menuProps,
}: DropdownProps<TValue>) => {
    const { anchorEl, open, handleClick, handleClose } = useDropdown()

    const isRecord = (value: unknown): value is Record<string, unknown> =>
        typeof value === "object" && value !== null

    const forceWhiteButtonSx = forceWhite
        ? {
              color: "common.white",
              borderColor: "rgba(255,255,255,0.65)",
              "&:hover": {
                  borderColor: "rgba(255,255,255,0.9)",
                  backgroundColor: "rgba(255,255,255,0.08)",
              },
          }
        : undefined

    const mergedButtonProps = forceWhite
        ? {
              ...buttonProps,
              color: buttonProps?.color ?? "inherit",
              sx: Array.isArray(buttonProps?.sx)
                  ? [forceWhiteButtonSx, ...buttonProps.sx]
                  : [forceWhiteButtonSx, buttonProps?.sx],
          }
        : buttonProps

    const userSlotPropsRaw: unknown = menuProps?.slotProps
    const userSlotProps = isRecord(userSlotPropsRaw)
        ? userSlotPropsRaw
        : undefined

    const userPaper = isRecord(userSlotProps?.paper)
        ? userSlotProps?.paper
        : undefined
    const userList = isRecord(userSlotProps?.list)
        ? userSlotProps?.list
        : undefined

    const userPaperSx = userPaper?.sx as SxProps<Theme> | undefined
    const userListSx = userList?.sx as SxProps<Theme> | undefined

    const basePaperSx = {
        borderRadius: 2,
        mt: 1,
        minWidth: 180,
        bgcolor: forceWhite ? "rgba(0,0,0,0.85)" : "background.paper",
        color: forceWhite ? "common.white" : "text.primary",
        border: "1px solid",
        borderColor: forceWhite ? "rgba(255,255,255,0.18)" : "divider",
        boxShadow: "rgba(0,0,0,0.08) 0px 8px 24px",
    }

    const baseListSx = { py: 0.5 }

    const mergedMenuProps: Omit<MenuProps, "anchorEl" | "open" | "onClose"> = {
        ...menuProps,
        slotProps: {
            ...userSlotProps,
            paper: {
                ...(userPaper ?? {}),
                sx: Array.isArray(userPaperSx)
                    ? [basePaperSx, ...userPaperSx]
                    : [basePaperSx, userPaperSx].filter(Boolean),
            },
            list: {
                "aria-labelledby": `${id}-button`,
                ...(userList ?? {}),
                sx: Array.isArray(userListSx)
                    ? [baseListSx, ...userListSx]
                    : [baseListSx, userListSx].filter(Boolean),
            },
        },
    }

    const handleSelect = (item: DropdownItem<TValue>) => {
        item.onClick?.()
        onSelect?.(item.value, item)
        handleClose()
    }

    return (
        <div>
            <Button
                id={`${id}-button`}
                aria-controls={open ? `${id}-menu` : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant={variant}
                size="small"
                disableElevation
                onClick={handleClick}
                endIcon={<span aria-hidden>▾</span>}
                color={forceWhite ? "inherit" : "primary"}
                {...mergedButtonProps}
            >
                {label}
            </Button>
            <Menu
                id={`${id}-menu`}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                elevation={0}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                {...mergedMenuProps}
            >
                {items.length === 0 ? (
                    <MenuItem disabled>Nenhuma opção</MenuItem>
                ) : (
                    items.map((item) => (
                        <MenuItem
                            key={item.value}
                            disabled={item.disabled}
                            onClick={() => handleSelect(item)}
                            sx={{
                                gap: 1,
                                color: forceWhite ? "common.white" : undefined,
                                "&:hover": forceWhite
                                    ? { bgcolor: "rgba(255,255,255,0.08)" }
                                    : undefined,
                                "&:active": {
                                    bgcolor: forceWhite
                                        ? "rgba(255,255,255,0.12)"
                                        : "action.selected",
                                },
                                "&.Mui-focusVisible": {
                                    bgcolor: forceWhite
                                        ? "rgba(255,255,255,0.08)"
                                        : "action.hover",
                                },
                            }}
                        >
                            {item.icon}
                            {item.label}
                        </MenuItem>
                    ))
                )}
            </Menu>
        </div>
    )
}

export default Dropdown
