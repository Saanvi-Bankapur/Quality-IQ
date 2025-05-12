import React from 'react';
import { Trophy, User } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  department: string;
  badges: number;
}

interface LeaderboardWidgetProps {
  data: LeaderboardEntry[];
  limit?: number;
}

const LeaderboardWidget: React.FC<LeaderboardWidgetProps> = ({ data, limit = 5 }) => {
  // Get top entries based on limit
  const topEntries = data.slice(0, limit);
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Quality Leaderboard</h3>
          <Trophy className="h-5 w-5 text-amber-500" />
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {topEntries.map((entry, index) => (
          <div key={entry.id} className={`p-4 hover:bg-gray-50 transition-colors ${index < 3 ? 'bg-gray-50' : ''}`}>
            <div className="flex items-center">
              <div className="w-8 text-center font-bold text-gray-500">
                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`}
              </div>
              
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 mr-3">
                <User className="h-4 w-4" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900">{entry.name}</h4>
                  <span className="font-bold text-blue-700">{entry.score}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-gray-500">{entry.department}</p>
                  {entry.badges > 0 && (
                    <div className="flex items-center text-xs text-amber-700">
                      <Trophy className="h-3 w-3 mr-1" />
                      {entry.badges} badge{entry.badges !== 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-gray-50 p-3 text-center border-t border-gray-200">
        <button className="text-sm text-blue-600 hover:text-blue-800">View full leaderboard</button>
      </div>
    </div>
  );
};

export default LeaderboardWidget;