import * as React from "react"

export type CheckStepIconProps = React.SVGProps<SVGSVGElement> & {
    color?: string
    checkColor?: string
}

const CheckStepIcon = ({
    color = "var(--color-primary)",
    checkColor = "#fff",
    style,
    ...props
}: CheckStepIconProps) => {
    return (
        <svg
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color, ...style }}
            {...props}
        >
            <rect
                x="1"
                y="1"
                width="48"
                height="48"
                rx="24"
                fill="currentColor"
            />
            <rect
                x="1"
                y="1"
                width="48"
                height="48"
                rx="24"
                stroke="currentColor"
            />
            <path
                d="M22.078 28.642L31.72 19L33.0003 20.2802L22.078 31.2025L16.9998 26.1257L18.28 24.8455L22.078 28.642Z"
                fill={checkColor}
            />
        </svg>
    )
}

export default CheckStepIcon
