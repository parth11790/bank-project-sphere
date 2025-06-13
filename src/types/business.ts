
export interface BusinessFinancialData {
  data_id: string;
  business_id: string;
  year: string;
  revenue: number;
  wages: number;
  cogs: number;
  gross_profit: number;
  other_expenses: number;
  total_noi: number;
  nom_percentage: number;
  business_name?: string;
  entity_type?: string;
  years?: { 
    year: string; 
    revenue: number; 
    wages: number; 
    cogs: number; 
    gross_profit: number; 
    gross_margin: number; 
    other_expenses: number; 
    total_noi: number; 
    nom: number; 
  }[];
}

export interface Business {
  business_id: string;
  name: string;
  entity_type: string;
  description?: string;
  website?: string;
  founding_date?: string;
  founded_date?: string; // Added this property
  employee_count?: number;
  ein?: string;
  industry?: string; // Added this property
  email?: string; // Added this property
  
  // Additional business information fields
  dba_name?: string;
  naics_code?: string;
  phone?: string;
  primary_contact_name?: string;
  primary_contact_email?: string;
  special_ownership_type?: string;
  prior_year_sales?: number;
  current_year_sales?: number;
  is_startup?: boolean;
  months_in_business?: number;
  has_previous_sba_loan?: boolean;
  previous_sba_loan_details?: string;
  
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    country?: string;
  };
  
  // Additional address types
  project_address?: {
    street?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    country?: string;
  };
  
  mailing_address?: {
    street?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    country?: string;
  };
  
  notice_address?: {
    street?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    country?: string;
  };
  
  // Existing debt information
  existing_debt?: Array<{
    lender: string;
    original_amount: number;
    current_balance: number;
    payment: number;
    rate: number;
    maturity_date: string;
    collateral?: string;
    guarantors?: string;
    status: 'Current' | 'Delinquent' | 'Paid Off';
  }>;
  
  // Owner information (if this business is owned by someone)
  owner_id?: string;
  owner_type?: 'individual' | 'business';
  
  // Financial data
  financial_data?: Record<string, {
    revenue: number;
    wages: number;
    cogs: number;
    gross_profit: number;
    other_expenses: number;
    total_noi: number;
    nom_percentage: number;
  }>;
  
  // Documents and forms
  documents?: Array<{
    document_id: string;
    name: string;
  }>;
  forms?: Array<{
    form_id: string;
    name: string;
    status?: string;
  }>;
}

export interface ApiResponse {
  created_at: string;
  id: number;
  [key: string]: any;
}

// Type guard to check if an object is a Business
export function isBusiness(obj: Business | ApiResponse): obj is Business {
  return 'business_id' in obj && 'name' in obj && 'entity_type' in obj;
}
