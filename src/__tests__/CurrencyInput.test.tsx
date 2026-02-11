import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import CurrencyInput from "@/components/base/Input/CurrencyInput"

describe("CurrencyInput", () => {
    it("formata como BRL e dispara callbacks", () => {
        const onValueChange = vi.fn()
        const onNumberChange = vi.fn()
        const onCentsChange = vi.fn()

        render(
            <CurrencyInput
                label="Valor"
                onValueChange={onValueChange}
                onNumberChange={onNumberChange}
                onCentsChange={onCentsChange}
            />,
        )

        const input = screen.getByLabelText(/valor/i) as HTMLInputElement

        // simula colar/alterar para 100,00 (10000 centavos)
        fireEvent.change(input, { target: { value: "10000" } })

        expect(input.value).toMatch(/100,00/)
        expect(onValueChange).toHaveBeenCalledTimes(1)
        expect(onValueChange.mock.calls[0][0]).toMatch(/100,00/)

        expect(onCentsChange).toHaveBeenCalledWith(10000)
        expect(onNumberChange).toHaveBeenCalledWith(100)
    })

    it("permite limpar", () => {
        render(<CurrencyInput label="Valor" defaultValue={10} />)
        const input = screen.getByLabelText(/valor/i) as HTMLInputElement

        fireEvent.change(input, { target: { value: "" } })
        expect(input.value).toBe("")
    })
})
