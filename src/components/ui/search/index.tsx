import React from "react";


import { SearchBarProps } from "../../common/types";
import { SearchIcon } from "../../../assets/icons";

const SearchBar: React.FC<SearchBarProps> = ({
  value = "",
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
  placeholder = "Search...",
  className = "",
  disabled = false,
}) => {
  return (
    <div className={`relative  ${className}`}>
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none">
        <SearchIcon />
      </span>

      <input
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        className="
      h-11 w-full rounded-lg border appearance-none
      pl-10 pr-4 py-2.5 text-sm
      shadow-theme-xs
      placeholder:text-gray-400
      focus:outline-none 
      dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30
    "
      />
    </div>
  );
};

export default SearchBar;
