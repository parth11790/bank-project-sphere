import { format } from 'date-fns';

// Generate a date within the last year
const generateDate = () => {
  const now = new Date();
  const pastDate = new Date(now.setMonth(now.getMonth() - Math.floor(Math.random() * 12)));
  return pastDate.toISOString();
};

// Mock data for use of proceeds table
export const mockUseOfProceedsColumns = [
  { column_id: "col_1", column_name: "Main" },
  { column_id: "col_2", column_name: "Phase 1" },
  { column_id: "col_3", column_name: "Phase 2" }
];

export const mockUseOfProceedsRows = [
  { row_id: "row_1", row_name: "BUSINESS ACQUISITION", overall_category: "Acquisition" },
  { row_id: "row_2", row_name: "REAL ESTATE PURCHASE", overall_category: "Real Estate" },
  { row_id: "row_3", row_name: "WORKING CAPITAL", overall_category: "Working Capital" },
  { row_id: "row_4", row_name: "EQUIPMENT", overall_category: "Equipment" },
  { row_id: "row_5", row_name: "RENOVATIONS", overall_category: "Construction" },
  { row_id: "row_6", row_name: "REFINANCE", overall_category: "Refinance" },
  { row_id: "row_7", row_name: "INVENTORY", overall_category: "Inventory" },
  { row_id: "row_8", row_name: "TOTAL", overall_category: "Total" }
];

// Define valid loan types with descriptions
export const validLoanTypes = [
  { id: "7a", name: "7(a) GP", description: "General Purpose loan for various business needs" },
  { id: "504", name: "504", description: "For major fixed assets like real estate or equipment" },
  { id: "express", name: "Express", description: "Streamlined application for loans up to $500,000" },
  { id: "microloans", name: "Microloans", description: "Small loans up to $50,000" },
  { id: "caplines", name: "CAPLines", description: "Line of credit to help with cyclical working capital needs" },
  { id: "export", name: "Export", description: "Financing for businesses that export" },
  { id: "conventional", name: "Conventional", description: "Traditional bank loan with standard terms" },
];

// Banks data
export const banks = [
  { bank_id: "bank_1", bank_name: "First National Bank" },
  { bank_id: "bank_2", bank_name: "Metro Credit Union" },
  { bank_id: "bank_3", bank_name: "Community Trust Bank" },
];

// Helper function to get bank by ID
export const getBankById = (id: string) => {
  return banks.find(bank => bank.bank_id === id);
};

// Users data
export const users = [
  {
    user_id: "user_1",
    name: "John Smith",
    email: "john.smith@example.com",
    role: "bank_officer",
  },
  {
    user_id: "user_2",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    role: "loan_specialist",
  },
  {
    user_id: "user_3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    role: "buyer",
    business: "Downtown Café"
  },
  {
    user_id: "user_4",
    name: "Emily Chen",
    email: "emily.chen@example.com",
    role: "seller",
    business: "Chen's Hardware"
  },
  {
    user_id: "user_5",
    name: "Robert Garcia",
    email: "robert.garcia@example.com",
    role: "buyer",
    business: "Garcia Fitness"
  },
  {
    user_id: "user_6",
    name: "Jennifer Lee",
    email: "jennifer.lee@example.com",
    role: "seller",
    business: "Lee's Boutique"
  },
  {
    user_id: "user_7",
    name: "David Wilson",
    email: "david.wilson@example.com",
    role: "bank_manager",
  },
  {
    user_id: "user_8",
    name: "Amanda Martinez",
    email: "amanda.martinez@example.com",
    role: "buyer",
    business: "Martinez Construction"
  },
  {
    user_id: "user_9",
    name: "Thomas Wright",
    email: "thomas.wright@example.com",
    role: "seller",
    business: "Wright Electronics"
  },
  {
    user_id: "user_10",
    name: "Lisa Taylor",
    email: "lisa.taylor@example.com",
    role: "loan_specialist",
  },
];

// Business entity types
export const businessEntityTypes = [
  "Sole Proprietorship",
  "Partnership",
  "Limited Liability Company (LLC)",
  "C Corporation",
  "S Corporation",
  "Non-Profit",
];

