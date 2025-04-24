
export interface LoanSetting {
  id: string;
  loanType: string;
  amountMin: number;
  amountMax: number;
  interestRate: number;
  term: number;
  amortization: number;
  softCostPercentage: number;
  requiredForms?: {
    borrower: string[];
    buyer?: string[];
    seller?: string[];
    guarantor?: string[];
  };
  requiredDocuments: {
    creditCheck: boolean;
    backgroundCheck: boolean;
    bankruptcyReport: boolean;
    underwritingDocuments: boolean;
    closingReport: boolean;
  };
}

export interface DocumentRequirement {
  id: string;
  loanType: string;
  participantType: string;
  formName: string;
  loanAmountMin: number;
  loanAmountMax: number;
  description?: string;
  isRequired: boolean;
  documentGenerationType: string[];
}
