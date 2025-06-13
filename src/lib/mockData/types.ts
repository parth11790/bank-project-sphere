
import { User } from '@/types/user';
import { Business } from '@/types/business';

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

// Re-export the User and Business types
export { User, Business };
