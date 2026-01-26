import type { ComponentPropsWithoutRef } from "react"

type ButtonHamburguerIconProps = ComponentPropsWithoutRef<"svg">

const ButtonHamburguerIcon = ({
    className,
    ...props
}: ButtonHamburguerIconProps) => {
    return (
        <svg
            width="16"
            height="12"
            viewBox="0 0 16 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className ?? "text-main"}
            {...props}
        >
            <path
                d="M1 11H15M1 6H15M1 1H15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

export default ButtonHamburguerIcon
