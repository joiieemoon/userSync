import React, { useEffect, useState } from "react";
import { db } from "../../components/firebase/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  query,
  getDocs,where,
} from "firebase/firestore";
import { useFormik } from "formik";
import { Button, Label, Sidebar, TextInput } from "flowbite-react";
import ToggleSwitch from "../../components/button/toggleSwitch/ToggleSwitch";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../pages/private/navbar/Navbar";

type Role = {
  id?: string;
  roleName: string;
  permissions: {
    [module: string]: {
      canView: boolean;
      canAdd: boolean;
      canEdit: boolean;
      canDelete: boolean;
    };
  };
};

const modulesList = ["user", "role", "chat", "campaign"];
const permissionKeys = ["canView", "canAdd", "canEdit", "canDelete"];

const EditRole: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch role if editing
  useEffect(() => {
    const fetchRole = async () => {
      if (id) {
        const roleRef = doc(db, "roles", id);
        const snap = await getDoc(roleRef);
        if (snap.exists()) {
          setRole({ id: snap.id, ...snap.data() } as Role);
        }
      }
      setLoading(false);
    };

    fetchRole();
  }, [id]);

  // Initialize permissions
  const initialPermissions: Role["permissions"] = {};
  modulesList.forEach((mod) => {
    initialPermissions[mod] = role?.permissions?.[mod] || {
      canView: false,
      canAdd: false,
      canEdit: false,
      canDelete: false,
    };
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      roleName: role?.roleName || "",
      permissions: initialPermissions,
    },
    onSubmit: async (values) => {
      try {
        if (id) {
          // Edit existing role
          const roleRef = doc(db, "roles", id);
          const oldRoleSnap = await getDoc(roleRef);
          const oldRoleName = oldRoleSnap?.data()?.roleName;

          // Update role document
          await updateDoc(roleRef, {
            roleName: values.roleName,
            permissions: values.permissions,
          });

          // Update all users with the old role
          if (oldRoleName) {
            const usersQuery = query(
              collection(db, "Users"),
              where("role", "==", oldRoleName),
            );
            const usersSnap = await getDocs(usersQuery);

            const updatePromises = usersSnap.docs.map((userDoc) =>
              updateDoc(doc(db, "Users", userDoc.id), {
                role: values.roleName,
              }),
            );
            await Promise.all(updatePromises);
          }
          // await Promise.all(updatePromises);

          toast.success("Role updated successfully!");
        } else {
          // Add new role
          await addDoc(collection(db, "roles"), {
            roleName: values.roleName,
            permissions: values.permissions,
            createdAt: new Date(),
          });
          toast.success("Role added successfully!");
        }
        navigate("/role");
      } catch (error) {
        console.error("Error saving role:", error);
        toast.error("Error saving role!");
      }
    },
  });

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="w-full  rounded-xl mt-20 flex shadow-xl justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full  ">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">
            {id ? "Edit Role" : "Add Role"}
          </h2>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4 ">
            <Label htmlFor="roleName" className="mb-1 text-md dark:text-black">
              Role Name
            </Label>
            <TextInput
              id="roleName"
              name="roleName"
              value={formik.values.roleName}
              onChange={formik.handleChange}
              disabled={role?.roleName === "admin"} // Disable if role is Admin
              placeholder="Enter role name"
              className="text-3xl font-bold"
              required
            />
          </div>

          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border-gray-300">
              <thead>
                <tr className="bg-amber-300">
                  <th className="p-2 text-left">Module</th>
                  {permissionKeys.map((perm) => (
                    <th key={perm} className="p-2 text-center">
                      {perm.replace("can", "")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {modulesList.map((mod) => (
                  <tr key={mod}>
                    <td className="p-2 bg-gray-200 font-medium capitalize">
                      {mod}
                    </td>
                    {permissionKeys.map((perm) => (
                      <td key={perm} className="p-4 border-b text-center ">
                        <div className="flex justify-center items-center">
                          <ToggleSwitch
                            checked={formik.values.permissions[mod][perm]}
                            onChange={() => {
                              const currentPermissions =
                                formik.values.permissions[mod];

                              // CASE 1: If toggling canView
                              if (perm === "canView") {
                                const hasOtherPermissions =
                                  currentPermissions.canAdd ||
                                  currentPermissions.canEdit ||
                                  currentPermissions.canDelete;

                                // Allow toggle only if no other permission is ON
                                if (!hasOtherPermissions) {
                                  formik.setFieldValue(
                                    `permissions.${mod}.canView`,
                                    !currentPermissions.canView,
                                  );
                                }

                                return;
                              }

                              //  CASE 2: If toggling Add / Edit / Delete
                              const newValue = !currentPermissions[perm];

                              // Update that permission
                              formik.setFieldValue(
                                `permissions.${mod}.${perm}`,
                                newValue,
                              );

                              // If turning ON  force canView = true
                              if (newValue) {
                                formik.setFieldValue(
                                  `permissions.${mod}.canView`,
                                  true,
                                );
                              }
                            }}
                          />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <Button
              className="border-none"
              color="gray"
              type="button"
              onClick={() => navigate("/role")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-amber-300 text-black border-none outline-none focus:ring-0 cursor-pointer"
            >
              {id ? "Save Changes" : "Add Role"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRole;
