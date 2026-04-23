import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import Badge from "../../../../components/ui/badge/Badge";

import { DeleteIcon, EditIcon } from "../../../../assets/icons";
import { toast } from "react-toastify";
import Pagination from "../../../../components/common/pagination";
// import {
//   useDeleteUser,
//   useListUsers,
// } from "../../../user/hooks/uselistusers-api";

import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { DeleteModal } from "../../../../components/common/delete-modal";
import Button from "../../../../components/ui/button/Button";

// import AddEditUserModal from "../../../user/components/add-edit-modal";
import { usedeleteRoles, useListRoles } from "../../hooks";
import AddEditRoleModal from "../add-edit-role";
const tableHeaders = [
  "id",
  "Role Name",
  "Status",
  "Created At",
  "Updated At",
  "Action",
];

export default function RoleTable() {
  const [page, setPage] = useState(1);

  const [currentid, setcurrentid] = useState<number | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [iseditOpen, setiseditOpen] = useState(false);
  const { data, isLoading } = useListRoles({
    page,
    limit: 5,
  });
  console.log("this is ultimate role", data);
  console.log(iseditOpen);

  const { mutate: deleteuser, isPending } = usedeleteRoles();

  return (
    <>
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
              {data?.roles?.map((roles: any) => (
                <TableRow key={roles.id}>
                  {/* User Details */}
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {/* {user.firstName} {user.lastName} */} {roles.title}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          role id:{roles.id}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="px-4 py-3   text-start text-theme-sm dark:text-gray-400">
                    <div className="flex -space-x-2  text-gray-800  ">
                      {roles.title}{" "}
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge size="sm" color={roles.status ? "success" : "error"}>
                      {roles.status ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>

                  {/* Created At */}
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {new Date(roles.createdAt).toLocaleString()}
                  </TableCell>

                  {/* Updated At */}
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {new Date(roles.createdAt).toLocaleString()}
                  </TableCell>

                  {/* Action */}
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <div className="flex justify-evenly">
                      <Button
                        type="button"
                        onClick={() => {
                          setiseditOpen(true);
                          setcurrentid(roles.id);
                        }}
                        className="bg-transparent hover:bg-white shadow:none"
                      >
                        {" "}
                        <EditIcon className="text-xl cursor-pointer text-blue-600" />
                      </Button>

                      <Button
                        type="button"
                        onClick={() => {
                          setIsOpen(true);
                          setcurrentid(roles.id);
                          console.log("thsi is delete");
                        }}
                        className="bg-transparent hover:bg-white shadow:none"
                      >
                        <DeleteIcon className="text-xl cursor-pointer text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {isLoading ? (
            <>
              <Skeleton height={20} width={200} />
              <Skeleton count={5} />
            </>
          ) : (
            ""
          )}
        </div>
      </div>

      <Pagination
        page={data?.pagination?.page}
        totalPages={data?.pagination?.totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
      {/* <AddEditUserModal
        isOpen={iseditOpen}
        onClose={() => setiseditOpen(false)}
        id={currentid}
      /> */}
 
      <AddEditRoleModal
        isOpen={iseditOpen}
        onClose={() => setiseditOpen(false)}
        id={currentid}
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
            onError: (error: any) => {
              const message = error?.response?.data?.message || "Delete failed";

              toast.error(message);
            },
          });
        }}
      />
    </>
  );
}
