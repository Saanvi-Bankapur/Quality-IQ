import React, { useState } from 'react';
import { AlertTriangle, BarChart3, Calendar, ClipboardCheck, UserCheck } from 'lucide-react';
import SectorSelector from '../components/dashboard/SectorSelector';
import StatCard from '../components/common/StatCard';
import PendingChecklists from '../components/dashboard/PendingChecklists';
import CertificationStatus from '../components/dashboard/CertificationStatus';
import RecentFailures from '../components/dashboard/RecentFailures';
import FailureTrendChart from '../components/dashboard/FailureTrendChart';
import LeaderboardWidget from '../components/dashboard/LeaderboardWidget';
import { Sector } from '../types';
import { mockChecklists, mockCertifications, mockFailureHotspots, mockFailureRecords, mockFailureTrendData, mockLeaderboardData } from '../data/mockData';
import VisualTwinPreview from '../components/dashboard/VisualTwinPreview';

const Dashboard: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<Sector>('food');
  
  const handleSectorChange = (sector: Sector) => {
    setSelectedSector(sector);
  };
  
  // Filter data based on selected sector
  const sectorChecklists = mockChecklists.filter(checklist => checklist.sector === selectedSector);
  const sectorFailures = mockFailureRecords.filter(failure => {
    const checklistItemId = failure.checklistItemId;
    return checklistItemId.startsWith(selectedSector === 'food' ? 'f' : 't');
  });
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Manufacturing Quality Dashboard</h1>
      <p className="text-gray-600 mb-6">Monitor quality metrics and identify improvement opportunities</p>
      
      <SectorSelector selectedSector={selectedSector} onSectorChange={handleSectorChange} />
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Pending Checklists"
          value={sectorChecklists.filter(c => c.status === 'pending' || c.status === 'in-progress').length}
          icon={<ClipboardCheck className="h-6 w-6" />}
          trend={{ value: 5, isPositive: false }}
        />
        <StatCard
          title="Quality Score"
          value="92%"
          icon={<BarChart3 className="h-6 w-6" />}
          trend={{ value: 3, isPositive: true }}
          color="green"
        />
        <StatCard
          title="Open Issues"
          value={sectorFailures.filter(f => !f.resolvedAt).length}
          icon={<AlertTriangle className="h-6 w-6" />}
          trend={{ value: 12, isPositive: false }}
          color="amber"
        />
        <StatCard
          title="Active Inspectors"
          value={5}
          icon={<UserCheck className="h-6 w-6" />}
          color="gray"
        />
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <FailureTrendChart data={mockFailureTrendData} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PendingChecklists checklists={sectorChecklists} />
            <VisualTwinPreview sector={selectedSector} />
          </div>
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          <CertificationStatus certifications={mockCertifications} sector={selectedSector} />
          <RecentFailures failures={sectorFailures} />
          <LeaderboardWidget data={mockLeaderboardData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;