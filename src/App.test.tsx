import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Carts from "./components/Carts/Carts";
import Creator from "./components/Creator/Creator";

const MockApp = ({ route }: { route: string }) => {
    const productsToAdd = [
        {
            id: 1,
            title: "iPhone 9",
            price: 549,
            thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
        },
        {
            id: 2,
            title: "iPhone X",
            price: 899,
            thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
        },
    ];

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
            path: "/",
            element: <App />,
            children: [
                {
                    path: "creator",
                    element: <Creator />,
                    loader: () => productsToAdd,
                },
                {
                    path: "carts",
                    element: <Carts />,
                    loader: () => cartsData,
                },
            ],
        },
    ];

    const router = createMemoryRouter(routes, {
        initialEntries: [route],
    });

    return <RouterProvider router={router} />;
};

describe("App component", () => {
    it("should render navigation", () => {
        render(<MockApp route="/" />);
        expect(screen.getByText(/^all carts$/i)).toBeVisible();
    });
    it("should render creator", async () => {
        render(<MockApp route="/creator" />);
        expect(await screen.findByText(/^cart creator$/i)).toBeVisible();
    });
    it("should render carts", async () => {
        render(<MockApp route="/carts" />);
        expect(await screen.findByText(/^cart 2$/i)).toBeVisible();
    });
});
