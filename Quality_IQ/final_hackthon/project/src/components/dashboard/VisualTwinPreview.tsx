import React from 'react';
import { Factory } from 'lucide-react';
import { Sector } from '../../types';

interface VisualTwinPreviewProps {
  sector: Sector;
}

const VisualTwinPreview: React.FC<VisualTwinPreviewProps> = ({ sector }) => {
  // This is a simplified factory layout visualization
  // In a real application, this would be much more detailed
  
  // Define areas based on sector
  const areas = sector === 'food' 
    ? [
        { id: 'f1', name: 'Preparation', status: 'normal', position: { x: 20, y: 20, width: 100, height: 80 } },
        { id: 'f2', name: 'Packaging', status: 'warning', position: { x: 140, y: 20, width: 150, height: 80 } },
        { id: 'f3', name: 'Storage', status: 'critical', position: { x: 310, y: 20, width: 80, height: 150 } },
        { id: 'f4', name: 'Inspection', status: 'normal', position: { x: 20, y: 120, width: 270, height: 50 } },
      ]
    : [
        { id: 't1', name: 'Weaving', status: 'normal', position: { x: 20, y: 20, width: 120, height: 90 } },
        { id: 't2', name: 'Dyeing', status: 'critical', position: { x: 160, y: 20, width: 100, height: 90 } },
        { id: 't3', name: 'Cutting', status: 'normal', position: { x: 280, y: 20, width: 110, height: 90 } },
        { id: 't4', name: 'Stitching', status: 'warning', position: { x: 20, y: 130, width: 370, height: 60 } },
      ];
      
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'normal': return 'bg-green-100 border-green-500 text-green-700';
      case 'warning': return 'bg-amber-100 border-amber-500 text-amber-700';
      case 'critical': return 'bg-red-100 border-red-500 text-red-700';
      default: return 'bg-gray-100 border-gray-500 text-gray-700';
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Factory Visual Twin</h3>
          <Factory className="h-5 w-5 text-blue-600" />
        </div>
      </div>
      
      <div className="p-4">
        <div className="relative bg-gray-50 border border-gray-200 rounded-lg h-[220px] overflow-hidden">
          {/* Grid pattern background */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}></div>
          
          {/* Factory areas */}
          {areas.map(area => (
            <div
              key={area.id}
              className={`absolute cursor-pointer border-2 rounded-md p-2 flex flex-col justify-between transition-all duration-300 hover:shadow-md transform hover:-translate-y-1 ${getStatusColor(area.status)}`}
              style={{
                left: `${area.position.x}px`,
                top: `${area.position.y}px`,
                width: `${area.position.width}px`,
                height: `${area.position.height}px`,
              }}
            >
              <span className="text-xs font-medium">{area.name}</span>
              {area.status !== 'normal' && (
                <div className="flex justify-end">
                  <span className="text-xs px-1.5 py-0.5 rounded-full bg-white font-medium">
                    {area.status === 'warning' ? '⚠️' : '⛔'}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
          <div className="space-x-3">
            <span className="inline-flex items-center">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
              Normal
            </span>
            <span className="inline-flex items-center">
              <span className="h-2 w-2 rounded-full bg-amber-500 mr-1"></span>
              Warning
            </span>
            <span className="inline-flex items-center">
              <span className="h-2 w-2 rounded-full bg-red-500 mr-1"></span>
              Critical
            </span>
          </div>
          <span className="text-gray-400">Last updated: Just now</span>
        </div>
      </div>
      
      <div className="bg-gray-50 p-3 text-center border-t border-gray-200">
        <button className="text-sm text-blue-600 hover:text-blue-800">View full visual twin</button>
      </div>
    </div>
  );
};

export default VisualTwinPreview;