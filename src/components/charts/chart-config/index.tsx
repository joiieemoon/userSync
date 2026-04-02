// charts-config.ts
import {
  months,
  monthyear,
  twovalues,
  values,
  Languages,
  LanguagePercentages,
  LanguageColors,
} from "../static-val";

export const chartsConfig = (users: any[] = [], roles: any[] = []) => {
  const counts = new Array(12).fill(0);
  users.forEach((u) => counts[new Date(u.createdAt).getMonth()]++);
  const maxCount = Math.max(...counts);
  const peakMonth = months[counts.indexOf(maxCount)];

  const roleNames = roles.map((r) => r.roleName);

  const series = [{ name: "Users Created", data: counts }];
  const pieSeries = roleNames.map(
    (r) => users.filter((u) => u.role === r).length,
  );
  const GroupSeries = [
    { name: "Users Created", data: counts },
    { name: "Roles Created", data: [4, 6, 2, 8, 5, 3, 7, 4, 6, 2, 8, 5] },
  ];
  const mixedSeries = [
    { name: "Users Created", type: "column", data: counts },
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
      data: months.map((m, i) => ({ x: m, y: twovalues[i] })),
    },
  ];
 const Languageseries = LanguagePercentages.map((p, i) => ({
    name: Languages[i],
    data: [p],
  }));
  const boxplotSeries = [
    {
      data: monthyear.map((m, i) => ({
        x: m,
        y: [
          [54, 66, 69, 75, 88],
          [43, 65, 69, 76, 81],
          [31, 39, 45, 51, 59],
          [39, 46, 55, 65, 71],
          [29, 31, 35, 39, 44],
          [41, 49, 58, 61, 67],
          [54, 59, 66, 71, 88],
        ][i],
      })),
    },
  ];
  const candleSeries = [
    { data: months.map((m, i) => ({ x: m, y: values[i] })) },
  ];
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
      name: "Instagram",
      data: [
        [3, 7],
        [7, 14],
        [12, 20],
      ],
    },
  ];
  const heatmapSeries = [
    { name: "userSync", data: [35, 20, 25] },
    { name: "Instagram", data: [7, 14, 20] },
  ];

  const options = {
    chart: { height: 350, type: "line", background: "#fff" },
    dataLabels: { enabled: true },
    stroke: { curve: "straight", colors: ["#f7cd0f"] },
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
    chart: { width: 380, background: "#fff" },
    labels: roleNames,
    responsive: [
      {
        breakpoint: 480,
        options: { chart: { width: 200 }, legend: { position: "bottom" } },
      },
    ],
  };
  const horizontaloptions = {
    chart: {
      height: 350,
      id: 2,
      group: "syncsingle",
      type: "bar",
      zoom: { enabled: false },
      background: "#fff",
    },
    plotOptions: { bar: { horizontal: true } },
    xaxis: { categories: months },
  };
  const mixedOptions = {
    chart: {
      height: 350,
      type: "line",
      stacked: false,
      background: "#fff",
      zoom: { enabled: false },
    },
    stroke: { width: [0, 3, 2], curve: "smooth" },
    fill: { opacity: [1, 1, 0.3] },
    xaxis: { categories: months },
    yaxis: [
      { title: { text: "Users" } },
      { opposite: true, title: { text: "Roles" } },
    ],
  };
  const rangeOptions = { chart: { background: "#fff" }, series: rangeSeries };
  const progressOptions = {
    chart: {
      type: "bar",
      height: 150,
      stacked: true,
      toolbar: { show: false },
      background: "#fff",
    },
    plotOptions: { bar: { horizontal: true, barHeight: "50%" } },
    xaxis: {
      max: 100,
      categories: ["Role Management", "User Management", "Chat Implementation"],
      labels: { formatter: (val) => val + "%" },
    },
    colors: ["#f7cd0f"],
    dataLabels: {
      enabled: true,
      formatter: (val) => val + "%",
      style: { colors: ["#000"] },
    },
  };
  const LanguagesOptions = {
    chart: {
      type: "bar",
      stacked: true,
      stackType: "100%",
      height: 10,
      toolbar: { show: false },
      background: "#fff",
    },
    plotOptions: { bar: { horizontal: true, barHeight: "10%" } },
    colors: LanguageColors,
    dataLabels: {
      enabled: true,
      formatter: (val, opts) => `${Languages[opts.dataPointIndex]} ${val}%`,
      style: { colors: ["#fff"], fontSize: "12px", fontWeight: 600 },
    },
    xaxis: { max: 100, labels: { show: false } },
    yaxis: { show: false },
    tooltip: { enabled: true },
  };
  const boxplotOptions = {
    chart: {
      background: "#fff",
      zoom: { enable: false },
      xaxis: { type: "datetime" },
    },
  };
  const scatter_heapmap_Options = {
    chart: {
      height: 350,
      background: "#fff",
      animations: { enabled: false },
      zoom: { enabled: false },
      toolbar: { show: false },
    },
    colors: ["#056BF6", "#D2376A"],
    xaxis: { tickAmount: 10, min: 0, max: 40, title: { text: "X Values" } },
    yaxis: { tickAmount: 7, title: { text: "Y Values" } },
    markers: { size: 8, shape: ["diamond", "triangle"] },
    legend: { position: "top" },
  };

  return [
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
      series: [20, 30, 40, 50, 60, 70, 80],
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
      series: progressOptions.series,
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
};
