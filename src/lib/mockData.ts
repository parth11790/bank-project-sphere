
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
  },
  { 
    user_id: 'user_6', 
    name: 'Emily Davis', 
    email: 'emily@example.com', 
    role: 'buyer',
    otp_enabled: false
  },
  { 
    user_id: 'user_7', 
    name: 'Michael Wilson', 
    email: 'michael@example.com', 
    role: 'seller',
    otp_enabled: true
  },
  { 
    user_id: 'user_8', 
    name: 'Lisa Thompson', 
    email: 'lisa@example.com', 
    role: 'buyer',
    otp_enabled: false
  },
  { 
    user_id: 'user_9', 
    name: 'Thomas Moore', 
    email: 'thomas@bankexample.com', 
    role: 'bank_manager',
    bank_id: 'bank_1',
    otp_enabled: true
  },
  { 
    user_id: 'user_10', 
    name: 'Jessica Taylor', 
    email: 'jessica@bankexample.com', 
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
    owner_id: 'user_2',
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
    owner_id: 'user_7',
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
      },
      '2023': {
        revenue: 980000,
        wages: 320000,
        cogs: 370000,
        gross_profit: 610000,
        other_expenses: 140000,
        total_noi: 150000,
        nom_percentage: 15
      }
    }
  },
  {
    business_id: 'business_3',
    name: 'Pacific Technologies',
    entity_type: 'C-Corp',
    owner_id: 'user_2',
    financial_data: {
      '2021': {
        revenue: 1200000,
        wages: 400000,
        cogs: 500000,
        gross_profit: 700000,
        other_expenses: 200000,
        total_noi: 100000,
        nom_percentage: 8
      },
      '2022': {
        revenue: 1350000,
        wages: 450000,
        cogs: 550000,
        gross_profit: 800000,
        other_expenses: 220000,
        total_noi: 130000,
        nom_percentage: 9.6
      },
      '2023': {
        revenue: 1500000,
        wages: 500000,
        cogs: 600000,
        gross_profit: 900000,
        other_expenses: 250000,
        total_noi: 150000,
        nom_percentage: 10
      }
    }
  },
  {
    business_id: 'business_4',
    name: 'Riverfront Dining',
    entity_type: 'LLC',
    owner_id: 'user_7',
    financial_data: {
      '2022': {
        revenue: 850000,
        wages: 300000,
        cogs: 350000,
        gross_profit: 500000,
        other_expenses: 100000,
        total_noi: 100000,
        nom_percentage: 11.8
      },
      '2023': {
        revenue: 920000,
        wages: 320000,
        cogs: 370000,
        gross_profit: 550000,
        other_expenses: 110000,
        total_noi: 120000,
        nom_percentage: 13
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
      { type: 'SBA 7(a)', amount: 2000000, description: 'Standard SBA loan for business acquisition' },
      { type: 'Owner Financing', amount: 500000, description: 'Seller carry back financing' }
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
      { userId: 'user_5', role: 'loan_specialist' },
      { userId: 'user_9', role: 'bank_manager' }
    ]
  },
  {
    project_id: 'project_2',
    project_name: 'Riverside Development',
    project_type: 'Commercial Real Estate',
    loan_types: [
      { type: 'SBA 504', amount: 5000000, description: 'CDC/SBA loan for real estate acquisition' },
      { type: 'Conventional', amount: 1000000, description: 'Bank loan for additional funding' }
    ],
    loan_amount: 6000000,
    created_by: 'user_5',
    created_at: '2023-06-10T09:15:00Z',
    updated_at: '2023-07-05T11:45:00Z',
    city: 'Denver',
    state: 'CO',
    participants: [
      { userId: 'user_3', role: 'buyer' },
      { userId: 'user_7', role: 'seller' },
      { userId: 'user_4', role: 'bank_officer' },
      { userId: 'user_10', role: 'loan_specialist' }
    ]
  },
  {
    project_id: 'project_3',
    project_name: 'Harvest Valley Farms',
    project_type: 'Agricultural Business',
    loan_types: [
      { type: 'USDA Farm Loan', amount: 1200000, description: 'USDA guaranteed loan for agriculture' },
      { type: 'Equipment Financing', amount: 350000, description: 'Specialized equipment financing' },
      { type: 'Operating Line', amount: 150000, description: 'Line of credit for operations' }
    ],
    loan_amount: 1700000,
    created_by: 'user_9',
    created_at: '2023-08-22T14:30:00Z',
    updated_at: '2023-09-15T10:20:00Z',
    city: 'Boise',
    state: 'ID',
    participants: [
      { userId: 'user_6', role: 'buyer' },
      { userId: 'user_2', role: 'seller' },
      { userId: 'user_9', role: 'bank_manager' },
      { userId: 'user_5', role: 'loan_specialist' }
    ]
  },
  {
    project_id: 'project_4',
    project_name: 'Harbor View Hotel',
    project_type: 'Hospitality Acquisition',
    loan_types: [
      { type: 'SBA 7(a)', amount: 4500000, description: 'SBA loan for hotel acquisition' },
      { type: 'Mezzanine Financing', amount: 1000000, description: 'Additional gap financing' },
      { type: 'FF&E Loan', amount: 500000, description: 'Furniture, fixtures & equipment financing' }
    ],
    loan_amount: 6000000,
    created_by: 'user_4',
    created_at: '2023-10-05T11:00:00Z',
    updated_at: '2023-11-18T16:45:00Z',
    city: 'Portland',
    state: 'OR',
    participants: [
      { userId: 'user_8', role: 'buyer' },
      { userId: 'user_7', role: 'seller' },
      { userId: 'user_4', role: 'bank_officer' },
      { userId: 'user_10', role: 'loan_specialist' }
    ]
  },
  {
    project_id: 'project_5',
    project_name: 'Maple Street Manufacturing',
    project_type: 'Manufacturing Expansion',
    loan_types: [
      { type: 'Industrial Development Bond', amount: 3000000, description: 'Tax-exempt bond for manufacturing' },
      { type: 'Equipment Financing', amount: 1200000, description: 'CNC machine and production line financing' },
      { type: 'Working Capital', amount: 800000, description: 'Operating capital for expansion' }
    ],
    loan_amount: 5000000,
    created_by: 'user_5',
    created_at: '2023-12-12T09:30:00Z',
    updated_at: '2024-01-20T13:40:00Z',
    city: 'Cleveland',
    state: 'OH',
    participants: [
      { userId: 'user_3', role: 'buyer' },
      { userId: 'user_5', role: 'loan_specialist' },
      { userId: 'user_9', role: 'bank_manager' }
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
