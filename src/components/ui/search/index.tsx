import React from "react";
import InputController from "../input/input-controller";
import { IoSearchOutline } from "react-icons/io5";
import { SearchBarProps } from "../../common/types";

const SearchBar: React.FC<SearchBarProps> = ({
  value = "",
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  onSubmit,
  placeholder = "Search...",
  className = "",
  disabled = false,
  ...rest
}) => {
  return (
    <div className={`relative  ${className}`}>
     
      <span className="absolute left-3 top-1/2 -translate-y-1/2 mt-1 text-gray-400 text-lg">
        <IoSearchOutline className="text-xl" />
      </span>


      <InputController
        control="input"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e: any) => onChange?.(e.target.value)}
        onBlur={onBlur}
        onFocus={onFocus}
        onsubmit={onSubmit}
        onKeyDown={onKeyDown}
        className="pl-10 pr-10 w-full"
      />
    </div>
  );
};

export default SearchBar;
