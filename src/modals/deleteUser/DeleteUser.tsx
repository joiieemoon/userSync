import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../components/firebase/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const handleSubmit = async () => {
    if (!user) return;

    try {
      await deleteDoc(doc(db, "Users", user.uid));
      console.log(`User ${user.firstName} deleted successfully`);
      toast.success(`User ${user.firstName} deleted successfully`,{
        position:"top-center",
      });
      onClose();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-80 p-6 dark:bg-gray-900 rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold mb-4 dark:text-white">
          Are you sure you want to delete {user?.firstName} {user?.lastName}?
        </h2>

        <button
          onClick={handleSubmit}
          className="w-full bg-amber-300  text-black py-2 rounded mb-2"
        >
          Delete User
        </button>

        <button onClick={onClose} className="w-full text-gray-500">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteUser;
