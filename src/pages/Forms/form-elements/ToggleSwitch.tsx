import ComponentCard from "../../../components/common/ComponentCard";
import Switch from "../../../components/form/switch/Switch";
import { useState } from "react";
export default function ToggleSwitch() {
  const handleSwitchChange = (checked: boolean) => {
    console.log("Switch is now:", checked ? "ON" : "OFF");
  };
  const modules = [
    {
      name: "User",
      key: "user",
    },
    {
      name: "Role",
      key: "role",
    },
  ];
  const permissionKeys = ["list", "view", "add", "edit", "delete"];

  const [permissions, setPermissions] = useState<Record<string, any>>({});
  const handleCheckbox = (module: string, key: string) => {
    setPermissions((prev) => ({
      ...prev,
      [module]: {
        ...prev[module],
        [key]: !prev?.[module]?.[key],
      },
    }));
  };
  return (
    <ComponentCard title="Permissions">
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200">
          {/* HEADER */}
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Module</th>
              <th className="p-2 text-center">List</th>
              <th className="p-2 text-center">View</th>
              <th className="p-2 text-center">Add</th>
              <th className="p-2 text-center">Edit</th>
              <th className="p-2 text-center">Delete</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {["user", "role"].map((module) => (
              <tr key={module} className="border-t">
                {/* MODULE NAME */}
                <td className="p-2 font-medium capitalize">{module}</td>

                {["list", "view", "add", "edit", "delete"].map((key) => (
                  <td key={key} className="text-center p-2">
                    <input
                      type="checkbox"
                      checked={permissions?.[module]?.[key] || false}
                      onChange={() => handleCheckbox(module, key)}
                      className="w-4 h-4 cursor-pointer"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ComponentCard>
    // <ComponentCard title="Permission">
    //   <div className="flex gap-4">
    //     <h1>User</h1>
    //     <Switch
    //       label="list"
    //       defaultChecked={true}
    //       onChange={handleSwitchChange}
    //     />
    //     <Switch
    //       label="view"
    //       defaultChecked={true}
    //       onChange={handleSwitchChange}
    //     />
    //     <Switch
    //       label="add"
    //       defaultChecked={true}
    //       onChange={handleSwitchChange}
    //     />
    //     <Switch
    //       label="edit"
    //       defaultChecked={true}
    //       onChange={handleSwitchChange}
    //     />
    //     <Switch
    //       label="delete"
    //       defaultChecked={true}
    //       onChange={handleSwitchChange}
    //     />
    //   </div>{" "}
    //   <div className="flex gap-4">
    //     <h1>Role</h1>
    //     <Switch
    //       label="list"
    //       defaultChecked={true}
    //       onChange={handleSwitchChange}
    //     />
    //     <Switch
    //       label="view"
    //       defaultChecked={true}
    //       onChange={handleSwitchChange}
    //     />
    //     <Switch
    //       label="add"
    //       defaultChecked={true}
    //       onChange={handleSwitchChange}
    //     />
    //     <Switch
    //       label="edit"
    //       defaultChecked={true}
    //       onChange={handleSwitchChange}
    //     />
    //     <Switch
    //       label="delete"
    //       defaultChecked={true}
    //       onChange={handleSwitchChange}
    //     />
    //   </div>{" "}
    // </ComponentCard>
  );
}
