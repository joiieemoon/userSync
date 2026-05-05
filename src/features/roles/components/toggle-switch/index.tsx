import type { PermissionKey, ModuleKey, Propstoggleswitch } from "../../types";
import { permissionKeys } from "../../../../constant/config";
export default function ToggleSwitch({ value, onChange }: Propstoggleswitch) {
  const permissions = value || {};
  const modules: { name: string; key: ModuleKey }[] = [
    { name: "User", key: "users" },
    { name: "Role", key: "role" },
  ];

  
  // const permissionKeys: PermissionKey[] = [
  //   "list",
  //   "view",
  //   "add",
  //   "edit",
  //   "delete",
  // ];
  const updatePermissions = (module: string, key: PermissionKey) => {
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
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">
              Module
            </th>
            {permissionKeys.map((key) => (
              <th
                key={key}
                className="px-4 py-3 text-center font-semibold capitalize text-gray-600 dark:text-gray-300"
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {modules.map((module) => (
            <tr
              key={module.key}
              className="border-t border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition"
            >
              <td className="px-4 py-3 font-medium text-gray-800 dark:text-white">
                {module.name}
              </td>

              {permissionKeys.map((key) => {
                const isChecked = !!permissions?.[module.key]?.[key];

                return (
                  <td key={key} className="text-center px-4 py-3">
                    <button
                      type="button"
                      onClick={() => updatePermissions(module.key, key)}
                      className={`w-5 h-5 flex items-center justify-center rounded-md border transition
                        ${
                          isChecked
                            ? "bg-brand-500 border-brand-500 text-white"
                            : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                        }
                      `}
                    >
                      {isChecked && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      )}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
