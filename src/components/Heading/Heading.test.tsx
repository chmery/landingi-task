import { render, screen } from "@testing-library/react";
import Heading from "./Heading";

describe("Heading component", () => {
    it("should render title and text", () => {
        render(<Heading title="Test" text="Text" />);
        expect(screen.getByText("Test") && screen.getByText("Text")).toBeVisible();
    });
});
