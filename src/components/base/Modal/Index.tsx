import type { ReactNode } from "react"
import Dialog, { type DialogProps } from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"

export type BaseModalProps = {
    open: boolean
    onClose: () => void
    title?: ReactNode
    children?: ReactNode

    header?: ReactNode
    footer?: ReactNode

    maxWidth?: DialogProps["maxWidth"]
    fullWidth?: boolean

    showCloseButton?: boolean
    disableBackdropClose?: boolean
}

const BaseModal = ({
    open,
    onClose,
    title,
    children,
    header,
    footer,
    maxWidth = "sm",
    fullWidth = true,
    showCloseButton = true,
    disableBackdropClose = false,
}: BaseModalProps) => {
    return (
        <Dialog
            open={open}
            maxWidth={maxWidth}
            fullWidth={fullWidth}
            onClose={(_, reason) => {
                if (disableBackdropClose && reason === "backdropClick") return
                onClose()
            }}
            PaperProps={{
                sx: {
                    position: "relative",
                    borderRadius: 3,
                    backgroundColor:
                        "var(--color-background-component, var(--color-surface))",
                    border: "1px solid var(--color-border)",
                    boxShadow: "0 30px 80px rgba(0,0,0,0.18)",
                    overflow: "hidden",
                },
            }}
            slotProps={{
                backdrop: {
                    sx: {
                        backgroundColor: "rgba(0,0,0,0.35)",
                    },
                },
            }}
        >
            {showCloseButton ? (
                <button
                    type="button"
                    className="px-2 py-1 rounded-md hover:bg-third"
                    onClick={onClose}
                    aria-label="Fechar modal"
                    style={{
                        position: "absolute",
                        top: 14,
                        right: 14,
                        color: "var(--color-muted)",
                        zIndex: 2,
                    }}
                >
                    ×
                </button>
            ) : null}

            {header ? (
                header
            ) : title ? (
                <div
                    className="px-6 pt-5 pb-4"
                    style={{
                        position: "relative",
                        borderBottom: "1px solid var(--color-border)",
                    }}
                >
                    <div
                        className="text-h2 font-bold"
                        style={{ color: "var(--color-main)" }}
                    >
                        {title}
                    </div>
                </div>
            ) : null}

            <DialogContent
                sx={{
                    paddingX: 3,
                    paddingY: 3,
                    color: "var(--color-main)",
                }}
            >
                {children}
            </DialogContent>

            {footer ? (
                <DialogActions
                    sx={{
                        paddingX: 3,
                        paddingY: 2,
                        borderTop: "1px solid var(--color-border)",
                    }}
                >
                    {footer}
                </DialogActions>
            ) : null}
        </Dialog>
    )
}

export default BaseModal
