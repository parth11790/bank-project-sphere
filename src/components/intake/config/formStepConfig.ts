
import NewLeadForm from '../forms/NewLeadForm';
import EligibilityQuestionnaire from '../forms/EligibilityQuestionnaire';
import OwnershipForm from '../forms/OwnershipForm';
import PreApprovalLetter from '../PreApprovalLetter';
import { FormStep } from '../types/intakeTypes';

export const formStepConfig: FormStep[] = [
  { id: 'lead', title: 'New Lead', component: NewLeadForm },
  { id: 'eligibility', title: 'Eligibility', component: EligibilityQuestionnaire },
  { id: 'ownership', title: 'Ownership', component: OwnershipForm },
  { id: 'preapproval', title: 'Pre-Approval', component: PreApprovalLetter }
];
