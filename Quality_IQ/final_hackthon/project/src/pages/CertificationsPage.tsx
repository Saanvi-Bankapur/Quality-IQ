import React, { useState } from 'react';
import { AlertTriangle, Calendar, CheckCircle, Clock, FileText, Shield } from 'lucide-react';
import { Certification, Sector } from '../types';
import SectorSelector from '../components/dashboard/SectorSelector';
import StatusBadge from '../components/common/StatusBadge';
import { mockCertifications } from '../data/mockData';

const CertificationsPage: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<Sector>('food');
  
  const handleSectorChange = (sector: Sector) => {
    setSelectedSector(sector);
  };
  
  // Filter certifications based on selected sector
  const sectorCertifications = mockCertifications.filter(cert => cert.sector === selectedSector);
  
  // Calculate overall compliance status
  const compliantCount = sectorCertifications.filter(cert => cert.status === 'compliant').length;
  const atRiskCount = sectorCertifications.filter(cert => cert.status === 'at-risk').length;
  const nonCompliantCount = sectorCertifications.filter(cert => cert.status === 'non-compliant').length;
  const total = sectorCertifications.length;
  const compliancePercentage = total > 0 ? Math.round((compliantCount / total) * 100) : 0;
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Certification Management</h1>
          <p className="text-gray-600">Track and maintain compliance with industry standards</p>
        </div>
      </div>
      
      <SectorSelector selectedSector={selectedSector} onSectorChange={handleSectorChange} />
      
      {/* Compliance Overview */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Compliance Overview</h2>
        
        <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
          <div className="relative mb-4 md:mb-0 md:w-40 md:h-40">
            <div className="w-40 h-40 rounded-full border-8 border-gray-100 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{compliancePercentage}%</div>
                <div className="text-sm text-gray-500">Compliant</div>
              </div>
            </div>
            <svg className="absolute top-0 left-0" width="160" height="160" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke="#d1d5db"
                strokeWidth="12"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                fill="none"
                stroke={compliancePercentage >= 75 ? '#10b981' : compliancePercentage >= 50 ? '#f59e0b' : '#ef4444'}
                strokeWidth="12"
                strokeDasharray="439.6"
                strokeDashoffset={439.6 - (439.6 * compliancePercentage) / 100}
                transform="rotate(-90 80 80)"
              />
            </svg>
          </div>
          
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-md">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-full mr-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-green-800 font-medium">Compliant</div>
                  <div className="text-xl font-bold text-green-600">{compliantCount}</div>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-amber-50 rounded-md">
              <div className="flex items-center">
                <div className="p-2 bg-amber-100 rounded-full mr-3">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <div className="text-sm text-amber-800 font-medium">At Risk</div>
                  <div className="text-xl font-bold text-amber-600">{atRiskCount}</div>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-red-50 rounded-md">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-full mr-3">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <div className="text-sm text-red-800 font-medium">Non-Compliant</div>
                  <div className="text-xl font-bold text-red-600">{nonCompliantCount}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Certifications List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Certifications</h3>
            <Shield className="h-5 w-5 text-blue-600" />
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {sectorCertifications.map(certification => (
            <CertificationCard key={certification.id} certification={certification} />
          ))}
          
          {sectorCertifications.length === 0 && (
            <div className="p-8 text-center">
              <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No certifications found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                No certifications are available for the {selectedSector} sector.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface CertificationCardProps {
  certification: Certification;
}

const CertificationCard: React.FC<CertificationCardProps> = ({ certification }) => {
  return (
    <div className="p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <div className={`p-2 rounded-full mr-4 ${
            certification.status === 'compliant' ? 'bg-green-100 text-green-600' :
            certification.status === 'at-risk' ? 'bg-amber-100 text-amber-600' :
            'bg-red-100 text-red-600'
          }`}>
            <Shield className="h-6 w-6" />
          </div>
          
          <div>
            <div className="flex items-center">
              <h4 className="text-lg font-medium text-gray-900">{certification.name}</h4>
              <StatusBadge status={certification.status} className="ml-2" />
            </div>
            <p className="text-sm text-gray-500 mt-1">{certification.description}</p>
            
            <div className="mt-4 space-y-3">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">
                  Expires: {certification.expiresAt?.toLocaleDateString()}
                </span>
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Requirements:</h5>
                <ul className="space-y-1">
                  {certification.requirements.map((req, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-md hover:bg-blue-200 transition-colors">
            <FileText className="h-4 w-4 mr-1" />
            View Details
          </button>
          
          {certification.status !== 'compliant' && (
            <button className="flex items-center px-3 py-1 bg-green-100 text-green-700 text-sm rounded-md hover:bg-green-200 transition-colors">
              <CheckCircle className="h-4 w-4 mr-1" />
              Update Status
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificationsPage;