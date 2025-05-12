import React, { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'amber' | 'red' | 'gray';
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  trend,
  color = 'blue' 
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    amber: 'bg-amber-50 text-amber-600',
    red: 'bg-red-50 text-red-600',
    gray: 'bg-gray-50 text-gray-600',
  };

  const trendColorClasses = {
    positive: 'text-green-600',
    negative: 'text-red-600',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 transition-all duration-200 hover:shadow-md">
      <div className="flex items-center">
        <div className={`p-3 rounded-full mr-4 ${colorClasses[color]}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
          
          {trend && (
            <div className="flex items-center mt-1">
              <span className={trend.isPositive ? trendColorClasses.positive : trendColorClasses.negative}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-gray-500 text-xs ml-1">vs last period</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;