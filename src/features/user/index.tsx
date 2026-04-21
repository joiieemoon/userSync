import PageBreadcrumb from "../../components/common/PageBreadCrumb.tsx";
import ComponentCard from "../../components/common/ComponentCard.tsx";
import PageMeta from "../../components/common/PageMeta.tsx";
import BasicTableOne from "../../components/common/BasicTableOne.tsx";

export default function UserTables() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="User table" />
      <div className="space-y-6">
        <ComponentCard title="User ">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}
