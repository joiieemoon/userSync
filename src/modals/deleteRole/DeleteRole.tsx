import React from "react";
import { PiWarningCircle } from "react-icons/pi";
import CommonModal from "../common-modal";
import DeleteConfirmCommanModal from "../comman-delete-modal";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  role: any;
  onConfirm: () => void;
}

const DeleteRole: React.FC<Props> = ({ isOpen, onClose, role, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <>
      {" "}
      
      <DeleteConfirmCommanModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onConfirm}
        title={`Are you sure you want to delete role ${role?.roleName} role?`}
      />
    </>
  );
};

export default DeleteRole;
