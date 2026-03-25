import React from "react";
import type { CommanbuttonProps } from "../../../types/interfaces";

const Commanbutton = ({
  onClick,
  label,
  icon,
  variant = "primary",
  type = "button",
  disabled = false,
  className = "",
  ...rest
}: CommanbuttonProps) => {
  const baseStyle =
    "flex items-center text-black justify-center gap-2 px-5 py-2 rounded-full border shadow transform hover:-translate-y-0.5 hover:scale-105 transition-all duration-200 ease-in-out";

  const variants = {
    primary: "bg-amber-400 text-black border-amber-400 hover:bg-amber-500",
    secondary: "bg-white text-gray-700 border-gray-300 hover:bg-gray-50",
    main: "bg-amber-400 text-black border-amber-400 hover:bg-amber-500 w-full",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...rest}
      className={`${baseStyle} ${variants[variant]} ${
        disabled
          ? "opacity-50 cursor-not-allowed hover:scale-100 hover:translate-y-0"
          : "cursor-pointer"
      } ${className}`}
    >
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
};

export default React.memo(Commanbutton, (prev, next) => {
  return (
    prev.label === next.label &&
    prev.icon === next.icon &&
    prev.variant === next.variant &&
    prev.disabled === next.disabled &&
    prev.className === next.className
  );
});
