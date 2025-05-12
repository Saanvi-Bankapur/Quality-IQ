import { Badge, Certification, Checklist, ChecklistItem, FailureHotspot, FailureRecord, Sector, User } from '../types';

// Generate dates relative to current date
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
const lastWeek = new Date(today);
lastWeek.setDate(lastWeek.getDate() - 7);
const nextMonth = new Date(today);
nextMonth.setMonth(nextMonth.getMonth() + 1);

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    role: 'admin',
    department: 'Quality Assurance',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    badges: [
      { id: 'b1', name: 'Quality Master', description: 'Completed 100 quality checks', icon: 'award', earnedAt: lastWeek },
      { id: 'b2', name: 'Defect Hunter', description: 'Found 50 defects', icon: 'search', earnedAt: yesterday },
    ],
    stats: {
      checksCompleted: 342,
      defectsFound: 87,
      certificationScore: 98,
    },
  },
  {
    id: '2',
    name: 'Sam Rivera',
    role: 'manager',
    department: 'Production',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150',
    badges: [
      { id: 'b3', name: 'Team Leader', description: 'Led a team with 95% quality score', icon: 'users', earnedAt: lastWeek },
    ],
    stats: {
      checksCompleted: 156,
      defectsFound: 42,
      certificationScore: 85,
    },
  },
  {
    id: '3',
    name: 'Morgan Chen',
    role: 'qualityChecker',
    department: 'Food Production',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    badges: [],
    stats: {
      checksCompleted: 89,
      defectsFound: 23,
      certificationScore: 76,
    },
  },
];

// Mock Checklist Items
export const foodChecklistItems: ChecklistItem[] = [
  {
    id: 'f1',
    title: 'Temperature Control',
    description: 'Verify food storage temperatures are within safe limits',
    sector: 'food',
    category: 'Storage',
    failureRate: 0.05,
    isRequired: true,
    certifications: ['FSSAI'],
  },
  {
    id: 'f2',
    title: 'Packaging Seal Integrity',
    description: 'Check all packaging seals for proper closure and integrity',
    sector: 'food',
    category: 'Packaging',
    failureRate: 0.08,
    isRequired: true,
    certifications: ['FSSAI', 'ISO 22000'],
  },
  {
    id: 'f3',
    title: 'Expiration Date Verification',
    description: 'Verify correct expiration dates are printed on all packages',
    sector: 'food',
    category: 'Labeling',
    failureRate: 0.03,
    isRequired: true,
    certifications: ['FSSAI'],
  },
  {
    id: 'f4',
    title: 'Cross-Contamination Prevention',
    description: 'Ensure separation between raw and cooked products',
    sector: 'food',
    category: 'Hygiene',
    failureRate: 0.07,
    isRequired: true,
    certifications: ['FSSAI', 'ISO 22000'],
  },
  {
    id: 'f5',
    title: 'Allergen Control',
    description: 'Verify allergen controls and labeling are properly implemented',
    sector: 'food',
    category: 'Labeling',
    failureRate: 0.06,
    isRequired: true,
    certifications: ['FSSAI', 'ISO 22000'],
  },
];

export const textileChecklistItems: ChecklistItem[] = [
  {
    id: 't1',
    title: 'Fabric Tension',
    description: 'Check fabric tension is within specified parameters',
    sector: 'textile',
    category: 'Weaving',
    failureRate: 0.09,
    isRequired: true,
    certifications: ['FCCI'],
  },
  {
    id: 't2',
    title: 'Color Fastness',
    description: 'Test color fastness against rubbing and washing',
    sector: 'textile',
    category: 'Dyeing',
    failureRate: 0.12,
    isRequired: true,
    certifications: ['FCCI', 'OEKO-TEX'],
  },
  {
    id: 't3',
    title: 'Stitch Density',
    description: 'Verify stitch density meets quality specifications',
    sector: 'textile',
    category: 'Stitching',
    failureRate: 0.07,
    isRequired: true,
    certifications: ['FCCI'],
  },
  {
    id: 't4',
    title: 'Dimensional Stability',
    description: 'Check fabric maintains dimensions after washing',
    sector: 'textile',
    category: 'Finishing',
    failureRate: 0.11,
    isRequired: true,
    certifications: ['OEKO-TEX'],
  },
  {
    id: 't5',
    title: 'Seam Strength',
    description: 'Test seam strength for durability and quality',
    sector: 'textile',
    category: 'Stitching',
    failureRate: 0.08,
    isRequired: true,
    certifications: ['FCCI'],
  },
];

