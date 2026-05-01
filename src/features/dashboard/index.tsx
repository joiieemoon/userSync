import MonthlySalesChart from "./components/monthly-sales-chart";
// import MonthlyTarget from "./components/monthly-target";

import PageMeta from "../../components/common/page-meta/index.tsx";
import { useAuth } from "../auth/hooks/useAuth";
import UserStates from "./components/dash-user";
import { useDispatch, useSelector } from "react-redux";

import { useGetRoleById } from "../roles/hooks/index.tsx";
import { setPermissions } from "../../redux/slice/index.tsx";
import { useEffect } from "react";
export default function Home() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { data } = useGetRoleById(user?.roleId || 0);

  useEffect(() => {
    if (data) {
      console.log("DISPATCHING DATA →", data);
      dispatch(setPermissions(data));
    }
  }, [data, dispatch]);
  return (
    <>
      <PageMeta
        title="Dashboard"
        description="This is userDesk  Dashboard "
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          {/* <EcommerceMetrics /> */}
          <h1 className="text-4xl dark:text-white">
            welcome Back {user?.firstName} {user?.lastName}
          </h1>

          <UserStates />
    
        </div>

      
      </div>
      <div className="m-3 mt-4">
        <MonthlySalesChart />
      </div>
    </>
  );
}
