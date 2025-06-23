
export interface OwnershipRange {
  id: string;
  min: number;
  max: number;
  forms: string[];
}

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
  ownershipRanges?: {
    affiliated_business: OwnershipRange[];
    owners: OwnershipRange[];
    sellers: OwnershipRange[];
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
