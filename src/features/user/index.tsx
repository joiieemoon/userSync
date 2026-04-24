import PageBreadcrumb from "../../components/common/PageBreadCrumb.tsx";

import PageMeta from "../../components/common/PageMeta.tsx";
import UserTabel from "./components/user-tabel";

export default function UserTables() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Users" />
      <div className="space-y-6">
        <UserTabel />
      </div>
    </>
  );
}
