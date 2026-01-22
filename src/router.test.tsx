import { render, screen, waitFor } from "@testing-library/react"
import { createMemoryRouter, RouterProvider } from "react-router-dom"
import { act } from "react"
import { describe, expect, it } from "vitest"

describe("react-router", () => {
    it("renders routes and navigates", async () => {
        const router = createMemoryRouter(
            [
                {
                    path: "/",
                    element: <div>Home</div>,
                },
                {
                    path: "/about",
                    element: <div>About</div>,
                },
            ],
            { initialEntries: ["/"] },
        )

        render(<RouterProvider router={router} />)

        expect(screen.getByText("Home")).toBeInTheDocument()

        await act(async () => {
            await router.navigate("/about")
        })

        await waitFor(() => {
            expect(screen.getByText("About")).toBeInTheDocument()
        })
    })
})
