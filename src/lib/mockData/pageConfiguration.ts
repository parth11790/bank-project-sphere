
export interface PageConfiguration {
  id: string;
  name: string;
  description: string;
  route: string;
  entityType: 'individual' | 'business' | 'both';
  assignedSections: string[]; // Array of section IDs
  exists: boolean;
}

export const pageConfigurations: PageConfiguration[] = [
  {
    id: 'borrowing_business',
    name: 'Borrowing Business',
    description: 'Main business entity applying for the loan',
    route: '/business-information',
    entityType: 'business',
    assignedSections: ['business_information', 'forms', 'business_ownership', 'affiliated_business_ownership'],
    exists: true
  },
  {
    id: 'owner_individual',
    name: 'Owner - Individual',
    description: 'Individual owners of the business',
    route: '/personal-information',
    entityType: 'individual',
    assignedSections: ['personal_information', 'personal_details', 'forms', 'affiliated_business_ownership'],
    exists: true
  },
  {
    id: 'owner_business',
    name: 'Owner - Business',
    description: 'Business entities that own the borrowing business',
    route: '/owner-business',
    entityType: 'business',
    assignedSections: ['business_information', 'forms', 'business_ownership'],
    exists: false
  },
  {
    id: 'affiliated_business',
    name: 'Affiliated Business',
    description: 'Businesses affiliated with owners or the borrowing entity',
    route: '/affiliated-business',
    entityType: 'business',
    assignedSections: ['business_information', 'forms', 'business_ownership', 'affiliated_business_ownership'],
    exists: false
  },
  {
    id: 'acquisition_business',
    name: 'Acquisition Business',
    description: 'Business being acquired in the transaction',
    route: '/acquisition-business',
    entityType: 'business',
    assignedSections: ['business_information', 'forms'],
    exists: false
  },
  {
    id: 'seller_individual',
    name: 'Seller - Individual',
    description: 'Individual sellers in the transaction',
    route: '/seller-individual',
    entityType: 'individual',
    assignedSections: ['personal_information', 'personal_details', 'forms'],
    exists: false
  },
  {
    id: 'seller_business',
    name: 'Seller - Business',
    description: 'Business entities selling in the transaction',
    route: '/seller-business',
    entityType: 'business',
    assignedSections: ['business_information', 'forms', 'business_ownership'],
    exists: false
  }
];
