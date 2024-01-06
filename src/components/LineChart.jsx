import React from "react";
import { Line } from "react-chartjs-2";

function LineChart({ chartData }) {
  return (
      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
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