// Define business data
export const businesses = [
  {
    business_id: "biz_1",
    name: "Downtown Café",
    owner_id: "user_3",
    entity_type: "Limited Liability Company (LLC)",
    years_in_business: 5,
    annual_revenue: 420000,
    employee_count: 12,
    industry: "Food & Beverage",
    financial_data: {
      "2021": {
        revenue: 380000,
        wages: 145000,
        cogs: 140000,
        gross_profit: 240000,
        other_expenses: 38000,
        total_noi: 202000,
        nom_percentage: 53.2
      },
      "2022": {
        revenue: 420000,
        wages: 160000,
        cogs: 151000,
        gross_profit: 269000,
        other_expenses: 42000,
        total_noi: 227000,
        nom_percentage: 54.0
      },
      "2023": {
        revenue: 450000,
        wages: 175000,
        cogs: 162000,
        gross_profit: 288000,
        other_expenses: 45000,
        total_noi: 243000,
        nom_percentage: 54.0
      }
    }
  },
  {
    business_id: "biz_2",
    name: "Chen's Hardware",
    owner_id: "user_4",
    entity_type: "S Corporation",
    years_in_business: 15,
    annual_revenue: 1200000,
    employee_count: 8,
    industry: "Retail",
    financial_data: {
      "2021": {
        revenue: 1050000,
        wages: 350000,
        cogs: 630000,
        gross_profit: 420000,
        other_expenses: 105000,
        total_noi: 315000,
        nom_percentage: 30.0
      },
      "2022": {
        revenue: 1125000,
        wages: 380000,
        cogs: 675000,
        gross_profit: 450000,
        other_expenses: 122000,
        total_noi: 328000,
        nom_percentage: 29.2
      },
      "2023": {
        revenue: 1200000,
        wages: 400000,
        cogs: 710000,
        gross_profit: 490000,
        other_expenses: 134000,
        total_noi: 356000,
        nom_percentage: 29.7
      }
    }
  },
  {
    business_id: "biz_3",
    name: "Garcia Fitness",
    owner_id: "user_5",
    entity_type: "Sole Proprietorship",
    years_in_business: 3,
    annual_revenue: 320000,
    employee_count: 6,
    industry: "Health & Fitness",
    financial_data: {
      "2021": {
        revenue: 280000,
        wages: 112000,
        cogs: 84000,
        gross_profit: 196000,
        other_expenses: 56000,
        total_noi: 140000,
        nom_percentage: 50.0
      },
      "2022": {
        revenue: 305000,
        wages: 122000,
        cogs: 91500,
        gross_profit: 213500,
        other_expenses: 61000,
        total_noi: 152500,
        nom_percentage: 50.0
      },
      "2023": {
        revenue: 320000,
        wages: 128000,
        cogs: 96000,
        gross_profit: 224000,
        other_expenses: 64000,
        total_noi: 160000,
        nom_percentage: 50.0
      }
    }
  },
  {
    business_id: "biz_4",
    name: "Lee's Boutique",
    owner_id: "user_6",
    entity_type: "Limited Liability Company (LLC)",
    years_in_business: 7,
    annual_revenue: 680000,
    employee_count: 5,
    industry: "Retail",
    financial_data: {
      "2021": {
        revenue: 625000,
        wages: 187500,
        cogs: 312500,
        gross_profit: 312500,
        other_expenses: 93750,
        total_noi: 218750,
        nom_percentage: 35.0
      },
      "2022": {
        revenue: 650000,
        wages: 195000,
        cogs: 325000,
        gross_profit: 325000,
        other_expenses: 97500,
        total_noi: 227500,
        nom_percentage: 35.0
      },
      "2023": {
        revenue: 680000,
        wages: 204000,
        cogs: 340000,
        gross_profit: 340000,
        other_expenses: 102000,
        total_noi: 238000,
        nom_percentage: 35.0
      }
    }
  },
  {
    business_id: "biz_5",
    name: "Martinez Construction",
    owner_id: "user_8",
    entity_type: "C Corporation",
    years_in_business: 12,
    annual_revenue: 2500000,
    employee_count: 25,
    industry: "Construction",
    financial_data: {
      "2021": {
        revenue: 2200000,
        wages: 880000,
        cogs: 1100000,
        gross_profit: 1100000,
        other_expenses: 330000,
        total_noi: 770000,
        nom_percentage: 35.0
      },
      "2022": {
        revenue: 2350000,
        wages: 940000,
        cogs: 1175000,
        gross_profit: 1175000,
        other_expenses: 352500,
        total_noi: 822500,
        nom_percentage: 35.0
      },
      "2023": {
        revenue: 2500000,
        wages: 1000000,
        cogs: 1250000,
        gross_profit: 1250000,
        other_expenses: 375000,
        total_noi: 875000,
        nom_percentage: 35.0
      }
    }
  },
  {
    business_id: "biz_6",
    name: "Wright Electronics",
    owner_id: "user_9",
    entity_type: "S Corporation",
    years_in_business: 10,
    annual_revenue: 1700000,
    employee_count: 15,
    industry: "Electronics",
    financial_data: {
      "2021": {
        revenue: 1500000,
        wages: 600000,
        cogs: 750000,
        gross_profit: 750000,
        other_expenses: 225000,
        total_noi: 525000,
        nom_percentage: 35.0
      },
      "2022": {
        revenue: 1600000,
        wages: 640000,
        cogs: 800000,
        gross_profit: 800000,
        other_expenses: 240000,
        total_noi: 560000,
        nom_percentage: 35.0
      },
      "2023": {
        revenue: 1700000,
        wages: 680000,
        cogs: 850000,
        gross_profit: 850000,
        other_expenses: 255000,
        total_noi: 595000,
        nom_percentage: 35.0
      }
    }
  }
];

