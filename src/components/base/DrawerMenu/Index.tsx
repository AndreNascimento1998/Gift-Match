import type { ReactNode } from "react"
import Drawer from "@mui/material/Drawer"
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"
import Collapse from "@mui/material/Collapse"
import { useLocation, useNavigate } from "react-router-dom"
import { useMemo, useState } from "react"

type DrawerMenuItem = {
    key?: string
    label: string
    route?: string
    icon?: ReactNode
    onClick?: () => void
    children?: DrawerMenuItem[]
    startExpanded?: boolean
}

type DrawerMenuProps = {
    open: boolean
    onClose: () => void
    title?: string
    anchor?: "left" | "right"
    items: DrawerMenuItem[]
    showActiveRoute?: boolean
}

const DrawerMenu = ({
    open,
    onClose,
    title,
    anchor = "right",
    items,
    showActiveRoute = true,
}: DrawerMenuProps) => {
    const navigate = useNavigate()
    const location = useLocation()

    const initialExpanded = useMemo(() => {
        const expanded = new Set<string>()
        for (const item of items) {
            if (item.children?.length && item.startExpanded) {
                expanded.add(item.key ?? item.label)
            }
        }
        return expanded
    }, [items])

    const [expandedKeys, setExpandedKeys] = useState<Set<string>>(
        () => initialExpanded,
    )

    const toggleExpanded = (key: string) => {
        setExpandedKeys((previous) => {
            const next = new Set(previous)
            if (next.has(key)) next.delete(key)
            else next.add(key)
            return next
        })
    }

    const handleItemClick = (item: DrawerMenuItem) => {
        item.onClick?.()
        if (item.route) navigate(item.route)
        onClose()
    }

    const getItemKey = (item: DrawerMenuItem) =>
        item.key ?? item.route ?? item.label

    return (
        <Drawer
            open={open}
            onClose={onClose}
            anchor={anchor}
            PaperProps={{
                sx: {
                    width: 320,
                    maxWidth: "85vw",
                    backgroundColor:
                        "var(--color-background-component, var(--color-surface))",
                    color: "var(--color-primary)",
                },
            }}
        >
            <Box
                className="flex items-center justify-between px-5 py-4"
                sx={{
                    borderBottom: "1px solid var(--color-border)",
                }}
            >
                <div className="font-semibold text-h3">{title ?? "Menu"}</div>
                <button
                    type="button"
                    className="px-2 py-1 rounded-md hover:bg-third"
                    onClick={onClose}
                    aria-label="Fechar menu"
                >
                    ×
                </button>
            </Box>

            <List className="px-2 py-2">
                {items.map((item) => {
                    const itemKey = getItemKey(item)
                    const isActive =
                        showActiveRoute &&
                        item.route &&
                        location.pathname === item.route

                    const hasChildren = Boolean(item.children?.length)
                    const isExpanded = expandedKeys.has(itemKey)

                    if (hasChildren) {
                        return (
                            <Box key={itemKey}>
                                <ListItemButton
                                    onClick={() => toggleExpanded(itemKey)}
                                    className={
                                        isExpanded
                                            ? "rounded-lg bg-third"
                                            : "rounded-lg"
                                    }
                                    sx={{
                                        color: "inherit",
                                        "&:hover": {
                                            backgroundColor:
                                                "var(--color-third)",
                                        },
                                    }}
                                >
                                    {item.icon ? (
                                        <span className="mr-3 flex items-center">
                                            {item.icon}
                                        </span>
                                    ) : null}
                                    <ListItemText
                                        primary={item.label}
                                        slotProps={{
                                            primary: {
                                                className:
                                                    "font-semibold text-[1rem]",
                                            },
                                        }}
                                    />
                                    <span
                                        className={
                                            isExpanded
                                                ? "ml-2 transition-transform rotate-90"
                                                : "ml-2 transition-transform"
                                        }
                                        aria-hidden
                                    >
                                        ›
                                    </span>
                                </ListItemButton>

                                <Collapse
                                    in={isExpanded}
                                    timeout="auto"
                                    unmountOnExit
                                >
                                    <List className="pl-4 pr-2 pb-2">
                                        {item.children!.map((child) => (
                                            <ListItemButton
                                                key={getItemKey(child)}
                                                onClick={() =>
                                                    handleItemClick(child)
                                                }
                                                className="rounded-lg"
                                                sx={{
                                                    color: "inherit",
                                                    "&:hover": {
                                                        backgroundColor:
                                                            "var(--color-third)",
                                                    },
                                                }}
                                            >
                                                <ListItemText
                                                    primary={child.label}
                                                    slotProps={{
                                                        primary: {
                                                            className:
                                                                "font-medium text-[0.95rem]",
                                                        },
                                                    }}
                                                />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Collapse>
                            </Box>
                        )
                    }

                    return (
                        <ListItemButton
                            key={itemKey}
                            onClick={() => handleItemClick(item)}
                            className={
                                isActive ? "rounded-lg bg-third" : "rounded-lg"
                            }
                            sx={{
                                color: "inherit",
                                "&:hover": {
                                    backgroundColor: "var(--color-third)",
                                },
                            }}
                        >
                            {item.icon ? (
                                <span className="mr-3 flex items-center">
                                    {item.icon}
                                </span>
                            ) : null}
                            <ListItemText
                                primary={item.label}
                                slotProps={{
                                    primary: {
                                        className: "font-semibold text-[1rem]",
                                    },
                                }}
                            />
                        </ListItemButton>
                    )
                })}
            </List>

            <Divider sx={{ borderColor: "var(--color-border)" }} />

            <Box
                className="px-5 py-4 text-h4"
                sx={{ color: "var(--color-muted)" }}
            >
                Toque fora para fechar.
            </Box>
        </Drawer>
    )
}

export type { DrawerMenuItem }
export default DrawerMenu
