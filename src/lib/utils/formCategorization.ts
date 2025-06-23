
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
