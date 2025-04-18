export interface CategoryOption {
  overall: string;
  category: string;
}

// Purchase related categories
const purchaseCategories: CategoryOption[] = [
  { overall: 'purchase', category: 'businessAssets' },
];

// Land related categories
const landCategories: CategoryOption[] = [
  { overall: 'land', category: 'landAndBuilding' },
];

// Construction related categories
const constructionCategories: CategoryOption[] = [
  { overall: 'construction', category: 'construction' },
  { overall: 'construction', category: 'plansAndPermits' },
  { overall: 'construction', category: 'archAndEng' },
  { overall: 'construction', category: 'contingency' },
  { overall: 'construction', category: 'supervisionFee' },
  { overall: 'construction', category: 'constructionSoftCosts' },
  { overall: 'construction', category: 'interestReserve' },
];

// Inventory related categories
const inventoryCategories: CategoryOption[] = [
  { overall: 'inventory', category: 'inventory' },
];

// Furniture, fixtures and equipment related categories
const ffandECategories: CategoryOption[] = [
  { overall: 'furnitureFixturesAndEquipment', category: 'equipment' },
];

// Other categories
const otherCategories: CategoryOption[] = [
  { overall: 'other', category: 'completionCommitment' },
  { overall: 'other', category: 'refinance' },
];

// Soft costs related categories
const softCostsCategories: CategoryOption[] = [
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
];

// Working capital related categories
const workingCapitalCategories: CategoryOption[] = [
  { overall: 'workingCapital', category: 'workingCapital' },
];

// Concessions related categories
const concessionsCategories: CategoryOption[] = [
  { overall: 'concessions', category: 'concessions' },
];

// Combine all categories
export const categoryOptions: CategoryOption[] = [
  ...purchaseCategories,
  ...landCategories,
  ...constructionCategories,
  ...inventoryCategories,
  ...ffandECategories,
  ...otherCategories,
  ...softCostsCategories,
  ...workingCapitalCategories,
  ...concessionsCategories,
];

// Get unique overall categories
export const uniqueOverallCategories = [...new Set(categoryOptions.map(item => item.overall))];

// Helper functions to get categories by overall type
export const getCategoriesByOverallType = (overallType: string): string[] => {
  return categoryOptions
    .filter(option => option.overall === overallType)
    .map(option => option.category);
};

// Get a category's overall type
export const getOverallTypeForCategory = (category: string): string | undefined => {
  const option = categoryOptions.find(opt => opt.category === category);
  return option?.overall;
};
