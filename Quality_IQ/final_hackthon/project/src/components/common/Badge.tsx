import React from 'react';
import { Award, Search, Users } from 'lucide-react';
import { Badge as BadgeType } from '../../types';

interface BadgeProps {
  badge: BadgeType;
}

const Badge: React.FC<BadgeProps> = ({ badge }) => {
  // Map badge icons to Lucide React components
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'award':
        return <Award className="h-5 w-5" />;
      case 'search':
        return <Search className="h-5 w-5" />;
      case 'users':
        return <Users className="h-5 w-5" />;
      default:
        return <Award className="h-5 w-5" />;
    }
  };

  return (
    <div className="flex items-center bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition-shadow">
      <div className="p-2 bg-blue-50 rounded-full mr-3 text-blue-600">
        {getIconComponent(badge.icon)}
      </div>
      <div>
        <h3 className="font-medium text-gray-900">{badge.name}</h3>
        <p className="text-xs text-gray-500 mt-0.5">{badge.description}</p>
        {badge.earnedAt && (
          <p className="text-xs text-gray-400 mt-1">
            Earned {badge.earnedAt.toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default Badge;