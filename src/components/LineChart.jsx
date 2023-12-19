import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartData }) {
  return (
    <div className="chart-container">
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: false,
              text: "Scores"
            },
            legend: {
              display: true
            }
          }
        }}
      />
    </div>
  );
}
export default LineChart;