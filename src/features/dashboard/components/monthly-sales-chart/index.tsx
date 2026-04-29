import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useDashboardData } from "../../hooks/usedashboard";

export default function RoleWiseUserChart() {
  const { data } = useDashboardData();

  const users = data?.recentUsers || [];


  const roleCount: Record<string, number> = {};

  users.forEach((user: any) => {
    const role = user.roleTitle || "Unknown";

    if (!roleCount[role]) {
      roleCount[role] = 0;
    }
    roleCount[role]++;
  });

 
  const categories = Object.keys(roleCount);
  const seriesData = Object.values(roleCount);

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: { show: false },
      fontFamily: "Outfit, sans-serif",
    },
    colors: ["#465fff"],
    plotOptions: {
      bar: {
        columnWidth: "40%",
        borderRadius: 6,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories,
    },
    yaxis: {
      title: {
        text: "Users",
      },
    },
    grid: {
      strokeDashArray: 4,
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} users`,
      },
    },
  };

  const series = [
    {
      name: "Users",
      data: seriesData,
    },
  ];

  return (
    <div className="rounded-2xl border bg-white p-5">
      <h3 className="text-lg font-semibold mb-4">Role Wise Users</h3>

      <Chart options={options} series={series} type="bar" height={320} />
    </div>
  );
}
