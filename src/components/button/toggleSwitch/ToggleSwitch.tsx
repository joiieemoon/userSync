import React from "react";

const ToggleSwitch = ({
  checked = false,
  onColor = "bg-green-500",
  offColor = "bg-red-300",
  knobColor = "bg-gray-800",
  width = "w-9",
  height = "h-4",
  onChange,
}) => {
  const toggle = () => {
    if (onChange) onChange(!checked); 
  };

  return (
    <div
      onClick={toggle}
      className={`
        ${width} ${height}
        flex items-center
        rounded-full
        cursor-pointer
        transition-colors duration-300
        ${checked ? onColor : offColor}
      `}
    >
      <div
        className={`
          ${knobColor}
          h-4 w-4
          rounded-full
          shadow-md
          transform
          transition-transform duration-300
          ${checked ? "translate-x-6" : "translate-x-1"}
        `}
      />
    </div>
  );
};

export default ToggleSwitch;
