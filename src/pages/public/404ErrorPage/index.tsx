import React from "react";
import { useNavigate } from "react-router-dom";

import EditBtn from "../../../components/common/button/edit-button";

const Errorpage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <section className="bg-white ">
        <div className="py-8 px-4 mx-auto max-w-screen-xl h-screen lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-amber-400 dark:text-amber-500">
              404
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-red-500 md:text-4xl ">
              Something's missing.
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              Sorry, we can't find that page. You'll find lots to explore on the
              home page.
            </p>

            <EditBtn
              label="Back to Homepage"
              onClick={() => navigate("/")}
              className="inline-flex text-black bg-amber-300 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer text-center dark:focus:ring-primary-900 my-4"
            ></EditBtn>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Errorpage;
