import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import CartItem from "./CartItem";

const MockCartDetails = () => {
    const cartData = {
        id: 1,
        totalProducts: 5,
        totalQuantity: 10,
        total: 20,
        discountedTotal: 15,
        products: [],
        userId: 1,
    };

    const routes = [
        {
            path: "/carts",
            element: <CartItem cartData={cartData} />,
            loader: () => cartData,
        },
    ];

    const router = createMemoryRouter(routes, {
        initialEntries: ["/carts"],
    });

    return <RouterProvider router={router} />;
};

describe("Cart details component", () => {
    it("should render cart data", async () => {
        render(<MockCartDetails />);
        expect(await screen.findByText("20")).toBeVisible();
    });

    it("should redirect to cart-details url", async () => {
        render(<MockCartDetails />);
        expect(await screen.findByTestId("link")).toHaveAttribute("href", "/carts/cart-details/1");
    });
});
