import React from "react";
// import { PiWarningThin } from "react-icons/pi";
import { PiWarningCircle } from "react-icons/pi";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  role: any;
  onConfirm: () => void;
}

const DeleteRole: React.FC<Props> = ({ isOpen, onClose, role, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-80 p-6 dark:bg-gray-900 rounded-xl shadow-lg">
         <PiWarningCircle className="text-red-500 text-8xl mr-2 text-center font-bold w-full" />
        <div className="flex items-center mb-4">
         
          <h2 className="text-lg font-semibold dark:text-white">
            Are you sure you want to delete role{" "}
            <span className="font-bold">{role?.roleName}</span>?
          </h2>
        </div>

        <button
          onClick={onConfirm}
          className="w-full bg-amber-400 text-black font-semibold py-2  rounded mb-2"
        >
          Delete Role
        </button>

        <button onClick={onClose} className="w-full text-gray-500">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteRole;
