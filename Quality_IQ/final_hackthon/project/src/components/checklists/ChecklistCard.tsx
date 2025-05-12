import React from 'react';
import { ClipboardCheck } from 'lucide-react';
import { Checklist } from '../../types';
import StatusBadge from '../common/StatusBadge';

interface ChecklistCardProps {
  checklist: Checklist;
  onClick: (checklist: Checklist) => void;
}

const ChecklistCard: React.FC<ChecklistCardProps> = ({ checklist, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onClick(checklist)}
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center">
              <h3 className="text-lg font-medium text-gray-900">{checklist.title}</h3>
              <StatusBadge status={checklist.status} className="ml-2" />
            </div>
            <p className="text-sm text-gray-500 mt-1">{checklist.description}</p>
          </div>
          <div className="p-2 bg-blue-50 rounded-full text-blue-600">
            <ClipboardCheck className="h-6 w-6" />
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-xs text-gray-500">
            {checklist.items.length} item{checklist.items.length !== 1 ? 's' : ''} • 
            {checklist.sector === 'food' ? ' Food Sector' : ' Textile Sector'}
          </p>
          
          {checklist.completedAt && (
            <p className="text-xs text-gray-500 mt-1">
              Completed on {checklist.completedAt.toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
      
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {checklist.status === 'pending' && 'Not started'}
            {checklist.status === 'in-progress' && 'In progress'}
            {checklist.status === 'completed' && 'Completed'}
            {checklist.status === 'failed' && 'Failed'}
          </span>
          
          <button className={`px-3 py-1 rounded-md text-sm font-medium ${
            checklist.status === 'pending' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' :
            checklist.status === 'in-progress' ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' :
            checklist.status === 'completed' ? 'bg-green-100 text-green-700 hover:bg-green-200' :
            'bg-red-100 text-red-700 hover:bg-red-200'
          }`}>
            {checklist.status === 'pending' && 'Start'}
            {checklist.status === 'in-progress' && 'Continue'}
            {checklist.status === 'completed' && 'View'}
            {checklist.status === 'failed' && 'Review'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChecklistCard;