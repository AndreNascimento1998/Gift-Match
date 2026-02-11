import * as React from "react"

export type SearchIconProps = React.SVGProps<SVGSVGElement> & {
    color?: string
}

const SearchIcon = ({
    color = "var(--color-muted)",
    style,
    ...props
}: SearchIconProps) => {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ color, ...style }}
            {...props}
        >
            <path
                d="M8.75 1.75C4.88401 1.75 1.75 4.88401 1.75 8.75C1.75 12.616 4.88401 15.75 8.75 15.75C10.3552 15.75 11.8342 15.2096 13.0151 14.3004L17.2197 18.505C17.5126 18.7979 17.9874 18.7979 18.2803 18.505C18.5732 18.2121 18.5732 17.7372 18.2803 17.4443L14.0757 13.2397C14.9847 12.0589 15.525 10.5801 15.525 8.975C15.525 5.10901 12.391 1.975 8.525 1.975L8.75 1.75ZM3.25 8.75C3.25 5.71243 5.71243 3.25 8.75 3.25C11.7876 3.25 14.25 5.71243 14.25 8.75C14.25 11.7876 11.7876 14.25 8.75 14.25C5.71243 14.25 3.25 11.7876 3.25 8.75Z"
                fill="currentColor"
            />
        </svg>
    )
}

export default SearchIcon
