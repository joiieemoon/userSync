import React from "react";
import { IoMdSearch } from "react-icons/io";
interface SearchBarProps {
  value: string;
  onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const SearchBar = ({ value, onchange }: SearchBarProps) => {
  return (
    <div className="flex justify-center items-center cursor-pointer  ">
      <div className="flex items-center  max-w-md bg-white/70 backdrop-blur-md shadow-lg rounded-full px-4 py-2 border border-gray-200 focus-within:ring-2 focus-within:ring-amber-400 transition-all duration-300">
        <IoMdSearch className="text-gray-800 text-4xl mr-2 " />

        <input
          type="text"
          placeholder="Search..."
          value={value}
          onChange={onchange}
          className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 border-none"
        />

        <button className="ml-2 bg-amber-400 hover:bg-amber-500 text-white px-4 py-1.5 rounded-full transition-all duration-300 shadow-md cursor-progress">
          Go
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
