import { screen, render, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductItem from "./ProductItem";

const productData = {
    thumbnail: "path1",
    title: "item1",
    price: 123,
    id: 1,
};

const MockProductItem = () => (
    <ProductItem productData={productData} onRemove={jest.fn()} onAdd={jest.fn()} />
);

describe("Product item component", () => {
    it("should render product data", () => {
        render(<MockProductItem />);
        expect(screen.getByText("item1")).toBeVisible();
    });

    it("should increase and decrease product quantity", () => {
        render(<MockProductItem />);
        act(() => userEvent.click(screen.getByTestId("add1")));
        expect(screen.getByText("1")).toBeVisible();
        act(() => userEvent.click(screen.getByTestId("remove1")));
        expect(screen.getByText("0")).toBeVisible();
    });
});
