import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

import DatePicker from "@/components/base/Input/DatePicker"

const withLocalization = (ui: React.ReactElement) => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>{ui}</LocalizationProvider>
)

describe("DatePicker", () => {
    it("dispara onValueChange e onDateChange", () => {
        const onValueChange = vi.fn()
        const onDateChange = vi.fn()

        render(
            withLocalization(
                <DatePicker
                    label="Data"
                    onValueChange={onValueChange}
                    onDateChange={onDateChange}
                />,
            ),
        )

        const input = screen.getByLabelText(/data/i, {
            selector: "input",
        }) as HTMLInputElement

        fireEvent.change(input, { target: { value: "28/01/2026" } })
        fireEvent.blur(input)

        expect(onValueChange).toHaveBeenCalledTimes(1)
        expect(onValueChange).toHaveBeenCalledWith("2026-01-28")

        expect(onDateChange).toHaveBeenCalledTimes(1)
        const dateArg = onDateChange.mock.calls[0][0] as Date
        expect(dateArg).toBeInstanceOf(Date)
        expect(dateArg.getFullYear()).toBe(2026)
        expect(dateArg.getMonth()).toBe(0)
        expect(dateArg.getDate()).toBe(28)
    })

    it("aceita value como Date", () => {
        render(
            withLocalization(
                <DatePicker label="Nascimento" value={new Date(2020, 4, 9)} />,
            ),
        )
        const input = screen.getByLabelText(/nascimento/i, {
            selector: "input",
        }) as HTMLInputElement
        expect(input.value).toBe("09/05/2020")
    })
})
