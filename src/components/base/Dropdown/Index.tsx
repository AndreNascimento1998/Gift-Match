import * as React from "react"
import Button, { type ButtonProps } from "@mui/material/Button"
import Menu, { type MenuProps } from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
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
    variant = "contained",
    buttonProps,
    menuProps,
}: DropdownProps<TValue>) => {
    const { anchorEl, open, handleClick, handleClose } = useDropdown()

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
                disableElevation
                onClick={handleClick}
                endIcon={<span aria-hidden>▾</span>}
                color="primary"
                {...buttonProps}
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
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: 2,
                            mt: 1,
                            minWidth: 180,
                            bgcolor: "background.paper",
                            color: "text.primary",
                            border: "1px solid",
                            borderColor: "divider",
                            boxShadow: "rgba(0,0,0,0.08) 0px 8px 24px",
                        },
                    },
                    list: {
                        "aria-labelledby": `${id}-button`,
                        sx: { py: 0.5 },
                    },
                }}
                {...menuProps}
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
                                "&:active": {
                                    bgcolor: "action.selected",
                                },
                                "&.Mui-focusVisible": {
                                    bgcolor: "action.hover",
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
