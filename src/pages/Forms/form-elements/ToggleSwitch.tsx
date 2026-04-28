type Props = {
  value: Record<string, any>;
  onChange: (val: any) => void;
};

export default function ToggleSwitch({ value, onChange }: Props) {
  const modules = [
    { name: "User", key: "users" },
    { name: "Role", key: "role" },
  ];

  const permissionKeys = ["list", "view", "add", "edit", "delete"];

  const permissions = value || {};

  const updatePermissions = (module: string, key: string) => {
    const current = permissions?.[module] || {};

    const updated = {
      ...current,
      [key]: !current[key],
    };

    if (key === "list" && !updated.list) {
      updated.view = false;
      updated.add = false;
      updated.edit = false;
      updated.delete = false;
    }

    if (key === "view") {
      if (updated.view) {
        updated.list = true;
      } else {
        updated.add = false;
        updated.edit = false;
        updated.delete = false;
      }
    }

    if (["add", "edit", "delete"].includes(key)) {
      if (updated[key]) {
        updated.view = true;
        updated.list = true;
      }
    }

    onChange({
      ...permissions,
      [module]: updated,
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Module</th>
            {permissionKeys.map((key) => (
              <th key={key} className="p-2 text-center capitalize">
                {key}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {modules.map((module) => (
            <tr key={module.key} className="border-t">
              <td className="p-2 font-medium">{module.name}</td>

              {permissionKeys.map((key) => (
                <td key={key} className="text-center p-2">
                  <input
                    type="checkbox"
                    checked={!!permissions?.[module.key]?.[key]}
                    onChange={() => updatePermissions(module.key, key)}
                    className="w-4 h-4 cursor-pointer"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
