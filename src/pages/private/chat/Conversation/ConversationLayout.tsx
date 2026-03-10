import React from "react";
import { Avatar, TextInput, Button } from "flowbite-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store/store";
import { IoSend } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { Links, useNavigate } from "react-router-dom";
const ConversationLayout = ({selectedUser,onClose}) => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="flex flex-col  bg-gray-100 h-[calc(100vh-130px)] ">
      {/* Header */}
      <header className="flex items-center p-4  shadow  w-full  ">
        <Avatar alt="User" img={selectedUser?.profilePhoto} rounded />
        <div className="ml-3 flex justify-between w-full">
          <h2 className="font-semibold text-lg">{selectedUser?.firstName} {selectedUser?.lastName}</h2>
          <div onClick={onClose} className="hover:font-amber-200 cursor-pointer relative"><IoMdClose className="text-3xl   hover:text-gray-600 " /></div>
        </div>
      </header>

   
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
      
        <div className="flex justify-start">
          <div className="bg-white p-3 rounded-xl shadow max-w-xs">Hello!</div>
        </div>
        <div className="flex justify-end">
          <div className="bg-amber-200 p-3 rounded-xl shadow max-w-xs">Hi there!</div>
        </div>
      </main>

     
      <footer className="p-4 bg-gray-100 shadow shadow-2xs flex items-center space-x-2">
        <TextInput
          placeholder="Type a message..."
          className="flex-1 "
        />
        <Button className="bg-amber-300 text-black outline-none border-none cursor-pointer"> <IoSend /></Button>
      </footer>
    </div>
  );
};

export default ConversationLayout;