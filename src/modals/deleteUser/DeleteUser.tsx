import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../components/firebase/firebase.ts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PiWarningCircle } from "react-icons/pi";
import CommonModal from "../common-modal";
import DeleteConfirmCommanModal from "../comman-delete-modal/index.tsx";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user: {
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
  } | null;
};

const DeleteUser: React.FC<Props> = ({ isOpen, onClose, user }) => {
  const handleDelete = async () => {
    if (!user) return;

    try {
      await deleteDoc(doc(db, "Users", user.uid));
      toast.success(`User ${user.firstName} deleted successfully`, {
        position: "top-center",
      });
      onClose();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user", { position: "top-center" });
    }
  };

  return (
    <>
      
      <DeleteConfirmCommanModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleDelete}
        title={`Are you sure you want to delete ${user?.firstName} ${user?.lastName}?`}
      />
    </>
  );
};

export default DeleteUser;
