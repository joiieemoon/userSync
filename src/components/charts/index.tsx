import ReactApexChart from "react-apexcharts";
import React from "react";
import useUsers from "../../hooks/use-user";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slice/ui-slice";
import { roleService } from "../../services/rest-api-services/role-services/index.ts";
const ApexChart = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

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

  const roleNames = roles.map((role) => role.roleName);
  // console.log("role names", roleNames);
  const counts = new Array(12).fill(0);
  if (users) {
    users.forEach((user) => {
      const monthIndex = new Date(user.createdAt).getMonth();
      counts[monthIndex]++;
    });
  }

  const maxCount = Math.max(...counts);
  const peakMonth = months[counts.indexOf(maxCount)];

  const series = [
    {
      name: "Users Created",
      data: counts,
    },
  ];

  const pieSeries = roleNames.map((roleName) => {
    const count = users.filter((user) => user.role === roleName).length;
    console.log(roleName, count);
    return count;
  });

  const GroupSeries = [
    {
      name: "Users Created",
      data: counts,
    },
    {
      name: "Roles Created",
      data: [4, 6, 2, 8, 5, 3, 7, 4, 6, 2, 8, 5],
    },
  ];
  const mixedSeries = [
    {
      name: "Users Created",
      type: "column",
      data: counts,
    },
    {
      name: "Roles Created",
      type: "line",
      data: [4, 6, 2, 8, 5, 3, 7, 4, 6, 2, 8, 5],
    },
    {
      name: "Growth",
      type: "area",
      data: [2, 3, 4, 5, 3, 4, 6, 5, 4, 3, 2, 4],
    },
  ];
  const rangeSeries = [
    {
      name: "Temperature",
      data: [
        { x: "Jan", y: [-2, 4] },
        { x: "Feb", y: [-1, 6] },
        { x: "Mar", y: [3, 10] },
        { x: "Apr", y: [8, 16] },
        { x: "May", y: [13, 22] },
        { x: "Jun", y: [18, 26] },
        { x: "Jul", y: [21, 29] },
        { x: "Aug", y: [21, 28] },
        { x: "Sep", y: [17, 24] },
        { x: "Oct", y: [11, 18] },
        { x: "Nov", y: [6, 12] },
        { x: "Dec", y: [1, 7] },
      ],
    },
  ];
  const boxplotSeries = [
    {
      data: [
        {
          x: "Jan 2015",
          y: [54, 66, 69, 75, 88],
        },
        {
          x: "Jan 2016",
          y: [43, 65, 69, 76, 81],
        },
        {
          x: "Jan 2017",
          y: [31, 39, 45, 51, 59],
        },
        {
          x: "Jan 2018",
          y: [39, 46, 55, 65, 71],
        },
        {
          x: "Jan 2019",
          y: [29, 31, 35, 39, 44],
        },
        {
          x: "Jan 2020",
          y: [41, 49, 58, 61, 67],
        },
        {
          x: "Jan 2021",
          y: [54, 59, 66, 71, 88],
        },
      ],
    },
  ];

  const polarseries = [20, 30, 40, 50, 60, 70, 80];
  const horizontaloptions = {
    chart: {
      height: 350,
      type: "bar",
      zoom: { enabled: false },
      background: "#ffffff",
    },

    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    xaxis: { categories: months },
  };
  const options = {
    chart: {
      height: 350,
      type: "line",
      background: "#ffffff",
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "straight",
      colors: ["#f7cd0f"],
    },
    bar: {
      colors: ["#f7cd0f"],
    },
    zoom: {
      enabled: false,
    },

    title: {
      text: `${users?.length || 0} Users Created in months`,

      align: "left",
    },
    annotations: {
      points: [
        {
          x: peakMonth,
          y: maxCount,
          marker: { size: 6, fillColor: "#f7cd0f", strokeColor: "#fff" },
          label: {
            style: { color: "#fff", background: "#775DD0" },
            text: `Peak: ${peakMonth} (${maxCount})`,
          },
        },
      ],
    },
    xaxis: { categories: months },
    yaxis: { title: { text: "Number of Users" } },
    grid: { row: { colors: ["#FFE591", "transparent"], opacity: 0.5 } },
  };
  const pieoptions = {
    chart: {
      width: 380,
      background: "#ffffff",
    },

    labels: roleNames,

    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };
  const mixedOptions = {
    chart: {
      height: 350,
      type: "line",
      stacked: false,
      background: "#ffffff",
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      width: [0, 3, 2],
      curve: "smooth",
    },
    fill: {
      opacity: [1, 1, 0.3],
    },
    xaxis: {
      categories: months,
    },
    yaxis: [
      {
        title: {
          text: "Users",
        },
      },
      {
        opposite: true,
        title: {
          text: "Roles",
        },
      },
    ],
  };
  const rangeOptions = {
    chart: {
      background: "#ffffff",
    },
    series: [
      {
        name: "New York Temperature",
        data: [
          {
            x: "Jan",
            y: [-2, 4],
          },
          {
            x: "Feb",
            y: [-1, 6],
          },
          {
            x: "Mar",
            y: [3, 10],
          },
          {
            x: "Apr",
            y: [8, 16],
          },
          {
            x: "May",
            y: [13, 22],
          },
          {
            x: "Jun",
            y: [18, 26],
          },
          {
            x: "Jul",
            y: [21, 29],
          },
          {
            x: "Aug",
            y: [21, 28],
          },
          {
            x: "Sep",
            y: [17, 24],
          },
          {
            x: "Oct",
            y: [11, 18],
          },
          {
            x: "Nov",
            y: [6, 12],
          },
          {
            x: "Dec",
            y: [1, 7],
          },
        ],
      },
    ],
  };
  const boxplotOptions = {
    chart: {
      background: "#ffffff",
      zoom: {
        enable: false,
      },
    },
  };
  return (
    <>
      <div>
        {" "}
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={450}
          width={750}
        />
      </div>
      <div>
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          zooming={{ enabled: false }}
          height={450}
          width={750}
        />
      </div>
      <div>
        <ReactApexChart
          options={options}
          series={GroupSeries}
          type="area"
          zooming={{ enabled: false }}
          height={450}
          width={750}
        />
      </div>
      <div>
        <h1 className="text-3xl mb-6">
          User vs Role Creation according to months
        </h1>
        <ReactApexChart
          options={options}
          series={GroupSeries || { color: ["#f7cd0f", "#FF0000"] }}
          type="line"
          height={450}
          width={750}
        />
        <h2 className=" flex justify-center text-2xl">Group line Chart</h2>
      </div>

      <div>
        <ReactApexChart
          options={options}
          series={GroupSeries}
          type="bar"
          zooming={{ enabled: false }}
          height={450}
          width={750}
        />
      </div>

      <div>
        <h1 className="text-3xl"> </h1>
        <ReactApexChart
          options={horizontaloptions}
          series={GroupSeries}
          type="bar"
          zooming={{ enabled: false }}
          height={450}
          width={750}
        />

        <h2 className=" flex justify-center ">
          Total Roles:{roleNames.length}
        </h2>
        <h2 className=" flex justify-center text-2xl">Horizonal Chart</h2>
      </div>
      <div>
        <h1 className="text-3xl">Roles Distribution</h1>
        <ReactApexChart
          options={pieoptions}
          series={pieSeries}
          type="pie"
          zooming={{ enabled: false }}
          height={450}
          width={750}
        />
        <h2 className=" flex justify-center ">
          Total Roles:{roleNames.length}
        </h2>
        <h2 className=" flex justify-center text-2xl">Pie Chart</h2>
      </div>
      <div>
        <h1 className="text-3xl">Roles Distribution</h1>
        <ReactApexChart
          options={pieoptions}
          series={pieSeries}
          type="donut"
          zooming={{ enabled: false }}
          height={450}
          width={750}
        />

        <h2 className=" flex justify-center ">
          Total Roles:{roleNames.length}
        </h2>
        <h2 className=" flex justify-center text-2xl">Donut Chart</h2>
      </div>
      <div>
        <h1 className="text-3xl">Roles Distribution </h1>
        <ReactApexChart
          options={pieoptions}
          series={polarseries}
          type="polarArea"
          zooming={{ enabled: false }}
          height={450}
          width={750}
        />

        <h2 className=" flex justify-center text-2xl">
          polar area chart(Dummy data){" "}
        </h2>
      </div>
      <div>
        <h1 className="text-3xl">Roles Distribution </h1>
        <ReactApexChart
          options={pieoptions}
          series={pieSeries}
          type="radialBar"
          labels={roleNames}
          zooming={{ enabled: false }}
          height={450}
          width={750}
        />

        <h2 className=" flex justify-center text-2xl">
          radialbar chart(Dummy data){" "}
        </h2>
      </div>
      <div>
        <h1 className="text-3xl">Roles Distribution </h1>
        <ReactApexChart
          options={options}
          series={series}
          type="radar"
          zooming={{ enabled: false }}
          height={450}
          width={750}
        />

        <h2 className=" flex justify-center text-2xl">
          Radar chart(Dummy data){" "}
        </h2>
      </div>

      <div>
        <h1 className="text-3xl">Mixed Data </h1>
        <ReactApexChart
          options={mixedOptions}
          series={mixedSeries}
          labels={roleNames}
          zooming={{ enabled: false }}
          height={450}
          width={750}
        />

        <h2 className=" flex justify-center text-2xl">
          Mixed Data Chart(Dummy data){" "}
        </h2>
      </div>
      <div>
        <h1 className="text-3xl">Range Data </h1>
        <ReactApexChart
          options={rangeOptions}
          series={rangeSeries}
          labels={roleNames}
          type="rangeArea"
          zooming={{ enabled: false }}
          height={450}
          width={750}
        />

        <h2 className=" flex justify-center text-2xl">
          Range Area Chart(Dummy data){" "}
        </h2>
      </div>
      <div>
        <h1 className="text-3xl">Range Data </h1>
        <ReactApexChart
          options={boxplotOptions}
          series={boxplotSeries}
          type="boxPlot"
          zooming={{ enabled: false }}
          height={450}
          width={750}
        />

        <h2 className=" flex justify-center text-2xl">
          Box plot Chart(Dummy data){" "}
        </h2>
      </div>
    </>
  );
};

export default ApexChart;
