
// Define the category options based on the user's requirements
export const categoryOptions = [
  { overall: 'Purchase', category: 'BUSINESS ASSETS' },
  { overall: 'Land', category: 'LAND & BUILDING' },
  { overall: 'Construction', category: 'CONSTRUCTION' },
  { overall: 'Construction', category: 'PLANS AND PERMITS' },
  { overall: 'Construction', category: 'ARCH. & ENG.' },
  { overall: 'Construction', category: 'CONTINGENCY' },
  { overall: 'Construction', category: 'SUPERVISION FEE' },
  { overall: 'Construction', category: 'CONSTRUCTION SOFT COSTS' },
  { overall: 'Construction', category: 'INTEREST RESERVE' },
  { overall: 'INVentory', category: 'INVENTORY' },
  { overall: 'Furniture Fixtures and Equipment', category: 'EQUIPMENT' },
  { overall: 'Other', category: 'COMPLETION COMMITMENT' },
  { overall: 'Other', category: 'REFINANCE' },
  { overall: 'Soft Costs', category: 'APPRAISALS' },
  { overall: 'Soft Costs', category: 'EPA' },
  { overall: 'Soft Costs', category: 'ASBESTOS INSPECTION' },
  { overall: 'Soft Costs', category: 'BUSINESS VALUATION' },
  { overall: 'Soft Costs', category: 'LEGAL FEES' },
  { overall: 'Soft Costs', category: 'SBA LOAN PACKAGING FEE' },
  { overall: 'Soft Costs', category: 'TITLE' },
  { overall: 'Soft Costs', category: 'SURVEY/UCC SEARCHES' },
  { overall: 'Soft Costs', category: 'VEHICLE TITLE FEES' },
  { overall: 'Soft Costs', category: 'SBA GUARANTY FEE' },
  { overall: 'Soft Costs', category: 'ORIGINATION FEE' },
  { overall: 'Soft Costs', category: 'SOFT COSTS' },
  { overall: 'Working Capital', category: 'WORKING CAPITAL' },
  { overall: 'Conscessions', category: 'CONCESSIONS' },
];

// Get unique overall categories
export const uniqueOverallCategories = [...new Set(categoryOptions.map(item => item.overall))];
