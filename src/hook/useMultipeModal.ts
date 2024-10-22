import { useState } from 'react';

export const useMultipleModal = () => {
    const [modalStates, setModalStates] = useState<{ [key: string]: boolean }>({});

    const closeModals = (modalId: string) => {
        setModalStates((prev) => ({ ...prev, [modalId]: false }));
    };

    const openModals = (modalId: string) => {
        setModalStates((prev) => ({ ...prev, [modalId]: true }));
    };

    const isModalOpen = (modalId: string) => {
        return modalStates[modalId] || false;
    };

    return { openModals, closeModals, isModalOpen };
}