export const allChecklistItems: ChecklistItem[] = [...foodChecklistItems, ...textileChecklistItems];

// Mock Checklists
export const mockChecklists: Checklist[] = [
  {
    id: 'cl1',
    title: 'Daily Food Safety Inspection',
    description: 'Morning inspection of preparation areas',
    sector: 'food',
    items: foodChecklistItems.slice(0, 3),
    completedAt: yesterday,
    completedBy: '3',
    status: 'completed',
  },
  {
    id: 'cl2',
    title: 'Weekly Textile Quality Check',
    description: 'Comprehensive quality inspection for textile production',
    sector: 'textile',
    items: textileChecklistItems,
    status: 'in-progress',
  },
  {
    id: 'cl3',
    title: 'Food Packaging Inspection',
    description: 'Quality control for packaging process',
    sector: 'food',
    items: [foodChecklistItems[1], foodChecklistItems[2], foodChecklistItems[4]],
    status: 'pending',
  },
];

// Mock Failure Records
export const mockFailureRecords: FailureRecord[] = [
  {
    id: 'fr1',
    checklistItemId: 'f2',
    timestamp: yesterday,
    description: 'Packaging seals showing inconsistent closure on batch #45862',
    severity: 'medium',
    images: ['https://images.pexels.com/photos/5708177/pexels-photo-5708177.jpeg?auto=compress&cs=tinysrgb&w=500'],
  },
  {
    id: 'fr2',
    checklistItemId: 't2',
    timestamp: lastWeek,
    description: 'Color bleeding observed after wash test on red fabric batch #T892',
    severity: 'high',
    images: ['https://images.pexels.com/photos/3812433/pexels-photo-3812433.jpeg?auto=compress&cs=tinysrgb&w=500'],
    resolvedAt: yesterday,
    resolution: 'Adjusted dye concentration and re-tested with improved results',
  },
];

// Mock Certifications
export const mockCertifications: Certification[] = [
  {
    id: 'cert1',
    name: 'FSSAI Certification',
    description: 'Food Safety and Standards Authority of India',
    sector: 'food',
    requirements: ['Temperature Control', 'Hygiene Standards', 'Allergen Management'],
    status: 'compliant',
    expiresAt: nextMonth,
  },
  {
    id: 'cert2',
    name: 'FCCI Compliance',
    description: 'Federation of Chambers of Commerce & Industry Textile Standards',
    sector: 'textile',
    requirements: ['Fabric Quality', 'Dye Standards', 'Production Process'],
    status: 'at-risk',
    expiresAt: nextMonth,
  },
  {
    id: 'cert3',
    name: 'ISO 22000',
    description: 'Food safety management systems',
    sector: 'food',
    requirements: ['HACCP Implementation', 'Risk Management', 'Documentation'],
    status: 'compliant',
    expiresAt: nextMonth,
  },
  {
    id: 'cert4',
    name: 'OEKO-TEX Standard 100',
    description: 'Textile testing for harmful substances',
    sector: 'textile',
    requirements: ['Chemical Testing', 'Colorant Testing', 'pH Value'],
    status: 'non-compliant',
    expiresAt: nextMonth,
  },
];

// Mock Failure Hotspots
export const mockFailureHotspots: FailureHotspot[] = [
  {
    id: 'hs1',
    area: 'Packaging Line 3',
    description: 'Inconsistent seal integrity',
    occurrences: 12,
    suggestedFix: 'Calibrate sealing machine temperature and pressure settings',
    relatedChecklistItems: ['f2'],
  },
  {
    id: 'hs2',
    area: 'Dyeing Station B',
    description: 'Color fastness issues with red dyes',
    occurrences: 8,
    suggestedFix: 'Adjust pH levels and increase fixative concentration',
    relatedChecklistItems: ['t2'],
  },
];

