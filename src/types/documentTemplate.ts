
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
    acquisition_business: string[];
  };
  ownershipThresholds?: {
    affiliated_business: { min: number; max: number };
    owners: { min: number; max: number };
    sellers: { min: number; max: number };
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
