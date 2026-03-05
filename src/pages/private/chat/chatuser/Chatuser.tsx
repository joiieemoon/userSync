import React from "react";
import useUsers from "../../../../hooks/useUser/useUsers";

const Chatuser = () => {
  const { users, loading } = useUsers();

  return (
    <>
      <div className="flex-1 overflow-auto p-4 space-y-2 bg-white">
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
