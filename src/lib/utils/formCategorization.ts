
// Utility functions to categorize forms by entity type

export const businessForms = [
  'Business Financial Statement',
  'Business Tax Returns',
  'Business Plan',
  'Business Sale Agreement',
  'Asset Listing',
  'Bank Statements',
  'Profit & Loss Statement',
  'Balance Sheet',
  'Cash Flow Projection',
  'Lease Agreement',
  'Insurance Documentation',
  'Articles of Incorporation',
  'Operating Agreement',
  'Partnership Agreement',
  'Real Estate Purchase Agreement',
  'Environmental Assessment'
];

export const individualForms = [
  'Personal Financial Statement',
  'Personal Guarantee',
  'Background Check Authorization',
  'Credit Report Authorization'
];

// Participant to Entity Type mapping
export const participantEntityTypeMapping = {
  'borrowing_business': 'Business',
  'acquisition_business': 'Business',
  'affiliated_business': 'Business',
  'owners': 'Both',
  'sellers': 'Both'
} as const;

export type ParticipantType = keyof typeof participantEntityTypeMapping;
export type EntityTypeAssignment = typeof participantEntityTypeMapping[ParticipantType];

export const getFormsByEntityType = (entityType: 'Business' | 'Individual' | 'All'): string[] => {
  switch (entityType) {
    case 'Business':
      return businessForms;
    case 'Individual':
      return individualForms;
    case 'All':
      return [...businessForms, ...individualForms];
    default:
      return [...businessForms, ...individualForms];
  }
};

export const getFormEntityType = (formName: string): 'Business' | 'Individual' | 'Mixed' => {
  if (businessForms.includes(formName)) {
    return 'Business';
  }
  if (individualForms.includes(formName)) {
    return 'Individual';
  }
  return 'Mixed';
};

export const filterFormsByEntityType = (forms: string[], entityType: 'Business' | 'Individual' | 'All'): string[] => {
  if (entityType === 'All') {
    return forms;
  }
  
  const allowedForms = getFormsByEntityType(entityType);
  return forms.filter(form => allowedForms.includes(form));
};

// New helper functions for participant entity type mapping

export const getParticipantEntityType = (participantType: string): EntityTypeAssignment => {
  return participantEntityTypeMapping[participantType as ParticipantType] || 'Both';
};

export const getEntityTypeForParticipant = (participantType: string): 'Business' | 'Individual' | 'All' => {
  const assignment = getParticipantEntityType(participantType);
  
  switch (assignment) {
    case 'Business':
      return 'Business';
    case 'Both':
      return 'All';
    default:
      return 'All';
  }
};

export const getParticipantsByEntityType = (entityType: 'Business' | 'Individual' | 'Both'): string[] => {
  return Object.entries(participantEntityTypeMapping)
    .filter(([_, assignment]) => {
      if (entityType === 'Both') return assignment === 'Both';
      return assignment === entityType || assignment === 'Both';
    })
    .map(([participant, _]) => participant);
};

export const isParticipantValidForEntityType = (participantType: string, entityType: 'Business' | 'Individual'): boolean => {
  const assignment = getParticipantEntityType(participantType);
  return assignment === entityType || assignment === 'Both';
};
