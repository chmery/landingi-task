import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import CartDetails from "./CartDetails";

const MockCartDetails = () => {
    const cartData = {
        id: 1,
        totalProducts: 5,
        totalQuantity: 10,
        total: 20,
        discountedTotal: 15,
        products: [],
    };

    const routes = [
        {
            path: "/carts/cart-details/:cartId",
            element: <CartDetails />,
            loader: () => cartData,
        },
    ];

    const router = createMemoryRouter(routes, {
        initialEntries: ["/carts/cart-details/1"],
    });

    return <RouterProvider router={router} />;
};

describe("Cart details component", () => {
    it("should render cart data", async () => {
        render(<MockCartDetails />);
        const totalProducts = await screen.findByText("10");
        expect(totalProducts).toBeVisible();
    });

    it("should render chart", async () => {
        render(<MockCartDetails />);
        const chart = await screen.findByTestId("chart");
        expect(chart).toBeVisible();
    });
});
