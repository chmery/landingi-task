import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "./Modal";

const mockSetIsClosing = jest.fn();

describe("Modal component", () => {
    it("should render title and text", () => {
        render(
            <Modal
                title="Test"
                text="Text"
                type="succes"
                isClosing={false}
                setIsClosing={mockSetIsClosing}
            />
        );
        expect(screen.getByText("Test") && screen.getByText("Text")).toBeVisible();
    });
    it("should call setIsClosing function on click", async () => {
        render(
            <Modal
                title="Test"
                text="Text"
                type="succes"
                isClosing={false}
                setIsClosing={mockSetIsClosing}
            />
        );
        const backdrop = screen.getByTestId("modal-backdrop");
        userEvent.click(backdrop);
        expect(mockSetIsClosing).toHaveBeenCalled();
    });
});
