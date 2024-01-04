import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChartWPM({ chartData }) {
  return (
    <div>
      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            wpm: {
              axis: "y",
              display: true,
              title: {
                display: true,
                text: "Words per Minute",
              },
              beginAtZero: true,
              min: 0,
              ticks: {
                autoSkip: true,
                autoSkipPadding: 20,
              },
              grid: {
                display: true,
              },
            },
            x: {
              ticks: {
                display: false
              },
              grid: {
                display: false
              }
            }
          },
          plugins: {
            title: {
              display: false,
              text: "Scores"
            },
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return context.parsed.y.toFixed(0) + " WPM";
                },
              },
            },
          },
        }}
      />
    </div>
  );
}
export default LineChartWPM;