'use client';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { useMemo } from 'react';

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = () => {
  const data = useMemo(() => ({
    labels: ['New Patients', 'Old Patients', 'Total Patients'],
    datasets: [
      {
        label: 'Patients',
        data: [30, 40, 50],
        backgroundColor: ['#D7E3FC', '#08595a', '#15b697'],
        hoverOffset: 4,
      },
    ],
  }), []);

  const options = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as 'bottom',
      },
    },
  }), []);

  return (
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-sm border border-gray-200 h-full flex items-center">
        <Doughnut data={data} options={options} />
      </div>
  );
};

export default DonutChart;
