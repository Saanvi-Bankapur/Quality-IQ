import React from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { FailureHotspot } from '../../types';

interface FailureHotspotCardProps {
  hotspot: FailureHotspot;
  onClick: (hotspot: FailureHotspot) => void;
}

const FailureHotspotCard: React.FC<FailureHotspotCardProps> = ({ hotspot, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onClick(hotspot)}
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{hotspot.area}</h3>
            <p className="text-sm text-gray-500 mt-1">{hotspot.description}</p>
          </div>
          <div className="p-2 bg-red-50 rounded-full text-red-600">
            <AlertTriangle className="h-6 w-6" />
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Occurrences</span>
            <span className="text-sm font-medium text-gray-900">{hotspot.occurrences}</span>
          </div>
          
          <div>
            <h4 className="text-xs font-medium text-gray-700">Suggested Fix:</h4>
            <p className="text-sm text-gray-800 mt-1">{hotspot.suggestedFix}</p>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <button 
          className="w-full flex items-center justify-center space-x-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onClick(hotspot);
          }}
        >
          <span>View details</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default FailureHotspotCard;