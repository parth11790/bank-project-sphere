// Mock data for development purposes

// Generate a random ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Generate a random date within the past year
const generateDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 365));
  return date.toISOString();
};

// Mock banks data
export const banks = [
  {
    bank_id: "bank_1",
    bank_name: "First National Bank",
  },
  {
    bank_id: "bank_2",
    bank_name: "Metropolitan Trust",
  },
  {
    bank_id: "bank_3",
    bank_name: "Coastal Credit Union",
  },
];

// Mock users data
export const users = [
  {
    user_id: "user_1",
    email: "john.smith@firstnational.com",
    name: "John Smith",
    role: "bank_employee",
    bank_id: "bank_1",
    otp_enabled: true,
  },
  {
    user_id: "user_2",
    email: "alice.jones@metropolitan.com",
    name: "Alice Jones",
    role: "bank_employee",
    bank_id: "bank_2",
    otp_enabled: false,
  },
  {
    user_id: "user_3",
    email: "robert.chen@buyer.com",
    name: "Robert Chen",
    role: "buyer",
    bank_id: "bank_1",
    otp_enabled: true,
  },
  {
    user_id: "user_4",
    email: "sarah.miller@coastal.com",
    name: "Sarah Miller",
    role: "bank_employee",
    bank_id: "bank_3",
    otp_enabled: false,
  },
  {
    user_id: "user_5",
    email: "michael.johnson@seller.com",
    name: "Michael Johnson",
    role: "seller",
    bank_id: "bank_2",
    otp_enabled: true,
  },
];

// Mock projects data with updated project types
export const projects = [
  {
    project_id: "proj_1",
    project_name: "Downtown Heights",
    project_type: "Expansion",
    loan_types: ["Commercial", "Development"],
    loan_amount: 5000000,
    created_by: "user_1",
    created_at: generateDate(),
    updated_at: generateDate(),
  },
  {
    project_id: "proj_2",
    project_name: "Riverside Apartments",
    project_type: "Acquisition",
    loan_types: ["Residential", "Multi-Family"],
    loan_amount: 8500000,
    created_by: "user_2",
    created_at: generateDate(),
    updated_at: generateDate(),
  },
  {
    project_id: "proj_3",
    project_name: "Tech Park Development",
    project_type: "Start up",
    loan_types: ["Commercial"],
    loan_amount: 12000000,
    created_by: "user_1",
    created_at: generateDate(),
    updated_at: generateDate(),
  },
  {
    project_id: "proj_4",
    project_name: "Green Valley Homes",
    project_type: "Refi",
    loan_types: ["Residential", "Development"],
    loan_amount: 3200000,
    created_by: "user_4",
    created_at: generateDate(),
    updated_at: generateDate(),
  },
  {
    project_id: "proj_5",
    project_name: "City Center Office Complex",
    project_type: "Acquisition",
    loan_types: ["Commercial"],
    loan_amount: 22000000,
    created_by: "user_2",
    created_at: generateDate(),
    updated_at: generateDate(),
  },
];

// Mock use of proceeds columns
export const mockUseOfProceedsColumns = [
  {
    column_id: "col_1",
    column_name: "BORROWER EQUITY",
    bank_id: "bank_1",
  },
  {
    column_id: "col_2",
    column_name: "LOAN PROCEEDS",
    bank_id: "bank_1",
  },
  {
    column_id: "col_3",
    column_name: "TOTAL PROJECT COST",
    bank_id: "bank_1",
  },
];

// Mock use of proceeds rows
export const mockUseOfProceedsRows = [
  {
    row_id: "row_1",
    row_name: "LAND ACQUISITION",
    row_order: 1,
  },
  {
    row_id: "row_2",
    row_name: "BUSINESS ASSETS",
    row_order: 2,
  },
  {
    row_id: "row_3",
    row_name: "CONSTRUCTION HARD COSTS",
    row_order: 3,
  },
  {
    row_id: "row_4",
    row_name: "SOFT COSTS",
    row_order: 4,
  },
  {
    row_id: "row_5",
    row_name: "WORKING CAPITAL",
    row_order: 5,
  },
  {
    row_id: "row_6",
    row_name: "RESERVES",
    row_order: 6,
  },
  {
    row_id: "row_7",
    row_name: "TOTAL",
    row_order: 7,
  },
];

// Mock use of proceeds data
export const mockUseOfProceeds = {
  proj_1: [
    {
      proceeds_id: "proc_1",
      project_id: "proj_1",
      column_name: "BORROWER EQUITY",
      row_name: "LAND ACQUISITION",
      value: 1000000,
    },
    {
      proceeds_id: "proc_2",
      project_id: "proj_1",
      column_name: "LOAN PROCEEDS",
      row_name: "LAND ACQUISITION",
      value: 0,
    },
    {
      proceeds_id: "proc_3",
      project_id: "proj_1",
      column_name: "TOTAL PROJECT COST",
      row_name: "LAND ACQUISITION",
      value: 1000000,
    },
    {
      proceeds_id: "proc_4",
      project_id: "proj_1",
      column_name: "BORROWER EQUITY",
      row_name: "CONSTRUCTION HARD COSTS",
      value: 500000,
    },
    {
      proceeds_id: "proc_5",
      project_id: "proj_1",
      column_name: "LOAN PROCEEDS",
      row_name: "CONSTRUCTION HARD COSTS",
      value: 3000000,
    },
    {
      proceeds_id: "proc_6",
      project_id: "proj_1",
      column_name: "TOTAL PROJECT COST",
      row_name: "CONSTRUCTION HARD COSTS",
      value: 3500000,
    },
    {
      proceeds_id: "proc_7",
      project_id: "proj_1",
      column_name: "BORROWER EQUITY",
      row_name: "SOFT COSTS",
      value: 250000,
    },
    {
      proceeds_id: "proc_8",
      project_id: "proj_1",
      column_name: "LOAN PROCEEDS",
      row_name: "SOFT COSTS",
      value: 750000,
    },
    {
      proceeds_id: "proc_9",
      project_id: "proj_1",
      column_name: "TOTAL PROJECT COST",
      row_name: "SOFT COSTS",
      value: 1000000,
    },
    {
      proceeds_id: "proc_10",
      project_id: "proj_1",
      column_name: "BORROWER EQUITY",
      row_name: "WORKING CAPITAL",
      value: 0,
    },
    {
      proceeds_id: "proc_11",
      project_id: "proj_1",
      column_name: "LOAN PROCEEDS",
      row_name: "WORKING CAPITAL",
      value: 500000,
    },
    {
      proceeds_id: "proc_12",
      project_id: "proj_1",
      column_name: "TOTAL PROJECT COST",
      row_name: "WORKING CAPITAL",
      value: 500000,
    },
    {
      proceeds_id: "proc_13",
      project_id: "proj_1",
      column_name: "BORROWER EQUITY",
      row_name: "RESERVES",
      value: 0,
    },
    {
      proceeds_id: "proc_14",
      project_id: "proj_1",
      column_name: "LOAN PROCEEDS",
      row_name: "RESERVES",
      value: 750000,
    },
    {
      proceeds_id: "proc_15",
      project_id: "proj_1",
      column_name: "TOTAL PROJECT COST",
      row_name: "RESERVES",
      value: 750000,
    },
    {
      proceeds_id: "proc_16",
      project_id: "proj_1",
      column_name: "BORROWER EQUITY",
      row_name: "TOTAL",
      value: 1750000,
    },
    {
      proceeds_id: "proc_17",
      project_id: "proj_1",
      column_name: "LOAN PROCEEDS",
      row_name: "TOTAL",
      value: 5000000,
    },
    {
      proceeds_id: "proc_18",
      project_id: "proj_1",
      column_name: "TOTAL PROJECT COST",
      row_name: "TOTAL",
      value: 6750000,
    },
  ],
  proj_2: [
    {
      proceeds_id: "proc_19",
      project_id: "proj_2",
      column_name: "BORROWER EQUITY",
      row_name: "LAND ACQUISITION",
      value: 2000000,
    },
    {
      proceeds_id: "proc_20",
      project_id: "proj_2",
      column_name: "LOAN PROCEEDS",
      row_name: "LAND ACQUISITION",
      value: 6500000,
    },
    {
      proceeds_id: "proc_21",
      project_id: "proj_2",
      column_name: "TOTAL PROJECT COST",
      row_name: "LAND ACQUISITION",
      value: 8500000,
    },
  ],
};

// Helper function to get user by ID
export const getUserById = (userId: string) => {
  return users.find(user => user.user_id === userId);
};

// Helper function to get bank by ID
export const getBankById = (bankId: string) => {
  return banks.find(bank => bank.bank_id === bankId);
};

// Helper function to get project by ID
export const getProjectById = (projectId: string) => {
  return projects.find(project => project.project_id === projectId);
};

// Helper function to get proceeds for a project
export const getUseOfProceedsForProject = (projectId: string) => {
  return mockUseOfProceeds[projectId as keyof typeof mockUseOfProceeds] || [];
};
