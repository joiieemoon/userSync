import { useDashboardData } from "../../hooks/usedashboard";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

export default function RoleWiseUserChart() {
  const { data } = useDashboardData();

  console.log(data, "rect data");
  const recentUser = data?.status;

  const tableHeaders = ["User Details", "Email", "Role", "Joined At"];
  const users = data?.recentUsers || [];

  return (
    <>

      <h1 className="mb-2 font-medium">Recent User</h1>
      <div className="max-h-[400px] rounded-xl border border-gray-200  dark:border-white/[0.05]   overflow-y-auto">
        <Table>
          {/* Table Header */}

          <TableHeader className="sticky top-0 z-20  bg-white dark:bg-white/[0.03] border-b border-gray-100 dark:border-gray-600">
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableCell
                  key={index}
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 "
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 bg-white  dark:bg-white/[0.03]  max-h-[400px] overflow-y-auto dark:border-gray-600">
            {users?.map((user: User) => (
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
                  {user.roleTitle}
                </TableCell>

                {/* Joined Date */}
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {new Date(user.joinedAt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
