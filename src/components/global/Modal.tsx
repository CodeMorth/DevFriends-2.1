import React from "react";
import { Dialog } from "primereact/dialog";

interface Modal {
  visible: boolean;
  closeModal: () => void;
  children?: React.ReactNode;
  widthModal?: string;
  bg?: string;
  className?: string;
}

export const Modal = ({
  visible,
  closeModal,
  children,
  widthModal = "w-fit laptop:w-[auto]",
  bg = "!bg-[#2B3146] ",
  className,
}: Modal) => {

  return (
    <Dialog
      visible={visible}
      onHide={closeModal}
      dismissableMask={true}
      style={{backgroundColor:bg,width:widthModal}}
      className={`${className}  laptop: rounded-[2rem] z-50`}
      header={null}
      footer={null}
    >
      {children}
    </Dialog>
  );
};

