import MonthlySalesChart from "./components/monthly-sales-chart";
import MonthlyTarget from "./components/monthly-target";

import PageMeta from "../../components/common/PageMeta";
import { useAuth } from "../auth/hooks/useAuth";

export default function Home() {
  const { user } = useAuth();
  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          {/* <EcommerceMetrics /> */}
          <h1 className="text-4xl dark:text-white">
            welcome Back {user?.firstName} {user?.lastName}
          </h1>
          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>
      </div>
    </>
  );
}
