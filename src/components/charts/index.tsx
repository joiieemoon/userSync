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

  const counts = new Array(12).fill(0);
  if (users) {
    users.forEach((user) => {
      const monthIndex = new Date(user.createdAt).getMonth();
      counts[monthIndex]++;
    });
  }

  const maxCount = Math.max(...counts);
  const peakMonth = months[counts.indexOf(maxCount)];
  const Languages = ["TypeScript", "CSS", "HTML"];
  const LanguagePercentages = [96, 2, 2];
  const LanguageColors = ["#3178C6", "#264de4", "#E34F26"];
  const monthyear = [
    "Jan 2015",
    "Jan 2016",
    "Jan 2017",
    "Jan 2018",
    "jan 2019",
    "Jan 2020",
    "jan 2026",
  ];
  const series = [
    {
      name: "Users Created",
      data: counts,
    },
  ];
  const values = [
    [6629.81, 6650.5, 6623.04, 6633.33],
    [6632.01, 6643.59, 6620, 6630.11],
    [6630.71, 6648.95, 6623.34, 6635.65],
    [6635.65, 6651, 6629.67, 6638.24],
    [6638.24, 6640, 6620, 6624.47],
    [6630.71, 6648.95, 6623.34, 6635.65],
    [6640.71, 6648.95, 6623.34, 665.65],
  ];
  const twovalues = [
    [-2, 4],
    [-1, 6],
    [3, 10],
    [8, 16],
    [13, 22],
    [18, 26],
    [21, 29],
    [21, 28],
    [17, 24],
    [11, 18],
    [6, 12],
    [1, 7],
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
      data: months.map((month, index) => ({
        x: month,
        y: twovalues[index],
      })),
    },
  ];
  const Languageseries = LanguagePercentages.map((percent, index) => ({
    name: Languages[index],
    data: [percent],
  }));

  const boxplotSeries = [
    {
      data: monthyear.map((month, index) => ({
        x: month,
        y: [
          [54, 66, 69, 75, 88],
          [43, 65, 69, 76, 81],
          [31, 39, 45, 51, 59],
          [39, 46, 55, 65, 71],
          [29, 31, 35, 39, 44],
          [41, 49, 58, 61, 67],
          [54, 59, 66, 71, 88],
        ][index],
      })),
    },
  ];

  const candleSeries = [
    {
      data: months.map((months, i) => ({
        x: months,
        y: values[i],
      })),
    },
  ];
  const polarseries = [20, 30, 40, 50, 60, 70, 80];
  const horizontaloptions = {
    chart: {
      height: 350,
      id: 2,
      group: "syncsingle",
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
      id: 1,
      group: "syncsingle",
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
  const progressCategories = [
    "Role Management",
    "User Management",
    "Chat Implementation",
  ];
  const progressSeries = [
    {
      name: "Progress",
      data: [70, 90, 50],
    },
  ];

  const progressOptions = {
    chart: {
      type: "bar",
      height: 150,
      stacked: true,
      toolbar: { show: false },
      background: "#ffffff",
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "50%",
      },
    },
    xaxis: {
      max: 100,
      categories: progressCategories,
      labels: {
        formatter: function (val) {
          return val + "%";
        },
      },
    },

    colors: ["#f7cd0f"],
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "%";
      },
      style: {
        colors: ["#000"],
      },
    },
  };
  const LanguagesOptions = {
    chart: {
      type: "bar",
      stacked: true,
      stackType: "100%",
      height: 10,
      toolbar: { show: false },
      background: "#ffffff",
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "10%",
      },
    },
    colors: LanguageColors,
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        return `${Languages[opts.dataPointIndex]} ${val}%`;
      },
      style: {
        colors: ["#fff"],
        fontSize: "12px",
        fontWeight: 600,
      },
    },
    xaxis: {
      max: 100,
      labels: { show: false },
    },
    yaxis: { show: false },
    tooltip: { enabled: true },
  };

  const boxplotOptions = {
    chart: {
      background: "#ffffff",
      zoom: {
        enable: false,
      },
      xaxis: {
        type: "datetime",
      },
    },
  };
  const bubbleSeries = [
    {
      name: "User Growth",
      data: [
        { x: 1, y: 20, z: 15 },
        { x: 2, y: 35, z: 25 },
        { x: 3, y: 25, z: 18 },
        { x: 4, y: 50, z: 40 },
        { x: 5, y: 45, z: 35 },
        { x: 6, y: 60, z: 50 },
        { x: 7, y: 70, z: 60 },
        { x: 8, y: 65, z: 55 },
        { x: 9, y: 80, z: 70 },
        { x: 10, y: 75, z: 65 },
        { x: 11, y: 90, z: 80 },
        { x: 12, y: 100, z: 90 },
      ],
    },
  ];
  const scatterSeries = [
    {
      name: "userSync",
      data: [
        [5, 35],
        [10, 20],
        [15, 25],
      ],
    },
    {
      name: "Instagram ",
      data: [
        [3, 7],
        [7, 14],
        [12, 20],
      ],
    },
  ];
  const heatmapSeries = [
    {
      name: "userSync",
      data: [35, 20, 25],
    },
    {
      name: "Instagram",
      data: [7, 14, 20],
    },
  ];
  const scatter_heapmap_Options = {
    chart: {
      height: 350,
      background: "#ffffff",
      animations: {
        enabled: false,
      },
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },

    colors: ["#056BF6", "#D2376A"],

    xaxis: {
      tickAmount: 10,
      min: 0,
      max: 40,
      title: {
        text: "X Values",
      },
    },

    yaxis: {
      tickAmount: 7,
      title: {
        text: "Y Values",
      },
    },

    markers: {
      size: 8,
      shape: ["diamond", "triangle"],
    },

    legend: {
      position: "top",
    },
  };

  const charts = [
    { title: "User according to months", type: "line", options, series },
    { title: "User according to months", type: "bar", options, series },
    {
      title: "User vs Role Creation",
      type: "area",
      options,
      series: GroupSeries,
    },
    {
      title: "User vs Role Creation",
      type: "line",
      options,
      series: GroupSeries,
    },
    {
      title: "User vs Role Creation",
      type: "bar",
      options,
      series: GroupSeries,
    },
    {
      title: "Horizontal Chart",
      type: "bar",
      options: horizontaloptions,
      series: GroupSeries,
    },

    {
      title: "Roles Distribution",
      type: "pie",
      options: pieoptions,
      series: pieSeries,
    },
    {
      title: "Roles Distribution",
      type: "donut",
      options: pieoptions,
      series: pieSeries,
    },
    {
      title: "Polar Area(dummy data)",
      type: "polarArea",
      options: pieoptions,
      series: polarseries,
    },
    {
      title: "Radial Bar",
      type: "radialBar",
      options: pieoptions,
      series: pieSeries,
    },

    { title: "Radar Chart", type: "radar", options, series },
    {
      title: "Mixed Chart (dummy data)",
      type: "line",
      options: mixedOptions,
      series: mixedSeries,
    },

    {
      title: "Progress (dummy data)",
      type: "bar",
      options: progressOptions,
      series: progressSeries,
    },
    {
      title: "Range Area (dummy data)",
      type: "rangeArea",
      options: rangeOptions,
      series: rangeSeries,
    },
    {
      title: "Box Plot (dummy data)",
      type: "boxPlot",
      options: boxplotOptions,
      series: boxplotSeries,
    },
    {
      title: "Candlestick (dummy data)",
      type: "candlestick",
      options: boxplotOptions,
      series: candleSeries,
    },

    {
      title: "Bubble (dummy data)",
      type: "bubble",
      options,
      series: bubbleSeries,
    },
    {
      title: "Scatter (dummy data)",
      type: "scatter",
      options: scatter_heapmap_Options,
      series: scatterSeries,
    },
    {
      title: "Heatmap (dummy data)",
      type: "heatmap",
      options: scatter_heapmap_Options,
      series: heatmapSeries,
    },

    {
      title: "Project Languages (dummy data)",
      type: "bar",
      options: LanguagesOptions,
      series: Languageseries,
    },
  ];
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
    </>
  );
};

export default ApexChart;
