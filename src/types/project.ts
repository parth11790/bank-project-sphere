
export interface LoanType {
  type: string;
  amount: number;
  description: string;
}

export interface Project {
  project_id: string;
  project_name: string;
  project_type: string;
  status?: string;
  description?: string;
  loan_types: (LoanType | string)[];
  loan_amount: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  city?: string;
  state?: string;
  location?: string;
  created_by_user?: { 
    name: string 
  };
  participants?: Array<{ 
    userId: string; 
    role: string 
  }>;
}

export interface ApiResponse {
  created_at: string;
  id: number;
  [key: string]: any;
}

// Type guard to check if an object is a Project
export function isProject(obj: Project | ApiResponse): obj is Project {
  return 'project_id' in obj && 'project_name' in obj;
}
