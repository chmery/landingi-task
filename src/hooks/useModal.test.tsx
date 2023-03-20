import { renderHook, act } from "@testing-library/react";
import useModal from "./useModal";

describe("useModal hook", () => {
    it("should set state to false when is closing", () => {
        const { result } = renderHook(() => useModal());
        result.current.isSuccesModalOpen = true;

        act(() => {
            result.current.setIsClosing(true);
        });

        expect(result.current.isSuccesModalOpen && result.current.setIsClosing).toBe(false);
    });
});
