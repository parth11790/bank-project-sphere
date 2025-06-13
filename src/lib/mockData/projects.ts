import { Project } from './types';

// Update projects to include the new business structure
export const projects: Project[] = [
  {
    project_id: 'project_1',
    project_name: 'Main Street Acquisition',
    project_type: 'Business Acquisition',
    status: 'active',
    loan_types: [
      { type: 'SBA 7(a)', amount: 2000000, description: 'Standard SBA loan for business acquisition' },
      { type: 'Owner Financing', amount: 500000, description: 'Seller carry back financing' }
    ],
    loan_amount: 2500000,
    created_by: 'user_4',
    created_at: '2023-03-15T10:00:00Z',
    updated_at: '2023-05-20T14:30:00Z',
    city: 'Chicago',
    state: 'IL',
    
    main_business: {
      business_id: 'business_main_1',
      name: 'Main Street Restaurant LLC',
      entity_type: 'LLC',
      description: 'Full-service restaurant specializing in American cuisine',
      website: 'https://mainstreetrestaurant.com',
      founding_date: '2015-03-01',
      employee_count: 25,
      ein: '12-3456789',
      address: {
        street: '123 Main Street',
        city: 'Chicago',
        state: 'IL',
        zip_code: '60601',
        country: 'USA'
      },
      documents: [
        { document_id: 'doc_1', name: 'Articles of Organization' },
        { document_id: 'doc_2', name: 'Operating Agreement' }
      ],
      forms: [
        { form_id: 'form_1', name: 'Business Tax Returns (3 years)' },
        { form_id: 'form_2', name: 'Financial Statements' }
      ]
    },
    
    owners: [
      {
        owner_id: 'owner_1_1',
        name: 'John Miller',
        email: 'john.miller@example.com',
        type: 'individual',
        ownership_percentage: 45,
        role: 'CEO',
        affiliated_businesses: [
          { business_id: 'affiliated_1_1', name: 'Miller Consulting LLC', entity_type: 'LLC' },
          { business_id: 'affiliated_1_2', name: 'Downtown Properties Inc', entity_type: 'Corporation' },
          { business_id: 'affiliated_1_3', name: 'Miller Investment Group', entity_type: 'Partnership' }
        ]
      },
      {
        owner_id: 'owner_1_2',
        name: 'Sarah Chen',
        email: 'sarah.chen@example.com',
        type: 'individual',
        ownership_percentage: 35,
        role: 'COO',
        affiliated_businesses: [
          { business_id: 'affiliated_2_1', name: 'Chen Marketing Agency', entity_type: 'LLC' },
          { business_id: 'affiliated_2_2', name: 'Digital Solutions Corp', entity_type: 'Corporation' },
          { business_id: 'affiliated_2_3', name: 'Chen Real Estate Holdings', entity_type: 'LLC' },
          { business_id: 'affiliated_2_4', name: 'Innovative Tech Partners', entity_type: 'Partnership' },
          { business_id: 'affiliated_2_5', name: 'Metro Food Services', entity_type: 'LLC' }
        ]
      },
      {
        owner_id: 'owner_1_3',
        name: 'Michael Rodriguez',
        email: 'michael.rodriguez@example.com',
        type: 'individual',
        ownership_percentage: 15,
        role: 'CFO',
        affiliated_businesses: [
          { business_id: 'affiliated_3_1', name: 'Rodriguez Financial Services', entity_type: 'LLC' },
          { business_id: 'affiliated_3_2', name: 'Accounting Plus Inc', entity_type: 'Corporation' },
          { business_id: 'affiliated_3_3', name: 'Tax Advisory Group', entity_type: 'LLC' },
          { business_id: 'affiliated_3_4', name: 'Business Valuation Experts', entity_type: 'Partnership' },
          { business_id: 'affiliated_3_5', name: 'Financial Planning Associates', entity_type: 'LLC' },
          { business_id: 'affiliated_3_6', name: 'Investment Research Corp', entity_type: 'Corporation' }
        ]
      },
      {
        owner_id: 'owner_1_4',
        name: 'Lisa Thompson',
        email: 'lisa.thompson@example.com',
        type: 'individual',
        ownership_percentage: 5,
        role: 'Operations Manager',
        affiliated_businesses: [
          { business_id: 'affiliated_4_1', name: 'Thompson Logistics LLC', entity_type: 'LLC' },
          { business_id: 'affiliated_4_2', name: 'Supply Chain Solutions', entity_type: 'Corporation' }
        ]
      }
    ],
    
    loans: [
      {
        loan_id: 'loan_1',
        loan_type: 'SBA 7(a)',
        amount: 2000000,
        term: 10,
        rate: 6.5,
        description: 'Standard SBA loan for business acquisition',
        business_id: 'business_main_1',
        status: 'active'
      },
      {
        loan_id: 'loan_2',
        loan_type: 'Owner Financing',
        amount: 500000,
        term: 5,
        rate: 4.0,
        description: 'Seller carry back financing',
        business_id: 'business_main_1',
        status: 'pending'
      }
    ],
    
    sellers: [
      {
        seller_id: 'seller_1_1',
        name: 'ABC Holdings Corp',
        email: 'contact@abcholdings.com',
        type: 'business',
        business_id: 'business_seller_1',
        associated_businesses: [
          { business_id: 'business_seller_1', name: 'ABC Holdings Corp', entity_type: 'Corporation' },
          { business_id: 'seller_affiliated_1', name: 'ABC Restaurant Group', entity_type: 'LLC' },
          { business_id: 'seller_affiliated_2', name: 'Heritage Food Services', entity_type: 'Corporation' }
        ]
      },
      {
        seller_id: 'seller_1_2',
        name: 'Robert Wilson',
        email: 'robert.wilson@example.com',
        type: 'individual',
        associated_businesses: [
          { business_id: 'seller_individual_1', name: 'Wilson Hospitality Ventures', entity_type: 'LLC' },
          { business_id: 'seller_individual_2', name: 'Culinary Investments Inc', entity_type: 'Corporation' }
        ]
      }
    ],
    
    participants: [
      { userId: 'user_1', role: 'buyer' },
      { userId: 'user_3', role: 'buyer' },
      { userId: 'user_19', role: 'buyer' },
      { userId: 'user_2', role: 'seller' },
      { userId: 'user_4', role: 'bank_officer' },
      { userId: 'user_5', role: 'loan_specialist' },
      { userId: 'user_9', role: 'bank_manager' }
    ]
  },
  {
    project_id: 'project_2',
    project_name: 'Riverside Development',
    project_type: 'Commercial Real Estate',
    status: 'pending',
    loan_types: [
      { type: 'SBA 504', amount: 5000000, description: 'CDC/SBA loan for real estate acquisition' },
      { type: 'Conventional', amount: 1000000, description: 'Bank loan for additional funding' }
    ],
    loan_amount: 6000000,
    created_by: 'user_5',
    created_at: '2023-06-10T09:15:00Z',
    updated_at: '2023-07-05T11:45:00Z',
    city: 'Denver',
    state: 'CO',
    
    main_business: {
      business_id: 'business_main_2',
      name: 'Riverside Commercial Properties LLC',
      entity_type: 'LLC',
      description: 'Commercial real estate development and management',
      website: 'https://riversidecommercial.com',
      founding_date: '2020-01-15',
      employee_count: 12,
      ein: '23-4567890',
      address: {
        street: '456 Riverside Drive',
        city: 'Denver',
        state: 'CO',
        zip_code: '80202',
        country: 'USA'
      },
      documents: [
        { document_id: 'doc_3', name: 'LLC Operating Agreement' },
        { document_id: 'doc_4', name: 'Property Acquisition Plans' }
      ],
      forms: [
        { form_id: 'form_3', name: 'Real Estate Appraisals' },
        { form_id: 'form_4', name: 'Environmental Reports' }
      ]
    },
    
    owners: [
      {
        owner_id: 'owner_2_1',
        name: 'David Park',
        email: 'david.park@example.com',
        type: 'individual',
        ownership_percentage: 40,
        role: 'Managing Partner',
        affiliated_businesses: [
          { business_id: 'park_1', name: 'Park Development Group', entity_type: 'LLC' },
          { business_id: 'park_2', name: 'Urban Planning Associates', entity_type: 'Corporation' },
          { business_id: 'park_3', name: 'Construction Management Inc', entity_type: 'Corporation' },
          { business_id: 'park_4', name: 'Property Investment Fund', entity_type: 'Partnership' }
        ]
      },
      {
        owner_id: 'owner_2_2',
        name: 'Jennifer Lee',
        email: 'jennifer.lee@example.com',
        type: 'individual',
        ownership_percentage: 30,
        role: 'Development Director',
        affiliated_businesses: [
          { business_id: 'lee_1', name: 'Lee Architecture Studio', entity_type: 'LLC' },
          { business_id: 'lee_2', name: 'Sustainable Design Corp', entity_type: 'Corporation' },
          { business_id: 'lee_3', name: 'Green Building Solutions', entity_type: 'LLC' },
          { business_id: 'lee_4', name: 'Commercial Design Partners', entity_type: 'Partnership' },
          { business_id: 'lee_5', name: 'Environmental Consulting LLC', entity_type: 'LLC' },
          { business_id: 'lee_6', name: 'LEED Certification Services', entity_type: 'Corporation' },
          { business_id: 'lee_7', name: 'Renewable Energy Systems', entity_type: 'LLC' }
        ]
      },
      {
        owner_id: 'owner_2_3',
        name: 'Thomas Anderson',
        email: 'thomas.anderson@example.com',
        type: 'individual',
        ownership_percentage: 20,
        role: 'Finance Director',
        affiliated_businesses: [
          { business_id: 'anderson_1', name: 'Anderson Capital Management', entity_type: 'LLC' },
          { business_id: 'anderson_2', name: 'Real Estate Finance Corp', entity_type: 'Corporation' },
          { business_id: 'anderson_3', name: 'Investment Banking Associates', entity_type: 'Partnership' },
          { business_id: 'anderson_4', name: 'Commercial Lending Services', entity_type: 'LLC' },
          { business_id: 'anderson_5', name: 'Portfolio Management Inc', entity_type: 'Corporation' }
        ]
      },
      {
        owner_id: 'owner_2_4',
        name: 'Maria Garcia',
        email: 'maria.garcia@example.com',
        type: 'individual',
        ownership_percentage: 10,
        role: 'Project Manager',
        affiliated_businesses: [
          { business_id: 'garcia_1', name: 'Garcia Project Solutions', entity_type: 'LLC' },
          { business_id: 'garcia_2', name: 'Construction Oversight Inc', entity_type: 'Corporation' },
          { business_id: 'garcia_3', name: 'Quality Assurance Partners', entity_type: 'Partnership' }
        ]
      }
    ],
    
    loans: [
      {
        loan_id: 'loan_3',
        loan_type: 'SBA 504',
        amount: 5000000,
        term: 20,
        rate: 5.8,
        description: 'CDC/SBA loan for real estate acquisition',
        business_id: 'business_main_2',
        status: 'pending'
      }
    ],
    
    sellers: [
      {
        seller_id: 'seller_2_1',
        name: 'Metro Development Corp',
        email: 'info@metrodevelopment.com',
        type: 'business',
        associated_businesses: [
          { business_id: 'metro_1', name: 'Metro Development Corp', entity_type: 'Corporation' },
          { business_id: 'metro_2', name: 'City Center Properties', entity_type: 'LLC' },
          { business_id: 'metro_3', name: 'Commercial Real Estate Holdings', entity_type: 'Corporation' },
          { business_id: 'metro_4', name: 'Urban Retail Spaces', entity_type: 'LLC' }
        ]
      },
      {
        seller_id: 'seller_2_2',
        name: 'Patricia Johnson',
        email: 'patricia.johnson@example.com',
        type: 'individual',
        associated_businesses: [
          { business_id: 'johnson_1', name: 'Johnson Real Estate Trust', entity_type: 'Trust' },
          { business_id: 'johnson_2', name: 'Heritage Properties LLC', entity_type: 'LLC' }
        ]
      }
    ],
    
    participants: [
      { userId: 'user_6', role: 'buyer' },
      { userId: 'user_8', role: 'buyer' },
      { userId: 'user_20', role: 'buyer' },
      { userId: 'user_21', role: 'buyer' },
      { userId: 'user_7', role: 'seller' },
      { userId: 'user_4', role: 'bank_officer' },
      { userId: 'user_10', role: 'loan_specialist' }
    ]
  },
  {
    project_id: 'project_3',
    project_name: 'Harvest Valley Farms',
    project_type: 'Agricultural Business',
    status: 'active',
    loan_types: [
      { type: 'USDA Farm Loan', amount: 1200000, description: 'USDA guaranteed loan for agriculture' },
      { type: 'Equipment Financing', amount: 350000, description: 'Specialized equipment financing' },
      { type: 'Operating Line', amount: 150000, description: 'Line of credit for operations' }
    ],
    loan_amount: 1700000,
    created_by: 'user_9',
    created_at: '2023-08-22T14:30:00Z',
    updated_at: '2023-09-15T10:20:00Z',
    city: 'Boise',
    state: 'ID',
    
    main_business: {
      business_id: 'business_main_3',
      name: 'Harvest Valley Farms LLC',
      entity_type: 'LLC',
      description: 'Organic farming and agricultural products',
      website: 'https://harvestvalleyfarms.com',
      founding_date: '2018-05-10',
      employee_count: 18,
      ein: '34-5678901',
      address: {
        street: '789 Valley Road',
        city: 'Boise',
        state: 'ID',
        zip_code: '83702',
        country: 'USA'
      },
      documents: [
        { document_id: 'doc_5', name: 'Agricultural License' },
        { document_id: 'doc_6', name: 'Organic Certification' }
      ],
      forms: [
        { form_id: 'form_5', name: 'Farm Production Reports' },
        { form_id: 'form_6', name: 'USDA Compliance Forms' }
      ]
    },
    
    owners: [
      {
        owner_id: 'owner_3_1',
        name: 'James Wilson',
        email: 'james.wilson@example.com',
        type: 'individual',
        ownership_percentage: 50,
        role: 'Farm Manager',
        affiliated_businesses: [
          { business_id: 'wilson_1', name: 'Wilson Agricultural Services', entity_type: 'LLC' },
          { business_id: 'wilson_2', name: 'Organic Seed Company', entity_type: 'Corporation' },
          { business_id: 'wilson_3', name: 'Farm Equipment Leasing', entity_type: 'LLC' },
          { business_id: 'wilson_4', name: 'Agricultural Consulting Group', entity_type: 'Partnership' },
          { business_id: 'wilson_5', name: 'Sustainable Farming Solutions', entity_type: 'LLC' },
          { business_id: 'wilson_6', name: 'Crop Insurance Services', entity_type: 'Corporation' },
          { business_id: 'wilson_7', name: 'Farm-to-Table Distribution', entity_type: 'LLC' },
          { business_id: 'wilson_8', name: 'Agricultural Technology Inc', entity_type: 'Corporation' }
        ]
      },
      {
        owner_id: 'owner_3_2',
        name: 'Susan Davis',
        email: 'susan.davis@example.com',
        type: 'individual',
        ownership_percentage: 25,
        role: 'Operations Director',
        affiliated_businesses: [
          { business_id: 'davis_1', name: 'Davis Farm Management', entity_type: 'LLC' },
          { business_id: 'davis_2', name: 'Livestock Services Corp', entity_type: 'Corporation' },
          { business_id: 'davis_3', name: 'Agricultural Marketing Partners', entity_type: 'Partnership' },
          { business_id: 'davis_4', name: 'Farm Safety Consulting', entity_type: 'LLC' }
        ]
      },
      {
        owner_id: 'owner_3_3',
        name: 'Robert Brown',
        email: 'robert.brown@example.com',
        type: 'individual',
        ownership_percentage: 15,
        role: 'Financial Manager',
        affiliated_businesses: [
          { business_id: 'brown_1', name: 'Brown Financial Planning', entity_type: 'LLC' },
          { business_id: 'brown_2', name: 'Agricultural Accounting Services', entity_type: 'Corporation' },
          { business_id: 'brown_3', name: 'Farm Investment Advisory', entity_type: 'Partnership' },
          { business_id: 'brown_4', name: 'Rural Banking Solutions', entity_type: 'LLC' },
          { business_id: 'brown_5', name: 'Commodity Trading Services', entity_type: 'Corporation' }
        ]
      },
      {
        owner_id: 'owner_3_4',
        name: 'Emily Martinez',
        email: 'emily.martinez@example.com',
        type: 'individual',
        ownership_percentage: 10,
        role: 'Marketing Director',
        affiliated_businesses: [
          { business_id: 'martinez_1', name: 'Martinez Marketing LLC', entity_type: 'LLC' },
          { business_id: 'martinez_2', name: 'Agricultural Branding Corp', entity_type: 'Corporation' },
          { business_id: 'martinez_3', name: 'Farmers Market Solutions', entity_type: 'LLC' }
        ]
      }
    ],
    
    loans: [
      {
        loan_id: 'loan_4',
        loan_type: 'USDA Farm Loan',
        amount: 1200000,
        term: 15,
        rate: 4.5,
        description: 'USDA guaranteed loan for agriculture',
        business_id: 'business_main_3',
        status: 'active'
      },
      {
        loan_id: 'loan_5',
        loan_type: 'Equipment Financing',
        amount: 350000,
        term: 7,
        rate: 5.2,
        description: 'Specialized equipment financing',
        business_id: 'business_main_3',
        status: 'active'
      }
    ],
    
    sellers: [
      {
        seller_id: 'seller_3_1',
        name: 'Heritage Farms Corporation',
        email: 'contact@heritagefarms.com',
        type: 'business',
        associated_businesses: [
          { business_id: 'heritage_1', name: 'Heritage Farms Corporation', entity_type: 'Corporation' },
          { business_id: 'heritage_2', name: 'Valley Agricultural Holdings', entity_type: 'LLC' },
          { business_id: 'heritage_3', name: 'Rural Land Development', entity_type: 'Corporation' }
        ]
      },
      {
        seller_id: 'seller_3_2',
        name: 'Charles Thompson',
        email: 'charles.thompson@example.com',
        type: 'individual',
        associated_businesses: [
          { business_id: 'thompson_1', name: 'Thompson Family Farms', entity_type: 'Partnership' },
          { business_id: 'thompson_2', name: 'Agricultural Real Estate LLC', entity_type: 'LLC' }
        ]
      }
    ],
    
    participants: [
      { userId: 'user_11', role: 'buyer' },
      { userId: 'user_13', role: 'buyer' },
      { userId: 'user_22', role: 'buyer' },
      { userId: 'user_24', role: 'seller' },
      { userId: 'user_9', role: 'bank_manager' },
      { userId: 'user_5', role: 'loan_specialist' }
    ]
  },
  {
    project_id: 'project_4',
    project_name: 'Harbor View Hotel',
    project_type: 'Hospitality Acquisition',
    status: 'completed',
    loan_types: [
      { type: 'SBA 7(a)', amount: 4500000, description: 'SBA loan for hotel acquisition' },
      { type: 'Mezzanine Financing', amount: 1000000, description: 'Additional gap financing' },
      { type: 'FF&E Loan', amount: 500000, description: 'Furniture, fixtures & equipment financing' }
    ],
    loan_amount: 6000000,
    created_by: 'user_4',
    created_at: '2023-10-05T11:00:00Z',
    updated_at: '2023-11-18T16:45:00Z',
    city: 'Portland',
    state: 'OR',
    
    main_business: {
      business_id: 'business_main_4',
      name: 'Harbor View Hotel LLC',
      entity_type: 'LLC',
      description: 'Luxury waterfront hotel and conference center',
      website: 'https://harborviewhotel.com',
      founding_date: '2019-08-20',
      employee_count: 45,
      ein: '45-6789012',
      address: {
        street: '1001 Harbor View Drive',
        city: 'Portland',
        state: 'OR',
        zip_code: '97201',
        country: 'USA'
      },
      documents: [
        { document_id: 'doc_7', name: 'Hotel Operating License' },
        { document_id: 'doc_8', name: 'Tourism Board Certification' }
      ],
      forms: [
        { form_id: 'form_7', name: 'Hospitality Financial Reports' },
        { form_id: 'form_8', name: 'Occupancy Rate Analysis' }
      ]
    },
    
    owners: [
      {
        owner_id: 'owner_4_1',
        name: 'Catherine Walsh',
        email: 'catherine.walsh@example.com',
        type: 'individual',
        ownership_percentage: 55,
        role: 'General Manager',
        affiliated_businesses: [
          { business_id: 'walsh_1', name: 'Walsh Hospitality Group', entity_type: 'LLC' },
          { business_id: 'walsh_2', name: 'Boutique Hotels Inc', entity_type: 'Corporation' },
          { business_id: 'walsh_3', name: 'Event Management Services', entity_type: 'LLC' },
          { business_id: 'walsh_4', name: 'Restaurant Operations Corp', entity_type: 'Corporation' },
          { business_id: 'walsh_5', name: 'Tourism Marketing Partners', entity_type: 'Partnership' },
          { business_id: 'walsh_6', name: 'Hotel Consulting LLC', entity_type: 'LLC' }
        ]
      },
      {
        owner_id: 'owner_4_2',
        name: 'Peter Kim',
        email: 'peter.kim@example.com',
        type: 'individual',
        ownership_percentage: 25,
        role: 'Investment Partner',
        affiliated_businesses: [
          { business_id: 'kim_1', name: 'Kim Investment Holdings', entity_type: 'LLC' },
          { business_id: 'kim_2', name: 'Pacific Hospitality Fund', entity_type: 'Partnership' },
          { business_id: 'kim_3', name: 'Commercial Property Management', entity_type: 'Corporation' },
          { business_id: 'kim_4', name: 'Hotel Development Corp', entity_type: 'Corporation' },
          { business_id: 'kim_5', name: 'Leisure Industry Investments', entity_type: 'LLC' }
        ]
      },
      {
        owner_id: 'owner_4_3',
        name: 'Alexandra Stone',
        email: 'alexandra.stone@example.com',
        type: 'individual',
        ownership_percentage: 15,
        role: 'Operations Manager',
        affiliated_businesses: [
          { business_id: 'stone_1', name: 'Stone Operations Consulting', entity_type: 'LLC' },
          { business_id: 'stone_2', name: 'Hospitality Training Institute', entity_type: 'Corporation' },
          { business_id: 'stone_3', name: 'Guest Experience Solutions', entity_type: 'LLC' },
          { business_id: 'stone_4', name: 'Hotel Technology Partners', entity_type: 'Partnership' },
          { business_id: 'stone_5', name: 'Service Excellence Corp', entity_type: 'Corporation' },
          { business_id: 'stone_6', name: 'Hospitality Staffing LLC', entity_type: 'LLC' },
          { business_id: 'stone_7', name: 'Quality Assurance Systems', entity_type: 'Corporation' },
          { business_id: 'stone_8', name: 'Hotel Efficiency Solutions', entity_type: 'LLC' },
          { business_id: 'stone_9', name: 'Customer Relations Management', entity_type: 'Partnership' },
          { business_id: 'stone_10', name: 'Hospitality Analytics Inc', entity_type: 'Corporation' }
        ]
      },
      {
        owner_id: 'owner_4_4',
        name: 'Daniel Foster',
        email: 'daniel.foster@example.com',
        type: 'individual',
        ownership_percentage: 5,
        role: 'Financial Advisor',
        affiliated_businesses: [
          { business_id: 'foster_1', name: 'Foster Financial Services', entity_type: 'LLC' },
          { business_id: 'foster_2', name: 'Hospitality Accounting Corp', entity_type: 'Corporation' }
        ]
      }
    ],
    
    loans: [
      {
        loan_id: 'loan_6',
        loan_type: 'SBA 7(a)',
        amount: 4500000,
        term: 12,
        rate: 6.2,
        description: 'SBA loan for hotel acquisition',
        business_id: 'business_main_4',
        status: 'active'
      },
      {
        loan_id: 'loan_7',
        loan_type: 'Mezzanine Financing',
        amount: 1000000,
        term: 8,
        rate: 8.5,
        description: 'Additional gap financing',
        business_id: 'business_main_4',
        status: 'active'
      }
    ],
    
    sellers: [
      {
        seller_id: 'seller_4_1',
        name: 'Coastal Hospitality Partners',
        email: 'info@coastalhospitality.com',
        type: 'business',
        associated_businesses: [
          { business_id: 'coastal_1', name: 'Coastal Hospitality Partners', entity_type: 'Partnership' },
          { business_id: 'coastal_2', name: 'Pacific Hotel Group', entity_type: 'Corporation' },
          { business_id: 'coastal_3', name: 'Resort Management LLC', entity_type: 'LLC' }
        ]
      },
      {
        seller_id: 'seller_4_2',
        name: 'Margaret O\'Brien',
        email: 'margaret.obrien@example.com',
        type: 'individual',
        associated_businesses: [
          { business_id: 'obrien_1', name: 'O\'Brien Hotel Investments', entity_type: 'LLC' },
          { business_id: 'obrien_2', name: 'Waterfront Properties Trust', entity_type: 'Trust' }
        ]
      }
    ],
    
    participants: [
      { userId: 'user_15', role: 'buyer' },
      { userId: 'user_23', role: 'buyer' },
      { userId: 'user_25', role: 'seller' },
      { userId: 'user_4', role: 'bank_officer' },
      { userId: 'user_10', role: 'loan_specialist' }
    ]
  },
  {
    project_id: 'project_5',
    project_name: 'Maple Street Manufacturing',
    project_type: 'Manufacturing Expansion',
    status: 'active',
    loan_types: [
      { type: 'Industrial Development Bond', amount: 3000000, description: 'Tax-exempt bond for manufacturing' },
      { type: 'Equipment Financing', amount: 1200000, description: 'CNC machine and production line financing' },
      { type: 'Working Capital', amount: 800000, description: 'Operating capital for expansion' }
    ],
    loan_amount: 5000000,
    created_by: 'user_5',
    created_at: '2023-12-12T09:30:00Z',
    updated_at: '2024-01-20T13:40:00Z',
    city: 'Cleveland',
    state: 'OH',
    
    main_business: {
      business_id: 'business_main_5',
      name: 'Maple Street Manufacturing Inc',
      entity_type: 'Corporation',
      description: 'Precision manufacturing and industrial components',
      website: 'https://maplestreetmfg.com',
      founding_date: '2016-11-01',
      employee_count: 85,
      ein: '56-7890123',
      address: {
        street: '2500 Maple Street Industrial Park',
        city: 'Cleveland',
        state: 'OH',
        zip_code: '44114',
        country: 'USA'
      },
      documents: [
        { document_id: 'doc_9', name: 'Manufacturing License' },
        { document_id: 'doc_10', name: 'ISO Certification' }
      ],
      forms: [
        { form_id: 'form_9', name: 'Production Capacity Reports' },
        { form_id: 'form_10', name: 'Quality Control Documentation' }
      ]
    },
    
    owners: [
      {
        owner_id: 'owner_5_1',
        name: 'William Jackson',
        email: 'william.jackson@example.com',
        type: 'individual',
        ownership_percentage: 60,
        role: 'President & CEO',
        affiliated_businesses: [
          { business_id: 'jackson_1', name: 'Jackson Engineering Solutions', entity_type: 'LLC' },
          { business_id: 'jackson_2', name: 'Industrial Automation Corp', entity_type: 'Corporation' },
          { business_id: 'jackson_3', name: 'Manufacturing Consulting Group', entity_type: 'Partnership' },
          { business_id: 'jackson_4', name: 'Quality Systems Inc', entity_type: 'Corporation' },
          { business_id: 'jackson_5', name: 'Precision Tools LLC', entity_type: 'LLC' },
          { business_id: 'jackson_6', name: 'Advanced Materials Corp', entity_type: 'Corporation' }
        ]
      },
      {
        owner_id: 'owner_5_2',
        name: 'Linda Chen',
        email: 'linda.chen@example.com',
        type: 'individual',
        ownership_percentage: 25,
        role: 'VP of Operations',
        affiliated_businesses: [
          { business_id: 'chen_1', name: 'Chen Process Optimization', entity_type: 'LLC' },
          { business_id: 'chen_2', name: 'Lean Manufacturing Solutions', entity_type: 'Corporation' },
          { business_id: 'chen_3', name: 'Supply Chain Partners', entity_type: 'Partnership' },
          { business_id: 'chen_4', name: 'Industrial Safety Services', entity_type: 'LLC' },
          { business_id: 'chen_5', name: 'Production Management Corp', entity_type: 'Corporation' }
        ]
      },
      {
        owner_id: 'owner_5_3',
        name: 'Richard Taylor',
        email: 'richard.taylor@example.com',
        type: 'individual',
        ownership_percentage: 10,
        role: 'Chief Technology Officer',
        affiliated_businesses: [
          { business_id: 'taylor_1', name: 'Taylor Technology Ventures', entity_type: 'LLC' },
          { business_id: 'taylor_2', name: 'Industrial IoT Solutions', entity_type: 'Corporation' },
          { business_id: 'taylor_3', name: 'Manufacturing Analytics LLC', entity_type: 'LLC' },
          { business_id: 'taylor_4', name: 'Automation Systems Corp', entity_type: 'Corporation' }
        ]
      },
      {
        owner_id: 'owner_5_4',
        name: 'Nancy White',
        email: 'nancy.white@example.com',
        type: 'individual',
        ownership_percentage: 5,
        role: 'Controller',
        affiliated_businesses: [
          { business_id: 'white_1', name: 'White Accounting Services', entity_type: 'LLC' },
          { business_id: 'white_2', name: 'Manufacturing Finance Corp', entity_type: 'Corporation' },
          { business_id: 'white_3', name: 'Cost Accounting Solutions', entity_type: 'LLC' }
        ]
      }
    ],
    
    loans: [
      {
        loan_id: 'loan_8',
        loan_type: 'Industrial Development Bond',
        amount: 3000000,
        term: 15,
        rate: 4.8,
        description: 'Tax-exempt bond for manufacturing',
        business_id: 'business_main_5',
        status: 'active'
      },
      {
        loan_id: 'loan_9',
        loan_type: 'Equipment Financing',
        amount: 1200000,
        term: 8,
        rate: 5.5,
        description: 'CNC machine and production line financing',
        business_id: 'business_main_5',
        status: 'active'
      }
    ],
    
    sellers: [
      {
        seller_id: 'seller_5_1',
        name: 'Industrial Holdings Group',
        email: 'contact@industrialholdings.com',
        type: 'business',
        associated_businesses: [
          { business_id: 'industrial_1', name: 'Industrial Holdings Group', entity_type: 'Corporation' },
          { business_id: 'industrial_2', name: 'Manufacturing Assets LLC', entity_type: 'LLC' },
          { business_id: 'industrial_3', name: 'Equipment Leasing Corp', entity_type: 'Corporation' },
          { business_id: 'industrial_4', name: 'Industrial Real Estate Partners', entity_type: 'Partnership' }
        ]
      },
      {
        seller_id: 'seller_5_2',
        name: 'Frank Mitchell',
        email: 'frank.mitchell@example.com',
        type: 'individual',
        associated_businesses: [
          { business_id: 'mitchell_1', name: 'Mitchell Manufacturing Investments', entity_type: 'LLC' },
          { business_id: 'mitchell_2', name: 'Industrial Property Trust', entity_type: 'Trust' }
        ]
      }
    ],
    
    participants: [
      { userId: 'user_3', role: 'buyer' },
      { userId: 'user_26', role: 'seller' },
      { userId: 'user_5', role: 'loan_specialist' },
      { userId: 'user_9', role: 'bank_manager' }
    ]
  }
];
