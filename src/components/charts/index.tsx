import ReactApexChart from "react-apexcharts";

import useUsers from "../../hooks/use-user";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slice/ui-slice";
import { roleService } from "../../services/rest-api-services/role-services/index.ts";

import StockChartComponent from "./highchars.tsx";
import { chartsConfig } from "./chart-config/index.tsx";
const ApexChart = () => {
  const { users } = useUsers();
  const dispatch = useDispatch();
  const [fetch, setfetch] = useState(false);
  const [roles, setRoles] = useState<any[]>([]);
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setfetch(false);
        dispatch(setLoading(true));
        const roleList = await roleService.getAll();

        setRoles(roleList);
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoading(false));
        setfetch(true);
      }
    };

    fetchRoles();
  }, []);

  const counts = new Array(12).fill(0);
  if (users) {
    users.forEach((user) => {
      const monthIndex = new Date(user.createdAt).getMonth();
      counts[monthIndex]++;
    });
  }

  const charts = chartsConfig(users, roles);

  return (
    <>
      {charts.map((chart, index) => (
        <div key={index} className="bg-white p-3 mb-6">
          <h1 className="text-3xl mb-6">{chart.title}</h1>

          <ReactApexChart
            options={chart.options}
            series={chart.series}
            type={chart.type}
            height={450}
            width={750}
          />

          <h2 className="flex justify-center text-2xl">{chart.type} Chart</h2>
        </div>
      ))}
      {/* <HighchartDemo />
       */}
      <StockChartComponent />
    </>
  );
};

export default ApexChart;
