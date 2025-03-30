
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

// A helper function to get the loan amount from either a string or LoanType object
export const getLoanAmount = (loanType: LoanType | string): number => {
  if (typeof loanType === 'string') {
    // If it's a string, we can't determine the amount, return 0
    return 0;
  }
  return loanType.amount || 0;
};

// Add the missing getStatusString function
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

// Add the missing isProject type guard
export const isProject = (obj: any): obj is Project => {
  return (
    obj &&
    typeof obj === 'object' &&
    'project_id' in obj &&
    'project_name' in obj &&
    'project_type' in obj
  );
};
