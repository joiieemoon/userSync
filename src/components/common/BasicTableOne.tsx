import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";
import { DeleteIcon, EditIcon } from "../../assets/icons";

import Pagination from "./pagination";
import {
  useDeleteUser,
  useListUsers,
} from "../../features/user/hooks/uselistusers-api";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { DeleteModal } from "./delete-modal";

const tableHeaders = [
  "User Details",

  "Email",
  "Role",
  "Status",
  "Created At",
  "Updated At",
  "Action",
];
export default function BasicTableOne() {
  const [page, setPage] = useState(1);
  const [currentid, setcurrentid] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useListUsers({
    page,
    limit: 5,
  });
  console.log(data);

  const { mutate: deleteuser, isPending } = useDeleteUser();
  return (
    <>
      {isLoading ? (
        <>
          <Skeleton height={20} width={200} />
          <Skeleton count={5} />
        </>
      ) : (
        ""
      )}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}

            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                {tableHeaders.map((header, index) => (
                  <TableCell
                    key={index}
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            {/* Table Body */}

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data?.users?.map((user: any) => (
                <TableRow key={user.id}>
                  {/* User Details */}
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {user.firstName} {user.lastName}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {user.username}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Email */}
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {user.email}
                  </TableCell>

                  {/* Role */}
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex -space-x-2">{user.roleTitle}</div>
                  </TableCell>

                  {/* Status */}
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={user.isActive ? "success" : "error"}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>

                  {/* Created At */}
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {new Date(user.createdAt).toLocaleString()}
                  </TableCell>

                  {/* Updated At */}
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {new Date(user.createdAt).toLocaleString()}
                  </TableCell>

                  {/* Action */}
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <div className="flex justify-evenly">
                      <EditIcon className="text-xl cursor-pointer text-blue-600" />
                      <button
                        type="button"
                        onClick={() => {
                          setIsOpen(true);
                          setcurrentid(user.id);
                          console.log("thsi is delete");
                        }}
                      >
                        <DeleteIcon className="text-xl cursor-pointer text-red-600" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Pagination
        page={data?.pagination?.page}
        totalPages={data?.pagination?.totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />

      <DeleteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        loading={isPending}
        onConfirm={() => {
          if (!currentid) return;

          deleteuser(currentid, {
            onSuccess: () => {
              setIsOpen(false);
              setcurrentid(undefined);
            },
          });
        }}
      />
    </>
  );
}
