import { useDebounce } from "../../../../hooks/usedebounce";
import { useListUsers } from "../uselistusers-api";

// import { getAccess } from "../../../../lib/helper/flate-permission";

import type { User } from "../../../../components/common/types";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
export const useUserTable = ({
  search,
  page,
  limit,
}: {
  search: string;
  page: number;
  limit: number;
}) => {
  const debouncedSearch = useDebounce(search, 700);


  const searchValue = String(debouncedSearch ?? "");

  const searchText = searchValue.toLowerCase();

  const isSearching = searchValue.trim().length > 0;
  const params = {
    page: isSearching ? 1 : page,
    limit,
    search,
  };

  if (isSearching) {
    params.search = debouncedSearch;
  }

  const { data, isLoading } = useListUsers(params);
  const { permissions } = useSelector((state: RootState) => state.permissions);

  const access = permissions || {};
  // const access = permissions;
  const users = data?.users || [];
  // const totaluser=data?.

  const filteredUsers = users.filter((u: User) => {
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
