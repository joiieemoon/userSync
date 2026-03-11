import React from "react";
import { Spinner } from "flowbite-react";
const Spinnerring = () => {
  return (
    <div>
      <div className="flex items-center justify-center  h-screen ">
        <Spinner
          color="success"
          aria-label="Success spinner example "
          className="w-15 h-15   "
        />{" "}
 
      </div>
    </div>
  );
};

export default Spinnerring;
