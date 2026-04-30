import { useDebounce } from "../../../../hooks/usedebounce";
import { useListUsers } from "../uselistusers-api";

import { getAccess } from "../../../../lib/helper/flate-permission";

import { User } from "../../../auth/types";
import { useSelector } from "react-redux";
export const useUserTable = (
  user: User,
  search: string,
  page: number,
  limit: number,
) => {
 

  const debouncedSearch = useDebounce(search, 700);
  const isSearching = debouncedSearch.length > 0;
  const searchText = debouncedSearch.toLowerCase();

  const { data, isLoading } = useListUsers({
    page: isSearching ? 1 : page,

    limit: limit,
    // limit: isSearching ? 100 : isSuperAdmin ? limit + 1 : limit,
    search: debouncedSearch,
  });

  const { permissions } = useSelector((state) => state.permissions);

  const access = getAccess(permissions || []);

  const users = data?.users || [];

  const filteredUsers = users.filter((u) => {
    const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();

    return (
      
      fullName.includes(searchText) ||
      u.username.toLowerCase().includes(searchText) ||
      u.email.toLowerCase().includes(searchText)
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
