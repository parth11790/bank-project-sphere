
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
  
  // New structure: Main business and loans
  main_business?: Business;
  loans?: Loan[];
  
  // Sellers associated with project
  sellers?: Seller[];
  
  // Legacy participants for backward compatibility
  participants?: {
    id: string;
    role: string;
    user: User;
  }[];
  businesses?: Business[];
  documentIds?: string[];
  buyers?: string[];
  seller?: string;
}

export interface Loan {
  loan_id: string;
  loan_type: string;
  amount: number;
  term?: number;
  rate?: number;
  payment?: number;
  description?: string;
  business_id: string; // Assigned to main business
  status: 'active' | 'pending' | 'approved' | 'declined';
}

export interface Owner {
  owner_id: string;
  name: string;
  email?: string;
  type: 'individual' | 'business';
  ownership_percentage: number;
  role?: string;
  
  // If individual
  user_id?: string;
  
  // If business
  business_id?: string;
  
  // Associated businesses for this owner
  affiliated_businesses?: Business[];
  
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

export interface Seller {
  seller_id: string;
  name: string;
  email?: string;
  type: 'individual' | 'business';
  
  // If individual
  user_id?: string;
  
  // If business
  business_id?: string;
  
  // Associated businesses
  associated_businesses?: Business[];
  
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

// Helper functions
export const getLoanAmount = (loanType: LoanType | string): number => {
  if (typeof loanType === 'string') {
    return 0;
  }
  return loanType.amount || 0;
};

export const getStatusString = (status: string): string => {
  switch (status) {
    case 'active':
      return 'Active';
    case 'pending':
      return 'Pending';
    case 'completed':
      return 'Completed';
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
};

export const isProject = (obj: any): obj is Project => {
  return (
    obj &&
    typeof obj === 'object' &&
    'project_id' in obj &&
    'project_name' in obj &&
    'project_type' in obj
  );
};
