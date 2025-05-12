import React, { useState } from 'react';
import { AlertTriangle, History, Plus, Search, Zap } from 'lucide-react';
import { FailureHotspot, FailureRecord, Sector } from '../types';
import SectorSelector from '../components/dashboard/SectorSelector';
import DataTable from '../components/common/DataTable';
import FailureHotspotCard from '../components/failures/FailureHotspotCard';
import HeatmapVisualization from '../components/analytics/HeatmapVisualization';
import { mockFailureHotspots, mockFailureRecords, mockHeatmapData } from '../data/mockData';

const FailuresPage: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<Sector>('food');
  const [searchTerm, setSearchTerm] = useState('');
  const [tab, setTab] = useState<'records' | 'hotspots' | 'analysis'>('records');
  
  const handleSectorChange = (sector: Sector) => {
    setSelectedSector(sector);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleHotspotClick = (hotspot: FailureHotspot) => {
    // In a real app, this would open a modal or navigate to a detail page
    console.log('Hotspot clicked:', hotspot);
  };
  
  const handleFailureClick = (failure: FailureRecord) => {
    // In a real app, this would open a modal or navigate to a detail page
    console.log('Failure clicked:', failure);
  };
  
  // Filter failures based on sector and search term
  const filteredFailures = mockFailureRecords.filter(failure => {
    const checklistItemId = failure.checklistItemId;
    const matchesSector = checklistItemId.startsWith(selectedSector === 'food' ? 'f' : 't');
    const matchesSearch = searchTerm === '' || 
      failure.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSector && matchesSearch;
  });
  
  // Filter hotspots based on sector and search term
  const filteredHotspots = mockFailureHotspots.filter(hotspot => {
    const matchesSector = hotspot.relatedChecklistItems.some(id => 
      id.startsWith(selectedSector === 'food' ? 'f' : 't')
    );
    const matchesSearch = searchTerm === '' || 
      hotspot.area.toLowerCase().includes(searchTerm.toLowerCase()) || 
      hotspot.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSector && matchesSearch;
  });
  
  // Table columns for failure records
  const failureColumns = [
    { 
      header: 'Severity', 
      accessor: (failure: FailureRecord) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          failure.severity === 'critical' ? 'bg-red-100 text-red-800' :
          failure.severity === 'high' ? 'bg-orange-100 text-orange-800' :
          failure.severity === 'medium' ? 'bg-amber-100 text-amber-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {failure.severity.charAt(0).toUpperCase() + failure.severity.slice(1)}
        </span>
      )
    },
    { 
      header: 'Description', 
      accessor: 'description',
      className: 'max-w-md truncate'
    },
    { 
      header: 'Date', 
      accessor: (failure: FailureRecord) => failure.timestamp.toLocaleDateString() 
    },
    {
      header: 'Status',
      accessor: (failure: FailureRecord) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          failure.resolvedAt ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
        }`}>
          {failure.resolvedAt ? 'Resolved' : 'Open'}
        </span>
      )
    },
    {
      header: 'Action',
      accessor: () => (
        <button className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-md hover:bg-blue-200 transition-colors">
          View
        </button>
      )
    }
  ];
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Failure Analysis</h1>
          <p className="text-gray-600">Track and analyze quality issues and defects</p>
        </div>
        
        <button className="mt-4 md:mt-0 flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
          <Plus className="h-5 w-5 mr-2" />
          Report Failure
        </button>
      </div>
      
      <SectorSelector selectedSector={selectedSector} onSectorChange={handleSectorChange} />
      
      {/* Tabs and Search */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="flex space-x-1 bg-white rounded-lg shadow-sm p-1 mb-4 md:mb-0">
          <button
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
              tab === 'records' 
                ? 'bg-blue-100 text-blue-800' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            onClick={() => setTab('records')}
          >
            <History className="h-5 w-5 mr-2" />
            Records
          </button>
          <button
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
              tab === 'hotspots' 
                ? 'bg-blue-100 text-blue-800' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            onClick={() => setTab('hotspots')}
          >
            <AlertTriangle className="h-5 w-5 mr-2" />
            Hotspots
          </button>
          <button
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
              tab === 'analysis' 
                ? 'bg-blue-100 text-blue-800' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
            onClick={() => setTab('analysis')}
          >
            <Zap className="h-5 w-5 mr-2" />
            Analysis
          </button>
        </div>
        
        <div className="w-full md:w-auto relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full md:w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search failures..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      
      {/* Content based on selected tab */}
      {tab === 'records' && (
        <DataTable
          columns={failureColumns}
          data={filteredFailures}
          keyField="id"
          onRowClick={handleFailureClick}
          className="mb-6"
        />
      )}
      
      {tab === 'hotspots' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotspots.length > 0 ? (
            filteredHotspots.map(hotspot => (
              <FailureHotspotCard
                key={hotspot.id}
                hotspot={hotspot}
                onClick={handleHotspotClick}
              />
            ))
          ) : (
            <div className="col-span-3 bg-white rounded-lg shadow-sm p-8 text-center">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No failure hotspots found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {searchTerm 
                  ? 'Try adjusting your search to find what you\'re looking for.'
                  : `No failure hotspots detected for the ${selectedSector} sector.`
                }
              </p>
            </div>
          )}
        </div>
      )}
      
      {tab === 'analysis' && (
        <div className="space-y-6">
          <HeatmapVisualization data={mockHeatmapData} sector={selectedSector} />
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">AI-Generated Insights</h3>
            
            <div className="space-y-4">
              <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                <p className="text-blue-800">
                  <span className="font-medium">Pattern detected:</span> {selectedSector === 'food' 
                    ? 'Packaging seal failures occur more frequently on Wednesdays.'
                    : 'Color fastness issues are most common with red dyes on Mondays.'}
                </p>
                <p className="text-blue-700 text-sm mt-2">
                  <span className="font-medium">Possible cause:</span> {selectedSector === 'food' 
                    ? 'Mid-week equipment fatigue combined with higher production volume.'
                    : 'First batch after weekend shutdown may have inconsistent dye mixture.'}
                </p>
                <p className="text-blue-700 text-sm mt-2">
                  <span className="font-medium">Recommendation:</span> {selectedSector === 'food' 
                    ? 'Schedule additional seal integrity checks on Tuesday evenings and implement mid-week calibration for packaging equipment.'
                    : 'Implement pre-production dye testing on Monday mornings and extend the initial mixing period for the first batch.'}
                </p>
              </div>
              
              <div className="p-4 border border-amber-200 bg-amber-50 rounded-lg">
                <p className="text-amber-800">
                  <span className="font-medium">Trend alert:</span> {selectedSector === 'food' 
                    ? 'Storage temperature failures have increased by 15% over the past month.'
                    : 'Stitching failures are increasing toward the end of the week.'}
                </p>
                <p className="text-amber-700 text-sm mt-2">
                  <span className="font-medium">Risk assessment:</span> {selectedSector === 'food' 
                    ? 'Medium risk - Could lead to product spoilage and safety issues if not addressed.'
                    : 'Medium risk - Increasing defect rate could affect customer satisfaction and returns.'}
                </p>
                <p className="text-amber-700 text-sm mt-2">
                  <span className="font-medium">Action required:</span> {selectedSector === 'food' 
                    ? 'Inspect refrigeration systems and verify temperature monitoring equipment calibration.'
                    : 'Check for needle wear patterns and implement more frequent equipment maintenance on Thursdays.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FailuresPage;