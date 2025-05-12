import React from 'react';
import { Sector } from '../../types';

interface HeatmapItem {
  x: string;
  y: string;
  value: number;
}

interface HeatmapData {
  food: HeatmapItem[];
  textile: HeatmapItem[];
}

interface HeatmapVisualizationProps {
  data: HeatmapData;
  sector: Sector;
}

const HeatmapVisualization: React.FC<HeatmapVisualizationProps> = ({ data, sector }) => {
  const sectorData = data[sector];
  
  // Get unique x and y values
  const xValues = Array.from(new Set(sectorData.map(item => item.x)));
  const yValues = Array.from(new Set(sectorData.map(item => item.y)));
  
  // Find max value for color scaling
  const maxValue = Math.max(...sectorData.map(item => item.value));
  
  // Helper function to get color based on value
  const getHeatColor = (value: number): string => {
    const intensity = value / maxValue;
    if (intensity < 0.2) return 'bg-green-100';
    if (intensity < 0.4) return 'bg-green-200';
    if (intensity < 0.6) return 'bg-amber-200';
    if (intensity < 0.8) return 'bg-orange-200';
    return 'bg-red-300';
  };
  
  // Get data point for specific x and y
  const getDataPoint = (x: string, y: string): HeatmapItem | undefined => {
    return sectorData.find(item => item.x === x && item.y === y);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Failure Heatmap</h3>
        <p className="text-sm text-gray-500 mt-1">
          Visualizing failure patterns over time and categories
        </p>
      </div>
      
      <div className="p-4 overflow-x-auto">
        <div className="min-w-[500px]">
          <div className="grid" style={{ gridTemplateColumns: `auto ${xValues.map(() => '1fr').join(' ')}` }}>
            {/* Header row with x labels */}
            <div className="p-2"></div> {/* Empty cell for the corner */}
            {xValues.map(x => (
              <div key={x} className="p-2 text-center font-medium text-sm text-gray-700">
                {x}
              </div>
            ))}
            
            {/* Data rows */}
            {yValues.map(y => (
              <React.Fragment key={y}>
                {/* Y label */}
                <div className="p-2 text-sm font-medium text-gray-700">
                  {y}
                </div>
                
                {/* Data cells */}
                {xValues.map(x => {
                  const dataPoint = getDataPoint(x, y);
                  const value = dataPoint ? dataPoint.value : 0;
                  
                  return (
                    <div 
                      key={`${x}-${y}`} 
                      className={`w-16 h-12 m-1 flex items-center justify-center rounded ${getHeatColor(value)} transition-colors hover:opacity-80`}
                    >
                      <span className="font-bold text-gray-800">{value}</span>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
          
          {/* Legend */}
          <div className="mt-4 flex items-center justify-center">
            <div className="flex space-x-1 items-center">
              <div className="w-4 h-4 bg-green-100 rounded"></div>
              <span className="text-xs text-gray-700 mr-2">Low</span>
              
              <div className="w-4 h-4 bg-green-200 rounded"></div>
              <div className="w-4 h-4 bg-amber-200 rounded"></div>
              <div className="w-4 h-4 bg-orange-200 rounded"></div>
              <div className="w-4 h-4 bg-red-300 rounded"></div>
              <span className="text-xs text-gray-700 ml-1">High</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatmapVisualization;