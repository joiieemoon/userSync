import EditBtn from "../../button/editbutton/Editbtn";

interface Props {
  user: {
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    role?: string;
    bio?: string;
  };
  onEdit: () => void;
}

export default function PersonalDetails({ user, onEdit }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 dark:bg-gray-900 dark:text-white">
     {/* <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-6 dark:bg-gray-800/60 dark:border-gray-700"> */}

      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Personal Information
        </h3>
        <EditBtn onClick={onEdit} />
      </div>

      {/* Grid */}

      {/* <div className="grid grid-cols-2 gap-y-5 gap-x-10 text-sm">
       */}
       <div className="bg-gray-50 border border-gray-200 rounded-2xl shadow-md p-6 dark:bg-gray-800 dark:border-gray-700">

        <Field label="First Name" value={user.firstName} />
        <Field label="Last Name" value={user.lastName} />
        <Field label="Email" value={user.email} />
        <Field label="Phone" value={user.phone || "-"} />
        <Field label="Role" value={user.role || "-"} />
        <Field label="Bio" value={user.bio || "-"} full />
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  full,
}: {
  label: string;
  value: string;
  full?: boolean;
}) {
  return (
    <div className={full ? "col-span-2" : ""}>
      <p className="text-gray-400 dark:text-gray-400 mb-1">{label}</p>
      <p className="text-gray-900 dark:text-white font-medium">{value}</p>
    </div>
  );
}
