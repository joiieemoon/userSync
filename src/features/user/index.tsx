import PageBreadcrumb from "../../layout/index.tsx";

import UserTabel from "./components/user-tabel";

export default function UserTables() {
  return (
    <>
      <PageBreadcrumb pageTitle="Users" />
      <div className="space-y-6">
        <UserTabel />
      </div>
    </>
  );
}
