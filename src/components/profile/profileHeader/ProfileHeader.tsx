import EditBtn from "../../button/editbutton/Editbtn";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store/store";

interface Props {
  onEdit?: () => void;
}

export default function ProfileHeader({ onEdit }: Props) {
  // Get user from Redux
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) return null; // optional: render nothing if user not loaded

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <>
      <h1 className="mt-20 ml-7 text-3xl font-semibold text-gray-900 dark:text-white">
        My Profile:
      </h1>

      <div
        className="p-6 rounded-2xl shadow-lg flex flex-col sm:flex-row items-center sm:justify-between gap-6
        bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700
        transition-colors duration-300"
      >
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <img
            src={user.profilePhoto || "https://i.pravatar.cc/150?img=12"}
            alt={fullName}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
          />

          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {fullName}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {user.email}
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
              Role: {user.role || "User"}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <EditBtn onClick={onEdit} />
      </div>
    </>
  );
}
