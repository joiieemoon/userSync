import { Modal } from "../../ui/modal";

import Button from "../../ui/button/Button";
import { IoWarningOutline } from "react-icons/io5";
import { useDeleteUser } from "../../../features/user/hooks/uselistusers-api";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  title?: string;
  description?: string;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
  title = "Delete Confirmation",
  description = "Are you sure you want to delete this item? ",
  id,
}) => {
 
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      {/* BODY */}

      <div className="flex justify-center w-full">
        <IoWarningOutline className="text-7xl text-red-500" />
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
