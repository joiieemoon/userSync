import React from "react";
import useUsers from "../../../../hooks/useUser/useUsers";
import { Spinner } from "flowbite-react/components/Spinner";
const Chatuser = () => {
  const { users, loading } = useUsers();
  if (loading)
    return (
      <div className="p-6 flex justify-center items-center">
        Loading...
        <Spinner color="success" aria-label="Success spinner example" />
      </div>
    );
  return (
    <>
      <div className="flex-1 overflow-auto p-4 space-y-2 bg-amber-300">
        {users.map((user, idx) => (
          <div
            key={user.uid}
            className="cursor-pointer rounded-md p-3 hover:bg-gray-200 flex items-center gap-2 bg-gray-100"
          >
            <img
              src={user.profilePhoto}
              alt=""
              className="h-6 w-6 rounded-full"
            />
            {user.firstName}
          </div>
        ))}
      </div>
    </>
  );
};

export default Chatuser;
