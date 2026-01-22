import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import Button from "@mui/material/Button"

describe("Material UI", () => {
    it("renders a MUI Button", () => {
        render(<Button variant="contained">MUI Button</Button>)
        expect(
            screen.getByRole("button", { name: /mui button/i }),
        ).toBeInTheDocument()
    })
})
