import React from "react";
import NewUserForm from "../../components/createnewUserForm/NewUserForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AddNewuserModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose} // clicking outside closes the modal
    >
      <div
        className="relative"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside the form
      >
        <NewUserForm onClose={onClose} />
      </div>
    </div>
  );
};

export default AddNewuserModal;
  