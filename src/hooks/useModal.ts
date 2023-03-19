import { useEffect, useState } from "react";

const useModal = () => {
    const [isSuccesModalOpen, setIsSuccesModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        const modalTimeout = setTimeout(() => {
            setIsErrorModalOpen(false);
            setIsSuccesModalOpen(false);
            setIsClosing(false);
        }, 500);

        return () => {
            clearTimeout(modalTimeout);
        };
    }, [isClosing]);

    return {
        isErrorModalOpen,
        isSuccesModalOpen,
        isClosing,
        setIsClosing,
        setIsSuccesModalOpen,
        setIsErrorModalOpen,
    };
};

export default useModal;
