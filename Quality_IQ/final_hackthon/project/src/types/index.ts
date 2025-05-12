// Core types for the Manufacturing Quality Assistant application

export type Sector = 'food' | 'textile';

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'manager' | 'qualityChecker';
  department: string;
  avatar?: string;
  badges: Badge[];
  stats: {
    checksCompleted: number;
    defectsFound: number;
    certificationScore: number;
  };
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: Date;
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  sector: Sector;
  category: string;
  failureRate: number;
  isRequired: boolean;
  certifications: string[];
}

export interface Checklist {
  id: string;
  title: string;
  description: string;
  sector: Sector;
  items: ChecklistItem[];
  completedAt?: Date;
  completedBy?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
}

export interface FailureRecord {
  id: string;
  checklistItemId: string;
  timestamp: Date;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  images?: string[];
  resolvedAt?: Date;
  resolution?: string;
}

export interface Certification {
  id: string;
  name: string;
  description: string;
  sector: Sector;
  requirements: string[];
  status: 'compliant' | 'at-risk' | 'non-compliant';
  expiresAt?: Date;
}

export interface FailureHotspot {
  id: string;
  area: string;
  description: string;
  occurrences: number;
  suggestedFix: string;
  relatedChecklistItems: string[];
}

export type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
};

export interface DashboardStats {
  totalChecklists: number;
  completedChecklists: number;
  pendingIssues: number;
  certificationStatus: {
    compliant: number;
    atRisk: number;
    nonCompliant: number;
  };
  performanceScore: number;
  recentFailures: FailureRecord[];
}