// Define all required documents
export const individualEntityForms = [
  { id: "form_1", name: "Personal Information Form", type: "individual" },
  { id: "form_2", name: "Intent Form", type: "individual" },
  { id: "form_3", name: "Personal Financial Statement", type: "individual" },
  { id: "form_4", name: "Resume", type: "individual" },
  { id: "form_5", name: "Tax Returns", type: "individual" },
  { id: "form_6", name: "Acquisition Questionnaire", type: "individual" },
  { id: "form_7", name: "Broker Listing Form", type: "individual" },
];

export const businessEntityForms = [
  { id: "form_8", name: "Tax Returns", type: "business" },
  { id: "form_9", name: "Balance Sheet", type: "business" },
  { id: "form_10", name: "Profit & Loss Report", type: "business" },
  { id: "form_11", name: "Accounts Receivable & Accounts Payable", type: "business" },
  { id: "form_12", name: "Inventory and Equipment List", type: "business" },
  { id: "form_13", name: "Broker Listing", type: "business" },
  { id: "form_14", name: "Acquisition Questionnaire", type: "business" },
  { id: "form_15", name: "Business Debt Schedule", type: "business" },
  { id: "form_16", name: "K1 Schedules", type: "business" },
];

// Projects data with enhanced loan information
export const projects = [
  {
    project_id: "proj_1",
    project_name: "Downtown Café Acquisition",
    project_type: "Business Acquisition",
    loan_types: [
      {
        type: "7(a) GP", 
        amount: 240000,
        description: "For business acquisition and working capital"
      },
      {
        type: "Express", 
        amount: 110000,
        description: "For equipment and renovations"
      }
    ],
    loan_amount: 350000,
    created_by: "user_1",
    created_at: generateDate(),
    updated_at: generateDate(),
    city: "San Francisco",
    state: "CA",
    participants: [
      { userId: "user_3", role: "buyer" },
      { userId: "user_4", role: "seller" },
      { userId: "user_1", role: "bank_officer" },
      { userId: "user_2", role: "loan_specialist" }
    ]
  },
  {
    project_id: "proj_2",
    project_name: "Lee's Boutique Expansion",
    project_type: "Business Expansion",
    loan_types: [
      {
        type: "504", 
        amount: 550000,
        description: "For real estate acquisition"
      },
      {
        type: "Express", 
        amount: 150000,
        description: "For inventory and working capital"
      }
    ],
    loan_amount: 700000,
    created_by: "user_2",
    created_at: generateDate(),
    updated_at: generateDate(),
    city: "Portland",
    state: "OR",
    participants: [
      { userId: "user_6", role: "seller" },
      { userId: "user_5", role: "buyer" },
      { userId: "user_2", role: "loan_specialist" },
      { userId: "user_7", role: "bank_manager" }
    ]
  },
  {
    project_id: "proj_3",
    project_name: "Wright Electronics Refinance",
    project_type: "Debt Refinancing",
    loan_types: [
      {
        type: "7(a) GP", 
        amount: 850000,
        description: "For debt consolidation"
      },
      {
        type: "Express", 
        amount: 75000,
        description: "For working capital"
      }
    ],
    loan_amount: 925000,
    created_by: "user_1",
    created_at: generateDate(),
    updated_at: generateDate(),
    city: "Austin",
    state: "TX",
    participants: [
      { userId: "user_9", role: "seller" },
      { userId: "user_1", role: "bank_officer" },
      { userId: "user_10", role: "loan_specialist" }
    ]
  },
  {
    project_id: "proj_4",
    project_name: "Martinez Construction Equipment",
    project_type: "Equipment Purchase",
    loan_types: [
      {
        type: "504", 
        amount: 1200000,
        description: "For heavy equipment purchase"
      }
    ],
    loan_amount: 1200000,
    created_by: "user_4",
    created_at: generateDate(),
    updated_at: generateDate(),
    city: "Denver",
    state: "CO",
    participants: [
      { userId: "user_8", role: "buyer" },
      { userId: "user_7", role: "bank_manager" },
      { userId: "user_10", role: "loan_specialist" }
    ]
  },
  {
    project_id: "proj_5",
    project_name: "Garcia Fitness New Location",
    project_type: "Real Estate Purchase",
    loan_types: [
      {
        type: "504", 
        amount: 620000,
        description: "For real estate acquisition"
      },
      {
        type: "Conventional", 
        amount: 180000,
        description: "For renovations and equipment"
      },
      {
        type: "Express", 
        amount: 100000,
        description: "For working capital and initial expenses"
      }
    ],
    loan_amount: 900000,
    created_by: "user_2",
    created_at: generateDate(),
    updated_at: generateDate(),
    city: "Chicago",
    state: "IL",
    participants: [
      { userId: "user_5", role: "buyer" },
      { userId: "user_2", role: "loan_specialist" },
      { userId: "user_1", role: "bank_officer" }
    ]
  },
];

