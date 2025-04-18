
export interface CategoryOption {
  overall: string;
  category: string;
}

export const categoryOptions: CategoryOption[] = [
  { overall: 'purchase', category: 'businessAssets' },
  { overall: 'land', category: 'landAndBuilding' },
  { overall: 'construction', category: 'construction' },
  { overall: 'construction', category: 'plansAndPermits' },
  { overall: 'construction', category: 'archAndEng' },
  { overall: 'construction', category: 'contingency' },
  { overall: 'construction', category: 'supervisionFee' },
  { overall: 'construction', category: 'constructionSoftCosts' },
  { overall: 'construction', category: 'interestReserve' },
  { overall: 'inventory', category: 'inventory' },
  { overall: 'furnitureFixturesAndEquipment', category: 'equipment' },
  { overall: 'other', category: 'completionCommitment' },
  { overall: 'other', category: 'refinance' },
  { overall: 'softCosts', category: 'appraisals' },
  { overall: 'softCosts', category: 'epa' },
  { overall: 'softCosts', category: 'asbestosInspection' },
  { overall: 'softCosts', category: 'businessValuation' },
  { overall: 'softCosts', category: 'legalFees' },
  { overall: 'softCosts', category: 'sbaLoanPackagingFee' },
  { overall: 'softCosts', category: 'title' },
  { overall: 'softCosts', category: 'surveyUccSearches' },
  { overall: 'softCosts', category: 'vehicleTitleFees' },
  { overall: 'softCosts', category: 'sbaGuarantyFee' },
  { overall: 'softCosts', category: 'originationFee' },
  { overall: 'softCosts', category: 'softCosts' },
  { overall: 'workingCapital', category: 'workingCapital' },
  { overall: 'concessions', category: 'concessions' },
];

// Get unique overall categories
export const uniqueOverallCategories = [...new Set(categoryOptions.map(item => item.overall))];

