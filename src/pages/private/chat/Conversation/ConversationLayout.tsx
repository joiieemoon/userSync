import React from "react";
import { Avatar } from "flowbite-react";
import useUsers from "../../../../hooks/useUser/useUsers";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store/store";
const ConversationLayout = () => {
  const { users, loading } = useUsers();
  const user = useSelector((state: RootState) => state.auth.user);
  // const currentUser = users.find((u) => u.uid === currentUid);
  return (
    <>
      {" "}
      <div className="p-6 mt-1 rounded-2xl shadow-2xl border overflow-hidden">
        <header>
          <div className="flex">
            <Avatar alt="User" img={user?.profilePhoto} rounded />
            <h2 className="ml-3 font-semibold text-xl flex text-center justify-center items-center">
              {user.firstName}
              {user.lastName}
            </h2>
          </div>
        </header>

        <main>
          <div>main</div>
        </main>

        <footer className="border w-full bg-red-600">
          <div className="p-6 fixed bottom-9 border rounded-2xl shadow-2xl w-auto bg-amber-200 ">
            <div className="flex">
             
              <h2 className="ml-3 font-semibold text-xl flex text-center justify-center items-center">
                {user.firstName}
                {user.lastName}
              </h2>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ConversationLayout;
