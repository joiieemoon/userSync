import { useEffect, useState } from "react";

type Props = {
  value: Record<string, any>;
  onChange: (val: any) => void;
};

export default function ToggleSwitch({ value, onChange }: Props) {
  const modules = [
    { name: "User", key: "user" },
    { name: "Role", key: "role" },
  ];

  const permissionKeys = ["list", "view", "add", "edit", "delete"];

  const [permissions, setPermissions] = useState<Record<string, any>>(
    value || {},
  );

  useEffect(() => {
    setPermissions(value || {});
  }, [value]);

  const updatePermissions = (module: string, key: string) => {
    setPermissions((prev) => {
      const current = prev[module] || {};

      const updated = {
        ...current,
        [key]: !current[key],
      };

      // RULES
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

      const newState = {
        ...prev,
        [module]: updated,
      };

      onChange(newState);
      return newState;
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
                    checked={permissions?.[module.key]?.[key] || false}
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

// import ComponentCard from "../../../components/common/ComponentCard";
// import Switch from "../../../components/form/switch/Switch";
// import { useState } from "react";
// export default function ToggleSwitch() {
//   const modules = [
//     {
//       name: "User",
//       key: "user",
//     },
//     {
//       name: "Role",
//       key: "role",
//     },
//   ];
//   const permissionKeys = ["list", "view", "add", "edit", "delete"];

//   const [permissions, setPermissions] = useState<Record<string, any>>({});
//   const handleCheckbox = (module: string, key: string) => {
//     setPermissions((prev) => {
//       const current = prev[module] || {};
//       const updated = {
//         ...current,
//         [key]: !current[key],
//       };

//       // RULES
//       if (key === "list") {
//         if (!updated.list) {

//           updated.view = false;
//           updated.add = false;
//           updated.edit = false;
//           updated.delete = false;
//         }
//       }

//       if (key === "view") {
//         if (updated.view) {
//           updated.list = true;
//         } else {

//           updated.add = false;
//           updated.edit = false;
//           updated.delete = false;
//         }
//       }

//       if (["add", "edit", "delete"].includes(key)) {
//         if (updated[key]) {
//           updated.view = true;
//           updated.list = true;
//         }
//       }

//       return {
//         ...prev,
//         [module]: updated,
//       };
//     });
//   };
//   return (
//     <ComponentCard title="Permissions">
//       <div className="overflow-x-auto">
//         <table className="w-full border border-gray-200">
//           {/* HEADER */}
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-2 text-left">Module</th>
//               <th className="p-2 text-center">List</th>
//               <th className="p-2 text-center">View</th>
//               <th className="p-2 text-center">Add</th>
//               <th className="p-2 text-center">Edit</th>
//               <th className="p-2 text-center">Delete</th>
//             </tr>
//           </thead>

//           {/* BODY */}
//           <tbody>
//             {["user", "role"].map((module) => (
//               <tr key={module} className="border-t">
//                 {/* MODULE NAME */}
//                 <td className="p-2 font-medium capitalize">{module}</td>

//                 {["list", "view", "add", "edit", "delete"].map((key) => (
//                   <td key={key} className="text-center p-2">
//                     <input
//                       type="checkbox"
//                       checked={permissions?.[module]?.[key] || false}
//                       onChange={() => handleCheckbox(module, key)}
//                       className="w-4 h-4 cursor-pointer"
//                     />
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </ComponentCard>
//   );
// }
