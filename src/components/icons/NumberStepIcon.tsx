type NumberStepIconProps = {
    numberValue: number
}

const NumberStepIcon = ({ numberValue }: NumberStepIconProps) => {
    return (
        <>
            <section className="flex items-center justify-center w-12.5 h-12.5 border-2 border-secondary-text rounded-full cursor-pointer">
                {numberValue.toString().padStart(2, "0")}
            </section>
        </>
    )
}

export default NumberStepIcon
