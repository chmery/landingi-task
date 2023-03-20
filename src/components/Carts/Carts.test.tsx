import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import CartDetails from "./CartDetails/CartDetails";
import Carts from "./Carts";

const MockCarts = ({ route }: { route: string }) => {
    const cartsData = {
        carts: [
            {
                id: 1,
                totalProducts: 5,
                totalQuantity: 10,
                total: 20,
                discountedTotal: 15,
                products: [],
                userId: 1,
            },
            {
                id: 2,
                totalProducts: 5,
                totalQuantity: 10,
                total: 20,
                discountedTotal: 15,
                products: [],
                userId: 2,
            },
        ],
    };

    const routes = [
        {
            path: "/carts",
            element: <Carts />,
            loader: () => cartsData,
            children: [
                {
                    path: "cart-details/:cartId",
                    element: <CartDetails />,
                    loader: () => cartsData.carts[0],
                },
            ],
        },
    ];

    const router = createMemoryRouter(routes, {
        initialEntries: [route],
    });

    return <RouterProvider router={router} />;
};

describe("Cart details component", () => {
    it("should render carts", async () => {
        render(<MockCarts route="/carts" />);
        expect(await screen.findByText("Cart 1")).toBeVisible();
        expect(await screen.findByText("Cart 2")).toBeVisible();
    });
    it("should render cart details", async () => {
        render(<MockCarts route="/carts/cart-details/1" />);
        expect(await screen.findByText("Cart 1 details")).toBeVisible();
    });
});
