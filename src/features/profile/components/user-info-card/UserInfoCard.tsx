import { useAuth } from "../../../auth/hooks/useAuth";

export default function UserInfoCard() {
  const { user } = useAuth();
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
      label: "Role",
      value: "Team Manager",
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
