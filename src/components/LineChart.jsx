import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartData }) {
  return (
      <Line
        data={chartData}
        options={{

          plugins: {
            title: {
              display: false,
              text: "Scores"
            },
            legend: {
              display: true,
            }
          }
        }}
      />
  );
}
export default LineChart;