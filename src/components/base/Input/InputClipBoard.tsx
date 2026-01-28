import React from "react"

type InputClipBoardProps = {
    value: string
    handleCopy: (value: string) => void
}

const InputClipBoard = ({ value, handleCopy }: InputClipBoardProps) => {
    const [status, setStatus] = React.useState<"idle" | "copied">("idle")

    const handleCopyText = async () => {
        try {
            await navigator.clipboard.writeText(value)
            setStatus("copied")
            setTimeout(() => setStatus("idle"), 3000)
            handleCopy(value)
            console.log("Link copiado para a área de transferência!")
        } catch (err) {
            console.error("Falha ao copiar o link: ", err)
        }
    }

    return (
        <div
            className={`flex relative w-full items-center overflow-hidden h-[36.5px] border ${status === "idle" ? "border-border" : "border-green-700"} p-4 rounded-lg cursor-pointer`}
            onClick={handleCopyText}
        >
            <span className="text-[14px] overflow-hidden text-ellipsis pr-20 block w-full">
                {value}
            </span>

            <div
                className={`absolute cursor-pointer text-[14px] ${status === "idle" ? "bg-primary" : "bg-green-700"} text-white border ${status === "idle" ? "border-third" : "border-green-950"} rounded-lg px-2 py-1 right-2.5`}
            >
                {status === "idle" ? "Copiar" : "Copiado!"}
            </div>
        </div>
    )
}

export default InputClipBoard
