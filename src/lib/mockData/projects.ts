
import { Project } from './types';
import { users } from './users';

export const projects: Project[] = [
  {
    project_id: "project_1",
    project_name: "Downtown Restaurant Acquisition",
    project_type: "Business Acquisition",
    status: "active",
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-20T14:45:00Z",
    created_by: "user_1",
    created_by_user: users.find(u => u.user_id === "user_1"),
    description: "Acquisition of established downtown restaurant with prime location and strong customer base",
    loan_amount: 850000,
    loan_types: [
      {
        type: "SBA 7(a)",
        amount: 680000,
        term: 10,
        rate: 7.5,
        description: "Primary acquisition financing"
      },
      {
        type: "Working Capital",
        amount: 170000,
        term: 5,
        rate: 8.0,
        description: "Initial working capital and equipment upgrades"
      }
    ],
    category: "Food Service",
    city: "San Francisco",
    state: "CA",
    location: "San Francisco, CA",
    participants: [
      { userId: "user_1", role: "Primary Borrower" },
      { userId: "user_2", role: "Co-Borrower" }
    ],
    buyers: ["user_1", "user_2"],
    seller: "user_3",
    owners: [
      {
        owner_id: "owner_1_1",
        name: "Maria Rodriguez",
        email: "maria.rodriguez@gmail.com",
        type: "individual",
        ownership_percentage: 45,
        role: "Managing Member",
        user_id: "user_1",
        phone: "(415) 555-0123",
        address: {
          street: "1234 Valencia Street",
          city: "San Francisco",
          state: "CA",
          zip_code: "94110"
        }
      },
      {
        owner_id: "owner_1_2",
        name: "Carlos Martinez",
        email: "carlos.martinez@gmail.com",
        type: "individual",
        ownership_percentage: 35,
        role: "Operations Partner",
        user_id: "user_2",
        phone: "(415) 555-0124",
        address: {
          street: "5678 Mission Street",
          city: "San Francisco",
          state: "CA",
          zip_code: "94112"
        }
      },
      {
        owner_id: "owner_1_3",
        name: "Golden Gate Investment LLC",
        email: "info@ggii.com",
        type: "business",
        ownership_percentage: 20,
        role: "Silent Partner",
        business_id: "business_11",
        phone: "(415) 555-9876"
      }
    ],
    main_business: {
      business_id: "business_1",
      name: "Golden Gate Bistro LLC",
      entity_type: "LLC",
      ein: "123456789",
      description: "Established downtown restaurant specializing in contemporary American cuisine with 15 years of operation",
      address: {
        street: "456 Market Street",
        city: "San Francisco",
        state: "CA",
        zip_code: "94102"
      },
      phone: "(415) 555-0123",
      email: "info@goldengatesbistro.com",
      website: "www.goldengatebistro.com",
      founding_date: "2009-03-15",
      employee_count: 24,
      industry: "Food Service",
      naics_code: "722513",
      prior_year_sales: 1850000,
      current_year_sales: 1950000,
      primary_contact_name: "Maria Rodriguez",
      primary_contact_email: "maria@goldengatebistro.com"
    }
  },
  {
    project_id: "project_2", 
    project_name: "Tech Startup Equipment Financing",
    project_type: "Equipment Financing",
    status: "pending",
    created_at: "2024-02-01T09:15:00Z",
    updated_at: "2024-02-05T16:20:00Z",
    created_by: "user_2",
    created_by_user: users.find(u => u.user_id === "user_2"),
    description: "Financing for specialized tech equipment and software development infrastructure",
    loan_amount: 450000,
    loan_types: [
      {
        type: "Equipment Financing",
        amount: 350000,
        term: 7,
        rate: 6.8,
        description: "Server infrastructure and development equipment"
      },
      {
        type: "Line of Credit",
        amount: 100000,
        term: 3,
        rate: 9.2,
        description: "Flexible working capital line"
      }
    ],
    category: "Technology",
    city: "Austin",
    state: "TX",
    location: "Austin, TX",
    participants: [
      { userId: "user_2", role: "Primary Borrower" }
    ],
    buyers: ["user_2"],
    seller: "user_4",
    owners: [
      {
        owner_id: "owner_2_1",
        name: "David Chen",
        email: "david.chen@innovatetech.com",
        type: "individual",
        ownership_percentage: 51,
        role: "CEO & Founder",
        user_id: "user_2",
        phone: "(512) 555-0234",
        address: {
          street: "1200 South Lamar Blvd, Unit 101",
          city: "Austin",
          state: "TX",
          zip_code: "78704"
        }
      },
      {
        owner_id: "owner_2_2",
        name: "Sarah Kim",
        email: "sarah.kim@innovatetech.com",
        type: "individual",
        ownership_percentage: 25,
        role: "CTO & Co-Founder",
        user_id: "user_6",
        phone: "(512) 555-0235"
      },
      {
        owner_id: "owner_2_3",
        name: "Michael Thompson",
        email: "michael.thompson@venturecap.com",
        type: "individual",
        ownership_percentage: 15,
        role: "Lead Investor",
        user_id: "user_8",
        phone: "(512) 555-0236"
      },
      {
        owner_id: "owner_2_4",
        name: "Austin Ventures Fund II",
        email: "fund@austinventures.com",
        type: "business",
        ownership_percentage: 9,
        role: "Institutional Investor",
        business_id: "business_12",
        phone: "(512) 555-7890"
      }
    ],
    main_business: {
      business_id: "business_2",
      name: "InnovateTech Solutions Inc.",
      entity_type: "Corporation",
      ein: "987654321",
      description: "Software development company specializing in AI-powered business solutions and custom enterprise applications",
      address: {
        street: "1200 South Lamar Blvd, Suite 300",
        city: "Austin",
        state: "TX",
        zip_code: "78704"
      },
      phone: "(512) 555-0234",
      email: "contact@innovatetech.com",
      website: "www.innovatetech.com",
      founding_date: "2020-06-10",
      employee_count: 12,
      industry: "Technology",
      naics_code: "541511",
      prior_year_sales: 890000,
      current_year_sales: 1200000,
      primary_contact_name: "David Chen",
      primary_contact_email: "david@innovatetech.com",
      existing_debt: [
        {
          lender: "Austin Business Bank",
          original_amount: 150000,
          current_balance: 85000,
          payment: 3500,
          rate: 7.25,
          maturity_date: "2026-08-15",
          status: "Current" as const
        }
      ]
    }
  },
  {
    project_id: "project_3",
    project_name: "Manufacturing Facility Expansion", 
    project_type: "Real Estate",
    status: "completed",
    created_at: "2023-11-10T13:00:00Z",
    updated_at: "2023-12-15T11:30:00Z",
    created_by: "user_3",
    created_by_user: users.find(u => u.user_id === "user_3"),
    description: "Expansion of manufacturing facility to increase production capacity by 40%",
    loan_amount: 1200000,
    loan_types: [
      {
        type: "SBA 504",
        amount: 960000,
        term: 20,
        rate: 5.5,
        description: "Real estate acquisition and improvements"
      },
      {
        type: "Equipment Financing",
        amount: 240000,
        term: 10,
        rate: 6.2,
        description: "Manufacturing equipment upgrade"
      }
    ],
    category: "Manufacturing",
    city: "Dallas",
    state: "TX", 
    location: "Dallas, TX",
    participants: [
      { userId: "user_3", role: "Primary Borrower" },
      { userId: "user_1", role: "Guarantor" }
    ],
    buyers: ["user_3"],
    seller: "user_5",
    owners: [
      {
        owner_id: "owner_3_1",
        name: "Robert Johnson",
        email: "rjohnson@precisionmfg.com",
        type: "individual",
        ownership_percentage: 55,
        role: "President & CEO",
        user_id: "user_3",
        phone: "(214) 555-0345",
        address: {
          street: "3456 Oak Lawn Ave",
          city: "Dallas",
          state: "TX",
          zip_code: "75219"
        }
      },
      {
        owner_id: "owner_3_2",
        name: "Jennifer Johnson",
        email: "jennifer.johnson@precisionmfg.com",
        type: "individual",
        ownership_percentage: 25,
        role: "CFO",
        user_id: "user_14",
        phone: "(214) 555-0346"
      },
      {
        owner_id: "owner_3_3",
        name: "Thomas Wilson",
        email: "twilson@precisionmfg.com",
        type: "individual",
        ownership_percentage: 15,
        role: "VP Operations",
        user_id: "user_11",
        phone: "(214) 555-0347"
      },
      {
        owner_id: "owner_3_4",
        name: "Lisa Anderson",
        email: "landerson@precisionmfg.com",
        type: "individual",
        ownership_percentage: 5,
        role: "VP Sales",
        user_id: "user_12",
        phone: "(214) 555-0348"
      }
    ],
    main_business: {
      business_id: "business_3",
      name: "Precision Manufacturing Corp",
      entity_type: "Corporation",
      ein: "456789123",
      description: "Industrial manufacturing company producing precision components for aerospace and automotive industries",
      address: {
        street: "8500 Industrial Parkway",
        city: "Dallas",
        state: "TX",
        zip_code: "75201"
      },
      phone: "(214) 555-0345",
      email: "info@precisionmfg.com",
      website: "www.precisionmanufacturing.com",
      founding_date: "1998-11-20",
      employee_count: 85,
      industry: "Manufacturing",
      naics_code: "336413",
      prior_year_sales: 8500000,
      current_year_sales: 9200000,
      primary_contact_name: "Robert Johnson",
      primary_contact_email: "rjohnson@precisionmfg.com"
    }
  },
  {
    project_id: "project_4",
    project_name: "Medical Practice Acquisition",
    project_type: "Business Acquisition", 
    status: "active",
    created_at: "2024-01-25T08:45:00Z",
    updated_at: "2024-02-10T12:15:00Z",
    created_by: "user_4",
    created_by_user: users.find(u => u.user_id === "user_4"),
    description: "Acquisition of established family medical practice with existing patient base",
    loan_amount: 650000,
    loan_types: [
      {
        type: "SBA 7(a)",
        amount: 520000,
        term: 15,
        rate: 7.2,
        description: "Practice acquisition financing"
      },
      {
        type: "Working Capital",
        amount: 130000,
        term: 5,
        rate: 8.5,
        description: "Equipment updates and working capital"
      }
    ],
    category: "Healthcare",
    city: "Phoenix",
    state: "AZ",
    location: "Phoenix, AZ",
    participants: [
      { userId: "user_4", role: "Primary Borrower" },
      { userId: "user_5", role: "Co-Borrower" }
    ],
    buyers: ["user_4", "user_5"],
    seller: "user_1",
    owners: [
      {
        owner_id: "owner_4_1",
        name: "Dr. Sarah Williams",
        email: "swilliams@desertfamilymed.com",
        type: "individual",
        ownership_percentage: 60,
        role: "Lead Physician & Managing Partner",
        user_id: "user_4",
        phone: "(602) 555-0456",
        address: {
          street: "1234 North Scottsdale Road",
          city: "Phoenix",
          state: "AZ",
          zip_code: "85016"
        }
      },
      {
        owner_id: "owner_4_2",
        name: "Dr. Mark Rodriguez",
        email: "mrodriguez@desertfamilymed.com",
        type: "individual",
        ownership_percentage: 30,
        role: "Associate Physician",
        user_id: "user_5",
        phone: "(602) 555-0457"
      },
      {
        owner_id: "owner_4_3",
        name: "Phoenix Medical Holdings",
        email: "info@phoenixmedical.com",
        type: "business",
        ownership_percentage: 10,
        role: "Equipment Financier",
        business_id: "business_10",
        phone: "(602) 555-8900"
      }
    ],
    main_business: {
      business_id: "business_4",
      name: "Desert Family Medical Group",
      entity_type: "Professional Corporation",
      ein: "789123456",
      description: "Established family medical practice serving the Phoenix community for over 20 years",
      address: {
        street: "3456 North Central Avenue",
        city: "Phoenix",
        state: "AZ",
        zip_code: "85012"
      },
      phone: "(602) 555-0456",
      email: "office@desertfamilymed.com",
      website: "www.desertfamilymedical.com",
      founding_date: "2003-05-12",
      employee_count: 18,
      industry: "Healthcare",
      naics_code: "621111",
      prior_year_sales: 2100000,
      current_year_sales: 2350000,
      primary_contact_name: "Dr. Sarah Williams",
      primary_contact_email: "swilliams@desertfamilymed.com"
    }
  },
  {
    project_id: "project_5",
    project_name: "Retail Chain Expansion",
    project_type: "Business Expansion",
    status: "active",
    created_at: "2024-02-15T14:20:00Z",
    updated_at: "2024-02-20T09:30:00Z", 
    created_by: "user_5",
    created_by_user: users.find(u => u.user_id === "user_5"),
    description: "Opening 3 new retail locations across the metropolitan area with inventory and fixtures",
    loan_amount: 975000,
    loan_types: [
      {
        type: "SBA 7(a)",
        amount: 650000,
        term: 12,
        rate: 7.8,
        description: "Primary expansion financing"
      },
      {
        type: "Commercial Real Estate",
        amount: 195000,
        term: 15,
        rate: 6.9,
        description: "Leasehold improvements"
      },
      {
        type: "Working Capital",
        amount: 130000,
        term: 3,
        rate: 8.8,
        description: "Initial inventory and operating capital"
      }
    ],
    category: "Retail",
    city: "Seattle",
    state: "WA",
    location: "Seattle, WA",
    participants: [
      { userId: "user_5", role: "Primary Borrower" },
      { userId: "user_2", role: "Co-Borrower" }
    ],
    buyers: ["user_5", "user_2"],
    seller: "user_3",
    owners: [
      {
        owner_id: "owner_5_1",
        name: "Jennifer Martinez",
        email: "jmartinez@pnwretail.com",
        type: "individual",
        ownership_percentage: 40,
        role: "Founder & CEO",
        user_id: "user_5",
        phone: "(206) 555-0567",
        address: {
          street: "1500 Pike Place",
          city: "Seattle",
          state: "WA",
          zip_code: "98101"
        }
      },
      {
        owner_id: "owner_5_2",
        name: "Kevin Thompson",
        email: "kthompson@pnwretail.com",
        type: "individual",
        ownership_percentage: 25,
        role: "COO",
        user_id: "user_15",
        phone: "(206) 555-0568"
      },
      {
        owner_id: "owner_5_3",
        name: "Amanda Foster",
        email: "afoster@pnwretail.com",
        type: "individual",
        ownership_percentage: 20,
        role: "VP Marketing",
        user_id: "user_22",
        phone: "(206) 555-0569"
      },
      {
        owner_id: "owner_5_4",
        name: "Seattle Retail Partners LLC",
        email: "partners@seattleretail.com",
        type: "business",
        ownership_percentage: 10,
        role: "Strategic Investor",
        business_id: "business_20",
        phone: "(206) 555-7800"
      },
      {
        owner_id: "owner_5_5",
        name: "Pacific Investment Group",
        email: "info@pacificinvest.com",
        type: "business",
        ownership_percentage: 5,
        role: "Minority Investor",
        business_id: "business_16",
        phone: "(206) 555-7801"
      }
    ],
    main_business: {
      business_id: "business_5",
      name: "Pacific Northwest Retail LLC",
      entity_type: "LLC",
      ein: "321654987",
      description: "Specialty retail chain focusing on outdoor gear and Pacific Northwest lifestyle products",
      address: {
        street: "2200 First Avenue",
        city: "Seattle",
        state: "WA",
        zip_code: "98121"
      },
      phone: "(206) 555-0567",
      email: "info@pnwretail.com",
      website: "www.pacificnorthwestretail.com",
      founding_date: "2018-09-03",
      employee_count: 32,
      industry: "Retail Trade",
      naics_code: "451110",
      prior_year_sales: 3200000,
      current_year_sales: 3650000,
      primary_contact_name: "Jennifer Martinez",
      primary_contact_email: "jmartinez@pnwretail.com"
    }
  }
];
