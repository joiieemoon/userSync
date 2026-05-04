import { Modal } from "../../ui/modal";

import Button from "../../ui/button";
import { ErrorHexaIcon } from "../../../assets/icons";
import type { DeleteModalProps } from "../types";

export const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
  title = "Delete Confirmation",
  description = "Are you sure you want to delete this item? ",
}) => {
  //comman delete modal 
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      {/* BODY */}

      <div className="flex justify-center w-full">
        <ErrorHexaIcon className="text-7xl" />
      </div>
      <div className="px-2 py-4 ">
        <p className="text-sm text-gray-600 dark:text-gray-300 ">
          {description}
        </p>
      </div>

      {/* FOOTER */}
      <div className="flex justify-end gap-3 p-4 border-t dark:border-gray-700">
        <Button variant="outline" size="sm" onClick={onClose}>
          Cancel
        </Button>

        <Button
          size="sm"
          onClick={onConfirm}
          disabled={loading}
          className="bg-red-500 hover:bg-red-600 text-white"
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </Modal>
  );
};
