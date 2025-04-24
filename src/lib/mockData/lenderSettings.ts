import { LoanSetting, DocumentRequirement } from '@/types/lenderSettings';

export const loanTypes = [
  "SBA 7(a)",
  "SBA 504",
  "Commercial Real Estate",
  "Business Acquisition",
  "Equipment Financing",
  "Working Capital",
  "Line of Credit"
];

export const initialLoanSettings: LoanSetting[] = [
  {
    id: "1",
    loanType: "SBA 7(a)",
    amountMin: 50000,
    amountMax: 500000,
    interestRate: 7.5,
    term: 10,
    amortization: 120,
    softCostPercentage: 3.5,
    requiredForms: {
      borrower: ["Personal Financial Statement", "Business Financial Statement"],
      seller: ["Business Sale Agreement"],
    },
    requiredDocuments: {
      creditCheck: true,
      backgroundCheck: true,
      underwritingDocuments: true,
      bankruptcyReport: false,
      closingReport: false
    }
  },
  {
    id: "2",
    loanType: "SBA 7(a)",
    amountMin: 500001,
    amountMax: 5000000,
    interestRate: 6.75,
    term: 25,
    amortization: 300,
    softCostPercentage: 3.0,
    requiredForms: {
      borrower: ["Personal Financial Statement", "Business Financial Statement", "Tax Returns (3 years)"],
      seller: ["Business Sale Agreement", "Financial Documentation"],
      guarantor: ["Personal Guarantee"]
    },
    requiredDocuments: {
      creditCheck: true,
      backgroundCheck: true,
      bankruptcyReport: true,
      underwritingDocuments: true,
      closingReport: true
    }
  },
  {
    id: "3",
    loanType: "SBA 504",
    amountMin: 125000,
    amountMax: 5000000,
    interestRate: 5.25,
    term: 20,
    amortization: 240,
    softCostPercentage: 2.75,
    requiredForms: {
      borrower: ["SBA Form 1244", "Personal Financial Statement", "Business Plan"],
    },
    requiredDocuments: {
      creditCheck: true,
      underwritingDocuments: true,
      closingReport: true,
      backgroundCheck: false,
      bankruptcyReport: false
    }
  }
];

export const initialDocumentRequirements: DocumentRequirement[] = [
  {
    id: "1",
    loanType: "SBA 7(a)",
    participantType: "Borrower",
    formName: "Personal Financial Statement",
    documentGenerationType: ["Credit Check", "Underwriting Documents"],
    isRequired: true,
    loanAmountMin: 0,
    loanAmountMax: 5000000
  },
  {
    id: "2",
    loanType: "SBA 7(a)",
    participantType: "Borrower",
    formName: "Business Financial Statement",
    documentGenerationType: ["Underwriting Documents"],
    isRequired: true,
    loanAmountMin: 0,
    loanAmountMax: 5000000
  },
  {
    id: "3",
    loanType: "SBA 504",
    participantType: "Seller",
    formName: "Business Sale Agreement",
    documentGenerationType: ["Closing Report"],
    isRequired: true,
    loanAmountMin: 0,
    loanAmountMax: 5000000
  }
];
