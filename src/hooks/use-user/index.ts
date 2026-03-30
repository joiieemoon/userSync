import { useQuery } from "@tanstack/react-query";

import { usersService } from "../../services/rest-api-services/user-services";

import { roleService } from "../../services/rest-api-services/role-services";

const fetchUsersAndRoles = async () => {

  const rolesData = await roleService.getAll();
  const rolesMap: Record<string, any> = {};
  rolesData.forEach((role: any) => {
    rolesMap[role.roleName?.toLowerCase()] = {
      roleName: role.roleName,
      permissions: role.permissions || {},
    };
  });


  const rawUsers = await usersService.getUsers();

  const users = rawUsers.map((data: any) => {
    const roleKey = data.role?.toLowerCase();
    const roleInfo = rolesMap[roleKey] || { roleName: "No Role", permissions: {} };

    return {
      uid: data.id,
      firstName: data.firstName || data.name?.split(" ")[0] || "",
      lastName: data.lastName || data.name?.split(" ")[1] || "",
      email: data.email || "",
      phone: data.phone || "",
      role: data.role || "",
      createdAt: data.createdAt || "-",
      roleName: roleInfo.roleName,
      permissions: roleInfo.permissions,
      profilePhoto: data.profilePhoto || "",
    };
  });

  return users;
};

const useUsers = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsersAndRoles,
    staleTime: 5 * 60 * 1000,
  });

  return { users: data || [], loading: isLoading, error: isError };
};

export default useUsers;