// Helper functions
export const getBusinessById = (id: string) => {
  return businesses.find(business => business.business_id === id);
};

export const getBusinessByOwnerId = (ownerId: string) => {
  return businesses.find(business => business.owner_id === ownerId);
};

export const getUserById = (id: string) => {
  return users.find(user => user.user_id === id);
};

export const getProjectById = (id: string) => {
  return projects.find(project => project.project_id === id);
};

// Use of Proceeds data for projects
export const useOfProceedsData = {
  proj_1: [
    { id: 1, overall_category: "Acquisition", row_name: "BUSINESS ACQUISITION", value: 280000 },
    { id: 2, overall_category: "Working Capital", row_name: "WORKING CAPITAL", value: 40000 },
    { id: 3, overall_category: "Construction", row_name: "RENOVATIONS", value: 30000 },
  ],
  proj_2: [
    { id: 1, overall_category: "Real Estate", row_name: "REAL ESTATE PURCHASE", value: 550000 },
    { id: 2, overall_category: "Working Capital", row_name: "INVENTORY", value: 100000 },
    { id: 3, overall_category: "Working Capital", row_name: "WORKING CAPITAL", value: 50000 },
  ],
  proj_3: [
    { id: 1, overall_category: "Refinance", row_name: "REFINANCE", value: 850000 },
    { id: 2, overall_category: "Working Capital", row_name: "WORKING CAPITAL", value: 75000 },
  ],
  proj_4: [
    { id: 1, overall_category: "Equipment", row_name: "EQUIPMENT PURCHASE", value: 1200000 },
  ],
  proj_5: [
    { id: 1, overall_category: "Real Estate", row_name: "REAL ESTATE PURCHASE", value: 620000 },
    { id: 2, overall_category: "Construction", row_name: "RENOVATIONS", value: 150000 },
    { id: 3, overall_category: "Equipment", row_name: "EQUIPMENT", value: 30000 },
    { id: 4, overall_category: "Working Capital", row_name: "WORKING CAPITAL", value: 100000 },
  ],
};

export const getUseOfProceedsForProject = (projectId: string) => {
  return useOfProceedsData[projectId as keyof typeof useOfProceedsData] || [];
};
