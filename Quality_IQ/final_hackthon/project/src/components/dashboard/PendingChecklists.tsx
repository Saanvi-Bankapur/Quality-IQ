import React from 'react';
import { ClipboardCheck } from 'lucide-react';
import { Checklist } from '../../types';
import StatusBadge from '../common/StatusBadge';

interface PendingChecklistsProps {
  checklists: Checklist[];
}

const PendingChecklists: React.FC<PendingChecklistsProps> = ({ checklists }) => {
  // Filter out completed checklists
  const pendingChecklists = checklists.filter(
    checklist => checklist.status === 'pending' || checklist.status === 'in-progress'
  );

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Pending Checklists</h3>
          <ClipboardCheck className="h-5 w-5 text-blue-600" />
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {pendingChecklists.map(checklist => (
          <div key={checklist.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center">
                  <h4 className="text-base font-medium text-gray-900">
                    {checklist.title}
                  </h4>
                  <StatusBadge status={checklist.status} className="ml-2" />
                </div>
                <p className="text-sm text-gray-500 mt-1">{checklist.description}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {checklist.items.length} item{checklist.items.length !== 1 ? 's' : ''}
                </p>
              </div>
              
              <button className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-md hover:bg-blue-200 transition-colors">
                {checklist.status === 'in-progress' ? 'Continue' : 'Start'}
              </button>
            </div>
          </div>
        ))}
        
        {pendingChecklists.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No pending checklists
          </div>
        )}
      </div>
      
      <div className="bg-gray-50 p-3 text-center border-t border-gray-200">
        <button className="text-sm text-blue-600 hover:text-blue-800">View all checklists</button>
      </div>
    </div>
  );
};

export default PendingChecklists;