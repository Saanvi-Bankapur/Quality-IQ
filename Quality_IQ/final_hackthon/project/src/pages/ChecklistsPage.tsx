import React, { useState } from 'react';
import { ClipboardCheck, Filter, Plus, Search } from 'lucide-react';
import { Checklist, Sector } from '../types';
import StatusBadge from '../components/common/StatusBadge';
import SectorSelector from '../components/dashboard/SectorSelector';
import ChecklistCard from '../components/checklists/ChecklistCard';
import { mockChecklists } from '../data/mockData';

const ChecklistsPage: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<Sector>('food');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  const handleSectorChange = (sector: Sector) => {
    setSelectedSector(sector);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };
  
  const handleChecklistClick = (checklist: Checklist) => {
    // In a real app, this would navigate to the checklist detail page
    console.log('Checklist clicked:', checklist);
  };
  
  // Filter checklists based on sector, search term, and status filter
  const filteredChecklists = mockChecklists.filter(checklist => {
    const matchesSector = checklist.sector === selectedSector;
    const matchesSearch = searchTerm === '' || 
      checklist.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      checklist.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || checklist.status === statusFilter;
    
    return matchesSector && matchesSearch && matchesStatus;
  });
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Quality Checklists</h1>
          <p className="text-gray-600">Manage and execute quality control procedures</p>
        </div>
        
        <button className="mt-4 md:mt-0 flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
          <Plus className="h-5 w-5 mr-2" />
          Create Checklist
        </button>
      </div>
      
      <SectorSelector selectedSector={selectedSector} onSectorChange={handleSectorChange} />
      
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-grow relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search checklists..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter className="h-5 w-5 text-gray-400" />
          </div>
          <select
            className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 appearance-none"
            value={statusFilter}
            onChange={handleFilterChange}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Stats overview */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3">
            <div className="flex items-center justify-center p-3 bg-blue-50 rounded-full w-12 h-12 mx-auto mb-3">
              <ClipboardCheck className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900">
              {filteredChecklists.length}
            </h4>
            <p className="text-sm text-gray-500">Total Checklists</p>
          </div>
          
          <div className="text-center p-3">
            <div className="flex items-center justify-center p-3 bg-green-50 rounded-full w-12 h-12 mx-auto mb-3">
              <StatusBadge status="completed" className="mx-auto" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900">
              {filteredChecklists.filter(c => c.status === 'completed').length}
            </h4>
            <p className="text-sm text-gray-500">Completed</p>
          </div>
          
          <div className="text-center p-3">
            <div className="flex items-center justify-center p-3 bg-amber-50 rounded-full w-12 h-12 mx-auto mb-3">
              <StatusBadge status="in-progress" className="mx-auto" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900">
              {filteredChecklists.filter(c => c.status === 'in-progress').length}
            </h4>
            <p className="text-sm text-gray-500">In Progress</p>
          </div>
          
          <div className="text-center p-3">
            <div className="flex items-center justify-center p-3 bg-red-50 rounded-full w-12 h-12 mx-auto mb-3">
              <StatusBadge status="failed" className="mx-auto" />
            </div>
            <h4 className="text-2xl font-bold text-gray-900">
              {filteredChecklists.filter(c => c.status === 'failed').length}
            </h4>
            <p className="text-sm text-gray-500">Failed</p>
          </div>
        </div>
      </div>
      
      {/* Checklists Grid */}
      {filteredChecklists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChecklists.map(checklist => (
            <ChecklistCard 
              key={checklist.id} 
              checklist={checklist} 
              onClick={handleChecklistClick} 
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <ClipboardCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No checklists found</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filters to find what you\'re looking for.'
              : `No checklists available for the ${selectedSector} sector. Create a new checklist to get started.`
            }
          </p>
          <button className="mt-4 inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
            <Plus className="h-5 w-5 mr-2" />
            Create Checklist
          </button>
        </div>
      )}
    </div>
  );
};

export default ChecklistsPage;