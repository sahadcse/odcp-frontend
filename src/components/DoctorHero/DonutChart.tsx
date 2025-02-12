"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useMemo } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = () => {
  const data = useMemo(
    () => ({
      labels: ["New Patients", "Old Patients", "Total Patients"],
      datasets: [
        {
          label: "Patients",
          data: [30, 40, 50],
          backgroundColor: ["#D7E3FC", "#08595a", "#15b697"],
          hoverOffset: 4,
        },
      ],
    }),
    []
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "bottom" as "bottom",
          labels: {
            boxWidth: 12,
            padding: 15,
            font: {
              size: window.innerWidth < 768 ? 10 : 12,
            },
          },
        },
      },
    }),
    []
  );

  return (
    <div className="bg-white rounded-lg shadow p-3 sm:p-4 md:p-6 w-full max-w-full sm:max-w-sm border border-gray-200 h-auto min-h-[250px] sm:min-h-[300px] flex items-center justify-center">
      <div className="w-full max-w-[250px] sm:max-w-[300px]">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default DonutChart;
