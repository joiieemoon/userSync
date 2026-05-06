import { User } from "../../../auth/types";
import { useGetProfilebyid } from "../../hooks/update-profile";
export type GetUserResponse = {
  user: User;
};
export default function UserInfoCard() {
  const { data } = useGetProfilebyid();

  const user = data?.user ;
  const personalInfo = [
    {
      label: "First Name",
      value: user?.firstName,
    },
    {
      label: "Last Name",
      value: user?.lastName,
    },
    {
      label: "Email address",
      value: user?.email,
    },

    { 
      label: "Phone",
      value: user?.phone ? `+${user.phone}` : "",
    },
    {
      label: "User Name",
      value: user?.username,
    },
    {
      label: "Role Title",
      value: user?.roleTitle,
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32 mx-10">
      {personalInfo.map((item, index) => (
        <div key={index}>
          <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
            {item.label}
          </p>

          <p className="text-base font-medium text-gray-800 dark:text-white/90">
            {item.value || "-"}
          </p>
        </div>
      ))}
    </div>
  );
}
