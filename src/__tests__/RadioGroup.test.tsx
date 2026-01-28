import { act, fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import RadioGroup from "@/components/base/RadioGroup/Index"

describe("RadioGroup", () => {
    it("renderiza opções e dispara onValueChange", () => {
        const onValueChange = vi.fn()

        render(
            <RadioGroup
                label="Tema"
                options={[
                    { label: "Claro", value: "light" },
                    { label: "Escuro", value: "dark" },
                ]}
                onValueChange={onValueChange}
            />,
        )

        fireEvent.click(screen.getByLabelText(/claro/i))

        expect(onValueChange).toHaveBeenCalledTimes(1)
        expect(onValueChange.mock.calls[0][0]).toBe("light")
    })

    it("valida required quando não selecionado após blur", () => {
        render(
            <RadioGroup
                label="Tema"
                required
                options={[
                    { label: "Claro", value: "light" },
                    { label: "Escuro", value: "dark" },
                ]}
            />,
        )

        // RadioGroup não expõe foco fácil; blur no primeiro radio funciona
        const first = screen.getByLabelText(/claro/i)
        act(() => {
            first.focus()
            fireEvent.blur(first)
        })

        expect(screen.getByText(/campo obrigatório/i)).toBeInTheDocument()
    })
})
