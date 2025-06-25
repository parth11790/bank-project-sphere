
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
    route: '/business/:projectId',
    entityType: 'business',
    assignedSections: ['business_information', 'forms', 'business_ownership', 'affiliated_business_ownership'],
    exists: true
  },
  {
    id: 'owner_individual',
    name: 'Owner - Individual',
    description: 'Individual owners of the business',
    route: '/project/participants/:projectId/personal-info/:participantId',
    entityType: 'individual',
    assignedSections: ['personal_information', 'personal_details', 'forms', 'affiliated_business_ownership'],
    exists: true
  },
  {
    id: 'owner_business',
    name: 'Owner - Business',
    description: 'Business entities that own the borrowing business',
    route: '/owner-business/:projectId',
    entityType: 'business',
    assignedSections: ['business_information', 'forms', 'business_ownership'],
    exists: true
  },
  {
    id: 'affiliated_business',
    name: 'Affiliated Business',
    description: 'Businesses affiliated with owners or the borrowing entity',
    route: '/affiliated-business/:projectId',
    entityType: 'business',
    assignedSections: ['business_information', 'forms', 'business_ownership', 'affiliated_business_ownership'],
    exists: true
  },
  {
    id: 'acquisition_business',
    name: 'Acquisition Business',
    description: 'Business being acquired in the transaction',
    route: '/acquisition-business/:projectId',
    entityType: 'business',
    assignedSections: ['business_information', 'forms'],
    exists: true
  },
  {
    id: 'seller_individual',
    name: 'Seller - Individual',
    description: 'Individual sellers in the transaction',
    route: '/seller-individual/:projectId',
    entityType: 'individual',
    assignedSections: ['personal_information', 'personal_details', 'forms'],
    exists: true
  },
  {
    id: 'seller_business',
    name: 'Seller - Business',
    description: 'Business entities selling in the transaction',
    route: '/seller-business/:projectId',
    entityType: 'business',
    assignedSections: ['business_information', 'forms', 'business_ownership'],
    exists: true
  }
];
