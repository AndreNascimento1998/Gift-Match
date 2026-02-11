import * as React from "react"
import Button, { type ButtonProps } from "@/components/base/Button/Index"
import Menu, { type MenuProps } from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { alpha, type SxProps, type Theme } from "@mui/material/styles"
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
    dropdown?: ReturnType<typeof useDropdown>
    buttonProps?: Omit<
        ButtonProps,
        "onClick" | "id" | "aria-controls" | "aria-haspopup" | "aria-expanded"
    >
    menuProps?: Omit<MenuProps, "anchorEl" | "open" | "onClose">
    variant?: "text" | "outlined" | "contained"
    /**
     * - `undefined`: render default trigger button
     * - `null`: render no trigger (use `dropdown` from parent)
     * - React element: rendered as trigger and receives aria + onClick injection
     */
    buttonAction?: React.ReactNode | null
    /**
     * Optional trigger node (alias for `buttonAction`).
     * If provided and `buttonAction` is `undefined`, children will be used as the trigger.
     */
    children?: React.ReactNode
}

const Dropdown = <TValue extends string = string>({
    id = "dropdown",
    label = "Opções",
    items = [],
    onSelect,
    forceWhite = false,
    dropdown,
    variant = "contained",
    buttonProps,
    menuProps,
    buttonAction,
    children,
}: DropdownProps<TValue>) => {
    const internalDropdown = useDropdown()
    const { anchorEl, open, handleClick, handleClose } =
        dropdown ?? internalDropdown

    const isRecord = (value: unknown): value is Record<string, unknown> =>
        typeof value === "object" && value !== null

    const defaultButtonTextSx: SxProps<Theme> = {
        color: "common.white",
    }

    const forceWhiteButtonSx: SxProps<Theme> | undefined = forceWhite
        ? (theme) => ({
              color: "primary.contrastText",
              borderColor: alpha(theme.palette.primary.contrastText, 0.55),
              "&:hover": {
                  borderColor: alpha(theme.palette.primary.contrastText, 0.85),
                  backgroundColor: alpha(
                      theme.palette.primary.contrastText,
                      0.12,
                  ),
              },
          })
        : undefined

    const mergedButtonProps: DropdownProps<TValue>["buttonProps"] = {
        ...buttonProps,
        ...(forceWhite
            ? {
                  color: buttonProps?.color ?? "inherit",
              }
            : null),
        sx: Array.isArray(buttonProps?.sx)
            ? [
                  defaultButtonTextSx,
                  ...(forceWhite ? [forceWhiteButtonSx] : []),
                  ...buttonProps.sx,
              ]
            : [
                  defaultButtonTextSx,
                  ...(forceWhite ? [forceWhiteButtonSx] : []),
                  buttonProps?.sx,
              ].filter(Boolean),
    }

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

    const basePaperSx: SxProps<Theme> = (theme) => ({
        borderRadius: 2,
        mt: 1,
        minWidth: 180,
        bgcolor: forceWhite ? "primary.main" : "background.paper",
        color: forceWhite ? "primary.contrastText" : "text.primary",
        border: "1px solid",
        borderColor: forceWhite
            ? alpha(theme.palette.primary.contrastText, 0.22)
            : "divider",
        boxShadow: theme.shadows[6],
        overflow: "hidden",
    })

    const baseListSx = { py: 0.5 }

    const mergedMenuProps: Omit<MenuProps, "anchorEl" | "open" | "onClose"> = {
        ...menuProps,
        disableScrollLock: menuProps?.disableScrollLock ?? true,
        disableAutoFocusItem: menuProps?.disableAutoFocusItem ?? true,
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

    const triggerProps = {
        id: `${id}-button`,
        "aria-controls": open ? `${id}-menu` : undefined,
        "aria-haspopup": "true" as const,
        "aria-expanded": open ? ("true" as const) : undefined,
        onClick: handleClick,
    }

    const effectiveButtonAction =
        buttonAction === undefined ? children : buttonAction

    const renderTrigger = () => {
        if (effectiveButtonAction === null) return null

        if (effectiveButtonAction !== undefined) {
            if (React.isValidElement(effectiveButtonAction)) {
                const element = effectiveButtonAction as React.ReactElement<{
                    onClick?: React.MouseEventHandler<HTMLElement>
                }>

                const originalOnClick = element.props.onClick

                return React.cloneElement(element, {
                    ...triggerProps,
                    onClick: (event: React.MouseEvent<HTMLElement>) => {
                        originalOnClick?.(event)
                        handleClick(event)
                    },
                })
            }

            return effectiveButtonAction
        }

        return (
            <Button
                variant={variant}
                size="small"
                disableElevation
                endIcon={<span aria-hidden>▾</span>}
                color={forceWhite ? "inherit" : "primary"}
                {...triggerProps}
                {...mergedButtonProps}
            >
                {label}
            </Button>
        )
    }

    return (
        <div>
            {renderTrigger()}
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
                            sx={(theme) => ({
                                gap: 1,
                                borderRadius: 1,
                                mx: 0.5,
                                my: 0.25,
                                color: forceWhite
                                    ? theme.palette.primary.contrastText
                                    : undefined,
                                "&:hover": {
                                    bgcolor: forceWhite
                                        ? alpha(
                                              theme.palette.primary
                                                  .contrastText,
                                              0.12,
                                          )
                                        : theme.palette.action.hover,
                                },
                                "&:active": {
                                    bgcolor: forceWhite
                                        ? alpha(
                                              theme.palette.primary
                                                  .contrastText,
                                              0.18,
                                          )
                                        : theme.palette.action.selected,
                                },
                                "&.Mui-focusVisible": {
                                    bgcolor: forceWhite
                                        ? alpha(
                                              theme.palette.primary
                                                  .contrastText,
                                              0.14,
                                          )
                                        : theme.palette.action.hover,
                                },
                            })}
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
