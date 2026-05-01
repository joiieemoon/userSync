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

  const searchText = debouncedSearch.toLowerCase();

  const isSearching = debouncedSearch.trim().length > 0;

  const params: any = {
    page: isSearching ? 1 : page,
    limit,
  };

  if (isSearching) {
    params.search = debouncedSearch;
  }

  const { data, isLoading } = useListUsers(params);
  const { permissions } = useSelector((state) => state.permissions);

  const access = getAccess(permissions || []);

  const users = data?.users || [];
  // const totaluser=data?.

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
