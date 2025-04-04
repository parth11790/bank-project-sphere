
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
  owner_id: string;
  entity_type: string;
  description?: string;
  website?: string;
  founding_date?: string;
  employee_count?: number;
  title?: string; // Owner's title in the business
  ownership_percentage?: number; // Ownership percentage
  financial_data?: Record<string, {
    revenue: number;
    wages: number;
    cogs: number;
    gross_profit: number;
    other_expenses: number;
    total_noi: number;
    nom_percentage: number;
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
