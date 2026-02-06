type BarsProps = {
    max: number
    current: number
}

const Bars = ({ max, current }: BarsProps) => {
    return (
        <div className="full">
            <div
                className={`relative w-full h-6 md:h-10 rounded-lg bg-neutral-400`}
            >
                <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-[14px] font-semibold text-white z-10">
                    Participantes {current}/{max}
                </div>
                <div
                    className={`absolute left-0 top-0 h-6 md:h-10 ${current === max ? "rounded-lg" : "rounded-lg rounded-tr-none rounded-br-none"} bg-primary transition-all duration-500 ease-in-out`}
                    style={{
                        width: `${(current / max) * 100}%`,
                        minWidth: "1%",
                    }}
                ></div>
            </div>
        </div>
    )
}

export default Bars
