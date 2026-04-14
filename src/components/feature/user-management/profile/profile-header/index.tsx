import Commanbutton from "../../../../common/button";
import { useSelector } from "react-redux";

import type { RootState } from "../../../../../redux/store";
import avtar from "../../../../../../public/avtar.png";
import { MdOutlineEdit } from "react-icons/md";
import type { ProfileHeaderprops } from "../../../../../types/interfaces";
import * as Sentry from "@sentry/react";
export default function ProfileHeader({ onEdit }: ProfileHeaderprops) {
  // Get user from Redux
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) return null;

  const fullName = `${user.firstName} ${user.lastName}`;
  Sentry.setUser({
    id: user.uid,
    user: fullName,
    email: user?.email,
  });
  console.log(fullName);
  return (
    <>
      <h1 className="mt-1 ml-7 text-3xl font-semibold text-gray-900 ">
        My Profile:
      </h1>
      <button
        onClick={() => {
          throw Error("this is error to user ");
        }}
      >
        dont click!!!1
      </button>
      <div
        className="p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center sm:justify-between gap-6
        bg-gradient-to-br from-gray-50 to-gray-100  
        transition-colors duration-300"
      >
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <img
            src={user.profilePhoto || avtar}
            alt={fullName}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 "
          />

          <div>
            <h2 className="text-xl font-semibold text-gray-900 ">{fullName}</h2>
            <p className="text-gray-600  text-sm">{user.email}</p>
            <p className="text-gray-600  text-sm mt-1">
              Role: {user.role || "User"}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <Commanbutton
          onClick={onEdit}
          icon={<MdOutlineEdit className="text-xl" />}
          label="edit"
        />
      </div>
    </>
  );
}
