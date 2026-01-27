type NumberStepIconProps = {
    numberValue: number
    active?: boolean
}

const NumberStepIcon = ({ numberValue, active }: NumberStepIconProps) => {
    return (
        <>
            <section
                className={`flex items-center justify-center w-12.5 h-12.5 border-2 rounded-full cursor-pointer ${active ? "border-secondary" : "border-secondary-text"}`}
            >
                {numberValue.toString().padStart(2, "0")}
            </section>
        </>
    )
}

export default NumberStepIcon
