import PageBreadcrumb from "../../components/common/page-bread-crumb/index.tsx";
import ComponentCard from "../../components/common/component-card/index.tsx";
import PageMeta from "../../components/common/page-meta/index.tsx";

import RoleTable from "./components/role-table/index.tsx";

export default function RoleTables() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Roles" />
      <div className="space-y-6">
        <RoleTable />
      </div>
    </>
  );
}
