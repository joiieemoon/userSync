import React from "react";
import { IoMdSearch } from "react-icons/io";

import type { SearchBarProps } from "../../../types/interfaces";
const SearchBar: React.FC<SearchBarProps> = ({
  containerClassName = "",
  className = "",
  ...rest
}) => {
  return (
    <div className={`flex justify-center items-center ${containerClassName}`}>
      <div className="flex items-center max-w-md w-full bg-slate-200 backdrop-blur-md shadow-lg rounded-full px-4 py-2 border border-gray-200 focus-within:ring-2 focus-within:ring-amber-400 transition-all duration-300">
        <IoMdSearch className="text-gray-800 text-2xl mr-2" />

        <input
          className={`w-full bg-transparent outline-none text-gray-700 border-none ${className}`}
          {...rest}
        />
      </div>
    </div>
  );
};

export default React.memo(SearchBar);
