
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
  status: 'active' | 'pending' | 'completed' | string;
  loan_types: LoanType[];
  loan_amount: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  city?: string;
  state?: string;
  participants: { userId: string; role: string }[];
}
