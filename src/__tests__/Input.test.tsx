import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import Input from "@/components/base/Input/Index"

describe("Input", () => {
    it("repassa onChange e dispara onValueChange com o valor", () => {
        const onChange = vi.fn()
        const onValueChange = vi.fn()

        render(
            <Input
                label="Nome"
                onChange={onChange}
                onValueChange={onValueChange}
            />,
        )

        const input = screen.getByLabelText(/nome/i)
        fireEvent.change(input, { target: { value: "Andre" } })

        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onValueChange).toHaveBeenCalledTimes(1)
        expect(onValueChange).toHaveBeenCalledWith("Andre", expect.anything())
    })

    it("dispara onEnter e onEscape via onKeyDown", () => {
        const onEnter = vi.fn()
        const onEscape = vi.fn()

        render(<Input label="Busca" onEnter={onEnter} onEscape={onEscape} />)

        const input = screen.getByLabelText(/busca/i)

        fireEvent.keyDown(input, { key: "Enter" })
        fireEvent.keyDown(input, { key: "Escape" })

        expect(onEnter).toHaveBeenCalledTimes(1)
        expect(onEscape).toHaveBeenCalledTimes(1)
    })

    it("permite virar textarea via textArea", () => {
        render(<Input label="Descrição" textArea textAreaRows={3} />)

        const field = screen.getByLabelText(/descrição/i)
        expect(field.tagName.toLowerCase()).toBe("textarea")
    })
})
