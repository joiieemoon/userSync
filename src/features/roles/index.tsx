import PageBreadcrumb from "../../layout/index.tsx";

import PageMeta from "../../layout/index.tsx";

import RoleTable from "../../layout/index.tsx";

export default function RoleTables() {
  return (
    <>
      <PageMeta
        title="Role Tables"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Roles" />
      <div className="space-y-6">
        <RoleTable />
      </div>
    </>
  );
}
