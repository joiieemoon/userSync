import { useDebounce } from "../../../../hooks/usedebounce";
import { useListUsers } from "../uselistusers-api";

import { formatPermissions } from "../../../../lib/helper/flate-permission";
import { usePermission } from "../../../auth/hooks/uselogin-singup";
import { User } from "../../../auth/types";
export const useUserTable = (user: User, search: string, page: number,limit:number) => {
  const currentUserId = user?.id;
  const currentUserRoleId = user?.roleId;

  const debouncedSearch = useDebounce(search, 700);
  const isSearching = debouncedSearch.length > 0;
  const searchText = debouncedSearch.toLowerCase();

  const { data, isLoading } = useListUsers({
    page: isSearching ? 1 : page,
    limit: isSearching ? 100 : limit,
  });

  const { data: permission } = usePermission(currentUserRoleId);
  const access = formatPermissions(permission?.permissions || []);

  const users = data?.users || [];

  const filteredUsers = users.filter((u) => {
    const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();

    return (
      u.id !== currentUserId &&
      u.roleId !== 1 &&
      (fullName.includes(searchText) ||
        u.username.toLowerCase().includes(searchText) ||
        u.email.toLowerCase().includes(searchText))
    );
  });

  return {
    data,
    isLoading,
    filteredUsers,
    access,
    isSearching,
  };
};
