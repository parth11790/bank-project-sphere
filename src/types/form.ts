export interface Form {
  form_id: string;
  name: string;
  status?: 'submitted' | 'pending' | 'overdue';
}

export interface FormTemplate {
  form_id: string;
  name: string;
  entity_type: string;
  status?: 'submitted' | 'pending' | 'overdue';
}

export interface Document {
  document_id: string;
  name: string;
  status?: 'submitted' | 'pending';
  entity_type?: string;
}

export interface ApiResponse {
  created_at: string;
  id: number;
  [key: string]: any;
}

export interface AnalysisData {
  buyerIncome: {
    netWorth: number;
    requiredSalary: number;
    availableCashForDebt: number;
  };
  businessCashFlow: {
    averageCashFlow: number;
    debtServiceRatioBeforeOC: number;
    debtServiceRatioAfterOC: number;
  };
}

export function isForm(obj: any): obj is Form {
  return 'form_id' in obj && 'name' in obj;
}

export function isFormTemplate(obj: any): obj is FormTemplate {
  return 'form_id' in obj && 'name' in obj && 'entity_type' in obj;
}
