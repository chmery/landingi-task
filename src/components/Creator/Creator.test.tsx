import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import Creator from "./Creator";

const MockCreator = () => {
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

    const routes = [
        {
            path: "/creator",
            element: <Creator />,
            loader: () => productsToAdd,
        },
    ];

    const router = createMemoryRouter(routes, {
        initialEntries: ["/creator"],
    });

    return <RouterProvider router={router} />;
};

const mockFetch = (ok: boolean, status: number) => {
    jest.spyOn(global, "fetch").mockImplementation(
        jest.fn(() =>
            Promise.resolve({
                ok,
                status,
            })
        ) as jest.Mock
    );
};

beforeEach(() => {
    jest.restoreAllMocks();
});

describe("Creator component", () => {
    it("should render products to add", async () => {
        render(<MockCreator />);
        const product = await screen.findByText("iPhone X");
        expect(product).toBeVisible();
    });

    it("should allow to add and remove products", async () => {
        render(<MockCreator />);

        const addBtn = await screen.findByTestId("add2");

        userEvent.click(addBtn);
        userEvent.click(addBtn);

        const removeBtn = await screen.findByTestId("remove2");

        userEvent.click(removeBtn);

        const productQuantity = await screen.findByText("1");
        expect(productQuantity).toBeVisible();
    });

    it("should allow to create cart", async () => {
        mockFetch(true, 200);
        render(<MockCreator />);

        const addBtn = await screen.findByTestId("add2");
        userEvent.click(addBtn);

        const createBtn = await screen.findByText("Create");
        userEvent.click(createBtn);

        const succesModal = await screen.findByText("Succes!");
        expect(succesModal).toBeVisible();
    });

    it("should render error modal", async () => {
        mockFetch(false, 404);
        render(<MockCreator />);

        const addBtn = await screen.findByTestId("add2");
        userEvent.click(addBtn);

        const createBtn = await screen.findByText("Create");
        userEvent.click(createBtn);

        const errorModal = await screen.findByText("Error!");
        expect(errorModal).toBeVisible();
    });
});
