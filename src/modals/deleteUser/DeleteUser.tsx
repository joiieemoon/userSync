import React from "react";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../components/firebase/firebase.ts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PiWarningCircle } from "react-icons/pi";
import EditBtn from "../../components/button/editbutton/Editbtn.tsx";

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
      toast.success(`User ${user.firstName} deleted successfully`, {
        position: "top-center",
      });
      onClose();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-80 p-6  rounded-xl shadow-lg">
        <PiWarningCircle className="text-red-500 text-8xl mr-2 text-center font-bold w-full" />
        <h2 className="text-lg font-semibold mb-4  text-center">
          Are you sure you want to delete {user?.firstName} {user?.lastName}?
        </h2>

     
        <div className="flex justify-between ">
          <EditBtn
            onClick={onClose}
            type="button"
            label="cancel"
            icon=""
            variant="secondary"
          />

          <EditBtn
            onClick={handleSubmit}
            type="button"
            label=" Delete User"
            icon=""
            variant="primary"
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
