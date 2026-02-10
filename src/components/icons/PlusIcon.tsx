const PlusIcon = ({ color = "var(--color-primary)" }: { color?: string }) => {
    return (
        <>
            <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M20 11.4286H11.4286V20H8.57143V11.4286H0V8.57143H8.57143V0H11.4286V8.57143H20V11.4286Z"
                    fill={color}
                />
            </svg>
        </>
    )
}

export default PlusIcon
