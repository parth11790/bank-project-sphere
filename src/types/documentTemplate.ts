
export interface DocumentGatheringTemplate {
  id: string;
  templateName: string;
  loanType: string;
  amountMin: number;
  amountMax: number;
  participantForms: {
    borrowing_business: string[];
    affiliated_business: string[];
    owners: string[];
    sellers: string[];
  };
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  isActive: boolean;
}

export interface TemplateFormAssignment {
  templateId: string;
  participantType: string;
  formIds: string[];
}
