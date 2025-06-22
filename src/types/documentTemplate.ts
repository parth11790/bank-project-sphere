
export interface DocumentGatheringTemplate {
  id: string;
  templateName: string;
  loanType: string;
  amountMin: number;
  amountMax: number;
  participant: 'borrowing_business' | 'affiliated_business' | 'owners' | 'sellers';
  forms: string[];
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
