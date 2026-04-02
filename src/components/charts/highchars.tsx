import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const HighchartDemo = () => {
  const options = {
    title: {
      text: "Users Created Over Months",
    },
    xAxis: {
      categories: [
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
      ],
    },
    yAxis: {
      title: {
        text: "Number of Users",
      },
    },
    series: [
      {
        name: "Users Created",
        data: [5, 10, 15, 20, 25, 30, 35, 30, 20, 15, 10, 5],
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default HighchartDemo;
