import type { ReactNode } from "react"
import Drawer from "@mui/material/Drawer"
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import Divider from "@mui/material/Divider"
import Collapse from "@mui/material/Collapse"
import { useLocation, useNavigate } from "react-router-dom"
import { useMemo, useState } from "react"
import { GenerateRandomColor } from "@/helpers/GenerateRandomColor"

type DrawerMenuProfile = {
    name: string
    email?: string
    avatarSrc?: string
    avatarAlt?: string
}

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
    profile?: DrawerMenuProfile
    header?: ReactNode
    showCloseButton?: boolean
}

const getInitials = (name: string) => {
    const parts = name.trim().split(/\s+/).filter(Boolean)
    const first = parts[0]?.[0] ?? ""
    const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : ""
    return (first + last).toUpperCase() || "U"
}

const DrawerMenu = ({
    open,
    onClose,
    title,
    anchor = "right",
    items,
    showActiveRoute = true,
    profile,
    header,
    showCloseButton = true,
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
            {header ? (
                <Box sx={{ position: "relative" }}>
                    {showCloseButton ? (
                        <button
                            type="button"
                            className="px-2 py-1 rounded-md hover:bg-third"
                            onClick={onClose}
                            aria-label="Fechar menu"
                            style={{
                                position: "absolute",
                                top: 12,
                                right: 12,
                                color: "var(--color-muted)",
                            }}
                        >
                            ×
                        </button>
                    ) : null}
                    {header}
                </Box>
            ) : profile ? (
                <Box sx={{ position: "relative" }}>
                    {showCloseButton ? (
                        <button
                            type="button"
                            className="px-2 py-1 rounded-md hover:bg-third"
                            onClick={onClose}
                            aria-label="Fechar menu"
                            style={{
                                position: "absolute",
                                top: 12,
                                right: 12,
                                color: "var(--color-muted)",
                            }}
                        >
                            ×
                        </button>
                    ) : null}

                    <Box className="px-6 pt-8 pb-4 flex flex-col items-center">
                        <Avatar
                            src={profile.avatarSrc}
                            alt={profile.avatarAlt ?? profile.name}
                            sx={{
                                width: 88,
                                height: 88,
                                bgcolor: GenerateRandomColor.generateColor(
                                    profile.name,
                                ),
                                fontWeight: 800,
                                fontSize: 28,
                            }}
                        >
                            {getInitials(profile.name)}
                        </Avatar>

                        <div
                            className="mt-4 text-h1 font-bold text-center"
                            style={{ color: "var(--color-main)" }}
                        >
                            {profile.name}
                        </div>
                        {profile.email ? (
                            <div
                                className="mt-2 text-h3 text-center"
                                style={{ color: "var(--color-muted)" }}
                            >
                                {profile.email}
                            </div>
                        ) : null}

                        <div
                            className="mt-6 w-full"
                            style={{
                                borderBottom: "3px solid var(--color-primary)",
                                borderRadius: 999,
                            }}
                        />
                    </Box>
                </Box>
            ) : (
                <Box
                    className="flex items-center justify-between px-5 py-4"
                    sx={{
                        borderBottom: "1px solid var(--color-border)",
                    }}
                >
                    <div className="font-semibold text-h3">
                        {title ?? "Menu"}
                    </div>
                    <button
                        type="button"
                        className="px-2 py-1 rounded-md hover:bg-third"
                        onClick={onClose}
                        aria-label="Fechar menu"
                        style={{ color: "var(--color-muted)" }}
                    >
                        ×
                    </button>
                </Box>
            )}

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
