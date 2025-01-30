import React from 'react';

interface BarChartProps {
  data: { label: string; percentage: number }[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-sky-500', 'bg-yellow-500'];

  return (
    <div className="w-full my-4">
      {/* <h2 className="text-lg font-semibold mb-4">Patients Review</h2> */}
      {data.map((item, index) => (
        <div key={index} className="flex items-center mb-2">
          <span className="flex-shrink-0 w-24 text-sm">{item.label}</span>
          <div className="flex-1 h-2 bg-gray-200 rounded overflow-hidden">
            <div
              className={`h-full rounded ${colors[index % colors.length]}`}
              style={{ width: `${item.percentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BarChart;