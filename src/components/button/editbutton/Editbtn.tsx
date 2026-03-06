import { MdOutlineModeEditOutline } from "react-icons/md";
import { ReactNode } from "react";

interface Props {
  onClick?: () => void;
  label?: string;
  icon?: ReactNode;
}

const EditBtn = ({
  onClick,
  label = "Edit", // default text
  icon = <MdOutlineModeEditOutline className="text-xl" />, // default icon
}: Props) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-5 py-2 rounded-full text-gray-700 
        bg-amber-300  border border-gray-300 
        shadow hover:shadow-md hover:bg-gray-50 
        transform hover:-translate-y-0.5 hover:scale-105
        transition-all duration-200 ease-in-out cursor-pointer"
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

export default EditBtn;
