import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import EditBtn from "../../../common/button/edit-button";

import FormController from "../../../common/input/form-controller";
import type { Role, Permissions } from "../../../../types/interfaces";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../redux/store/store";
import { setLoading } from "../../../../redux/slice/uiSlice";
const modulesList = ["user", "role", "chat", "campaign"];
import { roleService } from "../../../../services/firebase/role-services";
const permissionKeys: (keyof Permissions)[] = [
  "canView",
  "canAdd",
  "canEdit",
  "canDelete",
];

const EditRole: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.ui.users);
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    const fetchRole = async () => {
      if (id) {
        dispatch(setLoading(true));
        try {
          const fetchedRole = await roleService.getById(id);
          setRole(fetchedRole);
        } catch (error) {
          toast.error("Error fetching role: " + error.message);
        } finally {
          dispatch(setLoading(false));
        }
      }
    };

    fetchRole();
  }, [id, dispatch]);

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
          await roleService.update(id, {
            roleName: values.roleName,
            permissions: values.permissions,
          });

          toast.success("Role updated successfully", {
            position: "top-center",
          });
        } else {
          await roleService.create({
            roleName: values.roleName,
            permissions: values.permissions,
            createdAt: new Date(),
          });

          toast.success("Role added successfully", { position: "top-center" });
        }

        navigate("/role");
      } catch (error) {
        toast.error("Error saving role: " + error.message, {
          position: "top-center",
        });
      }
    },
  });

  if (loading   ) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="w-full rounded-xl mt-20 flex shadow-xl justify-center">
      <div className="bg-white p-6 rounded-xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">
            {id ? "Edit Role" : "Add Role"}
          </h2>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <FormController
              control="input"
              type="text"
              name="roleName"
              label="Role Name"
              placeholder="Enter role name"
              value={formik.values.roleName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={role?.roleName === "admin"}
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
                      <td key={perm} className="p-4 border-b text-center">
                        <FormController
                          control="checkbox"
                          checked={formik.values.permissions[mod][perm]}
                          onChange={() => {
                            const currentPermissions =
                              formik.values.permissions[mod];
                            if (perm === "canView") {
                              const hasOtherPermissions =
                                currentPermissions.canAdd ||
                                currentPermissions.canEdit ||
                                currentPermissions.canDelete;
                              if (!hasOtherPermissions) {
                                formik.setFieldValue(
                                  `permissions.${mod}.canView`,
                                  !currentPermissions.canView,
                                );
                              }
                              return;
                            }

                            const newValue = !currentPermissions[perm];
                            formik.setFieldValue(
                              `permissions.${mod}.${perm}`,
                              newValue,
                            );

                            if (newValue) {
                              formik.setFieldValue(
                                `permissions.${mod}.canView`,
                                true,
                              );
                            }
                          }}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <EditBtn
              label="Cancel"
              variant="secondary"
              onClick={() => navigate("/role")}
            />
            <EditBtn type="submit" label={id ? "Save Changes" : "Add Role"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRole;
