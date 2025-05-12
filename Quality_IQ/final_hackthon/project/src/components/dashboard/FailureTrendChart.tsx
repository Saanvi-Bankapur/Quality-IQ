import React from 'react';
import { ChartData } from '../../types';

interface FailureTrendChartProps {
  data: ChartData;
}

const FailureTrendChart: React.FC<FailureTrendChartProps> = ({ data }) => {
  // This is a placeholder for the actual chart
  // In a real application, you'd use a library like Chart.js, Recharts, or Nivo
  // For this demo, we'll create a simplified visual representation
  
  const maxValue = Math.max(...data.datasets.flatMap(dataset => dataset.data));
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Failure Trends</h3>
      
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs text-gray-500">Failures</div>
          <div className="flex space-x-4">
            {data.datasets.map((dataset, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-1"
                  style={{ backgroundColor: dataset.borderColor as string }}
                ></div>
                <span className="text-xs text-gray-600">{dataset.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative h-64">
          <div className="absolute inset-0 flex">
            {data.labels.map((label, labelIndex) => (
              <div key={labelIndex} className="flex-1 flex flex-col justify-end border-r border-gray-200 relative group">
                {data.datasets.map((dataset, datasetIndex) => {
                  const value = dataset.data[labelIndex];
                  const height = (value / maxValue) * 100;
                  
                  return (
                    <div 
                      key={datasetIndex}
                      className="rounded-t-sm mx-1 transition-all duration-300 hover:opacity-80 group-hover:filter group-hover:brightness-90"
                      style={{ 
                        height: `${height}%`,
                        backgroundColor: dataset.backgroundColor as string,
                        marginBottom: datasetIndex * 3 + 'px' 
                      }}
                    >
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 pointer-events-none transition-opacity duration-200">
                        {dataset.label}: {value}
                      </div>
                    </div>
                  );
                })}
                <div className="text-xs text-gray-500 text-center mt-2">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FailureTrendChart;