
// Define mock data types
export interface User {
  user_id: string;
  name: string;
  email: string;
  role: string;
  bank_id?: string;
  otp_enabled?: boolean;
}

export interface Business {
  business_id: string;
  name: string;
  entity_type: string;
  owner_id: string;
  financial_data?: {
    [year: string]: {
      revenue: number;
      wages: number;
      cogs: number;
      gross_profit: number;
      other_expenses: number;
      total_noi: number;
      nom_percentage: number;
    }
  };
}

export interface LoanType {
  type: string;
  amount: number;
  description: string;
}

export interface Project {
  project_id: string;
  project_name: string;
  project_type: string;
  loan_types: LoanType[];
  loan_amount: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  city?: string;
  state?: string;
  participants: { userId: string; role: string }[];
}

// Mock data
export const users: User[] = [
  { 
    user_id: 'user_1', 
    name: 'John Smith', 
    email: 'john@example.com', 
    role: 'buyer',
    otp_enabled: false
  },
  { 
    user_id: 'user_2', 
    name: 'Jane Doe', 
    email: 'jane@example.com', 
    role: 'seller',
    otp_enabled: true
  },
  { 
    user_id: 'user_3', 
    name: 'Mark Johnson', 
    email: 'mark@example.com', 
    role: 'buyer',
    otp_enabled: false
  },
  { 
    user_id: 'user_4', 
    name: 'Sarah Williams', 
    email: 'sarah@bankexample.com', 
    role: 'bank_officer',
    bank_id: 'bank_1',
    otp_enabled: true
  },
  { 
    user_id: 'user_5', 
    name: 'Robert Brown', 
    email: 'robert@bankexample.com', 
    role: 'loan_specialist',
    bank_id: 'bank_1',
    otp_enabled: false
  }
];

export const businesses: Business[] = [
  {
    business_id: 'business_1',
    name: 'Acme Corporation',
    entity_type: 'LLC',
    owner_id: 'user_1',
    financial_data: {
      '2021': {
        revenue: 500000,
        wages: 150000,
        cogs: 200000,
        gross_profit: 300000,
        other_expenses: 50000,
        total_noi: 100000,
        nom_percentage: 20
      },
      '2022': {
        revenue: 600000,
        wages: 180000,
        cogs: 220000,
        gross_profit: 380000,
        other_expenses: 60000,
        total_noi: 140000,
        nom_percentage: 23
      }
    }
  },
  {
    business_id: 'business_2',
    name: 'XYZ Enterprises',
    entity_type: 'S-Corp',
    owner_id: 'user_2',
    financial_data: {
      '2021': {
        revenue: 750000,
        wages: 250000,
        cogs: 300000,
        gross_profit: 450000,
        other_expenses: 100000,
        total_noi: 100000,
        nom_percentage: 13
      },
      '2022': {
        revenue: 900000,
        wages: 300000,
        cogs: 350000,
        gross_profit: 550000,
        other_expenses: 120000,
        total_noi: 130000,
        nom_percentage: 14
      }
    }
  }
];

export const projects: Project[] = [
  {
    project_id: 'project_1',
    project_name: 'Main Street Acquisition',
    project_type: 'Business Acquisition',
    loan_types: [
      { type: 'SBA 7(a)', amount: 2000000, description: 'Standard SBA loan' },
      { type: 'Owner Financing', amount: 500000, description: 'Seller carry back' }
    ],
    loan_amount: 2500000,
    created_by: 'user_4',
    created_at: '2023-03-15T10:00:00Z',
    updated_at: '2023-05-20T14:30:00Z',
    city: 'Chicago',
    state: 'IL',
    participants: [
      { userId: 'user_1', role: 'buyer' },
      { userId: 'user_2', role: 'seller' },
      { userId: 'user_4', role: 'bank_officer' },
      { userId: 'user_5', role: 'loan_specialist' }
    ]
  },
  {
    project_id: 'project_2',
    project_name: 'Riverside Development',
    project_type: 'Commercial Real Estate',
    loan_types: [
      { type: 'SBA 504', amount: 5000000, description: 'CDC/SBA loan' },
      { type: 'Conventional', amount: 1000000, description: 'Bank loan' }
    ],
    loan_amount: 6000000,
    created_by: 'user_5',
    created_at: '2023-06-10T09:15:00Z',
    updated_at: '2023-07-05T11:45:00Z',
    city: 'Denver',
    state: 'CO',
    participants: [
      { userId: 'user_3', role: 'buyer' },
      { userId: 'user_4', role: 'bank_officer' }
    ]
  }
];

// Utility functions
export const getUserById = (userId: string): User | undefined => {
  return users.find(user => user.user_id === userId);
};

export const getBusinessById = (businessId: string): Business | undefined => {
  return businesses.find(business => business.business_id === businessId);
};

export const getProjectById = (projectId: string): Project | undefined => {
  return projects.find(project => project.project_id === projectId);
};

// Mock data for UseOfProceedsTable
export const mockUseOfProceedsColumns = [
  { column_id: 'col_1', column_name: 'Total' },
  { column_id: 'col_2', column_name: 'Phase 1' },
  { column_id: 'col_3', column_name: 'Phase 2' }
];

export const mockUseOfProceedsRows = [
  { row_id: 'row_1', row_name: 'LAND & BUILDING', overall_category: 'Land' },
  { row_id: 'row_2', row_name: 'CONSTRUCTION', overall_category: 'Construction' },
  { row_id: 'row_3', row_name: 'EQUIPMENT', overall_category: 'Furniture Fixtures and Equipment' },
  { row_id: 'row_4', row_name: 'WORKING CAPITAL', overall_category: 'Working Capital' },
  { row_id: 'row_5', row_name: 'TOTAL', overall_category: '' }
];

// Function for bank lookup
export const getBankById = (bankId: string) => {
  return {
    bank_id: bankId,
    name: `Bank ${bankId}`,
    location: 'New York, NY'
  };
};

// Mock function for use of proceeds data
export const getUseOfProceedsForProject = (projectId: string) => {
  // Just return some sample data for demonstration
  return [
    { id: 1, overall_category: 'Land', row_name: 'LAND & BUILDING', value: 500000 },
    { id: 2, overall_category: 'Construction', row_name: 'CONSTRUCTION', value: 1000000 },
    { id: 3, overall_category: 'Furniture Fixtures and Equipment', row_name: 'EQUIPMENT', value: 300000 },
    { id: 4, overall_category: 'Working Capital', row_name: 'WORKING CAPITAL', value: 200000 }
  ];
};
