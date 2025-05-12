import React from 'react';
import { Factory, Utensils } from 'lucide-react';
import { Sector } from '../../types';

interface SectorSelectorProps {
  selectedSector: Sector;
  onSectorChange: (sector: Sector) => void;
}

const SectorSelector: React.FC<SectorSelectorProps> = ({ selectedSector, onSectorChange }) => {
  return (
    <div className="flex space-x-4 mb-6">
      <button
        className={`px-4 py-2 rounded-lg flex items-center ${
          selectedSector === 'food'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-white text-gray-600 hover:bg-gray-100'
        } transition-colors shadow-sm`}
        onClick={() => onSectorChange('food')}
      >
        <Utensils className="h-5 w-5 mr-2" />
        Food Sector
      </button>
      <button
        className={`px-4 py-2 rounded-lg flex items-center ${
          selectedSector === 'textile'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-white text-gray-600 hover:bg-gray-100'
        } transition-colors shadow-sm`}
        onClick={() => onSectorChange('textile')}
      >
        <Factory className="h-5 w-5 mr-2" />
        Textile Sector
      </button>
    </div>
  );
};

export default SectorSelector;