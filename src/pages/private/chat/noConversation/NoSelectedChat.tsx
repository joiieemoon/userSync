import React from "react";
import nochat from "../../../../../public/nochat.png";
const NoConversation = () => {
  return (
    <>
      <div className="p-6 mt-10 rounded-2xl shadow-2xl bg-white relative ">
        <div className="flex w-full justify-center items-center">
          <img src={nochat} alt="no convo" />
        </div>
        <h3 className="text-2xl mt-2 font-semibold mb-2 text-center">
          No conversation selected
        </h3>
        <p className="text-xl mt-2  mb-2 text-center">
          Use the toggle to switch between single and split pane modes
        </p>
      </div>
    </>
  );
};

export default NoConversation;
