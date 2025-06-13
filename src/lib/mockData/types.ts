import { User } from './user';
import { Business } from './business';

export type LoanType = {
  type: string;
  amount: number;
  term?: number;
  rate?: number;
  payment?: number;
  description?: string;
};

export interface Project {
  project_id: string;
  project_name: string;
  project_type: string;
  status: 'active' | 'pending' | 'completed' | string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  created_by_user?: User;
  description?: string;
  loan_amount: number;
  loan_types: (LoanType | string)[];
  category?: string;
  city?: string;
  state?: string;
  location?: string;
  
  // New structure fields
  main_business?: any;
  loans?: any[];
  sellers?: any[];
  
  // Legacy participants for backward compatibility
  participants?: Array<{
    userId: string;
    role: string;
  }>;
  businesses?: any[];
  documentIds?: string[];
  buyers?: string[];
  seller?: string;
}

export interface LoanType {
  type: string;
  amount: number;
  term?: number;
  rate?: number;
  payment?: number;
  description?: string;
}

export interface User {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  title?: string;
  avatar?: string;
  status?: string;
  role?: string;
  permissions?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Business {
  business_id: string;
  name: string;
  entity_type: string;
  description?: string;
  website?: string;
  founding_date?: string;
  employee_count?: number;
  
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
  }>;
}
