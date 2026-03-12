import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.ts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CommonModal from "../common-modal/index.tsx";
import { PiWarningCircle } from "react-icons/pi";

type DeleteItemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  collectionName: string;
  item: { id: string } | null;
};

const DeleteItemModal: React.FC<DeleteItemModalProps> = ({
  isOpen,
  onClose,
  collectionName,
  item,
}) => {
  const handleDelete = async () => {
    if (!item) return;

    try {
      await deleteDoc(doc(db, collectionName, item.id));
      toast.success(`Item deleted successfully`, {
        position: "top-center",
      });
      onClose();
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error(`Failed to delete item`, { position: "top-center" });
    }
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleDelete}
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

export default DeleteItemModal;
