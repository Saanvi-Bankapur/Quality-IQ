import React from 'react';

type StatusType = 'pending' | 'in-progress' | 'completed' | 'failed' | 'compliant' | 'at-risk' | 'non-compliant';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  let badgeClass = '';

  switch (status) {
    case 'pending':
      badgeClass = 'bg-gray-100 text-gray-800';
      break;
    case 'in-progress':
      badgeClass = 'bg-blue-100 text-blue-800';
      break;
    case 'completed':
    case 'compliant':
      badgeClass = 'bg-green-100 text-green-800';
      break;
    case 'failed':
    case 'non-compliant':
      badgeClass = 'bg-red-100 text-red-800';
      break;
    case 'at-risk':
      badgeClass = 'bg-amber-100 text-amber-800';
      break;
    default:
      badgeClass = 'bg-gray-100 text-gray-800';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClass} ${className}`}>
      {status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
    </span>
  );
};

export default StatusBadge;