// Helper function to get checklist items by sector
export const getChecklistItemsBySector = (sector: Sector): ChecklistItem[] => {
  return allChecklistItems.filter(item => item.sector === sector);
};

// Helper function to get certifications by sector
export const getCertificationsBySector = (sector: Sector): Certification[] => {
  return mockCertifications.filter(cert => cert.sector === sector);
};

// Mock chart data for failure trends
export const mockFailureTrendData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Food Sector Failures',
      data: [12, 19, 10, 5, 8, 3],
      borderColor: '#ef4444',
      backgroundColor: 'rgba(239, 68, 68, 0.2)',
    },
    {
      label: 'Textile Sector Failures',
      data: [8, 15, 17, 12, 7, 5],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
    },
  ],
};

// Mock data for heatmap
export const mockHeatmapData = {
  food: [
    { x: 'Packaging', y: 'Monday', value: 3 },
    { x: 'Packaging', y: 'Tuesday', value: 2 },
    { x: 'Packaging', y: 'Wednesday', value: 5 },
    { x: 'Packaging', y: 'Thursday', value: 1 },
    { x: 'Packaging', y: 'Friday', value: 0 },
    { x: 'Storage', y: 'Monday', value: 1 },
    { x: 'Storage', y: 'Tuesday', value: 0 },
    { x: 'Storage', y: 'Wednesday', value: 2 },
    { x: 'Storage', y: 'Thursday', value: 3 },
    { x: 'Storage', y: 'Friday', value: 4 },
    { x: 'Hygiene', y: 'Monday', value: 0 },
    { x: 'Hygiene', y: 'Tuesday', value: 1 },
    { x: 'Hygiene', y: 'Wednesday', value: 0 },
    { x: 'Hygiene', y: 'Thursday', value: 2 },
    { x: 'Hygiene', y: 'Friday', value: 1 },
  ],
  textile: [
    { x: 'Weaving', y: 'Monday', value: 4 },
    { x: 'Weaving', y: 'Tuesday', value: 2 },
    { x: 'Weaving', y: 'Wednesday', value: 1 },
    { x: 'Weaving', y: 'Thursday', value: 0 },
    { x: 'Weaving', y: 'Friday', value: 2 },
    { x: 'Dyeing', y: 'Monday', value: 5 },
    { x: 'Dyeing', y: 'Tuesday', value: 3 },
    { x: 'Dyeing', y: 'Wednesday', value: 2 },
    { x: 'Dyeing', y: 'Thursday', value: 1 },
    { x: 'Dyeing', y: 'Friday', value: 0 },
    { x: 'Stitching', y: 'Monday', value: 1 },
    { x: 'Stitching', y: 'Tuesday', value: 2 },
    { x: 'Stitching', y: 'Wednesday', value: 3 },
    { x: 'Stitching', y: 'Thursday', value: 4 },
    { x: 'Stitching', y: 'Friday', value: 2 },
  ],
};

// Mock leaderboard data
export const mockLeaderboardData = [
  { id: '1', name: 'Alex Johnson', score: 98, department: 'Quality Assurance', badges: 2 },
  { id: '4', name: 'Taylor Smith', score: 92, department: 'Food Production', badges: 3 },
  { id: '5', name: 'Jordan Lee', score: 89, department: 'Textile Quality', badges: 2 },
  { id: '2', name: 'Sam Rivera', score: 85, department: 'Production', badges: 1 },
  { id: '6', name: 'Casey Brown', score: 82, department: 'Food Safety', badges: 1 },
  { id: '7', name: 'Avery Johnson', score: 79, department: 'Textile Production', badges: 1 },
  { id: '3', name: 'Morgan Chen', score: 76, department: 'Food Production', badges: 0 },
  { id: '8', name: 'Robin Garcia', score: 72, department: 'Quality Control', badges: 0 },
];