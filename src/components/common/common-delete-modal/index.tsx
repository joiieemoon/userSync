import React, { useCallback, useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../services/firebase/firebase.ts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CommonModal from "../common-modal";
import { PiWarningCircle } from "react-icons/pi";
import type { DeleteItemModalProps } from "../../../types/interfaces/index.ts";

const DeleteItemModal: React.FC<DeleteItemModalProps> = ({
  isOpen,
  onClose,
  collectionName,
  item,
  onDelete,
}) => {
  const [disable, setdisable] = useState(false);

  const handleDelete = useCallback(async () => {
    if (!item) return;

    try {
      setdisable(true);
      await deleteDoc(doc(db, collectionName, item.id));

      toast.success(`Item deleted successfully`, {
        position: "top-center",
      });
      onDelete && onDelete();
      onClose();
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error(`Failed to delete item`, { position: "top-center" });
      setdisable(false);
    }
  }, [item, collectionName, onDelete, onClose]);

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleDelete}
      submitDisabled={disable}
      submitLabel="Delete"
      cancelLabel="Cancel"
      title={
        <div className="flex flex-col items-center text-center">
          <PiWarningCircle className="text-red-500 text-8xl mb-2" />
          <span>Are you sure you want to delete this item? </span>
        </div>
      }
    />
  );
};

export default React.memo(DeleteItemModal);
