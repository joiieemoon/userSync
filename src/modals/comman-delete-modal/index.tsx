import React from "react";
import { PiWarningCircle } from "react-icons/pi";
import CommonModal from "../common-modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
};

const DeleteConfirmCommanModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
}) => {
  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onConfirm}
      submitLabel="Delete"
      cancelLabel="Cancel"
      title={
        <div className="flex flex-col items-center text-center">
          <PiWarningCircle className="text-red-500 text-8xl mb-2" />
          <span>{title}</span>
        </div>
      }
    />
  );
};

export default DeleteConfirmCommanModal;