import { useAuth } from "../auth/hooks/useAuth";

import { useDispatch } from "react-redux";

import { useGetRoleById } from "../roles/hooks/index.tsx";

import { setPermissions } from "../../redux/slice/index.tsx";
import { useEffect } from "react";
import PageMeta from "../../components/common/page-meta/index.tsx";
import UserStates from "./components/dash-user/index.tsx";

import type {
  PermissionState,
  PermissionFlags,
} from "../../redux/slice/index.tsx";
import type { RolePermission } from "../roles/types/index.tsx";
import RecentUser from "./components/recent-user-tabel/index.tsx";
export default function Home() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { data } = useGetRoleById(user?.roleId || 0);

  useEffect(() => {
    if (data) {
      const permissionData: PermissionState = {
        role: data.role.title || "",
        permissions: data.permissions.reduce(
          (acc: Record<string, PermissionFlags>, perm: RolePermission) => {
acc[perm.moduleSlug] = {
              list: perm.list,
              view: perm.view,
              add: perm.add,
              edit: perm.edit,
              delete: perm.delete,
            };
            return acc;
          },
          {} as Record<string, PermissionFlags>,
        ),
      };
      dispatch(setPermissions(permissionData));
    }
  }, [data, dispatch]);
  return (
    <>
      <PageMeta title="Dashboard" description="This is userDesk  Dashboard " />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          {/* <EcommerceMetrics /> */}
          <h1 className="text-4xl dark:text-white">
            welcome Back {user?.firstName} {user?.lastName}
          </h1>

          <UserStates />
        </div>
      </div>
      <div className="m-3 mt-4">
        <RecentUser />
      </div>
    </>
  );
}
