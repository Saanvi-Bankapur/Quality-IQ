import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { FailureRecord } from '../../types';

interface RecentFailuresProps {
  failures: FailureRecord[];
}

const RecentFailures: React.FC<RecentFailuresProps> = ({ failures }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Recent Failures</h3>
          <AlertTriangle className="h-5 w-5 text-red-600" />
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {failures.map(failure => (
          <div key={failure.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start">
              <div className={`p-2 rounded-full mr-3 ${
                failure.severity === 'critical' ? 'bg-red-100 text-red-600' :
                failure.severity === 'high' ? 'bg-orange-100 text-orange-600' :
                failure.severity === 'medium' ? 'bg-amber-100 text-amber-600' :
                'bg-blue-100 text-blue-600'
              }`}>
                <AlertTriangle className="h-5 w-5" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    failure.severity === 'critical' ? 'bg-red-100 text-red-800' :
                    failure.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                    failure.severity === 'medium' ? 'bg-amber-100 text-amber-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {failure.severity.charAt(0).toUpperCase() + failure.severity.slice(1)}
                  </span>
                  
                  <span className="text-xs text-gray-500">
                    {failure.timestamp.toLocaleString()}
                  </span>
                </div>
                
                <p className="text-sm text-gray-900 mt-1">{failure.description}</p>
                
                {failure.images && failure.images.length > 0 && (
                  <div className="mt-2 flex space-x-2">
                    {failure.images.map((img, index) => (
                      <img 
                        key={index}
                        src={img} 
                        alt={`Failure ${index}`}
                        className="h-16 w-16 object-cover rounded-md cursor-pointer hover:opacity-90 transition-opacity"
                      />
                    ))}
                  </div>
                )}
                
                {failure.resolvedAt && (
                  <div className="mt-2 text-xs p-2 bg-green-50 rounded-md text-green-700">
                    <span className="font-medium">Resolved:</span> {failure.resolution}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {failures.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No recent failures reported
          </div>
        )}
      </div>
      
      <div className="bg-gray-50 p-3 text-center border-t border-gray-200">
        <button className="text-sm text-blue-600 hover:text-blue-800">View all failure records</button>
      </div>
    </div>
  );
};

export default RecentFailures;