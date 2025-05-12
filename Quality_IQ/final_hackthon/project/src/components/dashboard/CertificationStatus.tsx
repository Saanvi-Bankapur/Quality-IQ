import React from 'react';
import { AlertTriangle, CheckCircle, Shield } from 'lucide-react';
import { Certification, Sector } from '../../types';
import StatusBadge from '../common/StatusBadge';

interface CertificationStatusProps {
  certifications: Certification[];
  sector: Sector;
}

const CertificationStatus: React.FC<CertificationStatusProps> = ({ certifications, sector }) => {
  const sectorCertifications = certifications.filter(cert => cert.sector === sector);
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Certification Status</h3>
          <Shield className="h-5 w-5 text-blue-600" />
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {sectorCertifications.map(certification => (
          <div key={certification.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center">
                  <h4 className="text-base font-medium text-gray-900">{certification.name}</h4>
                  <StatusBadge status={certification.status} className="ml-2" />
                </div>
                <p className="text-sm text-gray-500 mt-1">{certification.description}</p>
                
                <div className="mt-2">
                  <h5 className="text-xs font-medium text-gray-700 mb-1">Requirements:</h5>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {certification.requirements.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1.5 mt-0.5" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {certification.status !== 'compliant' && (
                <div className="ml-4 p-2 bg-amber-50 rounded-md text-amber-800 text-xs flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1.5" />
                  <div>
                    <span className="font-medium">Action Required</span>
                    <p className="mt-0.5">Expires: {certification.expiresAt?.toLocaleDateString()}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {sectorCertifications.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No certifications available for this sector
          </div>
        )}
      </div>
      
      <div className="bg-gray-50 p-3 text-center border-t border-gray-200">
        <button className="text-sm text-blue-600 hover:text-blue-800">View all certifications</button>
      </div>
    </div>
  );
};

export default CertificationStatus;