
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
    seller: "user_3"
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
    seller: "user_4"
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
    seller: "user_5"
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
    seller: "user_1"
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
    seller: "user_3"
  }
];
